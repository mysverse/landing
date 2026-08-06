import { setTimeout as delay } from "node:timers/promises";

const API_BASE = "https://api.openai.com/v1";

export function planReconciliation(localDocuments, remoteFiles, sourceRepo) {
  const currentKeys = new Set(localDocuments.map((document) => document.attributes.source_key));
  const namespaceFiles = remoteFiles.filter(
    (file) => file.attributes?.source_repo === sourceRepo
  );
  const keep = new Set();
  const upload = [];

  for (const document of localDocuments) {
    const match = namespaceFiles.find(
      (file) =>
        file.attributes?.source_key === document.attributes.source_key &&
        file.attributes?.content_hash === document.attributes.content_hash &&
        !keep.has(file.id)
    );
    if (match) keep.add(match.id);
    else upload.push(document);
  }

  const remove = namespaceFiles.filter((file) => {
    const sourceKey = file.attributes?.source_key;
    return (
      !keep.has(file.id) &&
      (typeof sourceKey !== "string" ||
        !currentKeys.has(sourceKey) ||
        localDocuments.some(
          (document) =>
            document.attributes.source_key === sourceKey &&
            document.attributes.content_hash !== file.attributes?.content_hash
        ) ||
        namespaceFiles.filter((candidate) => candidate.attributes?.source_key === sourceKey)
          .length > 1)
    );
  });

  return { upload, remove, unchanged: keep.size };
}

export function validateDocuments(documents, sourceRepo) {
  const required = [
    "source_repo",
    "source_key",
    "locale",
    "title",
    "canonical_url",
    "content_hash",
    "game",
    "needs_review"
  ];
  const keys = new Set();
  for (const document of documents) {
    if (!document.filename || !document.content)
      throw new Error("Every knowledge document needs a filename and content.");
    if (document.attributes?.source_repo !== sourceRepo)
      throw new Error(`Document ${document.filename} is outside ${sourceRepo}.`);
    for (const key of required) {
      if (!(key in document.attributes))
        throw new Error(`Document ${document.filename} is missing ${key}.`);
      const value = document.attributes[key];
      if (typeof value === "string" && value.length > 512)
        throw new Error(`Document ${document.filename} has an oversized ${key}.`);
    }
    const sourceKey = document.attributes.source_key;
    if (keys.has(sourceKey)) throw new Error(`Duplicate source_key: ${sourceKey}`);
    keys.add(sourceKey);
  }
  return documents;
}

function configuration() {
  const apiKey = process.env.OPENAI_INGEST_API_KEY;
  const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;
  if (!apiKey) throw new Error("OPENAI_INGEST_API_KEY is required.");
  return { apiKey, vectorStoreId };
}

async function api(path, { apiKey, method = "GET", body, headers = {} } = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      authorization: `Bearer ${apiKey}`,
      "openai-beta": "assistants=v2",
      ...headers
    },
    body,
    signal: AbortSignal.timeout(60_000)
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`OpenAI ${method} ${path} failed (${response.status}): ${detail}`);
  }
  return response.status === 204 ? null : response.json();
}

export async function createVectorStore(name = "MYSverse public knowledge") {
  const { apiKey } = configuration();
  const result = await api("/vector_stores", {
    apiKey,
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name })
  });
  return result.id;
}

async function listRemoteFiles(apiKey, vectorStoreId) {
  const files = [];
  let after;
  do {
    const query = new URLSearchParams({ limit: "100", order: "desc" });
    if (after) query.set("after", after);
    const page = await api(`/vector_stores/${vectorStoreId}/files?${query}`, {
      apiKey
    });
    files.push(...page.data);
    after = page.has_more ? page.data.at(-1)?.id : undefined;
  } while (after);
  return files;
}

async function mapWithConcurrency(items, concurrency, operation) {
  const results = new Array(items.length);
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await operation(items[index], index);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker())
  );
  return results;
}

async function uploadFile(apiKey, document) {
  const form = new FormData();
  form.set("purpose", "assistants");
  form.set(
    "file",
    new File([document.content], document.filename, { type: "text/markdown" })
  );
  return api("/files", { apiKey, method: "POST", body: form });
}

async function attachBatch(apiKey, vectorStoreId, uploads) {
  const batch = await api(`/vector_stores/${vectorStoreId}/file_batches`, {
    apiKey,
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      files: uploads.map(({ file, document }) => ({
        file_id: file.id,
        attributes: document.attributes
      }))
    })
  });

  const deadline = Date.now() + 15 * 60 * 1000;
  let current = batch;
  while (current.status === "in_progress") {
    if (Date.now() > deadline) throw new Error(`Indexing batch ${batch.id} timed out.`);
    await delay(2_000);
    current = await api(
      `/vector_stores/${vectorStoreId}/file_batches/${batch.id}`,
      { apiKey }
    );
  }
  if (current.status !== "completed" || current.file_counts?.failed > 0)
    throw new Error(`Indexing batch ${batch.id} finished with status ${current.status}.`);
}

async function removeFile(apiKey, vectorStoreId, fileId) {
  await api(`/vector_stores/${vectorStoreId}/files/${fileId}`, {
    apiKey,
    method: "DELETE"
  });
  await api(`/files/${fileId}`, { apiKey, method: "DELETE" });
}

export async function syncVectorStore({ documents, sourceRepo, dryRun = false }) {
  validateDocuments(documents, sourceRepo);
  const { apiKey, vectorStoreId } = configuration();
  if (!vectorStoreId) throw new Error("OPENAI_VECTOR_STORE_ID is required.");
  const remoteFiles = await listRemoteFiles(apiKey, vectorStoreId);
  const plan = planReconciliation(documents, remoteFiles, sourceRepo);

  console.log(
    `${sourceRepo}: ${documents.length} local, ${plan.unchanged} unchanged, ${plan.upload.length} upload, ${plan.remove.length} remove`
  );
  for (const document of plan.upload)
    console.log(`  upload ${document.attributes.source_key}`);
  for (const file of plan.remove)
    console.log(`  remove ${file.attributes?.source_key || file.id}`);
  if (dryRun) return plan;

  const uploaded = await mapWithConcurrency(plan.upload, 5, async (document) => ({
    document,
    file: await uploadFile(apiKey, document)
  }));

  try {
    for (let index = 0; index < uploaded.length; index += 500)
      await attachBatch(apiKey, vectorStoreId, uploaded.slice(index, index + 500));
  } catch (error) {
    await Promise.allSettled(
      uploaded.map(({ file }) => api(`/files/${file.id}`, { apiKey, method: "DELETE" }))
    );
    throw error;
  }

  // Replacement documents are indexed before any old or stale file is removed.
  await mapWithConcurrency(plan.remove, 3, (file) =>
    removeFile(apiKey, vectorStoreId, file.id)
  );
  console.log(`${sourceRepo}: sync complete`);
  return plan;
}

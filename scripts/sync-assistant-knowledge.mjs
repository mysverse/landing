import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import {
  createVectorStore,
  syncVectorStore,
  validateDocuments
} from "./assistant-vector-sync.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const locales = ["en", "ms", "zh", "ta"];
const sections = {
  Home: { title: "MYSverse", path: "", game: "general" },
  Projects: { title: "MYSverse projects and outreach", path: "#projects", game: "general" },
  Contact: { title: "Contact MYSverse", path: "#contact", game: "general" },
  ContactRouter: { title: "MYSverse contact options", path: "#contact", game: "general" },
  Contribute: { title: "Contribute to MYSverse", path: "/contribute", game: "general" },
  Lebuhraya: { title: "Lebuhraya", path: "/lebuhraya", game: "lebuhraya" }
};

const sha256 = (content) => createHash("sha256").update(content).digest("hex");

async function readPublicProjects() {
  const filePath = path.join(root, "data", "projects.ts");
  const source = ts.createSourceFile(
    filePath,
    await readFile(filePath, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );
  let array;
  source.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return;
    for (const declaration of node.declarationList.declarations) {
      if (
        ts.isIdentifier(declaration.name) &&
        declaration.name.text === "projects" &&
        declaration.initializer &&
        ts.isArrayLiteralExpression(declaration.initializer)
      )
        array = declaration.initializer;
    }
  });
  if (!array) throw new Error("Could not read the public projects array.");

  const allowed = new Set(["key", "type", "name", "tagline", "location", "status", "launched", "link"]);
  return array.elements
    .filter(ts.isObjectLiteralExpression)
    .map((item) => {
      const result = {};
      for (const property of item.properties) {
        if (!ts.isPropertyAssignment(property)) continue;
        const key = property.name.getText(source).replace(/^['"]|['"]$/g, "");
        if (!allowed.has(key)) continue;
        const value = property.initializer;
        if (ts.isStringLiteralLike(value)) result[key] = value.text;
      }
      return result;
    })
    .filter((item) => item.key && item.name);
}

function document({ locale, key, title, url, game, content }) {
  const sourceKey = `landing:${locale}:${key}`;
  const canonicalUrl = `https://mysver.se/${locale}${url}`;
  const normalized = content.replace(/\r\n?/g, "\n").trim() + "\n";
  return {
    filename: `${sourceKey.replace(/[^a-z0-9_-]+/gi, "-")}.md`,
    content: `# ${title}\n\nCanonical page: ${canonicalUrl}\nLocale: ${locale}\n\n${normalized}`,
    attributes: {
      source_repo: "landing",
      source_key: sourceKey,
      locale,
      title,
      canonical_url: canonicalUrl,
      content_hash: sha256(normalized),
      game,
      needs_review: false
    }
  };
}

async function buildDocuments() {
  const documents = [];
  const publicProjects = await readPublicProjects();
  for (const locale of locales) {
    const messages = JSON.parse(
      await readFile(path.join(root, "messages", `${locale}.json`), "utf8")
    );
    for (const [key, metadata] of Object.entries(sections)) {
      const value = messages[key];
      if (!value) throw new Error(`Missing ${key} in messages/${locale}.json`);
      documents.push(
        document({
          locale,
          key: key.toLowerCase(),
          title: `${metadata.title} (${locale})`,
          url: metadata.path,
          game: metadata.game,
          content:
            JSON.stringify(value, null, 2) +
            (key === "Projects"
              ? `\n\nPublic project records:\n${JSON.stringify(publicProjects, null, 2)}`
              : "")
        })
      );
    }

    for (const legalKey of ["privacy", "terms", "refund"]) {
      const content = await readFile(
        path.join(root, "messages", "legal", `${legalKey}_${locale}.md`),
        "utf8"
      );
      const slug =
        legalKey === "privacy" ? "privacy-policy" : legalKey === "refund" ? "refund-policy" : "terms";
      documents.push(
        document({
          locale,
          key: `legal-${legalKey}`,
          title: `${messages.Legal[legalKey].title} (${locale})`,
          url: `/legal/${slug}`,
          game: "general",
          content
        })
      );
    }
  }
  return documents;
}

const args = new Set(process.argv.slice(2));
if (args.has("--bootstrap")) {
  const id = await createVectorStore();
  console.log(`Created vector store: ${id}`);
} else {
  const documents = validateDocuments(await buildDocuments(), "landing");
  if (args.has("--validate")) {
    console.log(`landing: validated ${documents.length} public knowledge documents`);
    process.exit(0);
  }
  await syncVectorStore({
    documents,
    sourceRepo: "landing",
    dryRun: args.has("--dry-run")
  });
}

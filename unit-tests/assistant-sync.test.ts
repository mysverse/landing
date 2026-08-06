import { describe, expect, it } from "vitest";
import { planReconciliation } from "../scripts/assistant-vector-sync.mjs";

const document = (key: string, hash: string) => ({
  filename: `${key}.md`,
  content: key,
  attributes: { source_repo: "landing", source_key: key, content_hash: hash }
});

const remote = (id: string, repo: string, key: string, hash: string) => ({
  id,
  attributes: { source_repo: repo, source_key: key, content_hash: hash }
});

describe("vector-store reconciliation", () => {
  it("uploads changes, removes stale namespace files, and preserves the other repository", () => {
    const plan = planReconciliation(
      [document("same", "1"), document("changed", "2"), document("new", "3")],
      [
        remote("keep", "landing", "same", "1"),
        remote("old", "landing", "changed", "1"),
        remote("stale", "landing", "removed", "1"),
        remote("wiki", "wiki", "same", "old")
      ],
      "landing"
    ) as {
      unchanged: number;
      upload: Array<{ attributes: { source_key: string } }>;
      remove: Array<{ id: string }>;
    };
    expect(plan.unchanged).toBe(1);
    expect(plan.upload.map((item) => item.attributes.source_key)).toEqual(["changed", "new"]);
    expect(plan.remove.map((item) => item.id)).toEqual(["old", "stale"]);
  });
});

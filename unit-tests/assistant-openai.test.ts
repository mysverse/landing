import { beforeEach, describe, expect, it, vi } from "vitest";
import OpenAI from "openai";
import {
  assistantOpenAIInternals,
  generateGroundedAnswer
} from "lib/assistant/openai";
import { ASSISTANT_COPY } from "lib/assistant/copy";

const response = (answer: string, fileId?: string) => ({
  output_text: answer,
  output: [
    {
      type: "message",
      content: [
        {
          type: "output_text",
          text: answer,
          annotations: fileId
            ? [{ type: "file_citation", file_id: fileId, filename: "source.md", index: 0 }]
            : []
        }
      ]
    }
  ]
});

beforeEach(() => {
  process.env.OPENAI_VECTOR_STORE_ID = "vs_test";
});

describe("grounded answer generation", () => {
  it("retries English when a selected locale has no valid citation", async () => {
    const create = vi
      .fn()
      .mockResolvedValueOnce(response("Tiada sumber"))
      .mockResolvedValueOnce(response("Jawapan daripada sumber.", "file_en"));
    const retrieve = vi.fn().mockResolvedValue({
      attributes: {
        title: "Getting started",
        locale: "en",
        canonical_url: "https://mys.wiki/sumaya/get-started"
      }
    });
    const client = {
      responses: { create },
      vectorStores: { files: { retrieve } }
    } as unknown as OpenAI;

    const result = await generateGroundedAnswer({
      message: "Bagaimana hendak mula?",
      history: [],
      locale: "ms",
      pageContext: { url: "https://mys.wiki/ms", title: "Wiki", surface: "wiki" },
      safetyIdentifier: "safe_test",
      client
    });

    expect(result.sources).toHaveLength(1);
    expect(create).toHaveBeenCalledTimes(2);
    expect(create.mock.calls[0]?.[0].tools[0].filters.value).toBe("ms");
    expect(create.mock.calls[1]?.[0].tools[0].filters.value).toBe("en");
  });

  it("returns the localized unsupported answer when citations cannot be resolved", async () => {
    const client = {
      responses: { create: vi.fn().mockResolvedValue(response("A guess")) },
      vectorStores: { files: { retrieve: vi.fn() } }
    } as unknown as OpenAI;
    const result = await generateGroundedAnswer({
      message: "Unknown",
      history: [],
      locale: "zh",
      pageContext: { url: "https://mys.wiki/zh", title: "Wiki", surface: "wiki" },
      safetyIdentifier: "safe_test",
      client
    });
    expect(result).toEqual({ answer: ASSISTANT_COPY.zh.unsupported, sources: [] });
  });

  it("rejects citation metadata outside MYSverse hosts", () => {
    expect(
      assistantOpenAIInternals.canonicalSource("file_bad", {
        title: "Bad",
        locale: "en",
        canonical_url: "https://attacker.example"
      })
    ).toBeNull();
  });
});

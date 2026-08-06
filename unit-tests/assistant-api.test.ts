import { beforeEach, describe, expect, it, vi } from "vitest";
import { createSessionToken } from "lib/assistant/security";

const mocks = vi.hoisted(() => ({
  verifyTurnstile: vi.fn(),
  enforceQuota: vi.fn(),
  moderateText: vi.fn(),
  generateGroundedAnswer: vi.fn()
}));

vi.mock("lib/assistant/turnstile", () => ({ verifyTurnstile: mocks.verifyTurnstile }));
vi.mock("lib/assistant/rate-limit", () => ({ enforceQuota: mocks.enforceQuota }));
vi.mock("lib/assistant/openai", () => ({
  moderateText: mocks.moderateText,
  generateGroundedAnswer: mocks.generateGroundedAnswer
}));

const allowModeration = {
  flagged: false,
  categories: {
    "self-harm": false,
    "self-harm/intent": false,
    "self-harm/instructions": false
  }
};

beforeEach(() => {
  process.env.ASSISTANT_ENABLED = "true";
  process.env.ASSISTANT_SESSION_SECRET = "test-secret-that-is-at-least-thirty-two-characters";
  mocks.verifyTurnstile.mockResolvedValue(true);
  mocks.enforceQuota.mockResolvedValue({
    allowed: true,
    retryAfter: 60,
    remaining: { tenMinutes: 9, day: 49 }
  });
  mocks.moderateText.mockResolvedValue(allowModeration);
  mocks.generateGroundedAnswer.mockResolvedValue({
    answer: "Lebuhraya is documented here.",
    sources: [
      {
        fileId: "file_1",
        title: "Lebuhraya",
        url: "https://mys.wiki/lebuhraya/get-started",
        locale: "en"
      }
    ]
  });
});

describe("assistant routes", () => {
  it("creates a session only after Turnstile verification", async () => {
    const { POST } = await import("app/api/assistant/session/route");
    const response = await POST(
      new Request("https://mysver.se/api/assistant/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ageConfirmed: true, turnstileToken: "verified-token" })
      })
    );
    expect(response.status).toBe(200);
    expect((await response.json()).token).toMatch(/\./);
    expect(mocks.verifyTurnstile).toHaveBeenCalledOnce();
  });

  it("rejects failed Turnstile challenges", async () => {
    mocks.verifyTurnstile.mockResolvedValue(false);
    const { POST } = await import("app/api/assistant/session/route");
    const response = await POST(
      new Request("https://mysver.se/api/assistant/session", {
        method: "POST",
        body: JSON.stringify({ ageConfirmed: true, turnstileToken: "bad-token" })
      })
    );
    expect(response.status).toBe(403);
  });

  it("returns a fully moderated grounded answer", async () => {
    const { token } = createSessionToken();
    const { POST } = await import("app/api/assistant/chat/route");
    const response = await POST(
      new Request("https://mysver.se/api/assistant/chat", {
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: JSON.stringify({ message: "What is Lebuhraya?", history: [], locale: "en" })
      })
    );
    const result = await response.json();
    expect(response.status).toBe(200);
    expect(result.sources[0].fileId).toBe("file_1");
    expect(mocks.moderateText).toHaveBeenCalledTimes(2);
  });

  it("returns deterministic crisis copy without calling Luna", async () => {
    mocks.moderateText.mockResolvedValueOnce({
      flagged: true,
      categories: {
        "self-harm": true,
        "self-harm/intent": true,
        "self-harm/instructions": false
      }
    });
    const { token } = createSessionToken();
    const { POST } = await import("app/api/assistant/chat/route");
    const response = await POST(
      new Request("https://mysver.se/api/assistant/chat", {
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: JSON.stringify({ message: "I may hurt myself", history: [], locale: "en" })
      })
    );
    const result = await response.json();
    expect(result.answerMarkdown).toContain("999");
    expect(result.answerMarkdown).toContain("15555");
    expect(mocks.generateGroundedAnswer).not.toHaveBeenCalled();
  });

  it("returns 429 when a quota is exhausted and 503 on provider failure", async () => {
    const { token } = createSessionToken();
    const { POST } = await import("app/api/assistant/chat/route");
    mocks.enforceQuota.mockResolvedValueOnce({
      allowed: false,
      retryAfter: 42,
      remaining: { tenMinutes: 0, day: 40 }
    });
    const limited = await POST(
      new Request("https://mysver.se/api/assistant/chat", {
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: JSON.stringify({ message: "Hello", history: [], locale: "en" })
      })
    );
    expect(limited.status).toBe(429);
    expect(limited.headers.get("retry-after")).toBe("42");

    mocks.moderateText.mockRejectedValueOnce(new Error("timeout"));
    const unavailable = await POST(
      new Request("https://mysver.se/api/assistant/chat", {
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: JSON.stringify({ message: "Hello", history: [], locale: "en" })
      })
    );
    expect(unavailable.status).toBe(503);
  });
});

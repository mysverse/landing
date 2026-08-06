import { beforeEach, describe, expect, it } from "vitest";
import {
  createSessionToken,
  privacyHash,
  verifySessionToken
} from "lib/assistant/security";
import {
  sanitizePageContext,
  truncateHistory,
  validateChatPayload
} from "lib/assistant/validation";
import { malaysiaDay, quotaKeys } from "lib/assistant/rate-limit";
import {
  isAllowedAssistantOrigin,
  parseFrameMessage,
  parseHostContextMessage
} from "lib/assistant/post-message";
import {
  ASSISTANT_LOCALES,
  type AssistantMessage
} from "lib/assistant/types";
import { deterministicSafetyAnswer } from "lib/assistant/safety";

beforeEach(() => {
  process.env.ASSISTANT_SESSION_SECRET = "test-secret-that-is-at-least-thirty-two-characters";
});

describe("anonymous sessions", () => {
  it("signs, verifies, and expires a 24-hour token", () => {
    const now = Date.UTC(2026, 7, 7, 0, 0, 0);
    const { token, claims } = createSessionToken(now);
    expect(verifySessionToken(token, now + 1_000)?.sid).toBe(claims.sid);
    expect(verifySessionToken(`${token}x`, now)).toBeNull();
    expect(verifySessionToken(token, now + 24 * 60 * 60 * 1000)).toBeNull();
  });

  it("derives stable namespace-separated privacy hashes", () => {
    expect(privacyHash("a", "visitor")).toBe(privacyHash("a", "visitor"));
    expect(privacyHash("a", "visitor")).not.toBe(privacyHash("b", "visitor"));
    expect(privacyHash("a", "visitor")).not.toContain("visitor");
  });
});

describe("request validation and page context", () => {
  it("accepts six turns and rejects oversized messages", () => {
    const history = Array.from({ length: 12 }, (_, index) => ({
      role: index % 2 ? "assistant" : "user",
      content: `message ${index}`
    }));
    expect(
      validateChatPayload({
        message: "Where is the shop?",
        history,
        locale: "en",
        pageContext: { url: "https://mys.wiki/sumaya/shop", title: "Shop", surface: "wiki" }
      }).ok
    ).toBe(true);
    expect(
      validateChatPayload({ message: "x".repeat(1001), history: [], locale: "en" }).ok
    ).toBe(false);
  });

  it("removes query data and rejects non-MYSverse page hosts", () => {
    expect(
      sanitizePageContext({
        url: "https://mys.wiki/ms/sumaya?token=secret#section",
        title: "\u0000 Sumaya",
        surface: "wiki"
      })
    ).toEqual({ url: "https://mys.wiki/ms/sumaya", title: "Sumaya", surface: "wiki" });
    expect(
      sanitizePageContext({ url: "https://evil.example/", title: "Injected", surface: "wiki" }).url
    ).toBe("https://mysver.se");
  });

  it("keeps only the final six turns", () => {
    const messages = Array.from({ length: 15 }, (_, index) => ({
      role: index % 2 ? "assistant" : "user",
      content: String(index)
    })) as AssistantMessage[];
    expect(truncateHistory(messages)).toHaveLength(12);
    expect(truncateHistory(messages)[0]?.content).toBe("3");
  });
});

describe("quota windows", () => {
  it("uses the Malaysia calendar day and bounded fixed-window keys", () => {
    const now = Date.UTC(2026, 7, 7, 15, 59, 30);
    expect(malaysiaDay(now)).toEqual({ key: "2026-08-07", ttl: 30 });
    const result = quotaKeys("session", "ip", now);
    expect(result.keys).toHaveLength(4);
    expect(result.keys[1]).toContain("2026-08-07");
    expect(result.retryAfter).toBeGreaterThan(0);
    expect(result.retryAfter).toBeLessThanOrEqual(600);
  });
});

describe("localized deterministic safety copy", () => {
  it("keeps every Malaysian immediate-help route in every locale", () => {
    for (const locale of ASSISTANT_LOCALES) {
      const answer = deterministicSafetyAnswer(locale, "crisis");
      expect(answer).toContain("999");
      expect(answer).toContain("15555");
      expect(answer).toContain("+603-7627 2929");
    }
  });
});

describe("iframe message boundary", () => {
  it("accepts known hosts and typed messages only", () => {
    expect(isAllowedAssistantOrigin("https://mys.wiki")).toBe(true);
    expect(isAllowedAssistantOrigin("https://attacker.example")).toBe(false);
    expect(parseFrameMessage({ type: "mysverse:assistant:close" })).toEqual({
      type: "mysverse:assistant:close"
    });
    expect(parseFrameMessage({ type: "mysverse:assistant:resize", height: 100_000 })).toEqual({
      type: "mysverse:assistant:resize",
      height: 900
    });
    expect(
      parseHostContextMessage({
        type: "mysverse:assistant:host-context",
        locale: "en",
        theme: "dark",
        pageContext: { url: "https://mys.wiki", title: "Wiki", surface: "wiki" }
      })
    ).not.toBeNull();
    expect(parseHostContextMessage({ type: "mysverse:assistant:host-context", locale: "xx" })).toBeNull();
  });
});

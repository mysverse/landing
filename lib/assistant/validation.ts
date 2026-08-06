import {
  isAssistantLocale,
  type AssistantMessage,
  type AssistantPageContext
} from "./types";

const ALLOWED_PAGE_HOSTS = new Set([
  "mysver.se",
  "www.mysver.se",
  "mys.wiki",
  "www.mys.wiki",
  "localhost",
  "127.0.0.1",
  "[::1]"
]);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const cleanText = (value: unknown, max: number) =>
  typeof value === "string"
    ? value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim().slice(0, max)
    : "";

export function sanitizePageContext(value: unknown): AssistantPageContext {
  const fallback: AssistantPageContext = {
    url: "https://mysver.se",
    title: "MYSverse",
    surface: "landing"
  };

  if (!isRecord(value)) return fallback;

  const title = cleanText(value.title, 160) || fallback.title;
  const surface =
    value.surface === "wiki" || value.surface === "full-page"
      ? value.surface
      : "landing";

  try {
    const parsed = new URL(cleanText(value.url, 500));
    if (!ALLOWED_PAGE_HOSTS.has(parsed.hostname)) return { ...fallback, title, surface };
    parsed.username = "";
    parsed.password = "";
    parsed.search = "";
    parsed.hash = "";
    return { url: parsed.toString(), title, surface };
  } catch {
    return { ...fallback, title, surface };
  }
}

export interface ValidChatPayload {
  message: string;
  history: AssistantMessage[];
  locale: "en" | "ms" | "zh" | "ta";
  pageContext: AssistantPageContext;
}

export function validateChatPayload(
  value: unknown
): { ok: true; data: ValidChatPayload } | { ok: false; error: string } {
  if (!isRecord(value)) return { ok: false, error: "Invalid request body." };

  const message = cleanText(value.message, 1001);
  if (!message) return { ok: false, error: "Message is required." };
  if (message.length > 1000)
    return { ok: false, error: "Message must be 1,000 characters or fewer." };
  if (!isAssistantLocale(value.locale))
    return { ok: false, error: "Unsupported locale." };
  if (!Array.isArray(value.history) || value.history.length > 12)
    return { ok: false, error: "History must contain at most six turns." };

  const history: AssistantMessage[] = [];
  for (const item of value.history) {
    if (!isRecord(item) || (item.role !== "user" && item.role !== "assistant"))
      return { ok: false, error: "Invalid history item." };
    const content = cleanText(item.content, item.role === "user" ? 1000 : 5000);
    if (!content) return { ok: false, error: "History entries cannot be empty." };
    history.push({ role: item.role, content });
  }

  return {
    ok: true,
    data: {
      message,
      history,
      locale: value.locale,
      pageContext: sanitizePageContext(value.pageContext)
    }
  };
}

export function validateSessionPayload(
  value: unknown
): { ok: true; turnstileToken: string } | { ok: false; error: string } {
  if (!isRecord(value) || value.ageConfirmed !== true)
    return { ok: false, error: "Age acknowledgement is required." };
  const turnstileToken = cleanText(value.turnstileToken, 4097);
  if (!turnstileToken || turnstileToken.length > 4096)
    return { ok: false, error: "Security check token is invalid." };
  return { ok: true, turnstileToken };
}

export function truncateHistory(history: AssistantMessage[]): AssistantMessage[] {
  return history.slice(-12).map(({ role, content, sources }) => ({
    role,
    content,
    ...(sources ? { sources } : {})
  }));
}

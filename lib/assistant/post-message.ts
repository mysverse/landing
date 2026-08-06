import type { AssistantLocale, AssistantPageContext } from "./types";
import { isAssistantLocale } from "./types";
import { sanitizePageContext } from "./validation";

export const ASSISTANT_FRAME_ORIGINS = new Set([
  "https://mysver.se",
  "https://www.mysver.se",
  "https://mys.wiki",
  "https://www.mys.wiki",
  "http://localhost:4200",
  "http://localhost:5173",
  "http://localhost:4173"
]);

export interface HostContextMessage {
  type: "mysverse:assistant:host-context";
  locale: AssistantLocale;
  theme: "light" | "dark";
  pageContext: AssistantPageContext;
}

export type FrameMessage =
  | { type: "mysverse:assistant:ready" }
  | { type: "mysverse:assistant:close" }
  | { type: "mysverse:assistant:disabled" }
  | { type: "mysverse:assistant:resize"; height: number };

export function isAllowedAssistantOrigin(
  origin: string,
  currentOrigin?: string
): boolean {
  return origin === currentOrigin || ASSISTANT_FRAME_ORIGINS.has(origin);
}

export function parseHostContextMessage(value: unknown): HostContextMessage | null {
  if (!value || typeof value !== "object") return null;
  const message = value as Record<string, unknown>;
  if (
    message.type !== "mysverse:assistant:host-context" ||
    !isAssistantLocale(message.locale) ||
    (message.theme !== "light" && message.theme !== "dark")
  )
    return null;
  return {
    type: "mysverse:assistant:host-context",
    locale: message.locale,
    theme: message.theme,
    pageContext: sanitizePageContext(message.pageContext)
  };
}

export function parseFrameMessage(value: unknown): FrameMessage | null {
  if (!value || typeof value !== "object") return null;
  const message = value as Record<string, unknown>;
  if (
    message.type === "mysverse:assistant:ready" ||
    message.type === "mysverse:assistant:close" ||
    message.type === "mysverse:assistant:disabled"
  )
    return { type: message.type };
  if (
    message.type === "mysverse:assistant:resize" &&
    typeof message.height === "number" &&
    Number.isFinite(message.height)
  )
    return {
      type: message.type,
      height: Math.max(320, Math.min(900, message.height))
    };
  return null;
}

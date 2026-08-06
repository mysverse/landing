export const ASSISTANT_LOCALES = ["en", "ms", "zh", "ta"] as const;

export type AssistantLocale = (typeof ASSISTANT_LOCALES)[number];

export type AssistantRole = "user" | "assistant";

export interface AssistantSource {
  fileId: string;
  title: string;
  url: string;
  locale: AssistantLocale;
}

export interface AssistantMessage {
  role: AssistantRole;
  content: string;
  sources?: AssistantSource[];
}

export interface AssistantPageContext {
  url: string;
  title: string;
  surface: "landing" | "wiki" | "full-page";
}

export interface AssistantChatResponse {
  answerMarkdown: string;
  sources: AssistantSource[];
  remainingQuota: {
    tenMinutes: number;
    day: number;
  };
  requestId: string;
}

export function isAssistantLocale(value: unknown): value is AssistantLocale {
  return (
    typeof value === "string" &&
    (ASSISTANT_LOCALES as readonly string[]).includes(value)
  );
}

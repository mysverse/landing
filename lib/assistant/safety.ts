import type OpenAI from "openai";
import type { AssistantLocale } from "./types";
import { ASSISTANT_COPY } from "./copy";

export type ModerationDecision = "allow" | "block" | "crisis";

export function moderationDecision(
  result: OpenAI.Moderations.Moderation
): ModerationDecision {
  const categories = result.categories;
  if (
    categories["self-harm"] ||
    categories["self-harm/intent"] ||
    categories["self-harm/instructions"]
  )
    return "crisis";
  return result.flagged ? "block" : "allow";
}

export function deterministicSafetyAnswer(
  locale: AssistantLocale,
  decision: Exclude<ModerationDecision, "allow">
): string {
  return decision === "crisis"
    ? ASSISTANT_COPY[locale].crisis
    : ASSISTANT_COPY[locale].blocked;
}

import { randomUUID } from "node:crypto";
import { ASSISTANT_COPY } from "lib/assistant/copy";
import {
  assistantEnabled,
  jsonNoStore,
  readJson
} from "lib/assistant/http";
import {
  generateGroundedAnswer,
  moderateText
} from "lib/assistant/openai";
import { enforceQuota } from "lib/assistant/rate-limit";
import {
  getBearerToken,
  getClientIp,
  privacyHash,
  verifySessionToken
} from "lib/assistant/security";
import {
  deterministicSafetyAnswer,
  moderationDecision
} from "lib/assistant/safety";
import { validateChatPayload } from "lib/assistant/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  if (!assistantEnabled())
    return jsonNoStore(
      { error: { code: "disabled", message: "Assistant is disabled." } },
      { status: 503 }
    );

  const token = getBearerToken(request);
  const claims = token ? verifySessionToken(token) : null;
  if (!claims)
    return jsonNoStore(
      { error: { code: "invalid_session", message: "Session is invalid or expired." } },
      { status: 401 }
    );

  const parsed = validateChatPayload(await readJson(request));
  if (!parsed.ok)
    return jsonNoStore(
      { error: { code: "invalid_request", message: parsed.error } },
      { status: 400 }
    );

  const requestId = randomUUID();
  try {
    const quota = await enforceQuota({
      sessionHash: privacyHash("quota-session", claims.sid),
      ipHash: privacyHash("quota-ip", getClientIp(request))
    });
    if (!quota.allowed) {
      const response = jsonNoStore(
        {
          error: {
            code: "rate_limited",
            message: ASSISTANT_COPY[parsed.data.locale].rateLimited
          },
          remainingQuota: quota.remaining,
          requestId
        },
        { status: 429 }
      );
      response.headers.set("retry-after", String(quota.retryAfter));
      return response;
    }

    const inputModeration = await moderateText(parsed.data.message);
    const inputDecision = moderationDecision(inputModeration);
    if (inputDecision !== "allow")
      return jsonNoStore({
        answerMarkdown: deterministicSafetyAnswer(
          parsed.data.locale,
          inputDecision
        ),
        sources: [],
        remainingQuota: quota.remaining,
        requestId
      });

    const grounded = await generateGroundedAnswer({
      ...parsed.data,
      safetyIdentifier: privacyHash("openai-safety", claims.sid)
    });

    const outputModeration = await moderateText(grounded.answer);
    const outputDecision = moderationDecision(outputModeration);
    const answerMarkdown =
      outputDecision === "allow"
        ? grounded.answer
        : deterministicSafetyAnswer(parsed.data.locale, outputDecision);

    return jsonNoStore({
      answerMarkdown,
      sources: outputDecision === "allow" ? grounded.sources : [],
      remainingQuota: quota.remaining,
      requestId
    });
  } catch {
    return jsonNoStore(
      {
        error: {
          code: "service_unavailable",
          message: ASSISTANT_COPY[parsed.data.locale].unavailable
        },
        requestId
      },
      { status: 503 }
    );
  }
}

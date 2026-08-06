import {
  assistantEnabled,
  jsonNoStore,
  publicStatusHeaders,
  readJson
} from "lib/assistant/http";
import {
  createSessionToken,
  getClientIp
} from "lib/assistant/security";
import { verifyTurnstile } from "lib/assistant/turnstile";
import { validateSessionPayload } from "lib/assistant/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  return publicStatusHeaders(
    request,
    jsonNoStore({ enabled: assistantEnabled() })
  );
}

export async function POST(request: Request) {
  if (!assistantEnabled())
    return jsonNoStore(
      { error: { code: "disabled", message: "Assistant is disabled." } },
      { status: 503 }
    );

  const parsed = validateSessionPayload(await readJson(request));
  if (!parsed.ok)
    return jsonNoStore(
      { error: { code: "invalid_request", message: parsed.error } },
      { status: 400 }
    );

  try {
    const verified = await verifyTurnstile({
      token: parsed.turnstileToken,
      remoteIp: getClientIp(request)
    });
    if (!verified)
      return jsonNoStore(
        { error: { code: "turnstile_failed", message: "Security check failed." } },
        { status: 403 }
      );

    const { token, claims } = createSessionToken();
    return jsonNoStore({
      token,
      expiresAt: new Date(claims.exp * 1000).toISOString()
    });
  } catch {
    return jsonNoStore(
      { error: { code: "service_unavailable", message: "Assistant is unavailable." } },
      { status: 503 }
    );
  }
}

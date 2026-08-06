interface TurnstileResponse {
  success: boolean;
  "error-codes"?: string[];
}

export async function verifyTurnstile({
  token,
  remoteIp,
  fetcher = fetch
}: {
  token: string;
  remoteIp?: string;
  fetcher?: typeof fetch;
}): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) throw new Error("TURNSTILE_SECRET_KEY is not configured.");

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);

  const response = await fetcher(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(8_000)
    }
  );
  if (!response.ok) return false;
  const result = (await response.json()) as TurnstileResponse;
  return result.success === true;
}

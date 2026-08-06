import {
  createHmac,
  randomUUID,
  timingSafeEqual
} from "node:crypto";

interface SessionClaims {
  sid: string;
  iat: number;
  exp: number;
  v: 1;
}

const SESSION_TTL_SECONDS = 24 * 60 * 60;

function secret(): string {
  const value = process.env.ASSISTANT_SESSION_SECRET;
  if (!value || value.length < 32)
    throw new Error("ASSISTANT_SESSION_SECRET must be at least 32 characters.");
  return value;
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

export function createSessionToken(now = Date.now()): {
  token: string;
  claims: SessionClaims;
} {
  const issuedAt = Math.floor(now / 1000);
  const claims: SessionClaims = {
    sid: randomUUID(),
    iat: issuedAt,
    exp: issuedAt + SESSION_TTL_SECONDS,
    v: 1
  };
  const payload = Buffer.from(JSON.stringify(claims)).toString("base64url");
  return { token: `${payload}.${sign(payload)}`, claims };
}

export function verifySessionToken(token: string, now = Date.now()): SessionClaims | null {
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return null;
  const expected = Buffer.from(sign(payload));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received))
    return null;

  try {
    const claims = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as Partial<SessionClaims>;
    const nowSeconds = Math.floor(now / 1000);
    if (
      claims.v !== 1 ||
      typeof claims.sid !== "string" ||
      !/^[0-9a-f-]{36}$/i.test(claims.sid) ||
      typeof claims.iat !== "number" ||
      typeof claims.exp !== "number" ||
      claims.iat > nowSeconds + 60 ||
      claims.exp <= nowSeconds
    )
      return null;
    return claims as SessionClaims;
  } catch {
    return null;
  }
}

export function privacyHash(namespace: string, value: string): string {
  return createHmac("sha256", secret())
    .update(`${namespace}:${value}`)
    .digest("base64url");
}

export function getBearerToken(request: Request): string | null {
  const value = request.headers.get("authorization");
  return value?.startsWith("Bearer ") ? value.slice(7).trim() : null;
}

export function getClientIp(request: Request): string {
  const forwarded =
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown";
  const ip = forwarded.split(",")[0]?.trim() || "unknown";
  return ip.slice(0, 80);
}

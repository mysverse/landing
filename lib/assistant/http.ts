import { NextResponse } from "next/server";

export function assistantEnabled(): boolean {
  return process.env.ASSISTANT_ENABLED?.toLowerCase() === "true";
}

export function jsonNoStore(body: unknown, init: ResponseInit = {}) {
  const response = NextResponse.json(body, init);
  response.headers.set("cache-control", "no-store, max-age=0");
  response.headers.set("pragma", "no-cache");
  response.headers.set("x-content-type-options", "nosniff");
  return response;
}

export async function readJson(request: Request): Promise<unknown | null> {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 40_000) return null;
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export function publicStatusHeaders(request: Request, response: Response) {
  const origin = request.headers.get("origin");
  if (
    origin &&
    [
      "https://mys.wiki",
      "https://www.mys.wiki",
      "http://localhost:5173",
      "http://localhost:4173"
    ].includes(origin)
  ) {
    response.headers.set("access-control-allow-origin", origin);
    response.headers.set("vary", "Origin");
  }
  return response;
}

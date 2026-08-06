import { Redis } from "@upstash/redis";

export interface QuotaResult {
  allowed: boolean;
  retryAfter: number;
  remaining: {
    tenMinutes: number;
    day: number;
  };
}

export interface QuotaCounter {
  eval<T>(script: string, keys: string[], args: string[]): Promise<T>;
}

const LUA_INCREMENT = `
local values = {}
for i, key in ipairs(KEYS) do
  local value = redis.call("INCR", key)
  if value == 1 then
    redis.call("EXPIRE", key, tonumber(ARGV[i]))
  end
  values[i] = value
end
return values
`;

export function malaysiaDay(now: number): { key: string; ttl: number } {
  const malaysiaNow = new Date(now + 8 * 60 * 60 * 1000);
  const key = malaysiaNow.toISOString().slice(0, 10);
  const nextMidnightUtc = Date.UTC(
    malaysiaNow.getUTCFullYear(),
    malaysiaNow.getUTCMonth(),
    malaysiaNow.getUTCDate() + 1
  );
  return {
    key,
    ttl: Math.max(1, Math.ceil((nextMidnightUtc - malaysiaNow.getTime()) / 1000))
  };
}

export function quotaKeys(sessionHash: string, ipHash: string, now: number) {
  const windowNumber = Math.floor(now / 600_000);
  const day = malaysiaDay(now);
  return {
    keys: [
      `ask:session:${sessionHash}:10m:${windowNumber}`,
      `ask:session:${sessionHash}:day:${day.key}`,
      `ask:ip:${ipHash}:10m:${windowNumber}`,
      `ask:ip:${ipHash}:day:${day.key}`
    ],
    ttls: ["660", String(day.ttl), "660", String(day.ttl)],
    retryAfter: Math.max(1, 600 - Math.floor((now / 1000) % 600))
  };
}

export function redisFromEnvironment(): Redis {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Upstash Redis is not configured.");
  return new Redis({ url, token });
}

export async function enforceQuota({
  sessionHash,
  ipHash,
  now = Date.now(),
  counter = redisFromEnvironment()
}: {
  sessionHash: string;
  ipHash: string;
  now?: number;
  counter?: QuotaCounter;
}): Promise<QuotaResult> {
  const { keys, ttls, retryAfter } = quotaKeys(sessionHash, ipHash, now);
  const values = await counter.eval<number[]>(LUA_INCREMENT, keys, ttls);
  if (!Array.isArray(values) || values.length !== 4)
    throw new Error("Invalid quota response.");

  const [sessionWindow, sessionDay, ipWindow, ipDay] = values.map(Number);
  const allowed =
    sessionWindow <= 10 && sessionDay <= 50 && ipWindow <= 30 && ipDay <= 150;

  return {
    allowed,
    retryAfter,
    remaining: {
      tenMinutes: Math.max(0, 10 - sessionWindow),
      day: Math.max(0, 50 - sessionDay)
    }
  };
}

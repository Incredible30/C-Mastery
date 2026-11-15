import "server-only";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

export type RateLimitResult = { allowed: boolean; remaining: number; resetAt: Date };

/** Builds a bounded, delimiter-safe key such as "login:203.0.113.5:a@b.com". */
export function rateLimitKey(...parts: (string | null | undefined)[]): string {
  return parts.map((p) => (p ?? "-").toLowerCase().replace(/[^a-z0-9@._:-]/g, "_").slice(0, 100)).join(":");
}

export async function clientIp(): Promise<string> {
  const h = await headers();
  return (h.get("x-forwarded-for")?.split(",")[0] ?? h.get("x-real-ip") ?? "unknown").trim();
}

/**
 * Fixed-window rate limit stored in Postgres (public.check_rate_limit), so it works across server instances.
 * Fails closed: if the limiter cannot be reached, the request is refused.
 */
export async function rateLimit(key: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {
  const { data, error } = await createAdminClient().rpc("check_rate_limit", {
    p_key: key, p_limit: limit, p_window_seconds: windowSeconds,
  });
  const row = data?.[0];
  if (error || !row) {
    console.error("rate limit check failed", error?.message);
    return { allowed: false, remaining: 0, resetAt: new Date(Date.now() + windowSeconds * 1000) };
  }
  return { allowed: row.allowed, remaining: row.remaining, resetAt: new Date(row.reset_at) };
}

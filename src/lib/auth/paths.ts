/** Routes that require a signed-in user. Checked in middleware and again on each page. */
export const PROTECTED_PREFIXES = ["/dashboard", "/learn", "/practice", "/leaderboard", "/admin", "/account"] as const;

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

/**
 * Returns a same-site path to redirect to after sign-in, or the dashboard.
 * Blocks open redirects such as "//evil.com", "/\\evil.com" and "https://evil.com".
 */
export function safeNextPath(next: string | null | undefined, fallback = "/dashboard"): string {
  if (!next || typeof next !== "string") return fallback;
  let decoded = next;
  try { decoded = decodeURIComponent(next); } catch { return fallback; }
  if (!decoded.startsWith("/") || decoded.startsWith("//") || decoded.startsWith("/\\")) return fallback;
  if (/[\u0000-\u001f]/.test(decoded) || decoded.includes("\\")) return fallback;
  if (decoded.length > 512) return fallback;
  return decoded;
}

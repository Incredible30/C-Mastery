import { describe, expect, it } from "vitest";
import { isProtectedPath, safeNextPath } from "./paths";
import { hasRole, isStaff } from "./roles";

describe("safeNextPath", () => {
  it("keeps same-site paths", () => {
    expect(safeNextPath("/learn/pointers?tab=1")).toBe("/learn/pointers?tab=1");
    expect(safeNextPath("%2Fdashboard")).toBe("/dashboard");
  });

  it.each([
    "//evil.com", "/\\evil.com", "https://evil.com", "javascript:alert(1)", "evil.com",
    "%2F%2Fevil.com", "/%5Cevil.com", "/ok\u0000", "", null, undefined, "%E0%A4%A",
  ])("rejects open redirect %s", (bad) => {
    expect(safeNextPath(bad as string)).toBe("/dashboard");
  });

  it("rejects very long values", () => {
    expect(safeNextPath("/" + "a".repeat(600))).toBe("/dashboard");
  });
});

describe("isProtectedPath", () => {
  it("guards app areas", () => {
    for (const p of ["/dashboard", "/learn", "/learn/pointers/arith", "/practice", "/practice/check-prime", "/leaderboard", "/admin/modules", "/account"]) expect(isProtectedPath(p)).toBe(true);
  });
  it("leaves public pages open", () => {
    for (const p of ["/", "/login", "/signup", "/pricing", "/learner", "/dashboards"]) expect(isProtectedPath(p)).toBe(false);
  });
});

describe("roles", () => {
  it("checks allowed roles", () => {
    expect(hasRole("admin", ["admin"])).toBe(true);
    expect(hasRole("student", ["instructor", "admin"])).toBe(false);
    expect(hasRole(null, ["student"])).toBe(false);
    expect(isStaff("instructor")).toBe(true);
    expect(isStaff("student")).toBe(false);
  });
});

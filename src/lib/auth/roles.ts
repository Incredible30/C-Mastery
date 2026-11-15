import type { AppRole } from "@/lib/database.types";

export const STAFF_ROLES: readonly AppRole[] = ["instructor", "admin"];

export function hasRole(role: AppRole | null | undefined, allowed: readonly AppRole[]): boolean {
  return !!role && allowed.includes(role);
}

export const isStaff = (role: AppRole | null | undefined) => hasRole(role, STAFF_ROLES);

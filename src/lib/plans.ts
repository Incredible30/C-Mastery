import type { PlanTier } from "@/lib/database.types";

/** Mirrors public.plan_rank() and public.ai_daily_limit() in the database. The database is the source of truth. */
export const PLAN_RANK: Record<PlanTier, number> = { free: 0, pro: 1, premium: 2 };
export const AI_DAILY_LIMIT: Record<PlanTier, number> = { free: 10, pro: 200, premium: 500 };

export const PLAN_LABEL: Record<PlanTier, string> = { free: "Free", pro: "Pro", premium: "Premium" };

/** Prices in paise, GST inclusive. Used by checkout in milestone 6; the server recomputes, never trusts the client. */
export const PLAN_PRICE_PAISE: Record<Exclude<PlanTier, "free">, { monthly: number; yearly: number }> = {
  pro: { monthly: 49_900, yearly: 449_900 },
  premium: { monthly: 99_900, yearly: 899_900 },
};

export function canAccessPlan(userPlan: PlanTier, required: PlanTier, isFreePreview = false): boolean {
  return isFreePreview || PLAN_RANK[userPlan] >= PLAN_RANK[required];
}

export function formatInr(paise: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(paise / 100);
}

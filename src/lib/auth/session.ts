import "server-only";
import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { AppRole, PlanTier, Profile } from "@/lib/database.types";
import { hasRole } from "./roles";

export type Viewer = { id: string; email: string; profile: Profile; plan: PlanTier };

/** The signed-in user with profile and effective plan, or null. Cached per request. */
export const getViewer = cache(async (): Promise<Viewer | null> => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const [{ data: profile }, { data: plan }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.rpc("current_plan"),
  ]);
  if (!profile) return null;
  return { id: user.id, email: user.email ?? "", profile, plan: plan ?? "free" };
});

export async function requireViewer(nextPath = "/dashboard"): Promise<Viewer> {
  const viewer = await getViewer();
  if (!viewer) redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  return viewer;
}

/** For staff areas: non-staff get a 404 so the area's existence is not revealed. RLS enforces the same rule on data. */
export async function requireRole(allowed: readonly AppRole[]): Promise<Viewer> {
  const viewer = await requireViewer("/admin");
  if (!hasRole(viewer.profile.role, allowed)) notFound();
  return viewer;
}

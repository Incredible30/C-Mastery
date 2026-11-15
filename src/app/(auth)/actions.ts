"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { publicEnv } from "@/lib/env";
import { safeNextPath } from "@/lib/auth/paths";
import { clientIp, rateLimit, rateLimitKey } from "@/lib/rate-limit";
import { parseForm, signInSchema, signUpSchema, type ActionResult } from "@/lib/validation";

const TOO_MANY: ActionResult = { ok: false, error: "Too many attempts. Wait a few minutes and try again." };

export async function signIn(_prev: ActionResult | null, form: FormData): Promise<ActionResult> {
  const parsed = parseForm(signInSchema, form);
  if (!parsed.ok) return parsed;
  const { email, password, next } = parsed.data;

  const ip = await clientIp();
  const [byIp, byEmail] = await Promise.all([
    rateLimit(rateLimitKey("login-ip", ip), 30, 600),
    rateLimit(rateLimitKey("login-email", email), 8, 600),
  ]);
  if (!byIp.allowed || !byEmail.allowed) return TOO_MANY;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    if (error.code === "email_not_confirmed") return { ok: false, error: "Confirm your email first. Check your inbox for the link." };
    // Same message for unknown email and wrong password, so accounts cannot be enumerated.
    return { ok: false, error: "Email or password is incorrect." };
  }
  redirect(safeNextPath(next));
}

export async function signUp(_prev: ActionResult | null, form: FormData): Promise<ActionResult> {
  const parsed = parseForm(signUpSchema, form);
  if (!parsed.ok) return parsed;
  const { fullName, email, password } = parsed.data;

  const limit = await rateLimit(rateLimitKey("signup-ip", await clientIp()), 5, 3600);
  if (!limit.allowed) return TOO_MANY;

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${publicEnv().NEXT_PUBLIC_SITE_URL}/auth/callback?next=/dashboard`,
    },
  });
  if (error) {
    if (error.code === "weak_password") return { ok: false, error: "Choose a stronger password.", fieldErrors: { password: error.message } };
    console.error("signup failed", error.code, error.message);
    return { ok: false, error: "We couldn't create your account right now. Try again in a minute." };
  }
  // Supabase returns success for existing emails too (no enumeration); the email explains what to do.
  return { ok: true, message: `Check ${email} for a confirmation link to finish creating your account.` };
}

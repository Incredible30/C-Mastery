"use client";

import { useActionState } from "react";
import { signIn } from "../actions";
import { Field, FormMessage, SubmitButton } from "@/components/forms";

export function LoginForm({ next }: { next?: string }) {
  const [state, action] = useActionState(signIn, null);
  const errors = state && !state.ok ? state.fieldErrors : undefined;
  return (
    <form action={action} className="grid gap-4" noValidate>
      <input type="hidden" name="next" value={next ?? ""} />
      <Field label="Email" name="email" type="email" autoComplete="email" required error={errors?.email} />
      <Field label="Password" name="password" type="password" autoComplete="current-password" required error={errors?.password} />
      <FormMessage state={state} />
      <SubmitButton pendingText="Signing in…">Sign in</SubmitButton>
    </form>
  );
}

"use client";

import { useActionState } from "react";
import { signUp } from "../actions";
import { Field, FormMessage, SubmitButton } from "@/components/forms";

export function SignupForm() {
  const [state, action] = useActionState(signUp, null);
  const errors = state && !state.ok ? state.fieldErrors : undefined;
  if (state?.ok) return <FormMessage state={state} />;
  return (
    <form action={action} className="grid gap-4" noValidate>
      <Field label="Full name" name="fullName" autoComplete="name" required error={errors?.fullName} />
      <Field label="Email" name="email" type="email" autoComplete="email" required error={errors?.email} />
      <Field label="Password" name="password" type="password" autoComplete="new-password" required error={errors?.password}
        hint="At least 10 characters, with a letter and a number." />
      <FormMessage state={state} />
      <SubmitButton pendingText="Creating account…">Create account</SubmitButton>
    </form>
  );
}

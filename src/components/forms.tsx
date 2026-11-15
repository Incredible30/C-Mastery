"use client";

import { useFormStatus } from "react-dom";
import type { ComponentProps, ReactNode } from "react";
import { Button, cn } from "./ui";
import type { ActionResult } from "@/lib/validation";

export function SubmitButton({ children, pendingText = "Saving…", ...props }: ComponentProps<typeof Button> & { pendingText?: string }) {
  const { pending } = useFormStatus();
  return <Button type="submit" variant="primary" disabled={pending} aria-busy={pending} {...props}>{pending ? pendingText : children}</Button>;
}

const control = "w-full rounded-lg border border-border bg-surface px-3 py-2 outline-none focus:border-accent focus:ring-3 focus:ring-accent-soft aria-[invalid=true]:border-bad";

type FieldProps = { label: string; name: string; error?: string; hint?: ReactNode };

export function Field({ label, name, error, hint, className, ...props }: FieldProps & ComponentProps<"input">) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      <label htmlFor={name} className="text-[13px] font-semibold">{label}</label>
      <input id={name} name={name} aria-invalid={!!error} aria-describedby={error ? `${name}-error` : undefined} className={control} {...props} />
      {hint && !error && <span className="text-xs text-faint">{hint}</span>}
      {error && <span id={`${name}-error`} className="text-xs font-medium text-bad">{error}</span>}
    </div>
  );
}

export function TextArea({ label, name, error, hint, className, ...props }: FieldProps & ComponentProps<"textarea">) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      <label htmlFor={name} className="text-[13px] font-semibold">{label}</label>
      <textarea id={name} name={name} aria-invalid={!!error} className={cn(control, "min-h-24 leading-relaxed")} {...props} />
      {hint && !error && <span className="text-xs text-faint">{hint}</span>}
      {error && <span className="text-xs font-medium text-bad">{error}</span>}
    </div>
  );
}

export function Select({ label, name, error, options, className, ...props }: FieldProps & ComponentProps<"select"> & { options: { value: string; label: string }[] }) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      <label htmlFor={name} className="text-[13px] font-semibold">{label}</label>
      <select id={name} name={name} aria-invalid={!!error} className={control} {...props}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <span className="text-xs font-medium text-bad">{error}</span>}
    </div>
  );
}

export function FormMessage({ state }: { state: ActionResult<unknown> | null }) {
  if (!state) return null;
  const text = state.ok ? state.message : state.error;
  if (!text) return null;
  return (
    <p role={state.ok ? "status" : "alert"} className={cn("rounded-lg px-3 py-2 text-[13.5px]", state.ok ? "bg-good-soft text-good" : "bg-bad-soft text-bad")}>
      {text}
    </p>
  );
}

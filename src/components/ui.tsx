import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** Small presentational building blocks shared across pages. Server-safe (no hooks). */

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

type Variant = "primary" | "secondary" | "ghost" | "danger";
const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-fg border-accent hover:bg-accent-strong hover:border-accent-strong",
  secondary: "bg-surface text-fg border-border hover:bg-surface-2",
  ghost: "bg-transparent text-fg border-transparent hover:bg-surface-2",
  danger: "bg-surface text-bad border-border hover:bg-bad-soft",
};
export const buttonClass = (variant: Variant = "secondary", size: "sm" | "md" = "md") =>
  cn("inline-flex items-center justify-center gap-2 rounded-lg border font-medium whitespace-nowrap transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
    size === "sm" ? "px-2.5 py-1 text-[13px]" : "px-3.5 py-2", variants[variant]);

export function Button({ variant, size, className, ...props }: ComponentProps<"button"> & { variant?: Variant; size?: "sm" | "md" }) {
  return <button className={cn(buttonClass(variant, size), className)} {...props} />;
}

export function ButtonLink({ variant, size, className, ...props }: ComponentProps<typeof Link> & { variant?: Variant; size?: "sm" | "md" }) {
  return <Link className={cn(buttonClass(variant, size), className)} {...props} />;
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("rounded-xl border border-border bg-surface p-5 min-w-0", className)} {...props} />;
}

type Tone = "neutral" | "accent" | "good" | "warn" | "bad" | "amber";
const tones: Record<Tone, string> = {
  neutral: "bg-surface-2 text-muted", accent: "bg-accent-soft text-accent-strong", good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn", bad: "bg-bad-soft text-bad", amber: "bg-amber-soft text-amber",
};
export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap", tones[tone])}>{children}</span>;
}

export function Progress({ value, tone = "accent", label }: { value: number; tone?: "accent" | "good" | "amber"; label?: string }) {
  const pct = Math.max(0, Math.min(100, value));
  const bar = { accent: "bg-accent", good: "bg-good", amber: "bg-amber" }[tone];
  return (
    <div className="h-2 overflow-hidden rounded-full bg-surface-3" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className={cn("h-full rounded-full transition-[width] duration-500", bar)} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">{children}</span>;
}

export function PageHeader({ title, description, actions, crumbs }: { title: ReactNode; description?: ReactNode; actions?: ReactNode; crumbs?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {crumbs && <div className="mb-1.5 text-[13px] text-muted">{crumbs}</div>}
        <h1 className="text-[1.7rem] font-bold leading-tight">{title}</h1>
        {description && <p className="mt-1 max-w-[64ch] text-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Callout({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return <div className={cn("rounded-lg px-4 py-3 text-[14px]", tones[tone])}>{children}</div>;
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="grid justify-items-center gap-2 px-4 py-8 text-center">
      <h3 className="font-semibold">{title}</h3>
      {children && <div className="max-w-[48ch] text-muted">{children}</div>}
    </div>
  );
}

/** Circular progress ring, drawn with SVG. */
export function Ring({ value, size = 96, label, sub }: { value: number; size?: number; label: string; sub?: string }) {
  const r = size / 2 - 8, c = 2 * Math.PI * r, pct = Math.max(0, Math.min(100, value));
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${label}${sub ? " " + sub : ""}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-3)" strokeWidth={8} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--accent)" strokeWidth={8} strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x="50%" y={sub ? "47%" : "53%"} textAnchor="middle" dominantBaseline="middle" fill="var(--fg)" fontSize={size / 5} fontWeight={700} fontFamily="var(--font-display)">{label}</text>
      {sub && <text x="50%" y="67%" textAnchor="middle" fill="var(--muted)" fontSize={11}>{sub}</text>}
    </svg>
  );
}

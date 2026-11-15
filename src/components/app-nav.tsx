"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "./ui";

export type NavItem = { href: string; label: string; icon: keyof typeof ICONS };

const ICONS = {
  home: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></>,
  map: <><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" /><path d="M9 4v14M15 6v14" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" /></>,
};

/** Sidebar navigation. On narrow screens it collapses behind a menu button. */
export function AppNav({ items, footer }: { items: NavItem[]; footer: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label="Open navigation"
        className="fixed left-[max(12px,env(safe-area-inset-left))] top-3 z-30 grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface md:hidden">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      {open && <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setOpen(false)} />}
      <aside className={cn("fixed inset-y-0 left-0 z-40 flex w-64 flex-col gap-1 border-r border-border bg-surface px-3 py-5 transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full")}>
        <Link href="/dashboard" className="mb-4 flex items-center gap-2.5 px-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent font-mono font-bold text-accent-fg">C</span>
          <span><b className="block font-display leading-tight">C MASTERY</b><small className="text-xs text-muted">Systems programming, done right</small></span>
        </Link>
        <nav className="grid gap-0.5" aria-label="Main">
          {items.map((i) => (
            <Link key={i.href} href={i.href} onClick={() => setOpen(false)} aria-current={isActive(i.href) ? "page" : undefined}
              className={cn("flex items-center gap-3 rounded-lg px-2.5 py-2 font-medium",
                isActive(i.href) ? "bg-accent-soft text-accent-strong" : "text-muted hover:bg-surface-2 hover:text-fg")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[i.icon]}</svg>
              {i.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">{footer}</div>
      </aside>
    </>
  );
}

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-full grid-rows-[auto_1fr] px-[max(16px,env(safe-area-inset-left))]">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-mono text-sm text-accent-fg">C</span>C MASTERY
        </Link>
        <ThemeToggle />
      </header>
      <main className="grid place-items-center py-10">{children}</main>
    </div>
  );
}

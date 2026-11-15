import Link from "next/link";
import { ButtonLink } from "@/components/ui";
import { ThemeToggle } from "@/components/theme-toggle";
import { getViewer } from "@/lib/auth/session";

export default async function Home() {
  const viewer = await getViewer().catch(() => null);
  return (
    <div className="mx-auto grid min-h-full max-w-5xl grid-rows-[auto_1fr_auto] px-[max(16px,env(safe-area-inset-left))]">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-mono text-sm text-accent-fg">C</span>C MASTERY
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {viewer ? <ButtonLink href="/dashboard" variant="primary">Go to dashboard</ButtonLink>
            : <><ButtonLink href="/login" variant="ghost">Sign in</ButtonLink><ButtonLink href="/signup" variant="primary">Start free</ButtonLink></>}
        </div>
      </header>
      <main className="grid content-center gap-6 py-16">
        <p className="font-mono text-sm text-accent">printf(&quot;Hello, systems programming\n&quot;);</p>
        <h1 className="max-w-[18ch] text-4xl font-bold leading-[1.1] sm:text-5xl">Learn C the way engineers actually use it.</h1>
        <p className="max-w-[58ch] text-lg text-muted">Eight modules from your first program to pointers, dynamic memory and file I/O. Practise on real problems, run code in a sandbox and get help from an AI tutor that teaches instead of handing out answers.</p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/signup" variant="primary">Create a free account</ButtonLink>
          <ButtonLink href="/login">I already have an account</ButtonLink>
        </div>
      </main>
      <footer className="py-6 text-[13px] text-faint">© 2026 C Mastery · Prices in INR, inclusive of GST</footer>
    </div>
  );
}

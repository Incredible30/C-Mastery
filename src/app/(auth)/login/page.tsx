import type { Metadata } from "next";
import Link from "next/link";
import { Card, Callout } from "@/components/ui";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign in" };

const MESSAGES: Record<string, string> = {
  confirmed: "Email confirmed. Sign in to start learning.",
  "link-expired": "That link has expired or was already used. Sign in, or sign up again to get a new link.",
  "signed-out": "You have been signed out.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; message?: string }> }) {
  const { next, message } = await searchParams;
  return (
    <Card className="w-full max-w-sm p-7">
      <h1 className="text-2xl font-bold">Welcome back</h1>
      <p className="mb-5 mt-1 text-muted">Sign in to continue your C journey.</p>
      {message && MESSAGES[message] && <div className="mb-4"><Callout tone="accent">{MESSAGES[message]}</Callout></div>}
      <LoginForm next={next} />
      <p className="mt-5 text-center text-[13.5px] text-muted">New here? <Link href="/signup" className="font-medium text-accent">Create a free account</Link></p>
    </Card>
  );
}

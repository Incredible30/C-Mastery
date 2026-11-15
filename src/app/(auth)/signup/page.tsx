import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = { title: "Create account" };

export default function SignupPage() {
  return (
    <Card className="w-full max-w-sm p-7">
      <h1 className="text-2xl font-bold">Start learning C</h1>
      <p className="mb-5 mt-1 text-muted">Free forever for Modules 1–3. No card needed.</p>
      <SignupForm />
      <p className="mt-5 text-center text-[13.5px] text-muted">Already have an account? <Link href="/login" className="font-medium text-accent">Sign in</Link></p>
    </Card>
  );
}

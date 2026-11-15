import { z } from "zod";

/**
 * Public values are safe in the browser (Supabase anon key is protected by RLS).
 * Never add a secret here: anything read through `publicEnv` can ship to the client.
 */
const publicSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
});

export type PublicEnv = z.infer<typeof publicSchema>;

let cached: PublicEnv | null = null;

export function publicEnv(): PublicEnv {
  if (cached) return cached;
  // Next.js inlines NEXT_PUBLIC_* only when referenced literally.
  const parsed = publicSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  });
  if (!parsed.success) {
    throw new Error(`Invalid public environment: ${formatIssues(parsed.error)}. Copy .env.example to .env.local and fill it in.`);
  }
  cached = parsed.data;
  return cached;
}

export function formatIssues(error: z.ZodError): string {
  return error.issues.map((i) => `${i.path.join(".") || "value"} ${i.message.toLowerCase()}`).join("; ");
}

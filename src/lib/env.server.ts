import "server-only";
import { z } from "zod";
import { formatIssues } from "./env";

/**
 * Secrets. The `server-only` import makes the build fail if a client component imports this file.
 * Integration keys are optional until the milestone that uses them; code that needs one calls `requireSecret`.
 */
const serverSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
  ANTHROPIC_API_KEY: z.string().min(10).optional(),
  ANTHROPIC_MODEL: z.string().default("claude-sonnet-5-5"),
  JUDGE0_URL: z.string().url().optional(),
  JUDGE0_API_KEY: z.string().optional(),
  JUDGE0_LANGUAGE_ID: z.coerce.number().int().positive().default(50), // 50 = C (GCC) on Judge0 CE
  JUDGE_MODE: z.enum(["judge0", "local-dev"]).optional(),
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional(),
});

export type ServerEnv = z.infer<typeof serverSchema>;

let cached: ServerEnv | null = null;

export function serverEnv(): ServerEnv {
  if (cached) return cached;
  const parsed = serverSchema.safeParse(
    Object.fromEntries(Object.keys(serverSchema.shape).map((k) => [k, process.env[k] || undefined])),
  );
  if (!parsed.success) throw new Error(`Invalid server environment: ${formatIssues(parsed.error)}`);
  cached = parsed.data;
  return cached;
}

export function requireSecret<K extends keyof ServerEnv>(key: K): NonNullable<ServerEnv[K]> {
  const value = serverEnv()[key];
  if (value === undefined || value === "") throw new Error(`${String(key)} is not configured`);
  return value as NonNullable<ServerEnv[K]>;
}

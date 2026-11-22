import { NextResponse, type NextRequest } from "next/server";
import { judgeErrorResponse, runCode } from "@/lib/judge/service";
import { judgeRequestSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const maxDuration = 60;

/** Runs code against the sample tests, or against custom input when `stdin` is given. Nothing is saved. */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = judgeRequestSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
  try {
    return NextResponse.json(await runCode(parsed.data.slug, parsed.data.source, parsed.data.stdin));
  } catch (e) {
    const { status, body: err } = judgeErrorResponse(e);
    return NextResponse.json(err, { status });
  }
}

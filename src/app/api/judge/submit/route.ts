import { NextResponse, type NextRequest } from "next/server";
import { judgeErrorResponse, submitCode } from "@/lib/judge/service";
import { judgeRequestSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const maxDuration = 60;

/** Judges code against every test, including hidden ones, and records the submission. */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = judgeRequestSchema.omit({ stdin: true }).safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
  try {
    return NextResponse.json(await submitCode(parsed.data.slug, parsed.data.source));
  } catch (e) {
    const { status, body: err } = judgeErrorResponse(e);
    return NextResponse.json(err, { status });
  }
}

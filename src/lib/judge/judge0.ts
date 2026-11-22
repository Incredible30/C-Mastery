import type { CodeRunner, RunLimits, RunResult } from "./types";
import { JudgeUnavailableError } from "./types";

/**
 * Judge0 (https://judge0.com) runs each program in an isolated sandbox with CPU, memory and time limits.
 * Works with a self-hosted Judge0 (X-Auth-Token) or the hosted RapidAPI edition (X-RapidAPI-Key).
 * Expected outputs are never sent: comparison happens on our server, so hidden answers stay private.
 */

type Judge0Response = {
  stdout?: string | null; stderr?: string | null; compile_output?: string | null; message?: string | null;
  status?: { id: number; description?: string }; time?: string | null; memory?: number | null;
};

const b64 = (s: string) => Buffer.from(s, "utf8").toString("base64");
const unb64 = (s: string | null | undefined) => (s ? Buffer.from(s, "base64").toString("utf8") : "");

/** Maps Judge0 status ids (https://ce.judge0.com/statuses) to our run statuses. */
export function mapJudge0Response(r: Judge0Response): RunResult {
  const id = r.status?.id ?? 13;
  const status: RunResult["status"] =
    id === 3 || id === 4 ? "ok"
      : id === 5 ? "time_limit"
        : id === 6 ? "compile_error"
          : id >= 7 && id <= 12 ? "runtime_error"
            : "internal_error";
  return {
    status,
    stdout: unb64(r.stdout),
    stderr: unb64(r.stderr),
    compileOutput: unb64(r.compile_output),
    timeMs: r.time ? Math.round(parseFloat(r.time) * 1000) : null,
    memoryKb: r.memory ?? null,
    message: [r.status?.description, unb64(r.message)].filter(Boolean).join(": ") || undefined,
  };
}

export function judge0Headers(baseUrl: string, apiKey?: string): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const host = new URL(baseUrl).host;
  if (host.endsWith("rapidapi.com")) {
    if (apiKey) headers["X-RapidAPI-Key"] = apiKey;
    headers["X-RapidAPI-Host"] = host;
  } else if (apiKey) {
    headers["X-Auth-Token"] = apiKey;
  }
  return headers;
}

export function createJudge0Runner(opts: { url: string; apiKey?: string; languageId: number; concurrency?: number }): CodeRunner {
  const base = opts.url.replace(/\/+$/, "");
  const headers = judge0Headers(base, opts.apiKey);

  async function runOne(source: string, stdin: string, limits: RunLimits): Promise<RunResult> {
    const cpu = limits.timeLimitMs / 1000;
    let res: Response;
    try {
      res = await fetch(`${base}/submissions?base64_encoded=true&wait=true&fields=stdout,stderr,compile_output,message,status,time,memory`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          source_code: b64(source), language_id: opts.languageId, stdin: b64(stdin),
          cpu_time_limit: cpu, wall_time_limit: Math.max(cpu * 3, 3), memory_limit: limits.memoryKb,
        }),
        signal: AbortSignal.timeout(30_000),
      });
    } catch (e) {
      throw new JudgeUnavailableError(`Code runner unreachable: ${(e as Error).message}`);
    }
    if (res.status === 429) throw new JudgeUnavailableError("Code runner is busy (rate limited). Try again shortly.");
    if (!res.ok) throw new JudgeUnavailableError(`Code runner error ${res.status}: ${(await res.text()).slice(0, 200)}`);
    return mapJudge0Response((await res.json()) as Judge0Response);
  }

  return {
    name: "judge0",
    async runBatch(source, stdins, limits) {
      if (stdins.length === 0) return [];
      // Run the first test alone: if it fails to compile, skip the rest.
      const first = await runOne(source, stdins[0], limits);
      if (first.status === "compile_error") return stdins.map(() => first);
      const results: RunResult[] = [first];
      const queue = stdins.slice(1).map((s, i) => ({ s, i: i + 1 }));
      const workers = Array.from({ length: Math.min(opts.concurrency ?? 3, queue.length) }, async () => {
        for (let job = queue.shift(); job; job = queue.shift()) results[job.i] = await runOne(source, job.s, limits);
      });
      await Promise.all(workers);
      return results;
    },
  };
}

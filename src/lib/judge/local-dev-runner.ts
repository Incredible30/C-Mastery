import { execFile, spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { CodeRunner, RunLimits, RunResult } from "./types";

/**
 * DEVELOPMENT ONLY. Compiles and runs code with the gcc on this machine, with a time limit but NO sandbox:
 * the program can read and write your files. It refuses to start when NODE_ENV is "production".
 * Use Judge0 for anything other than testing your own code locally.
 */
export function createLocalDevRunner(gcc = "gcc"): CodeRunner {
  if (process.env.NODE_ENV === "production") {
    throw new Error("The local development runner is not sandboxed and cannot be used in production. Configure Judge0.");
  }

  function compile(src: string, exe: string): Promise<string | null> {
    return new Promise((resolve) => {
      execFile(gcc, ["-std=c11", "-O2", "-D__USE_MINGW_ANSI_STDIO=1", src, "-o", exe, "-lm"], { timeout: 20_000 },
        (err, _stdout, stderr) => resolve(err ? (stderr || err.message) : null));
    });
  }

  function execute(exe: string, stdin: string, limits: RunLimits): Promise<RunResult> {
    return new Promise((resolve) => {
      const started = Date.now();
      const child = spawn(exe, [], { stdio: ["pipe", "pipe", "pipe"] });
      let stdout = "", stderr = "", killed = false;
      const cap = 1_000_000;
      child.stdout.on("data", (d) => { if (stdout.length < cap) stdout += d; });
      child.stderr.on("data", (d) => { if (stderr.length < cap) stderr += d; });
      const timer = setTimeout(() => { killed = true; child.kill("SIGKILL"); }, limits.timeLimitMs * 2);
      child.on("error", (e) => {
        clearTimeout(timer);
        resolve({ status: "internal_error", stdout, stderr, compileOutput: "", timeMs: null, memoryKb: null, message: e.message });
      });
      child.on("close", (code) => {
        clearTimeout(timer);
        const timeMs = Date.now() - started;
        const status: RunResult["status"] = killed || timeMs > limits.timeLimitMs ? "time_limit" : code === 0 ? "ok" : "runtime_error";
        resolve({ status, stdout, stderr, compileOutput: "", timeMs, memoryKb: null, message: code && code !== 0 ? `exit code ${code}` : undefined });
      });
      child.stdin.on("error", () => { /* program exited before reading all input */ });
      child.stdin.end(stdin);
    });
  }

  return {
    name: "local-dev (not sandboxed)",
    async runBatch(source, stdins, limits) {
      const dir = await mkdtemp(join(tmpdir(), "cm-run-"));
      try {
        const src = join(dir, "main.c"), exe = join(dir, process.platform === "win32" ? "main.exe" : "main");
        await writeFile(src, source);
        const compileError = await compile(src, exe);
        if (compileError !== null) {
          const failed: RunResult = { status: "compile_error", stdout: "", stderr: "", compileOutput: compileError.replaceAll(dir, ""), timeMs: null, memoryKb: null };
          return stdins.map(() => failed);
        }
        const results: RunResult[] = [];
        for (const stdin of stdins) results.push(await execute(exe, stdin, limits));
        return results;
      } finally {
        await rm(dir, { recursive: true, force: true }).catch(() => {});
      }
    },
  };
}

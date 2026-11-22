export type RunLimits = { timeLimitMs: number; memoryKb: number };

/** Outcome of running a program once. "ok" means it ran and exited normally; output is checked separately. */
export type RunStatus = "ok" | "compile_error" | "runtime_error" | "time_limit" | "internal_error";

export type RunResult = {
  status: RunStatus;
  stdout: string;
  stderr: string;
  compileOutput: string;
  timeMs: number | null;
  memoryKb: number | null;
  message?: string;
};

/** Runs untrusted C code. Implementations must isolate it from the app server. */
export interface CodeRunner {
  readonly name: string;
  /** Runs the same source once per stdin. If compilation fails, every result is the compile error. */
  runBatch(source: string, stdins: string[], limits: RunLimits): Promise<RunResult[]>;
}

export class JudgeUnavailableError extends Error {}

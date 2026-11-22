import "server-only";
import { serverEnv } from "@/lib/env.server";
import { createJudge0Runner } from "./judge0";
import { createLocalDevRunner } from "./local-dev-runner";
import { JudgeUnavailableError, type CodeRunner } from "./types";

let cached: CodeRunner | null = null;

/**
 * Picks the code runner from the environment:
 *  - JUDGE0_URL set (and JUDGE_MODE unset or "judge0"): the sandboxed Judge0 runner
 *  - JUDGE_MODE=local-dev: gcc on this machine, development only, not sandboxed
 */
export function getRunner(): CodeRunner {
  if (cached) return cached;
  const env = serverEnv();
  if (env.JUDGE_MODE === "local-dev") {
    cached = createLocalDevRunner();
  } else if (env.JUDGE0_URL) {
    cached = createJudge0Runner({ url: env.JUDGE0_URL, apiKey: env.JUDGE0_API_KEY, languageId: env.JUDGE0_LANGUAGE_ID });
  } else {
    throw new JudgeUnavailableError("The code runner isn't set up yet. Add JUDGE0_URL to the environment (see the instruction book).");
  }
  return cached;
}

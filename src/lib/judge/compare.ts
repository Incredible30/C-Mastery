/**
 * Output comparison used by the judge and by `npm run problems:check`.
 * Forgiving about whitespace that learners can't see (Windows line endings, trailing spaces,
 * trailing blank lines) but strict about everything else. No imports, so scripts can run it.
 */
export function normalizeOutput(s: string): string {
  return s
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/, ""))
    .join("\n")
    .replace(/\n+$/, "");
}

export function outputsMatch(actual: string, expected: string): boolean {
  return normalizeOutput(actual) === normalizeOutput(expected);
}

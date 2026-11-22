import type { ProblemLevel } from "@/lib/database.types";

/** One order everywhere: by module position, then easy → medium → hard, then title. */
const LEVEL_RANK: Record<ProblemLevel, number> = { easy: 0, medium: 1, hard: 2 };

export function sortProblems<T extends { module_id: string | null; difficulty: ProblemLevel; title: string }>(
  problems: T[], modulePosition: Map<string, number>,
): T[] {
  const pos = (id: string | null) => (id && modulePosition.has(id) ? modulePosition.get(id)! : 1_000);
  return [...problems].sort((a, b) =>
    pos(a.module_id) - pos(b.module_id) || LEVEL_RANK[a.difficulty] - LEVEL_RANK[b.difficulty] || a.title.localeCompare(b.title));
}

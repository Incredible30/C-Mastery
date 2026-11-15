/**
 * Lesson content lives in supabase/content/NN-<module-slug>.md, one file per module.
 * Each lesson starts with a marker line: <!-- lesson: <lesson-slug> -->
 * Pure functions with no imports, so `scripts/sync-content.ts` can run them directly in Node.
 */

export type ParsedLesson = { moduleSlug: string; lessonSlug: string; body: string };

const MARKER = /^<!--\s*lesson:\s*([a-z0-9-]{2,80})\s*-->\s*$/gm;

/** "03-functions.md" → "functions". Returns null for files that don't follow the naming rule. */
export function moduleSlugFromFile(fileName: string): string | null {
  const m = /^\d{2}-([a-z0-9-]{2,60})\.md$/.exec(fileName);
  return m ? m[1] : null;
}

export function parseModuleFile(moduleSlug: string, text: string): ParsedLesson[] {
  const normalised = text.replace(/\r\n/g, "\n");
  const markers = [...normalised.matchAll(MARKER)];
  if (markers.length === 0) throw new Error(`${moduleSlug}: no "<!-- lesson: slug -->" markers found`);
  if (normalised.slice(0, markers[0].index).trim()) {
    throw new Error(`${moduleSlug}: text before the first lesson marker`);
  }

  const seen = new Set<string>();
  return markers.map((m, i) => {
    const lessonSlug = m[1];
    if (seen.has(lessonSlug)) throw new Error(`${moduleSlug}: lesson "${lessonSlug}" appears twice`);
    seen.add(lessonSlug);
    const start = m.index! + m[0].length;
    const end = i + 1 < markers.length ? markers[i + 1].index! : normalised.length;
    const body = normalised.slice(start, end).trim();
    if (!body) throw new Error(`${moduleSlug}: lesson "${lessonSlug}" is empty`);
    if (body.length > 100_000) throw new Error(`${moduleSlug}: lesson "${lessonSlug}" is over 100,000 characters`);
    return { moduleSlug, lessonSlug, body: body + "\n" };
  });
}

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { moduleSlugFromFile, parseModuleFile } from "./content-parser";

describe("moduleSlugFromFile", () => {
  it("reads the module slug from the file name", () => {
    expect(moduleSlugFromFile("01-foundations.md")).toBe("foundations");
    expect(moduleSlugFromFile("08-files-preprocessor.md")).toBe("files-preprocessor");
  });
  it.each(["foundations.md", "1-foundations.md", "01-Foundations.md", "01-foundations.txt"])("ignores %s", (f) => {
    expect(moduleSlugFromFile(f)).toBeNull();
  });
});

describe("parseModuleFile", () => {
  it("splits lessons on markers and handles Windows line endings", () => {
    const text = "<!-- lesson: first -->\r\nHello\r\n\r\n<!-- lesson: second -->\r\n## Part\r\nWorld\r\n";
    expect(parseModuleFile("m", text)).toEqual([
      { moduleSlug: "m", lessonSlug: "first", body: "Hello\n" },
      { moduleSlug: "m", lessonSlug: "second", body: "## Part\nWorld\n" },
    ]);
  });
  it("rejects duplicates, empty lessons, stray text and missing markers", () => {
    expect(() => parseModuleFile("m", "<!-- lesson: aa -->\nx\n<!-- lesson: aa -->\ny")).toThrow(/twice/);
    expect(() => parseModuleFile("m", "<!-- lesson: aa -->\n\n<!-- lesson: bb -->\ny")).toThrow(/empty/);
    expect(() => parseModuleFile("m", "intro\n<!-- lesson: aa -->\nx")).toThrow(/before the first/);
    expect(() => parseModuleFile("m", "no markers")).toThrow(/no "/);
  });
});

describe("course content files", () => {
  const dir = join(process.cwd(), "supabase", "content");
  const files = readdirSync(dir).filter((f) => f.endsWith(".md"));
  const lessons = files.flatMap((f) => parseModuleFile(moduleSlugFromFile(f)!, readFileSync(join(dir, f), "utf8")));
  const seed = readFileSync(join(process.cwd(), "supabase", "seed.sql"), "utf8");

  it("has a lesson body for every lesson in the seed", () => {
    const seeded = [...seed.matchAll(/\('([a-z-]+)', '([a-z0-9-]+)', '[^']+', '(?:lesson|quiz|project)'/g)].map((m) => `${m[1]}/${m[2]}`);
    expect(seeded.length).toBe(42);
    const written = new Set(lessons.map((l) => `${l.moduleSlug}/${l.lessonSlug}`));
    expect(seeded.filter((s) => !written.has(s))).toEqual([]);
    expect(lessons.length).toBe(seeded.length);
  });

  it("closes every code fence", () => {
    for (const l of lessons) expect((l.body.match(/^```/gm) ?? []).length % 2, `${l.moduleSlug}/${l.lessonSlug}`).toBe(0);
  });
});

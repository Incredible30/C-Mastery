import type { ContentStatus } from "@/lib/database.types";

export const statusTone = (s: ContentStatus) => (s === "published" ? "good" : s === "draft" ? "warn" : "neutral") as "good" | "warn" | "neutral";

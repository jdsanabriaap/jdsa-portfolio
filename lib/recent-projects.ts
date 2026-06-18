import { readPersistedJSON, writePersistedJSON } from "@/lib/local-persist";
import { storageKeys } from "@/lib/storage-keys";

const MAX_RECENT = 5;

export function isRecentProjectSlugs(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.length <= MAX_RECENT &&
    value.every((slug) => typeof slug === "string" && slug.length > 0)
  );
}

export function getRecentProjectSlugs(): string[] {
  return readPersistedJSON(storageKeys.recentProjects, isRecentProjectSlugs) ?? [];
}

/** Prepends a slug and keeps the five most recent unique views. */
export function recordProjectView(slug: string): void {
  const current = getRecentProjectSlugs();
  const next = [slug, ...current.filter((item) => item !== slug)].slice(
    0,
    MAX_RECENT,
  );
  writePersistedJSON(storageKeys.recentProjects, next);
}

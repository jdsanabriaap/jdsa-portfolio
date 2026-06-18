/** Safe localStorage read/write helpers (browser only). */
export function readPersistedJSON<T>(
  key: string,
  isValid: (value: unknown) => value is T,
): T | undefined {
  if (typeof window === "undefined") return undefined;

  try {
    const raw = localStorage.getItem(key);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as unknown;
    return isValid(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

export function writePersistedJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota exceeded or private mode — ignore.
  }
}

export function removePersisted(key: string): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

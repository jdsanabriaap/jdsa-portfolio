"use client";

import { readPersistedJSON, writePersistedJSON } from "@/lib/local-persist";
import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

/** State synced to localStorage after hydration. */
export function usePersistedState<T>(
  key: string,
  initialValue: T,
  isValid: (value: unknown) => value is T,
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [state, setState] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readPersistedJSON(key, isValid);
    if (stored !== undefined) {
      setState(stored);
    }
    setHydrated(true);
  }, [key, isValid]);

  useEffect(() => {
    if (!hydrated) return;
    writePersistedJSON(key, state);
  }, [key, state, hydrated]);

  return [state, setState, hydrated];
}

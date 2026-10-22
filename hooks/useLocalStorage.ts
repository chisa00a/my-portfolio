'use client';

import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

/**
 * State synced to localStorage. Renders with `initialValue` first (SSR-safe,
 * no hydration mismatch) then rehydrates in an effect after mount.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  const load = useCallback(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return initialValue;
      return JSON.parse(raw) as T;
    } catch {
      return initialValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    setValue(load());
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const set: Dispatch<SetStateAction<T>> = useCallback(
    (action) => {
      setValue((prev) => {
        const next = typeof action === 'function' ? (action as (p: T) => T)(prev) : action;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          /* storage unavailable (private mode etc.) — keep in-memory value */
        }
        return next;
      });
    },
    [key]
  );

  return [value, set, hydrated];
}

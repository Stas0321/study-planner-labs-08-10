import { useEffect, useState } from "react";
export function readStored<T>(
  key: string,
  fallback: T,
  valid: (value: unknown) => value is T,
): T {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) ?? "null");
    return valid(value) ? value : fallback;
  } catch {
    return fallback;
  }
}
export function useLocalStorage<T>(
  key: string,
  fallback: T,
  valid: (value: unknown) => value is T,
) {
  const [value, setValue] = useState<T>(() => readStored(key, fallback, valid));
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* UI preferences remain usable in memory. */
    }
  }, [key, value]);
  return [value, setValue] as const;
}

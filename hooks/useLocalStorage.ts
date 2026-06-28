import { useState, useEffect } from 'react';

/**
 * useLocalStorage — React state hook backed by localStorage.
 *
 * Initializes state from localStorage on mount (returns `initialValue`
 * if the key is absent or parsing fails). Persists every state change
 * to localStorage via an effect.
 *
 * @typeParam T — The type of the stored value.
 * @param key — localStorage key to read/write.
 * @param initialValue — Fallback value used when localStorage is empty or SSR.
 * @returns A tuple of [value, setValue] matching the useState API.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Return initial value during SSR when window is not available
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

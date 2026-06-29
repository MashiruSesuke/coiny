'use client';

import { useLocalStorage } from './useLocalStorage';

import { Currency, Theme } from '@/types';

export function useUserPreferences() {
  const [name, setName] = useLocalStorage('userName', '');
  const [email, setEmail] = useLocalStorage('userEmail', '');
  const [currency, setCurrency] = useLocalStorage<Currency>('userCurrency', 'RUB');
  const [theme, setTheme] = useLocalStorage<Theme>('userTheme', 'system');

  return {
    name,
    setName,
    email,
    setEmail,
    currency,
    setCurrency,
    theme,
    setTheme,
  };
}

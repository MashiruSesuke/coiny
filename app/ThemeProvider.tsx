'use client';

import { useEffect } from 'react';

import { useUserPreferences } from '@/hooks/useUserPreferences';

export default function ThemeProvider() {
  const { theme } = useUserPreferences();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  return null;
}

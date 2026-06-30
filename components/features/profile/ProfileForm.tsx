'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import { useUserPreferences } from '@/hooks/useUserPreferences';

import { Currency, Theme } from '@/types';

export default function ProfileForm() {
  const { name, setName, email, setEmail, currency, setCurrency } = useUserPreferences();

  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  // While component isn't mounted on client, render loading
  if (!isMounted) {
    return <div className="space-y-4">Loading profile...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Currency</label>
        <div className="flex gap-2">
          {(['USD', 'EUR', 'RUB'] as Currency[]).map((curr) => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`px-4 py-2 rounded border ${
                currency === curr ? 'bg-primary text-white' : 'bg-gray-100'
              }`}
            >
              {curr}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Theme</label>
        <div className="flex gap-2">
          {(['light', 'dark', 'system'] as Theme[]).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-4 py-2 rounded border ${
                theme === t ? 'bg-primary text-white' : 'bg-gray-100'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

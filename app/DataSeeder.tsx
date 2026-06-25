'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { EXPENSES_QUERY_KEY } from '@/hooks/useExpenses';

import db from '@/lib/database/client';
import { seedExpenses } from '@/lib/database/expenses';

export default function DataSeeder() {
  const queryClient = useQueryClient();

  useEffect(() => {
    async function seed() {
      const count = await db.expenses.count();
      if (count === 0) {
        try {
          const res = await fetch('/api/expenses');
          const initialData = await res.json();
          await seedExpenses(initialData);
          queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
        } catch (error) {
          console.error('Failed to seed data:', error);
        }
      }
    }
    seed();
  }, [queryClient]);

  return null;
}

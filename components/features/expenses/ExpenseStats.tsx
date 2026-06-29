'use client';

import { useExpenses } from '@/hooks/useExpenses';
import { useUserPreferences } from '@/hooks/useUserPreferences';

/**
 * ExpenseStats — displays summary statistics for the expenses list.
 *
 * Shows total, average, max, and min amounts, plus a breakdown
 * of spending by category.
 */
export default function ExpenseStats() {
  const { data: expenses } = useExpenses();

  const { currency } = useUserPreferences();

  if (!expenses || expenses.length === 0) {
    return <p className="text-gray-500">No expenses yet</p>;
  }

  // Calculate basic aggregate statistics
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const average = total / expenses.length;
  const max = Math.max(...expenses.map((e) => e.amount));
  const min = Math.min(...expenses.map((e) => e.amount));

  // Group expenses by category and sum amounts per category
  const byCategory = expenses.reduce(
    (acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="bg-gray-50 p-4 rounded border mb-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
        <div className="grid">
          <span className="text-gray-600">Total:</span> {total} {currency}
        </div>
        <div className="grid">
          <span className="text-gray-600">Average:</span> {average.toFixed(2)} {currency}
        </div>
        <div className="grid">
          <span className="text-gray-600">Max:</span> {max} {currency}
        </div>
        <div className="grid">
          <span className="text-gray-600">Min:</span> {min} {currency}
        </div>
      </div>
      <div className="mt-2">
        <span className="text-gray-600">By category:</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {Object.entries(byCategory).map(([cat, sum]) => (
            <span key={cat} className="bg-primary/20 px-2 py-1 rounded text-sm">
              {cat}: {sum as number} {currency}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

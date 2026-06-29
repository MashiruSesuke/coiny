'use client';

import { useExpenses } from '@/hooks/useExpenses';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { convertToCurrency, formatCurrency } from '@/lib/utils/currency';

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
  const totalRUB = expenses.reduce((sum, e) => sum + e.amount, 0);
  const averageRUB = totalRUB / expenses.length;
  const maxRUB = Math.max(...expenses.map((e) => e.amount));
  const minRUB = Math.min(...expenses.map((e) => e.amount));

  // convert into user currency
  const total = convertToCurrency(totalRUB, currency);
  const average = convertToCurrency(averageRUB, currency);
  const max = convertToCurrency(maxRUB, currency);
  const min = convertToCurrency(minRUB, currency);

  // Group expenses by category and sum amounts per category
  const byCategoryRUB = expenses.reduce(
    (acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  const byCategory = Object.entries(byCategoryRUB).reduce(
    (acc, [cat, sum]) => {
      acc[cat] = convertToCurrency(sum, currency);
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="bg-gray-50 p-4 rounded border mb-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
        <div className="grid">
          <span className="text-gray-600">Total:</span> {formatCurrency(total, currency)}
        </div>
        <div className="grid">
          <span className="text-gray-600">Average:</span> {formatCurrency(average, currency)}
        </div>
        <div className="grid">
          <span className="text-gray-600">Max:</span> {formatCurrency(max, currency)}
        </div>
        <div className="grid">
          <span className="text-gray-600">Min:</span> {formatCurrency(min, currency)}
        </div>
      </div>
      <div className="mt-2">
        <span className="text-gray-600">By category:</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {Object.entries(byCategory).map(([cat, sum]) => (
            <span key={cat} className="bg-primary/20 px-2 py-1 rounded text-sm">
              {cat}: {formatCurrency(sum, currency)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

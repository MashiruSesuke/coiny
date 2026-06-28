'use client';

import { useExpenses } from '@/hooks/useExpenses';

export default function ExpenseStats() {
  const { data: expenses } = useExpenses();

  if (!expenses || expenses.length === 0) {
    return <p className="text-gray-500">No expenses yet</p>;
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const average = total / expenses.length;
  const max = Math.max(...expenses.map((e) => e.amount));
  const min = Math.min(...expenses.map((e) => e.amount));

  // Stats by category
  const byCategory = expenses.reduce(
    (acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="bg-gray-50 p-4 rounded border mb-4">
      <h3 className="font-semibold text-lg">Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
        <div className="grid">
          <span className="text-gray-600">Total:</span> {total} $
        </div>
        <div className="grid">
          <span className="text-gray-600">Average:</span> {average.toFixed(2)} $
        </div>
        <div className="grid">
          <span className="text-gray-600">Max:</span> {max} $
        </div>
        <div className="grid">
          <span className="text-gray-600">Min:</span> {min} $
        </div>
      </div>
      <div className="mt-2">
        <span className="text-gray-600">By category:</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {Object.entries(byCategory).map(([cat, sum]) => (
            <span key={cat} className="bg-primary/20 px-2 py-1 rounded text-sm">
              {cat}: {sum as number} $
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

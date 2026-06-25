'use client';

import { useExpenses, useDeleteExpense } from '@/hooks/useExpenses';

export default function ExpenseList() {
  const { data: expenses, isLoading, isError, error } = useExpenses();
  const deleteMutation = useDeleteExpense();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Error: {error?.message}</p>;

  return (
    <ul className="space-y-2">
      {expenses?.map((exp) => (
        <li key={exp.id} className="border p-3 rounded shadow-sm flex justify-between items-center">
          <div>
            <div className="font-medium">{exp.title}</div>
            <div className="text-sm text-gray-500">
              {exp.category} — {exp.date}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span>{exp.amount} $</span>
            <button
              onClick={() => deleteMutation.mutate(exp.id!)}
              className="text-red-500 hover:text-red-700"
              disabled={deleteMutation.isPending}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

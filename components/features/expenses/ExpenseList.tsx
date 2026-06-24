'use client';

import { useEffect, useState } from 'react';

import { Expense } from '@/types/expense';

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/expenses')
      .then((res) => {
        if (!res.ok) throw new Error('Loading error');
        return res.json();
      })
      .then((data) => {
        setExpenses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <ul className="space-y-2">
      {expenses.map((exp) => (
        <li key={exp.id} className="border p-3 rounded shadow-sm">
          <div className="flex justify-between">
            <span className="font-medium">{exp.title}</span>
            <span>{exp.amount} $</span>
          </div>
          <div className="text-sm text-gray-500">
            {exp.category} — {exp.date}
          </div>
        </li>
      ))}
    </ul>
  );
}

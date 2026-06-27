'use client';

import { useState } from 'react';

interface ExpenseFiltersProps {
  categories: string[];
  onFilterChange: (category: string) => void;
}

export default function ExpenseFilters({ categories, onFilterChange }: ExpenseFiltersProps) {
  const [selected, setSelected] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    onFilterChange(value);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">Filter by category</label>
      <select value={selected} onChange={handleChange} className="border p-2 rounded w-full">
        <option value="">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

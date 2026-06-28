'use client';

import { useState } from 'react';

/**
 * Props for the ExpenseFilters component.
 */
interface ExpenseFiltersProps {
  /** List of unique categories to populate the dropdown. */
  categories: string[];
  /** Callback invoked when the selected category changes. */
  onFilterChange: (category: string) => void;
}

/**
 * ExpenseFilters — renders a dropdown to filter expenses by category.
 *
 * Displays an "All" option followed by all available categories.
 * Syncs the internal state with the parent via onFilterChange.
 */
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

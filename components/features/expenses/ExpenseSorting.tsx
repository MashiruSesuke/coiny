import { sortOrder as sortOrderType } from '@/types';
import { expenseSortField } from '@/types/expenses';

/**
 * Props for the ExpenseSorting component.
 */
interface ExpenseSortingProps {
  /** Currently active sort field. */
  sortField: expenseSortField;
  /** Current sort order: 'asc' or 'desc'. */
  sortOrder: sortOrderType;
  /** Callback invoked when the sort field changes. */
  onSortFieldChange: (sortField: expenseSortField) => void;
  /** Callback invoked when the sort order changes. */
  onSortOrderChange: (sortOrder: sortOrderType) => void;
}

/**
 * ExpenseSorting — renders buttons for sorting expenses by field and order.
 *
 * Provides three sort field options (date, amount, title) with visual
 * indicators for the active field. The last button toggles ascending/descending
 * order.
 */
export default function ExpenseSorting({
  sortField = 'date',
  sortOrder = 'desc',
  onSortFieldChange = () => null,
  onSortOrderChange = () => null,
}: ExpenseSortingProps) {
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      <button
        onClick={() => onSortFieldChange('date')}
        className={`px-3 py-1 rounded ${sortField === 'date' ? 'bg-primary text-white' : 'bg-gray-200'}`}
      >
        Date {sortField === 'date' && (sortOrder === 'desc' ? '↓' : '↑')}
      </button>
      <button
        onClick={() => onSortFieldChange('amount')}
        className={`px-3 py-1 rounded ${sortField === 'amount' ? 'bg-primary text-white' : 'bg-gray-200'}`}
      >
        Amount {sortField === 'amount' && (sortOrder === 'desc' ? '↓' : '↑')}
      </button>
      <button
        onClick={() => onSortFieldChange('title')}
        className={`px-3 py-1 rounded ${sortField === 'title' ? 'bg-primary text-white' : 'bg-gray-200'}`}
      >
        Title {sortField === 'title' && (sortOrder === 'desc' ? '↓' : '↑')}
      </button>
      <button
        onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
        className="px-3 py-1 rounded bg-gray-200"
      >
        {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
      </button>
    </div>
  );
}

import { sortOrder as sortOrderType } from '@/types';
import { expenseSortField } from '@/types/expenses';

interface ExpenseSortingProps {
  sortField: expenseSortField;
  sortOrder: sortOrderType;
  onSortFieldChange: (sortField: expenseSortField) => void;
  onSortOrderChange: (sortOrder: sortOrderType) => void;
}

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

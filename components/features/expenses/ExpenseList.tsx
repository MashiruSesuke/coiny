'use client';

import { useMemo, useState } from 'react';

import ExpenseForm from './ExpenseForm';
import ExpenseFilters from './ExpenseFilters';
import ExpenseSorting from './ExpenseSorting';
import ExpenseExportToCSV from './ExpenseExportToCSV';
import Modal from '@/components/ui/Modal';

import { useExpenses, useDeleteExpense, useUpdateExpense } from '@/hooks/useExpenses';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useUserPreferences } from '@/hooks/useUserPreferences';

import { ExpenseFormData } from '@/lib/validation/expenseSchema';

import { Expense, expenseSortField } from '@/types/expenses';
import { sortOrder as sortOrderType } from '@/types';

/**
 * ExpenseList — main page component for managing expenses.
 *
 * Provides CRUD operations (create via AddExpenseForm, read via useExpenses,
 * update and delete via mutations), filtering by category, sorting by field/order,
 * and CSV export for both filtered and full lists.
 */
export default function ExpenseList() {
  const { data: expenses, isLoading, isError, error } = useExpenses();
  const deleteMutation = useDeleteExpense();
  const updateMutation = useUpdateExpense();

  // Persist filter and sort preferences in localStorage
  const [filterCategory, setFilterCategory] = useLocalStorage<string>('expenseFilterCategory', '');
  const [sortField, setSortField] = useLocalStorage<expenseSortField>('expenseSortField', 'date');
  const [sortOrder, setSortOrder] = useLocalStorage<sortOrderType>('expenseSortOrder', 'desc');

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { currency } = useUserPreferences();

  // Extract unique categories from expenses for the filter dropdown
  const categories = [...new Set(expenses?.map((e) => e.category) || [])];
  const filteredExpenses = filterCategory
    ? expenses?.filter((e) => e.category === filterCategory)
    : expenses;

  // Sort filtered expenses by the selected field and order
  const sortedExpenses = useMemo(() => {
    if (!filteredExpenses) return [];
    return [...filteredExpenses].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'date') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }
      if (typeof aVal === 'string') {
        return sortOrder === 'asc'
          ? aVal.localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal as string);
      }
      return sortOrder === 'asc'
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
  }, [filteredExpenses, sortField, sortOrder]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Error: {error?.message}</p>;

  // Update an existing expense via mutation
  const handleUpdate = async (data: ExpenseFormData) => {
    if (!editingExpense) return;
    await updateMutation.mutateAsync({ ...editingExpense, ...data });
    setEditingExpense(null);
  };

  // Delete an expense via mutation
  const handleDelete = async () => {
    if (deletingId === null) return;
    await deleteMutation.mutateAsync(deletingId);
    setDeletingId(null);
  };

  // Calculate total of filtered expenses (not sorted, since sort doesn't change the set)
  const total = filteredExpenses?.reduce((sum, e) => sum + e.amount, 0) || 0;

  return (
    <div className="grid gap-4">
      <ExpenseFilters categories={categories} onFilterChange={setFilterCategory} />

      <ExpenseSorting
        sortField={sortField}
        sortOrder={sortOrder}
        onSortFieldChange={setSortField}
        onSortOrderChange={setSortOrder}
      />

      <ul className="space-y-2">
        {sortedExpenses?.map((exp) => (
          <li
            key={exp.id}
            className="border p-3 rounded shadow-sm flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{exp.title}</div>
              <div className="text-sm text-gray-500">
                {exp.category} — {exp.date}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span>
                {exp.amount} {currency}
              </span>
              <button
                onClick={() => setEditingExpense(exp)}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => setDeletingId(exp.id!)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <p className="text-xl font-bold">
        Total: {total} {currency}
      </p>

      <div className="grid gap-2">
        <p>Export to CSV:</p>

        {filterCategory !== '' && (
          <ExpenseExportToCSV expenses={sortedExpenses as Expense[]} label={'Filtered list'} />
        )}

        <ExpenseExportToCSV expenses={expenses as Expense[]} label={'Full list'} />
      </div>

      {/* Modal for editing */}
      <Modal isOpen={!!editingExpense} onClose={() => setEditingExpense(null)}>
        <h3 className="text-lg font-semibold mb-4">Edit expense</h3>
        {editingExpense && (
          <ExpenseForm
            defaultValues={editingExpense}
            onSubmit={handleUpdate}
            submitLabel="Update"
          />
        )}
      </Modal>

      {/* Modal for delete confirmation */}
      <Modal isOpen={deletingId !== null} onClose={() => setDeletingId(null)}>
        <h3 className="text-lg font-semibold mb-4">Confirm delete</h3>
        <p>Are you sure you want to delete this expense?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={() => setDeletingId(null)} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

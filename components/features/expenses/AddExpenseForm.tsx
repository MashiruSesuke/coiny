'use client';

import ExpenseForm from './ExpenseForm';

import { useAddExpense } from '@/hooks/useExpenses';

import { ExpenseFormData } from '@/lib/validation/expenseSchema';

/**
 * Props for the AddExpenseForm component.
 */

/**
 * AddExpenseForm — a thin wrapper around ExpenseForm for creating new expenses.
 *
 * Uses the useAddExpense mutation hook to submit new expense data.
 * Renders the shared ExpenseForm with a custom submit label.
 */
export default function AddExpenseForm() {
  const addMutation = useAddExpense();

  /**
   * Submit handler that triggers the add expense mutation.
   */
  const onSubmit = async (data: ExpenseFormData) => {
    await addMutation.mutateAsync(data);
  };

  return <ExpenseForm onSubmit={onSubmit} submitLabel="Add Expense" />;
}

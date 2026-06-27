'use client';

import ExpenseForm from './ExpenseForm';

import { useAddExpense } from '@/hooks/useExpenses';

import { ExpenseFormData } from '@/lib/validation/expenseSchema';

export default function AddExpenseForm() {
  const addMutation = useAddExpense();

  const onSubmit = async (data: ExpenseFormData) => {
    await addMutation.mutateAsync(data);
  };

  return <ExpenseForm onSubmit={onSubmit} submitLabel="Add Expense" />;
}

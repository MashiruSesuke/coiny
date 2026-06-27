'use client';

import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ExpenseFormData, expenseSchema } from '@/lib/validation/expenseSchema';

import { Expense } from '@/types/expenses';

interface ExpenseFormProps {
  defaultValues?: Expense;
  onSubmit: (data: ExpenseFormData) => Promise<void>;
  submitLabel?: string;
}

/**
 * ExpenseForm component renders a form for adding new expenses.
 * It uses react-hook-form with zod validation and a custom mutation hook for data submission.
 */
export default function ExpenseForm({
  defaultValues,
  onSubmit,
  submitLabel = 'Save',
}: ExpenseFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema) as Resolver<ExpenseFormData>,
    defaultValues: defaultValues || {
      title: '',
      amount: 0,
      category: '',
      date: new Date().toISOString().split('T')[0],
    },
  });

  const handleFormSubmit: SubmitHandler<ExpenseFormData> = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 border p-4 rounded">
      <h3 className="text-lg font-semibold">Add expense</h3>

      <div>
        <label className="block text-sm font-medium">Title</label>
        <input {...register('title')} className="border p-2 w-full rounded" />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Amount</label>
        <input type="number" {...register('amount')} className="border p-2 w-full rounded" />
        {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Category</label>
        <input {...register('category')} className="border p-2 w-full rounded" />
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Date</label>
        <input type="date" {...register('date')} className="border p-2 w-full rounded" />
        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}

import db from './client';

import { Expense } from '@/types/expenses';

export async function getExpenses(): Promise<Expense[]> {
  return db.expenses.toArray();
}

export async function addExpense(expense: Omit<Expense, 'id'>): Promise<Expense> {
  const id = await db.expenses.add(expense as Expense);
  return { ...expense, id };
}

export async function updateExpense(expense: Expense): Promise<Expense> {
  await db.expenses.update(expense.id!, expense);
  return expense;
}

export async function deleteExpense(id: number): Promise<void> {
  await db.expenses.delete(id);
}

export async function seedExpenses(initialData: Expense[]): Promise<void> {
  const count = await db.expenses.count();
  if (count === 0) {
    await db.expenses.bulkAdd(initialData);
  }
}

import { Metadata } from 'next';

import ExpenseList from '@/components/features/expenses/ExpenseList';

export const metadata: Metadata = {
  title: 'Your expenses',
};

export default function HomePage() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">My Expenses</h2>
      <ExpenseList />
    </>
  );
}

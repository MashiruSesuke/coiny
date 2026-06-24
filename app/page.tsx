import ExpenseList from '@/components/features/expenses/ExpenseList';

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h2 className="text-2xl font-semibold mb-4">My expenses</h2>
      <ExpenseList />
    </main>
  );
}

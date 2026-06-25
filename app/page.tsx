import ExpenseList from '@/components/features/expenses/ExpenseList';
import DataSeeder from './DataSeeder';

export default function HomePage() {
  return (
    <>
      <DataSeeder />
      <h2 className="text-2xl font-semibold mb-4">My expenses</h2>
      <ExpenseList />
    </>
  );
}

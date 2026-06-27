import DataSeeder from './DataSeeder';
import ExpenseList from '@/components/features/expenses/ExpenseList';
import ExpenseForm from '@/components/features/expenses/ExpenseForm';

export default function HomePage() {
  return (
    <>
      <DataSeeder />
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">My Expenses</h2>
          <ExpenseList />
        </div>
        <div>
          <ExpenseForm />
        </div>
      </div>
    </>
  );
}

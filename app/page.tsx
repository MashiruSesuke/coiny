import DataSeeder from './DataSeeder';
import ExpenseList from '@/components/features/expenses/ExpenseList';
import AddExpenseForm from '@/components/features/expenses/AddExpenseForm';

export default function HomePage() {
  return (
    <>
      <DataSeeder />
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">My expense</h2>
          <AddExpenseForm />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Expenses list</h2>
          <ExpenseList />
        </div>
      </div>
    </>
  );
}

import { downloadCSV, generateCSV } from '@/lib/utils/csv';
import { Expense } from '@/types/expenses';

interface ExpenseExportToCSVProps {
  expenses: Expense[];
  label?: string;
}

export default function ExpenseExportToCSV({
  expenses = [],
  label = 'Export CSV',
}: ExpenseExportToCSVProps) {
  const exportToCSV = () => {
    const csvData = expenses.map(({ title, amount, category, date }) => ({
      Title: title,
      Amount: amount,
      Category: category,
      Date: date,
    }));

    const csvContent = generateCSV(csvData);
    downloadCSV(csvContent, `coiny-expenses-${new Date().toISOString().split('T')[0]}`);
  };

  return (
    <button
      onClick={exportToCSV}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      {label}
    </button>
  );
}

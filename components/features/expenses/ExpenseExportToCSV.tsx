import { downloadCSV, generateCSV } from '@/lib/utils/csv';

import { Expense } from '@/types/expenses';

/**
 * Props for the ExpenseExportToCSV component.
 */
interface ExpenseExportToCSVProps {
  /** Array of expenses to export. */
  expenses: Expense[];
  /** Optional label for the export button. Defaults to 'Export CSV'. */
  label?: string;
}

/**
 * ExpenseExportToCSV — renders a button that exports a list of expenses to a CSV file.
 *
 * Uses `generateCSV` to build the CSV content and `downloadCSV` to trigger
 * the browser download with a timestamped filename.
 */
export default function ExpenseExportToCSV({
  expenses = [],
  label = 'Export CSV',
}: ExpenseExportToCSVProps) {
  /**
   * Exports the expenses array to a CSV file and triggers a download.
   *
   * 1. Maps each expense to an object with readable column keys.
   * 2. Generates CSV content via `generateCSV`.
   * 3. Triggers the download via `downloadCSV` with a date-stamped filename.
   */
  const exportToCSV = () => {
    // Transform expenses into an array of objects with explicit column keys
    const csvData = expenses.map(({ title, amount, category, date }) => ({
      Title: title,
      Amount: amount,
      Category: category,
      Date: date,
    }));

    // Generate CSV string from the structured data
    const csvContent = generateCSV(csvData);

    // Trigger file download with a date-stamped filename
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

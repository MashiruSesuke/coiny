/**
 * CSV utility functions.
 *
 * Provides helpers to generate a CSV string from an array of objects
 * and trigger a browser file download.
 */

/**
 * Generates a CSV string from an array of objects.
 * @param data - Array of objects to convert to CSV
 * @param headers - Optional custom headers (keys to include). Default: all keys from first object.
 * @param separator - Column separator, default is comma.
 * @returns CSV string with header row and data rows.
 */
export function generateCSV<T extends Record<string, unknown>>(
  data: T[],
  headers?: (keyof T)[],
  separator: string = ','
): string {
  if (!data || data.length === 0) {
    return '';
  }

  // Determine column keys — use provided headers or infer from the first object
  const keys = headers || (Object.keys(data[0]) as (keyof T)[]);
  const headerRow = keys.join(separator);

  // Map each object to a CSV row, quoting values that contain the separator or quotes
  const rows = data.map((item) =>
    keys
      .map((key) => {
        const value = item[key];
        // Wrap in quotes if value contains the separator character or double quotes;
        // escape internal quotes by doubling them per CSV convention
        if (typeof value === 'string' && (value.includes(separator) || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      })
      .join(separator)
  );

  return [headerRow, ...rows].join('\n');
}

/**
 * Downloads a CSV file from a string.
 * @param csvContent - CSV string content
 * @param filename - Desired filename (without extension)
 */
export function downloadCSV(csvContent: string, filename: string): void {
  if (!csvContent) return;

  // Create a blob and a temporary download link to trigger the browser download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

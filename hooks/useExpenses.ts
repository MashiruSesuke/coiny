import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getExpenses, addExpense, updateExpense, deleteExpense } from '@/lib/database/expenses';

/** Key used for all expenses-related React Query caches. */
export const EXPENSES_QUERY_KEY = ['expenses'];

/**
 * useExpenses — fetches the list of expenses.
 *
 * Uses a basic query with no custom options; the result includes
 * data, isLoading, isError, error, etc. from React Query.
 */
export function useExpenses() {
  return useQuery({
    queryKey: EXPENSES_QUERY_KEY,
    queryFn: getExpenses,
  });
}

/**
 * useAddExpense — mutation hook for creating a new expense.
 *
 * Automatically invalidates the expenses query cache on success,
 * triggering a refetch of the updated list.
 */
export function useAddExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
    },
  });
}

/**
 * useUpdateExpense — mutation hook for updating an existing expense.
 *
 * Automatically invalidates the expenses query cache on success,
 * triggering a refetch of the updated list.
 */
export function useUpdateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
    },
  });
}

/**
 * useDeleteExpense — mutation hook for deleting an expense.
 *
 * Automatically invalidates the expenses query cache on success,
 * triggering a refetch of the updated list.
 */
export function useDeleteExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
    },
  });
}

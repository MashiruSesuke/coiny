import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '@/lib/database/expenses';

export const EXPENSES_QUERY_KEY = ['expenses'];

export function useExpenses() {
  return useQuery({
    queryKey: EXPENSES_QUERY_KEY,
    queryFn: getExpenses,
  });
}

export function useAddExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
    },
  });
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
    },
  });
}

import { Currency } from '@/types';

export const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 75,
  EUR: 90,
  RUB: 1,
};

/**
 * Converts amount from RUB to target currency.
 */
export function convertToCurrency(amountInRUB: number, targetCurrency: Currency): number {
  const rate = EXCHANGE_RATES[targetCurrency];
  return amountInRUB / rate;
}

/**
 * Formats amount with currency symbol.
 */
export function formatCurrency(amount: number, currency: Currency): string {
  const symbols: Record<Currency, string> = {
    USD: '$',
    EUR: '€',
    RUB: '₽',
  };
  return `${symbols[currency]}${amount.toFixed(2)}`;
}

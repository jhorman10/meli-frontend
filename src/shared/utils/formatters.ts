import { DEFAULT_LOCALE } from '../constants/currency';

/**
 * Format a price with the specified currency
 * @param price - The price to format
 * @param currency - The currency code (e.g., 'ARS', 'USD')
 * @param locale - Optional locale (defaults to DEFAULT_LOCALE)
 * @returns Formatted price string
 */
export const formatPrice = (
  price: number,
  currency: string,
  locale: string = DEFAULT_LOCALE
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price);
};

/**
 * Format a rating to one decimal place
 * @param rating - The rating number to format
 * @returns Formatted rating string
 */
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

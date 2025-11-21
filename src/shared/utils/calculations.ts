import { DEFAULT_TAX_RATE } from '../constants/currency';

/**
 * Calculate the discount percentage between original and current price
 * @param originalPrice - The original price before discount
 * @param currentPrice - The current discounted price
 * @returns Discount percentage as an integer (0-100)
 */
export const calculateDiscount = (
  originalPrice: number,
  currentPrice: number
): number => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

/**
 * Calculate price without tax
 * @param price - The price including tax
 * @param taxRate - Optional tax rate (defaults to DEFAULT_TAX_RATE)
 * @returns Price without tax
 */
export const calculatePriceWithoutTax = (
  price: number,
  taxRate: number = DEFAULT_TAX_RATE
): number => {
  return Math.round(price / (1 + taxRate));
};

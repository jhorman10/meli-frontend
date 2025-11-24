import { DEFAULT_TAX_RATE } from '../constants/currency';

/**
 * Calcula el porcentaje de descuento entre el precio original y el actual
 * @param originalPrice - El precio original antes del descuento
 * @param currentPrice - El precio actual con descuento
 * @returns Porcentaje de descuento como un entero (0-100)
 */
export const calculateDiscount = (
  originalPrice: number,
  currentPrice: number
): number => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

/**
 * Calcula el precio sin impuestos
 * @param price - El precio incluyendo impuestos
 * @param taxRate - Tasa de impuestos opcional (por defecto DEFAULT_TAX_RATE)
 * @returns Precio sin impuestos
 */
export const calculatePriceWithoutTax = (
  price: number,
  taxRate: number = DEFAULT_TAX_RATE
): number => {
  return Math.round(price / (1 + taxRate));
};

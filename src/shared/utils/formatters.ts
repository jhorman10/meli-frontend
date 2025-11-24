import { DEFAULT_LOCALE } from '../constants/currency';

/**
 * Formatea un precio con la moneda especificada
 * @param price - El precio a formatear
 * @param currency - El código de moneda (ej: 'ARS', 'USD')
 * @param locale - Localización opcional (por defecto DEFAULT_LOCALE)
 * @returns Cadena de precio formateada
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
 * Formatea una calificación a un decimal
 * @param rating - El número de calificación a formatear
 * @returns Cadena de calificación formateada
 */
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

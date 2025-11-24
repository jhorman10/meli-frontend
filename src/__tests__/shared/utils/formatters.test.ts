import { formatPrice, formatRating } from '@/shared/utils/formatters';

describe('formatters', () => {
  describe('formatPrice', () => {
    it('should format price with default locale (es-AR)', () => {
      const result = formatPrice(1000, 'ARS');
      // es-AR uses . for thousands and , for decimals
      expect(result).toContain('1');
      expect(result).toContain('000');
    });

    it('should format price with USD currency', () => {
      const result = formatPrice(1500.99, 'USD');
      // Should contain the price amount
      expect(result).toContain('1');
      expect(result).toContain('500');
    });

    it('should format price with custom locale', () => {
      const result = formatPrice(1000, 'USD', 'en-US');
      expect(result).toBe('$1,000');
    });

    it('should format price with minimumFractionDigits 0', () => {
      const result = formatPrice(999.99, 'ARS');
      // Format with 0 decimal digits, but note that it rounds the input
      expect(result).toContain('999');
    });

    it('should format zero price', () => {
      const result = formatPrice(0, 'ARS');
      expect(result).toContain('0');
    });

    it('should format large prices correctly', () => {
      const result = formatPrice(1234567, 'ARS');
      expect(result).toContain('1');
      expect(result).toContain('234');
      expect(result).toContain('567');
    });
  });

  describe('formatRating', () => {
    it('should format rating to one decimal place', () => {
      const result = formatRating(4.5);
      expect(result).toBe('4.5');
    });

    it('should format rating with multiple decimals to one', () => {
      const result = formatRating(4.567);
      expect(result).toBe('4.6');
    });

    it('should format whole number rating', () => {
      const result = formatRating(5);
      expect(result).toBe('5.0');
    });

    it('should format zero rating', () => {
      const result = formatRating(0);
      expect(result).toBe('0.0');
    });

    it('should round up correctly', () => {
      const result = formatRating(4.95);
      expect(result).toBe('5.0');
    });

    it('should round down correctly', () => {
      const result = formatRating(4.94);
      expect(result).toBe('4.9');
    });
  });
});

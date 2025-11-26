import { formatPrice, formatRating } from '@/shared/utils/formatters';

describe('Formatters', () => {
  describe('formatPrice', () => {
    it('formats ARS currency correctly', () => {
      expect(formatPrice(1000, 'ARS')).toMatch(/\$\s?1\.000/);
    });

    it('formats USD currency correctly', () => {
      // Depending on locale, it might be $1,000 or $ 1,000
      const formatted = formatPrice(1000, 'USD', 'en-US');
      expect(formatted).toContain('1,000');
      expect(formatted).toContain('$');
    });

    it('handles zero', () => {
      expect(formatPrice(0, 'ARS')).toMatch(/\$\s?0/);
    });
  });

  describe('formatRating', () => {
    it('formats integer rating with one decimal', () => {
      expect(formatRating(4)).toBe('4.0');
    });

    it('formats decimal rating correctly', () => {
      expect(formatRating(4.5)).toBe('4.5');
    });

    it('rounds correctly', () => {
      expect(formatRating(4.56)).toBe('4.6');
    });
  });
});

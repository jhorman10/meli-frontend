import {
  calculateDiscount,
  calculatePriceWithoutTax,
} from '@/shared/utils/calculations';

describe('calculations', () => {
  describe('calculateDiscount', () => {
    it('should calculate discount percentage correctly', () => {
      const result = calculateDiscount(1000, 800);
      expect(result).toBe(20);
    });

    it('should calculate 50% discount', () => {
      const result = calculateDiscount(200, 100);
      expect(result).toBe(50);
    });

    it('should return 0 when prices are equal', () => {
      const result = calculateDiscount(100, 100);
      expect(result).toBe(0);
    });

    it('should return 0 when current price is higher', () => {
      const result = calculateDiscount(100, 150);
      expect(result).toBe(0);
    });

    it('should return 0 when original price is 0', () => {
      const result = calculateDiscount(0, 50);
      expect(result).toBe(0);
    });

    it('should round to nearest integer', () => {
      const result = calculateDiscount(100, 66);
      expect(result).toBe(34);
    });

    it('should handle decimal prices', () => {
      const result = calculateDiscount(99.99, 49.99);
      expect(result).toBe(50);
    });

    it('should calculate high discount correctly', () => {
      const result = calculateDiscount(1000, 100);
      expect(result).toBe(90);
    });
  });

  describe('calculatePriceWithoutTax', () => {
    it('should calculate price without tax using default rate', () => {
      const result = calculatePriceWithoutTax(121);
      expect(result).toBe(100);
    });

    it('should calculate price without custom tax rate', () => {
      const result = calculatePriceWithoutTax(110, 0.1);
      expect(result).toBe(100);
    });

    it('should round to nearest integer', () => {
      const result = calculatePriceWithoutTax(120, 0.21);
      expect(result).toBe(99);
    });

    it('should handle zero price', () => {
      const result = calculatePriceWithoutTax(0);
      expect(result).toBe(0);
    });

    it('should handle large prices', () => {
      const result = calculatePriceWithoutTax(12100, 0.21);
      expect(result).toBe(10000);
    });

    it('should handle decimal prices', () => {
      const result = calculatePriceWithoutTax(121.5, 0.21);
      expect(result).toBe(100);
    });
  });
});

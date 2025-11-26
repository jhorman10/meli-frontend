import { render } from '@testing-library/react';
import { ProductCardSkeleton } from '@/presentation/components/ProductCardSkeleton/ProductCardSkeleton';
import { ProductDetailSkeleton } from '@/presentation/components/ProductDetailSkeleton/ProductDetailSkeleton';

describe('Skeletons', () => {
  describe('ProductCardSkeleton', () => {
    it('renders correctly', () => {
      const { container } = render(<ProductCardSkeleton />);
      expect(container.firstChild).toHaveClass('animate-pulse');
    });
  });

  describe('ProductDetailSkeleton', () => {
    it('renders correctly', () => {
      const { container } = render(<ProductDetailSkeleton />);
      expect(container.firstChild).toHaveClass('animate-pulse');
    });
  });
});

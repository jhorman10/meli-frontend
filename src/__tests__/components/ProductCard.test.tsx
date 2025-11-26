import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from '@/presentation/components/ProductCard/ProductCard';
import type { ProductDTO } from '@/application/dto/ProductDTO';
import { UI_STRINGS } from '@/shared/constants';
import { BrowserRouter } from 'react-router-dom';

const mockProduct: ProductDTO = {
  id: 'MLA123',
  title: 'iPhone 13 Pro Max',
  price: 1500,
  formattedPrice: '$ 1,500',
  currency: 'USD',
  condition: 'new',
  thumbnail: 'http://image.com/iphone.jpg',
  freeShipping: true,
  discountPercentage: 0,
  installments: {
    quantity: 12,
    amount: 125,
    formattedAmount: '$ 125',
  },
};

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);

    expect(screen.getByText('iPhone 13 Pro Max')).toBeInTheDocument();
    expect(screen.getByText('$ 1,500')).toBeInTheDocument();
    expect(screen.getByAltText('iPhone 13 Pro Max')).toHaveAttribute(
      'src',
      mockProduct.thumbnail
    );
  });

  it('shows free shipping text when freeShipping is true', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    const freeShippingElements = screen.getAllByText(
      UI_STRINGS.PRODUCT_CARD.FREE_SHIPPING
    );
    expect(freeShippingElements.length).toBeGreaterThan(0);
  });

  it('renders installments information correctly', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);

    // Check for the new format: "Mismo precio en 12 cuotas de $ 125"
    // We use a regex to match the text content flexibly
    const expectedText = new RegExp(
      `${UI_STRINGS.PRODUCT_DETAIL.PRICING.SAME_PRICE_IN}\\s+12\\s+${UI_STRINGS.PRODUCT_DETAIL.PRICING.INSTALLMENTS_OF}\\s+\\$ 125`,
      'i'
    );

    // Since there are multiple elements with installments info (old and new format),
    // we just need to ensure the new format is present.
    // getAllByText with regex will find elements containing the pattern.
    const installmentsElements = screen.getAllByText(expectedText);
    expect(installmentsElements.length).toBeGreaterThan(0);
  });

  it('renders discount badge correctly', () => {
    const productWithDiscount = { ...mockProduct, discountPercentage: 15 };
    renderWithRouter(<ProductCard product={productWithDiscount} />);
    expect(
      screen.getByText(`15% ${UI_STRINGS.COMMON.OFF}`)
    ).toBeInTheDocument();
  });

  it('navigates to product detail on click', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);

    const links = screen.getAllByRole('link', { name: /iPhone 13 Pro Max/i });
    expect(links).toHaveLength(2);
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', `/items/${mockProduct.id}`);
    });
  });
});

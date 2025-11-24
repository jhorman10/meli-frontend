import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProductList } from '@/presentation/components/ProductList/ProductList';
import type { ProductDTO } from '@/application/dto/ProductDTO';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ProductList', () => {
  const mockProducts: ProductDTO[] = [
    {
      id: 'MLA1',
      title: 'iPhone 13',
      price: 500000,
      formattedPrice: '$ 500.000',
      currency: 'ARS',
      condition: 'new',
      thumbnail: 'https://example.com/thumb1.jpg',
      freeShipping: true,
      discountPercentage: 0,
    },
    {
      id: 'MLA2',
      title: 'Samsung Galaxy',
      price: 400000,
      formattedPrice: '$ 400.000',
      currency: 'ARS',
      condition: 'used',
      thumbnail: 'https://example.com/thumb2.jpg',
      freeShipping: false,
      discountPercentage: 0,
    },
  ];

  it('should render list of products', () => {
    renderWithRouter(<ProductList products={mockProducts} />);

    expect(screen.getByText('iPhone 13')).toBeInTheDocument();
    expect(screen.getByText('Samsung Galaxy')).toBeInTheDocument();
  });

  it('should render loading skeletons when isLoading is true', () => {
    const { container } = renderWithRouter(
      <ProductList products={[]} isLoading={true} />
    );

    // Should render skeletons in the loading state
    const loadingContainer = container.querySelector('.space-y-6');
    expect(loadingContainer).toBeInTheDocument();
  });

  it('should render empty state when no products', () => {
    renderWithRouter(<ProductList products={[]} />);

    expect(screen.getByText('No se encontraron productos')).toBeInTheDocument();
    expect(
      screen.getByText('Intenta con otro término de búsqueda')
    ).toBeInTheDocument();
  });

  it('should not render empty state when loading', () => {
    renderWithRouter(<ProductList products={[]} isLoading={true} />);

    expect(
      screen.queryByText('No se encontraron productos')
    ).not.toBeInTheDocument();
  });

  it('should render correct number of products', () => {
    renderWithRouter(<ProductList products={mockProducts} />);

    const productCards = screen.getAllByRole('link');
    expect(productCards.length).toBeGreaterThanOrEqual(2);
  });

  it('should render single product correctly', () => {
    const singleProduct = [mockProducts[0]];
    renderWithRouter(<ProductList products={singleProduct} />);

    expect(screen.getByText('iPhone 13')).toBeInTheDocument();
    expect(screen.queryByText('Samsung Galaxy')).not.toBeInTheDocument();
  });

  it('should not render products when loading', () => {
    renderWithRouter(<ProductList products={mockProducts} isLoading={true} />);

    expect(screen.queryByText('iPhone 13')).not.toBeInTheDocument();
    expect(screen.queryByText('Samsung Galaxy')).not.toBeInTheDocument();
  });

  it('should render products with proper spacing', () => {
    const { container } = renderWithRouter(
      <ProductList products={mockProducts} />
    );

    const productContainer = container.querySelector('.space-y-6');
    expect(productContainer).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { ProductBreadcrumb } from '@/presentation/pages/ProductDetailPage/components/ProductBreadcrumb';

describe('ProductBreadcrumb', () => {
  it('should render breadcrumb with product title', () => {
    render(<ProductBreadcrumb title="iPhone 13 Pro Max" />);

    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText('iPhone')).toBeInTheDocument();
  });

  it('should extract first word from title', () => {
    render(<ProductBreadcrumb title="Samsung Galaxy S21" />);

    expect(screen.getByText('Samsung')).toBeInTheDocument();
  });

  it('should handle single word title', () => {
    render(<ProductBreadcrumb title="Laptop" />);

    expect(screen.getByText('Laptop')).toBeInTheDocument();
  });

  it('should render breadcrumb separators', () => {
    const { container } = render(<ProductBreadcrumb title="Test Product" />);

    const breadcrumbText = container.textContent;
    expect(breadcrumbText).toContain('>');
  });

  it('should have correct styling', () => {
    const { container } = render(<ProductBreadcrumb title="Test" />);

    const breadcrumb = container.querySelector('.text-sm.text-gray-500');
    expect(breadcrumb).toBeInTheDocument();
  });
});

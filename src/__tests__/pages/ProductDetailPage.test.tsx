import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductDetailPage } from '@/presentation/pages/ProductDetailPage/ProductDetailPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { ProductDetailsDTO } from '@/application/dto/ProductDTO';

// Mock dependencies
const mockUseProductDetailPage = jest.fn();

jest.mock('@/application/hooks/useProductDetailPage', () => ({
  useProductDetailPage: () => mockUseProductDetailPage(),
}));

// Mock SEO component
jest.mock('@/presentation/components/SEO/SEO', () => ({
  SEO: () => null,
}));

const mockProductDetail: ProductDetailsDTO = {
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
  availableQuantity: 5,
  soldQuantity: 100,
  permalink: 'http://meli.com/iphone',
  pictures: [{ id: '1', url: 'http://image.com/iphone.jpg' }],
  description: { plainText: 'Great phone' },
};

describe('ProductDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    mockUseProductDetailPage.mockReturnValue({
      product: null,
      isLoading: true,
      error: null,
      selectedImage: '',
      setSelectedImage: jest.fn(),
      quantity: 1,
      setQuantity: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/items/MLA123']}>
        <Routes>
          <Route path="/items/:id" element={<ProductDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('iPhone 13 Pro Max')).not.toBeInTheDocument();
  });

  it('renders product details when load succeeds', () => {
    mockUseProductDetailPage.mockReturnValue({
      product: mockProductDetail,
      isLoading: false,
      error: null,
      selectedImage: mockProductDetail.thumbnail,
      setSelectedImage: jest.fn(),
      quantity: 1,
      setQuantity: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/items/MLA123']}>
        <Routes>
          <Route path="/items/:id" element={<ProductDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('iPhone 13 Pro Max')).toBeInTheDocument();
    expect(screen.getByText(/1\.500/)).toBeInTheDocument();
    expect(screen.getByText('Great phone')).toBeInTheDocument();
  });

  it('renders error message when load fails', () => {
    mockUseProductDetailPage.mockReturnValue({
      product: null,
      isLoading: false,
      error: new Error('Product not found'),
      selectedImage: '',
      setSelectedImage: jest.fn(),
      quantity: 1,
      setQuantity: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/items/MLA123']}>
        <Routes>
          <Route path="/items/:id" element={<ProductDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Product not found/i)).toBeInTheDocument();
  });
});

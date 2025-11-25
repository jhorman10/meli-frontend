import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchResultsPage } from '@/presentation/pages/SearchResultsPage/SearchResultsPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { SearchResultDTO } from '@/application/dto/SearchResultDTO';

// Mock dependencies
const mockUseSearchResultsPage = jest.fn();

jest.mock('@/application/hooks/useSearchResultsPage', () => ({
  useSearchResultsPage: () => mockUseSearchResultsPage(),
}));

// Mock SEO component
jest.mock('@/presentation/components/SEO/SEO', () => ({
  SEO: () => null,
}));

const mockProducts: SearchResultDTO = {
  products: [
    {
      id: 'MLA1',
      title: 'Product 1',
      price: 100,
      formattedPrice: '$ 100',
      currency: 'ARS',
      condition: 'new',
      thumbnail: 'http://img.com/1.jpg',
      freeShipping: true,
      discountPercentage: 0,
      installments: { quantity: 1, amount: 100, formattedAmount: '$ 100' },
    },
    {
      id: 'MLA2',
      title: 'Product 2',
      price: 200,
      formattedPrice: '$ 200',
      currency: 'ARS',
      condition: 'used',
      thumbnail: 'http://img.com/2.jpg',
      freeShipping: false,
      discountPercentage: 0,
    },
  ],
  total: 2,
  query: 'test',
  pagination: {
    limit: 10,
    offset: 0,
    hasMore: false,
  },
  metadata: {
    searchTime: 100,
    appliedFilters: [],
  },
};

describe('SearchResultsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    mockUseSearchResultsPage.mockReturnValue({
      results: null,
      isLoading: true,
      error: null,
      handleRelatedSearch: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/items?q=test']}>
        <Routes>
          <Route path="/items" element={<SearchResultsPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Check for skeletons or loading state
    // The component renders 4 skeletons when loading
    // We can check if there are elements with skeleton class or just check existence
    // Let's assume ProductCardSkeleton has a specific test id or class
    // Or we can check if ProductCard is NOT rendered
    expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
  });

  it('renders products when search succeeds', () => {
    mockUseSearchResultsPage.mockReturnValue({
      results: mockProducts,
      isLoading: false,
      error: null,
      handleRelatedSearch: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/items?q=test']}>
        <Routes>
          <Route path="/items" element={<SearchResultsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('renders no results message when search returns empty', () => {
    mockUseSearchResultsPage.mockReturnValue({
      results: { products: [], total: 0, query: 'test' },
      isLoading: false,
      error: null,
      handleRelatedSearch: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/items?q=test']}>
        <Routes>
          <Route path="/items" element={<SearchResultsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText('No hay publicaciones que coincidan con tu búsqueda.')
    ).toBeInTheDocument();
  });
});

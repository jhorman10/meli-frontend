import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SearchPage } from '@/presentation/pages/SearchPage/SearchPage';
import { useSearchPage } from '@/application/hooks/useSearchPage';

// Mock dependencies
jest.mock('@/application/hooks/useSearchPage', () => ({
  useSearchPage: jest.fn(),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </HelmetProvider>
  );
};

describe('SearchPage', () => {
  const mockHandleSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchPage as jest.Mock).mockReturnValue({
      handleSearch: mockHandleSearch,
    });
  });

  it('should render search page with logo and title', () => {
    renderWithRouter(<SearchPage />);

    expect(screen.getByAltText('Mercado Libre')).toBeInTheDocument();
    // Title comes from UI_STRINGS.SEARCH.TITLE
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('should render search bar', () => {
    renderWithRouter(<SearchPage />);

    const searchInput = screen.getByPlaceholderText(
      'Buscar productos, marcas y más...'
    );
    expect(searchInput).toBeInTheDocument();
  });

  it('should call handleSearch when search is submitted', () => {
    renderWithRouter(<SearchPage />);

    const searchInput = screen.getByPlaceholderText(
      'Buscar productos, marcas y más...'
    );
    const searchButton = screen.getByRole('button', { name: /buscar/i });

    fireEvent.change(searchInput, { target: { value: 'iphone' } });
    fireEvent.click(searchButton);

    expect(mockHandleSearch).toHaveBeenCalledWith('iphone');
  });

  it('should render subtitle', () => {
    renderWithRouter(<SearchPage />);

    // Check for subtitle text
    const subtitle = screen.getByText(
      'La comunidad de compra y venta online más grande de América Latina'
    );
    expect(subtitle).toBeInTheDocument();
  });

  it('should have centered layout', () => {
    const { container } = renderWithRouter(<SearchPage />);

    const mainDiv = container.querySelector('.flex.flex-col.items-center');
    expect(mainDiv).toBeInTheDocument();
  });
});

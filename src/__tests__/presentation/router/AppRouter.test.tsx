import { render, screen, waitFor } from '@testing-library/react';
import { AppRouter } from '@/presentation/router/AppRouter';
import '@testing-library/jest-dom';

// Mock lazy-loaded components
jest.mock('@/presentation/pages/SearchPage/SearchPage', () => ({
  SearchPage: () => <div data-testid="search-page">Search Page</div>,
}));

jest.mock('@/presentation/pages/SearchResultsPage/SearchResultsPage', () => ({
  SearchResultsPage: () => (
    <div data-testid="search-results-page">Search Results Page</div>
  ),
}));

jest.mock('@/presentation/pages/ProductDetailPage/ProductDetailPage', () => ({
  ProductDetailPage: () => (
    <div data-testid="product-detail-page">Product Detail Page</div>
  ),
}));

// We mock the child pages but NOT MainLayout.
// MainLayout is a simple layout component, so it's better to test it integrated
// or at least let it render the Outlet properly.
// If we mock MainLayout, we must ensure it renders the `children` or `Outlet` passed to it by React Router.
// Since `MainLayout` uses `Outlet` internally, mocking it to render a static div means the nested routes
// (SearchResultsPage, ProductDetailPage) will NEVER be rendered.

// Instead of mocking MainLayout, let's mock the components inside it (SearchBar) if needed,
// or just let it be. MainLayout uses SearchBar, so we should mock SearchBar.

jest.mock('@/presentation/components/SearchBar/SearchBar', () => ({
  SearchBar: () => <div data-testid="search-bar">SearchBar</div>,
}));

// We also need to mock the image asset imported in MainLayout
jest.mock('@/assets/logo_large_plus@2x.webp', () => 'logo-url');

describe('AppRouter', () => {
  it('renders SearchPage on root route', async () => {
    window.history.pushState({}, 'Home', '/');
    render(<AppRouter />);

    await waitFor(() => {
      expect(screen.getByTestId('search-page')).toBeInTheDocument();
    });
  });

  it('renders SearchResultsPage on /search route within MainLayout', async () => {
    window.history.pushState({}, 'Search', '/search?q=iphone');
    render(<AppRouter />);

    await waitFor(() => {
      // MainLayout renders SearchBar
      expect(screen.getByTestId('search-bar')).toBeInTheDocument();
      expect(screen.getByTestId('search-results-page')).toBeInTheDocument();
    });
  });

  it('renders ProductDetailPage on /items/:id route within MainLayout', async () => {
    window.history.pushState({}, 'Product', '/items/MLA123');
    render(<AppRouter />);

    await waitFor(() => {
      expect(screen.getByTestId('search-bar')).toBeInTheDocument();
      expect(screen.getByTestId('product-detail-page')).toBeInTheDocument();
    });
  });
});

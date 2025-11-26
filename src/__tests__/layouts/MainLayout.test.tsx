import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainLayout } from '@/presentation/layouts/MainLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Mock SearchBar to capture onSearch prop
jest.mock('@/presentation/components/SearchBar/SearchBar', () => ({
  SearchBar: ({ onSearch }: { onSearch: (query: string) => void }) => (
    <div data-testid="search-bar">
      <button onClick={() => onSearch('iphone')}>Search</button>
    </div>
  ),
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('MainLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header with logo and search bar', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={<div data-testid="child-content">Child Content</div>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByAltText('Mercado Libre')).toBeInTheDocument();
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('navigates to home when logo is clicked', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={<div data-testid="child-content">Child Content</div>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    );

    const logoButton = screen.getByRole('button', { name: 'Mercado Libre' });
    fireEvent.click(logoButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('navigates to search results when search is submitted', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<div>Home</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    );

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(mockNavigate).toHaveBeenCalledWith('/search?q=iphone');
  });
});

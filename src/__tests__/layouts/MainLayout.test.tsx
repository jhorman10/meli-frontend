import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainLayout } from '@/presentation/layouts/MainLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Mock SearchBar to avoid complex interactions in layout test
jest.mock('@/presentation/components/SearchBar/SearchBar', () => ({
  SearchBar: () => <div data-testid="search-bar">SearchBar</div>,
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
});

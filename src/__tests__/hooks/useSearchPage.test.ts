import { renderHook } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useSearchPage } from '@/application/hooks/useSearchPage';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('useSearchPage', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('should return handleSearch function', () => {
    const { result } = renderHook(() => useSearchPage());

    expect(result.current.handleSearch).toBeDefined();
    expect(typeof result.current.handleSearch).toBe('function');
  });

  it('should navigate to search results with query', () => {
    const { result } = renderHook(() => useSearchPage());

    result.current.handleSearch('iphone');

    expect(mockNavigate).toHaveBeenCalledWith('/search?q=iphone');
  });

  it('should handle search with spaces', () => {
    const { result } = renderHook(() => useSearchPage());

    result.current.handleSearch('iphone 13 pro');

    expect(mockNavigate).toHaveBeenCalledWith('/search?q=iphone 13 pro');
  });

  it('should handle empty query', () => {
    const { result } = renderHook(() => useSearchPage());

    result.current.handleSearch('');

    expect(mockNavigate).toHaveBeenCalledWith('/search?q=');
  });

  it('should handle special characters in query', () => {
    const { result } = renderHook(() => useSearchPage());

    result.current.handleSearch('phone & tablet');

    expect(mockNavigate).toHaveBeenCalledWith('/search?q=phone & tablet');
  });
});

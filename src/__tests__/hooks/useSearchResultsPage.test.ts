import { renderHook, waitFor } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { useSearchResultsPage } from '@/application/hooks/useSearchResultsPage';
import { useSearchProducts } from '@/application/hooks/useSearchProducts';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('@/application/hooks/useSearchProducts', () => ({
  useSearchProducts: jest.fn(),
}));

describe('useSearchResultsPage', () => {
  const mockSearch = jest.fn();
  const mockSetSearchParams = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial state with empty query', () => {
    const mockSearchParams = new URLSearchParams();
    (useSearchParams as jest.Mock).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
    (useSearchProducts as jest.Mock).mockReturnValue({
      search: mockSearch,
      results: null,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useSearchResultsPage());

    expect(result.current.query).toBe('');
    expect(result.current.results).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.relatedSearches).toHaveLength(6);
  });

  it('should search when query is present', async () => {
    const mockSearchParams = new URLSearchParams({ q: 'iphone' });
    (useSearchParams as jest.Mock).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
    (useSearchProducts as jest.Mock).mockReturnValue({
      search: mockSearch,
      results: null,
      isLoading: true,
      error: null,
    });

    renderHook(() => useSearchResultsPage());

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('iphone');
    });
  });

  it('should not search when query is empty', () => {
    const mockSearchParams = new URLSearchParams();
    (useSearchParams as jest.Mock).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
    (useSearchProducts as jest.Mock).mockReturnValue({
      search: mockSearch,
      results: null,
      isLoading: false,
      error: null,
    });

    renderHook(() => useSearchResultsPage());

    expect(mockSearch).not.toHaveBeenCalled();
  });

  it('should return search results', () => {
    const mockSearchParams = new URLSearchParams({ q: 'laptop' });
    const mockResults = {
      products: [],
      total: 0,
      query: 'laptop',
      pagination: { limit: 20, offset: 0, hasMore: false },
      metadata: {},
    };

    (useSearchParams as jest.Mock).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
    (useSearchProducts as jest.Mock).mockReturnValue({
      search: mockSearch,
      results: mockResults,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useSearchResultsPage());

    expect(result.current.results).toEqual(mockResults);
    expect(result.current.query).toBe('laptop');
  });

  it('should handle search error', () => {
    const mockSearchParams = new URLSearchParams({ q: 'test' });
    const mockError = new Error('Search failed');

    (useSearchParams as jest.Mock).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
    (useSearchProducts as jest.Mock).mockReturnValue({
      search: mockSearch,
      results: null,
      isLoading: false,
      error: mockError,
    });

    const { result } = renderHook(() => useSearchResultsPage());

    expect(result.current.error).toEqual(mockError);
  });

  it('should handle related search', () => {
    const mockSearchParams = new URLSearchParams({ q: 'iphone' });
    (useSearchParams as jest.Mock).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
    (useSearchProducts as jest.Mock).mockReturnValue({
      search: mockSearch,
      results: null,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useSearchResultsPage());

    result.current.handleRelatedSearch('phone 7');

    expect(mockSetSearchParams).toHaveBeenCalledWith({ q: 'phone 7' });
  });

  it('should provide related searches', () => {
    const mockSearchParams = new URLSearchParams({ q: 'iphone' });
    (useSearchParams as jest.Mock).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
    (useSearchProducts as jest.Mock).mockReturnValue({
      search: mockSearch,
      results: null,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useSearchResultsPage());

    expect(result.current.relatedSearches).toEqual([
      'phone 7',
      'phone se',
      'phone xr',
      'apple',
      'phone',
      'phone xs max',
    ]);
  });

  it('should re-search when query changes', async () => {
    const mockSearchParams1 = new URLSearchParams({ q: 'iphone' });
    const mockSearchParams2 = new URLSearchParams({ q: 'samsung' });

    (useSearchParams as jest.Mock).mockReturnValueOnce([
      mockSearchParams1,
      mockSetSearchParams,
    ]);
    (useSearchProducts as jest.Mock).mockReturnValue({
      search: mockSearch,
      results: null,
      isLoading: false,
      error: null,
    });

    const { rerender } = renderHook(() => useSearchResultsPage());

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('iphone');
    });

    (useSearchParams as jest.Mock).mockReturnValueOnce([
      mockSearchParams2,
      mockSetSearchParams,
    ]);

    rerender();

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('samsung');
    });
  });
});

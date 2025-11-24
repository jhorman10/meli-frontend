import { renderHook, act } from '@testing-library/react';
import { useSearchProducts } from '@/application/hooks/useSearchProducts';
import { getSearchService } from '@/application/di/providers';

// Mock dependencies
jest.mock('@/application/di/providers', () => ({
  getSearchService: jest.fn(),
}));

const mockSearchService = {
  quickSearch: jest.fn(),
};

(getSearchService as jest.Mock).mockReturnValue(mockSearchService);

describe('useSearchProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useSearchProducts());

    expect(result.current.results).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle successful search', async () => {
    const mockResults = {
      products: [],
      total: 0,
      query: 'test',
      pagination: { limit: 10, offset: 0, hasMore: false },
      metadata: {},
    };
    mockSearchService.quickSearch.mockResolvedValue(mockResults);

    const { result } = renderHook(() => useSearchProducts());

    await act(async () => {
      await result.current.search('test');
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.results).toEqual(mockResults);
    expect(result.current.error).toBeNull();
  });

  it('should handle search error', async () => {
    const error = new Error('Search failed');
    mockSearchService.quickSearch.mockRejectedValue(error);

    const { result } = renderHook(() => useSearchProducts());

    await act(async () => {
      await result.current.search('test');
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.results).toBeNull();
    expect(result.current.error).toEqual(error);
  });
});

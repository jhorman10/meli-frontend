import { useState, useCallback } from 'react';
import { getSearchService } from '../di/providers';
import type { SearchResultDTO } from '../dto/SearchResultDTO';

interface UseSearchProductsReturn {
  search: (query: string) => Promise<void>;
  results: SearchResultDTO | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * useSearchProducts Hook
 * Provides search functionality using SearchService
 * Now uses DTOs instead of domain entities
 */
export const useSearchProducts = (): UseSearchProductsReturn => {
  const [results, setResults] = useState<SearchResultDTO | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchService = getSearchService();

  const search = useCallback(
    async (query: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const searchResult = await searchService.quickSearch(query);
        setResults(searchResult);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error desconocido'));
      } finally {
        setIsLoading(false);
      }
    },
    [searchService]
  );

  return { search, results, isLoading, error };
};

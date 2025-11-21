import { useState, useCallback } from 'react';
import { SearchProducts } from '@/domain/use-cases/SearchProducts';
import { ProductAPI } from '@/infrastructure/api/ProductAPI';
import type {
  SearchParams,
  SearchResult,
} from '@/domain/repositories/ProductRepository';

interface UseSearchProductsReturn {
  search: (query: string) => Promise<void>;
  results: SearchResult | null;
  isLoading: boolean;
  error: Error | null;
}

export const useSearchProducts = (): UseSearchProductsReturn => {
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchUseCase = new SearchProducts(new ProductAPI());

  const search = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const params: SearchParams = { query, limit: 20 };
      const searchResult = await searchUseCase.execute(params);
      setResults(searchResult);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { search, results, isLoading, error };
};

import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchProducts } from '@/application/hooks/useSearchProducts';

export const useSearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { search, results, isLoading, error } = useSearchProducts();

  useEffect(() => {
    if (query) {
      search(query);
    }
  }, [query, search]);

  // Related searches - placeholder data for now
  const relatedSearches = [
    'phone 7',
    'phone se',
    'phone xr',
    'apple',
    'phone',
    'phone xs max',
  ];

  const handleRelatedSearch = (term: string) => {
    setSearchParams({ q: term });
  };

  return {
    query,
    search,
    results,
    isLoading,
    error,
    relatedSearches,
    handleRelatedSearch,
  };
};

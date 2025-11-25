import { useState, useEffect, type FormEvent } from 'react';
import { useDebounce } from './useDebounce';

interface UseSearchBarProps {
  initialValue?: string;
  onSearch: (query: string) => void;
  autoSearch?: boolean;
  debounceDelay?: number;
}

export const useSearchBar = ({
  initialValue = '',
  onSearch,
  autoSearch = false,
  debounceDelay = 500,
}: UseSearchBarProps) => {
  const [query, setQuery] = useState(initialValue);
  const debouncedQuery = useDebounce(query, debounceDelay);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (autoSearch && debouncedQuery.trim().length >= 3) {
      onSearch(debouncedQuery.trim());
    }
  }, [debouncedQuery, autoSearch, onSearch]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 3) {
      onSearch(query.trim());
    }
  };

  return {
    query,
    setQuery,
    handleSubmit,
    debouncedQuery,
  };
};

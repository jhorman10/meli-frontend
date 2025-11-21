import { useState, useEffect, type FormEvent } from 'react';

interface UseSearchBarProps {
  initialValue?: string;
  onSearch: (query: string) => void;
}

export const useSearchBar = ({
  initialValue = '',
  onSearch,
}: UseSearchBarProps) => {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

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
  };
};

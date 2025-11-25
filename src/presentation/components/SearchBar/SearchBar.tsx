import React from 'react';
import { useSearchBar } from '@/application/hooks/useSearchBar';
import { UI_STRINGS } from '@/shared/constants';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  initialValue?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading = false,
  placeholder = UI_STRINGS.SEARCH.PLACEHOLDER,
  initialValue = '',
}) => {
  const { query, setQuery, handleSubmit } = useSearchBar({
    initialValue,
    onSearch,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full"
      role="search"
      aria-label="Buscar productos"
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-12 shadow-sm border border-gray-300 focus:ring-2 focus:ring-[#3483fa] focus:border-[#3483fa] outline-none text-gray-900"
          style={{ borderRadius: '2px' }}
          disabled={isLoading}
          aria-label={placeholder}
        />
        <button
          type="submit"
          disabled={isLoading || query.trim().length < 3}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{
            color: isLoading || query.trim().length < 3 ? undefined : '#3483fa',
          }}
          aria-label="Buscar"
          title="Buscar"
        >
          {isLoading ? (
            <div
              className="animate-spin rounded-full h-6 w-6 border-b-2"
              style={{ borderColor: '#3483fa' }}
            />
          ) : (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
};

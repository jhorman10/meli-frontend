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
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 pr-12 rounded-lg shadow-md border-none focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || query.trim().length < 3}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          ) : (
            <svg
              className="w-6 h-6"
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

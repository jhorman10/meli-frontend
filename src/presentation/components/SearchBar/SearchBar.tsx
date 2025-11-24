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
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
          <svg
            className="w-5 h-5"
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
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 py-3 rounded-lg shadow-md border-none focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || query.trim().length < 3}
          className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            'Buscar'
          )}
        </button>
      </div>
    </form>
  );
};

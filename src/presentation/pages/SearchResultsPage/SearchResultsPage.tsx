import React from 'react';
import { ProductList } from '@/presentation/components/ProductList/ProductList';
import { useSearchResultsPage } from '@/application/hooks/useSearchResultsPage';
import { UI_STRINGS } from '@/shared/constants';

export const SearchResultsPage: React.FC = () => {
  const {
    query,
    results,
    isLoading,
    error,
    relatedSearches,
    handleRelatedSearch,
  } = useSearchResultsPage();

  return (
    <div className="max-w-4xl mx-auto px-6 pb-8 animate-fade-in">
      {/* Related Searches */}
      {query && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <p> {UI_STRINGS.SEARCH.RELATED_SEARCHES}</p>
            {relatedSearches.map((term, index) => (
              <React.Fragment key={term}>
                {index > 0 && <span className="text-gray-400">|</span>}
                <button
                  onClick={() => handleRelatedSearch(term)}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors"
                >
                  {term}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <svg
              className="h-5 w-5 text-red-400 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {UI_STRINGS.SEARCH.ERROR_TITLE}
              </h3>
              <p className="text-sm text-red-700">{error.message}</p>
            </div>
          </div>
        </div>
      )}
      <ProductList products={results?.products || []} isLoading={isLoading} />
    </div>
  );
};

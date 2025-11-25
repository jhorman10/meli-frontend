import React from 'react';
import { UI_STRINGS } from '@/shared/constants';

interface RelatedSearchesProps {
  onSearchClick: (term: string) => void;
}

export const RelatedSearches: React.FC<RelatedSearchesProps> = ({
  onSearchClick,
}) => {
  const searchTerms = UI_STRINGS.SEARCH.RELATED_SEARCH_TERMS;

  return (
    <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
      <span className="text-sm text-gray-500 whitespace-nowrap py-1">
        {UI_STRINGS.SEARCH.RELATED_SEARCHES}
      </span>
      {searchTerms.map((term) => (
        <button
          key={term}
          onClick={() => onSearchClick(term)}
          className="text-sm text-blue-600 hover:underline whitespace-nowrap py-1 px-2 bg-blue-50 rounded-full transition-colors hover:bg-blue-100"
        >
          {term}
        </button>
      ))}
    </div>
  );
};

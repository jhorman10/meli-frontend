import React from 'react';
import notFoundIcon from '@/assets/not-found.svg';
import { UI_STRINGS } from '@/shared/constants';

export const NoResultsState: React.FC = () => {
  const { NO_RESULTS } = UI_STRINGS.SEARCH;

  return (
    <main role="main" id="root-app" className="min-h-screen pt-16 p-4">
      <div className="pt-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-sm p-6 shadow-sm">
          <div className="ui-search">
            {/* Nuevo layout responsive */}
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Columna imagen → solo el espacio necesario */}
              <div className="shrink-0 self-center flex items-center justify-center">
                <img
                  id="not_found"
                  decoding="sync"
                  src={
                    notFoundIcon ||
                    'https://http2.mlstatic.com/frontend-assets/search-nordic/not-found.svg'
                  }
                  className="w-16 h-16 ml-2.5"
                  fetchPriority="high"
                  alt="image not found"
                />
              </div>

              {/* Columna texto → ocupa el resto del espacio */}
              <div className="flex-1 text-left font-light flex flex-col justify-center">
                <h3 className="text-2xl font-semibold mb-4">
                  {NO_RESULTS.TITLE}
                </h3>

                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>{NO_RESULTS.SUGGESTIONS.SPELLING}</strong>{' '}
                    {NO_RESULTS.SUGGESTIONS.SPELLING_DETAIL}
                  </li>

                  <li>
                    {NO_RESULTS.SUGGESTIONS.GENERIC}
                    <strong>{NO_RESULTS.SUGGESTIONS.GENERIC_BOLD}</strong>
                    {NO_RESULTS.SUGGESTIONS.GENERIC_DETAIL}
                  </li>

                  <li>
                    <a
                      href={NO_RESULTS.CATEGORIES_URL}
                      className="text-blue-600"
                    >
                      {NO_RESULTS.SUGGESTIONS.CATEGORIES_LINK}
                    </a>{' '}
                    {NO_RESULTS.SUGGESTIONS.CATEGORIES_DETAIL}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

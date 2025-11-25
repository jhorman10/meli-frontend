import React from 'react';
import notFoundIcon from '@/assets/not-found.svg';
import { UI_STRINGS } from '@/shared/constants';

export const NoResultsState: React.FC = () => {
  const { NO_RESULTS } = UI_STRINGS.SEARCH;

  return (
    <main role="main" id="root-app" className="bg-gray-100 min-h-screen p-4">
      <div className="pt-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-sm p-8 shadow-sm">
          <div className="ui-search">
            <div className="ui-search-rescue ui-search-rescue--zrp">
              <div className="ui-search-rescue__icon">
                <div className="ui-search-icon ui-search-icon--not-found ui-search-rescue__icon">
                  <img
                    id="not_found"
                    decoding="sync"
                    src={
                      notFoundIcon ||
                      'https://http2.mlstatic.com/frontend-assets/search-nordic/not-found.svg'
                    }
                    className="ui-search-rescue__icon"
                    fetchPriority="high"
                    alt="image not found"
                  />
                </div>
              </div>
              <div className="ui-search-rescue__info">
                <h3 className="ui-search-rescue__title">{NO_RESULTS.TITLE}</h3>
                <ul className="ui-search-rescue__list">
                  <li className="ui-search-rescue__item">
                    <strong>{NO_RESULTS.SUGGESTIONS.SPELLING}</strong>{' '}
                    {NO_RESULTS.SUGGESTIONS.SPELLING_DETAIL}
                  </li>
                  <li className="ui-search-rescue__item">
                    {NO_RESULTS.SUGGESTIONS.GENERIC}
                    <strong>{NO_RESULTS.SUGGESTIONS.GENERIC_BOLD}</strong>
                    {NO_RESULTS.SUGGESTIONS.GENERIC_DETAIL}
                  </li>
                  <li className="ui-search-rescue__item">
                    <a href={NO_RESULTS.CATEGORIES_URL}>
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

import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '@/presentation/components/ProductCard/ProductCard';
import { ProductCardSkeleton } from '@/presentation/components/ProductCardSkeleton/ProductCardSkeleton';
import { useSearchResultsPage } from '@/application/hooks/useSearchResultsPage';
import { UI_STRINGS } from '@/shared/constants';
import { SEO } from '@/presentation/components/SEO/SEO';

export const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { results, isLoading, error, handleRelatedSearch } =
    useSearchResultsPage();

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        {[...Array(4)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {UI_STRINGS.SEARCH.ERROR_TITLE}
          </h1>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  // PANTALLA DE "NO RESULTS"
  if (!results?.products || results.products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <svg
            className="mx-auto h-24 w-24 text-gray-400 mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M10.5 3a7.5 7.5 0 015.93 12.18l3.22 3.22a1.25 1.25 0 11-1.77 1.77l-3.22-3.22A7.5 7.5 0 1110.5 3zm0 3.75a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 9l3 3m0-3l-3 3"
            />
          </svg>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {`No encontramos resultados para "${query}"`}
          </h1>

          <p className="text-gray-600">
            Intenta con otros términos de búsqueda o revisa la ortografía.
          </p>

          {/* Búsquedas relacionadas como sugerencia */}
          {query && (
            <div className="mt-8">
              <p className="text-sm text-gray-500 mb-3">
                {UI_STRINGS.SEARCH.RELATED_SEARCHES}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['iPhone', 'Samsung', 'Motorola', 'Xiaomi'].map((term) => (
                  <button
                    key={term}
                    onClick={() => handleRelatedSearch(term)}
                    className="text-sm text-blue-600 hover:underline px-3 py-1 bg-blue-50 rounded-full transition-colors hover:bg-blue-100"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <SEO
        title={`${query} | Me-Li`}
        description={`Envíos Gratis en el día. Compre ${query} en cuotas sin interés! Conozca nuestras increíbles ofertas y promociones en millones de productos.`}
      />

      {/* Búsquedas relacionadas */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
        <span className="text-sm text-gray-500 whitespace-nowrap py-1">
          {UI_STRINGS.SEARCH.RELATED_SEARCHES}
        </span>
        {['iPhone', 'Samsung', 'Motorola', 'Xiaomi'].map((term) => (
          <button
            key={term}
            onClick={() => handleRelatedSearch(term)}
            className="text-sm text-blue-600 hover:underline whitespace-nowrap py-1 px-2 bg-blue-50 rounded-full transition-colors hover:bg-blue-100"
          >
            {term}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {results.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

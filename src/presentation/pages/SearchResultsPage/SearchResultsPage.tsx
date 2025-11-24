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

  return (
    <div className="max-w-5xl mx-auto p-4">
      <SEO
        title={`${query} | Me-Li`}
        description={`Envíos Gratis en el día. Compre ${query} en cuotas sin interés! Conozca nuestras increíbles ofertas y promociones en millones de productos.`}
      />
      {/* Related searches (mocked for now) */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
        <span className="text-sm text-gray-500 whitespace-nowrap py-1">
          {UI_STRINGS.SEARCH.RELATED_SEARCHES}
        </span>
        {['iPhone', 'Samsung', 'Motorola', 'Xiaomi'].map((term) => (
          <button
            key={term}
            onClick={() => handleRelatedSearch(term)}
            className="text-sm text-blue-600 hover:underline whitespace-nowrap py-1 px-2 bg-blue-50 rounded-full"
          >
            {term}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
        {results?.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

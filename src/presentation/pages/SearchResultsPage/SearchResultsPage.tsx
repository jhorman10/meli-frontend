import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductList } from '@/presentation/components/ProductList/ProductList';
import { useSearchResultsPage } from '@/application/hooks/useSearchResultsPage';
import { SEO } from '@/presentation/components/SEO/SEO';
import {
  NoResultsState,
  ErrorState,
  LoadingState,
  RelatedSearches,
} from './components';

export const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { results, isLoading, error, handleRelatedSearch } =
    useSearchResultsPage();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!results?.products || results.products.length === 0) {
    return <NoResultsState />;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <SEO
        title={`${query} | Me-Li`}
        description={`Envíos Gratis en el día. Compre ${query} en cuotas sin interés! Conozca nuestras increíbles ofertas y promociones en millones de productos.`}
      />

      <RelatedSearches onSearchClick={handleRelatedSearch} />

      <ProductList products={results.products} isLoading={isLoading} />
    </div>
  );
};

import React from 'react';
import { useSearchPage } from '@/application/hooks/useSearchPage';
import { UI_STRINGS } from '@/shared/constants';
import { SEO } from '@/presentation/components/SEO/SEO';
import { SearchBar } from '@/presentation/components/SearchBar/SearchBar';

export const SearchPage: React.FC = () => {
  const { handleSearch } = useSearchPage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <SEO
        title={UI_STRINGS.SEARCH.TITLE}
        description="Compre productos con Envío Gratis en el día en Mercado Libre Argentina. Encuentre miles de marcas y productos a precios increíbles."
      />
      <div className="w-full max-w-lg text-center">
        <img
          src="/logo.svg"
          alt="Mercado Libre"
          className="mx-auto mb-8 w-24 h-24 object-contain"
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {UI_STRINGS.SEARCH.TITLE}
        </h1>
        <p className="text-gray-600 mb-8">{UI_STRINGS.SEARCH.SUBTITLE}</p>

        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
};

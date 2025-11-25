import React from 'react';
import { useSearchPage } from '@/application/hooks/useSearchPage';
import { UI_STRINGS } from '@/shared/constants';
import { SEO } from '@/presentation/components/SEO/SEO';
import { SearchBar } from '@/presentation/components/SearchBar/SearchBar';
import logoLargePlus from '@/assets/logo_large_plus@2x.webp';

export const SearchPage: React.FC = () => {
  const { handleSearch } = useSearchPage();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4"
      style={{ backgroundColor: '#f5f5f5' }}
    >
      <SEO
        title={UI_STRINGS.SEARCH.TITLE}
        description="Compre productos con Envío Gratis en el día en Mercado Libre Argentina. Encuentre miles de marcas y productos a precios increíbles."
      />
      <div className="w-full max-w-lg text-center">
        <h1 className="sr-only">{UI_STRINGS.SEARCH.TITLE}</h1>
        <img
          src={logoLargePlus}
          alt="Mercado Libre"
          className="mx-auto mb-2 w-48 object-contain"
        />
        <p className="mb-4" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
          {UI_STRINGS.SEARCH.SUBTITLE}
        </p>
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
};

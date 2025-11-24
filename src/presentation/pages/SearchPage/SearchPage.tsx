import React from 'react';
import { useSearchPage } from '@/application/hooks/useSearchPage';
import { UI_STRINGS } from '@/shared/constants';
import { SEO } from '@/presentation/components/SEO/SEO';

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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const input = form.elements.namedItem('search') as HTMLInputElement;
            handleSearch(input.value);
          }}
          className="w-full"
        >
          <div className="relative">
            <input
              type="text"
              name="search"
              placeholder={UI_STRINGS.SEARCH.PLACEHOLDER}
              className="w-full p-4 pr-12 rounded-lg shadow-md border-none focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-blue-600"
            >
              <svg
                className="w-6 h-6"
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
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

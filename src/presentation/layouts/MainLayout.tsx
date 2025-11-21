import React from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { SearchBar } from '@/presentation/components/SearchBar/SearchBar';

export const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const handleSearch = (query: string) => {
    navigate(`/search?q=${query}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header con barra de búsqueda */}
      <div className="bg-yellow-400 p-4 mb-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="shrink-0 inline-flex items-center text-gray-700 hover:text-gray-900 font-medium transition-colors p-2 hover:bg-yellow-300 rounded-lg"
            title="Volver"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="hidden sm:inline">Volver</span>
          </button>
          <div className="flex-1">
            <SearchBar
              onSearch={handleSearch}
              isLoading={false}
              initialValue={query}
            />
          </div>
        </div>
      </div>

      {/* Contenido de las páginas */}
      <Outlet />
    </div>
  );
};

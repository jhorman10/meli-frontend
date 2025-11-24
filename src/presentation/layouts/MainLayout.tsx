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
      <div className="p-4 mb-8" style={{ backgroundColor: '#FFE600' }}>
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="hidden md:block shrink-0 hover:opacity-80 transition-opacity"
            title="Ir al inicio"
          >
            <img
              src="/logo.svg"
              alt="Me-Li"
              className="w-12 h-12 object-contain"
            />
          </button>

          {/* Botón Volver */}
          <button
            onClick={() => navigate(-1)}
            className="shrink-0 flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors hover:bg-yellow-300 rounded-lg"
            title="Volver"
          >
            <svg
              className="w-5 h-5"
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

          {/* Barra de búsqueda */}
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

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
            className="shrink-0 hover:opacity-80 transition-opacity"
            title="Ir al inicio"
          >
            <img
              src="/logo.svg"
              alt="Me-Li"
              className="w-12 h-12 object-contain"
            />
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

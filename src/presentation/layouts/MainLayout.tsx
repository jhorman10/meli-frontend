import React from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { SearchBar } from '@/presentation/components/SearchBar/SearchBar';
import logoLargePlus from '@/assets/logo_large_plus@2x.webp';
export const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const handleSearch = (query: string) => {
    navigate(`/search?q=${query}`);
  };

  return (
    <div className="min-h-screen">
      {/* Header con barra de búsqueda - ML Yellow */}
      <div
        className="p-4 border-b border-gray-200"
        style={{ backgroundColor: '#FFE600' }}
      >
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="hidden md:block shrink-0 hover:opacity-80 transition-opacity"
            title="Ir al inicio"
          >
            <img
              src={logoLargePlus}
              alt="Mercado Libre"
              className="w-30 h-10 object-contain"
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

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '@/presentation/components/SearchBar/SearchBar';

export const SearchPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${query}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center animate-fade-in">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mercado Libre
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            La comunidad de compra y venta online más grande de América Latina
          </p>
          <SearchBar
            onSearch={handleSearch}
            placeholder="Buscar productos, marcas y más..."
          />
        </div>
      </div>
    </div>
  );
};

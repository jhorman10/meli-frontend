import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';

// Carga diferida de páginas
const SearchPage = lazy(() =>
  import('../pages/SearchPage/SearchPage').then((module) => ({
    default: module.SearchPage,
  }))
);
const SearchResultsPage = lazy(() =>
  import('../pages/SearchResultsPage/SearchResultsPage').then((module) => ({
    default: module.SearchResultsPage,
  }))
);
const ProductDetailPage = lazy(() =>
  import('../pages/ProductDetailPage/ProductDetailPage').then((module) => ({
    default: module.ProductDetailPage,
  }))
);

// Componente de carga simple
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<SearchPage />} />

          {/* Rutas con MainLayout (header con barra de búsqueda) */}
          <Route element={<MainLayout />}>
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/items/:id" element={<ProductDetailPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

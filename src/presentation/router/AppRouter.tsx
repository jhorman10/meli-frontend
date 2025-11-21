import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchPage } from '../pages/SearchPage/SearchPage';
import { ProductDetailPage } from '../pages/ProductDetailPage/ProductDetailPage';
import { SearchResultsPage } from '../pages/SearchResultsPage/SearchResultsPage';
import { MainLayout } from '../layouts/MainLayout';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />

        {/* Rutas con MainLayout (header con barra de búsqueda) */}
        <Route element={<MainLayout />}>
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/items/:id" element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

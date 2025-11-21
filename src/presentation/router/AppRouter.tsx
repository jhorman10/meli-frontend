import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchPage } from '../pages/SearchPage/SearchPage';
import { ProductDetailPage } from '../pages/ProductDetailPage/ProductDetailPage';
import { SearchResultsPage } from '../pages/SearchResultsPage/SearchResultsPage';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/items/:id" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

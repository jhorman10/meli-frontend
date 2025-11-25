import React from 'react';
import { ProductCardSkeleton } from '@/presentation/components/ProductCardSkeleton/ProductCardSkeleton';
import type { ProductDTO } from '@/application/dto/ProductDTO';
import { ProductCard } from '../ProductCard/ProductCard';

interface ProductListProps {
  products: ProductDTO[];
  isLoading?: boolean;
}

export const ProductList = React.memo<ProductListProps>(
  ({ products, isLoading = false }) => {
    if (isLoading) {
      return (
        <div className="space-y-6">
          {[...Array(6)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No se encontraron productos
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Intenta con otro término de búsqueda
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }
);

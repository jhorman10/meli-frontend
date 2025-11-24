import React from 'react';
import { Link } from 'react-router-dom';
import type { ProductDTO } from '@/application/dto/ProductDTO';
import { UI_STRINGS } from '@/shared/constants';

interface ProductCardProps {
  product: ProductDTO;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        {/* Imagen del Producto */}
        <Link
          to={`/items/${product.id}`}
          className="shrink-0 w-32 h-32 bg-gray-50 rounded-lg overflow-hidden"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </Link>

        {/* Información del Producto */}
        <div className="flex-1 min-w-0">
          {/* Insignia de Marca */}
          {product.title.toLowerCase().includes('apple') && (
            <div className="mb-2">
              <span className="inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                {UI_STRINGS.PRODUCT_CARD.APPLE_BADGE}
              </span>
            </div>
          )}

          {/* Título */}
          <Link
            to={`/items/${product.id}`}
            className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-2"
          >
            {product.title}
          </Link>

          {/* Sección de Precio */}
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xl font-bold text-gray-900">
              {product.formattedPrice}
            </p>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  {product.formattedOriginalPrice}
                </span>
                <span className="px-1.5 py-0.5 text-xs font-semibold text-green-700 bg-green-100 rounded">
                  {product.discountPercentage}% {UI_STRINGS.COMMON.OFF}
                </span>
              </>
            )}
          </div>

          {/* Calificación */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating!.average)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating.formattedAverage} ({product.rating.total})
              </span>
            </div>
          )}

          {/* Cuotas */}
          {product.installments && (
            <p className="text-sm text-gray-700 mb-1">
              {UI_STRINGS.PRODUCT_DETAIL.PRICING.SAME_PRICE_IN}{' '}
              {product.installments.quantity}{' '}
              {UI_STRINGS.PRODUCT_DETAIL.PRICING.INSTALLMENTS_OF}{' '}
              {product.installments.formattedAmount}
            </p>
          )}

          {/* Envío */}
          {product.freeShipping && (
            <div className="flex items-center gap-1 text-sm text-green-600">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
              <span className="font-medium">
                {UI_STRINGS.PRODUCT_CARD.FREE_SHIPPING}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

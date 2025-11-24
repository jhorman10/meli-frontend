import React from 'react';
import { UI_STRINGS } from '@/shared/constants';

interface ProductHeaderProps {
  condition: 'new' | 'used';
  soldQuantity: number;
  title: string;
  rating?: {
    average: number;
    total: number;
  };
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({
  condition,
  soldQuantity,
  title,
  rating,
}) => {
  return (
    <>
      {/* Estado del Producto */}
      <div className="mb-4">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {condition === 'new'
            ? UI_STRINGS.PRODUCT_DETAIL.STATUS.NEW
            : UI_STRINGS.PRODUCT_DETAIL.STATUS.USED}
        </span>
        {soldQuantity > 0 && (
          <span className="text-gray-600 text-sm ml-2">
            {soldQuantity} {UI_STRINGS.PRODUCT_DETAIL.STATUS.SOLD}
          </span>
        )}
      </div>

      {/* Título del Producto */}
      <h1 className="text-2xl font-bold mb-2">{title}</h1>

      {/* Calificación */}
      {rating && (
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(rating.average)
                    ? 'fill-current'
                    : 'fill-gray-300'
                }`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9.049 2.927a1 1 0 011.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {rating.average.toFixed(1)} ({rating.total})
          </span>
        </div>
      )}
    </>
  );
};

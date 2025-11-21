import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '@/domain/entities/Product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: product.currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscount = (): number => {
    if (!product.originalPrice || !product.price) return 0;
    return Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );
  };

  const discount = calculateDiscount();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        {/* Product Image */}
        <Link
          to={`/items/${product.id}`}
          className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-lg overflow-hidden"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Product Information */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Brand Badge - Optional */}
              <div className="flex items-center gap-2 mb-1">
                {product.title.includes('Apple') && (
                  <span className="text-xs font-semibold bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                    APPLE
                  </span>
                )}
              </div>

              {/* Product Title */}
              <Link to={`/items/${product.id}`}>
                <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">
                  {product.title}
                </h3>
              </Link>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                {discount > 0 && (
                  <span className="text-sm font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded">
                    {discount}% OFF
                  </span>
                )}
              </>
            )}
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating!.average)
                          ? 'fill-current'
                          : 'fill-gray-300'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-sm text-gray-600">
                  {product.rating.average.toFixed(1)} ({product.rating.total})
                </span>
              </div>
            </div>
          )}

          {/* Installments and Shipping */}
          <div className="mt-2">
            {product.installments && (
              <p className="text-sm text-gray-600">
                Mismo precio en {product.installments.quantity} cuotas de{' '}
                <span className="font-medium">
                  {formatPrice(product.installments.amount)}
                </span>
              </p>
            )}
            {product.freeShipping && (
              <p className="text-sm text-green-600 font-medium mt-1">
                <svg
                  className="w-4 h-4 inline mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                Envío gratis
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import type { ProductDTO } from '@/application/dto/ProductDTO';
import { UI_STRINGS } from '@/shared/constants';

interface ProductCardProps {
  product: ProductDTO;
}

export const ProductCard = React.memo<ProductCardProps>(({ product }) => {
  return (
    <div
      className="
        bg-white shadow-sm border border-gray-200 p-4
        h-[250px]           /* MOBILE */
        md:h-auto           /* DESKTOP */
        text-left
      "
      style={{ borderRadius: '4px' }}
      role="listitem"
    >
      <div className="flex flex-row items-start gap-4 h-full">
        {/* IMAGEN IZQUIERDA FIJA */}
        <Link
          to={`/items/${product.id}`}
          className="shrink-0 bg-gray-50 flex items-center justify-center overflow-hidden w-[40%]"
          style={{ height: '196px', borderRadius: '4px' }}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-contain mix-blend-multiply"
            loading="lazy"
          />
        </Link>

        {/* CONTENIDO */}
        <div className="flex-1 min-w-0 flex flex-col justify-between text-left">
          {/* TOP INFO */}
          <div className="text-left">
            {product.title && (
              <Link
                to={`/items/${product.id}`}
                className="text-base font-medium text-gray-900 leading-tight mb-1 block text-left line-clamp-2"
                title={product.title}
              >
                {product.title}
              </Link>
            )}

            {product.formattedPrice && (
              <p className="text-2xl font-bold text-gray-900 mb-1 text-left">
                {product.formattedPrice}
              </p>
            )}

            {product.installments && (
              <p className="text-sm text-green-700 mb-1 text-left truncate">
                {product.installments.quantity}x{' '}
                {product.installments.formattedAmount}{' '}
                {UI_STRINGS.PRODUCT_DETAIL.PRICING.SAME_PRICE_IN}
              </p>
            )}

            {product.discountPercentage > 0 && (
              <span className="inline-block text-[12px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded mb-1 text-left">
                {product.discountPercentage}% {UI_STRINGS.COMMON.OFF}
              </span>
            )}
          </div>

          {/* BOTTOM INFO */}
          <div className="text-left">
            {product.condition && (
              <p className="text-xs text-gray-600 mb-1 text-left">
                {product.condition === 'new'
                  ? UI_STRINGS.PRODUCT_CONDITIONS.NEW
                  : UI_STRINGS.PRODUCT_CONDITIONS.USED}
              </p>
            )}

            {product.installments && (
              <p className="text-sm text-gray-700 mb-1 truncate">
                {UI_STRINGS.PRODUCT_DETAIL.PRICING.SAME_PRICE_IN}{' '}
                {product.installments.quantity}{' '}
                {UI_STRINGS.PRODUCT_DETAIL.PRICING.INSTALLMENTS_OF}{' '}
                {product.installments.formattedAmount}
              </p>
            )}

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
    </div>
  );
});

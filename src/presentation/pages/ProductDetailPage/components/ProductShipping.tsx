import React from 'react';
import { UI_STRINGS } from '@/shared/constants';

interface ProductShippingProps {
  freeShipping: boolean;
}

export const ProductShipping: React.FC<ProductShippingProps> = ({
  freeShipping,
}) => {
  if (!freeShipping) return null;

  return (
    <div className="border-t border-b border-gray-200 py-4 mb-6">
      <div className="flex items-start mb-3">
        <svg
          className="w-5 h-5 text-green-600 mt-1 mr-2 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <h3 className="font-medium">
            {UI_STRINGS.PRODUCT_DETAIL.SHIPPING.FREE_TODAY}
          </h3>
          <p className="text-sm text-gray-600">
            {UI_STRINGS.PRODUCT_DETAIL.SHIPPING.ONLY_IN_CABA}
          </p>
          <p className="text-sm text-gray-600">
            {UI_STRINGS.PRODUCT_DETAIL.SHIPPING.BUY_WITHIN}
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <svg
          className="w-5 h-5 text-blue-600 mt-1 mr-2 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <div>
          <h3 className="font-medium">
            {UI_STRINGS.PRODUCT_DETAIL.SHIPPING.FREE_PICKUP}
          </h3>
          <button
            type="button"
            className="text-blue-600 hover:underline text-sm font-medium mt-1"
          >
            {UI_STRINGS.PRODUCT_DETAIL.SHIPPING.VIEW_MAP}
          </button>
        </div>
      </div>
    </div>
  );
};

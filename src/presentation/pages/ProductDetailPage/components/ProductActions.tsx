import React from 'react';
import { UI_STRINGS } from '@/shared/constants';

interface ProductActionsProps {
  onBuyNow?: () => void;
  onAddToCart?: () => void;
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  onBuyNow,
  onAddToCart,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        type="button"
        onClick={onBuyNow}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {UI_STRINGS.PRODUCT_DETAIL.ACTIONS.BUY_NOW}
      </button>
      <button
        type="button"
        onClick={onAddToCart}
        className="px-6 py-3 bg-blue-100 text-blue-600 font-medium rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {UI_STRINGS.PRODUCT_DETAIL.ACTIONS.ADD_TO_CART}
      </button>
    </div>
  );
};

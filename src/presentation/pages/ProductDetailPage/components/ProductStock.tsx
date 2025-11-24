import React from 'react';
import { UI_STRINGS } from '@/shared/constants';

interface ProductStockProps {
  availableQuantity: number;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export const ProductStock: React.FC<ProductStockProps> = ({
  availableQuantity,
  quantity,
  onQuantityChange,
}) => {
  return (
    <div className="mb-6">
      <p className="font-medium mb-2">
        {UI_STRINGS.PRODUCT_DETAIL.STOCK.AVAILABLE}
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        <label htmlFor="quantity" className="text-gray-600">
          {UI_STRINGS.PRODUCT_DETAIL.STOCK.QUANTITY}
        </label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) => onQuantityChange(Number(e.target.value))}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5"
        >
          {[...Array(Math.min(availableQuantity, 10))].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}{' '}
              {i === 0
                ? UI_STRINGS.PRODUCT_DETAIL.STOCK.UNIT
                : UI_STRINGS.PRODUCT_DETAIL.STOCK.UNITS}
            </option>
          ))}
        </select>
        <span className="text-gray-600">
          ({availableQuantity} {UI_STRINGS.PRODUCT_DETAIL.STOCK.AVAILABLE_COUNT}
          )
        </span>
      </div>
    </div>
  );
};

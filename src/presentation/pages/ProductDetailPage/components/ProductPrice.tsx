import React from 'react';
import { UI_STRINGS } from '@/shared/constants';
import {
  formatPrice,
  calculateDiscount,
  calculatePriceWithoutTax,
} from '@/shared/utils';

interface ProductPriceProps {
  price: number;
  originalPrice?: number;
  currency: string;
  installments?: {
    quantity: number;
    amount: number;
  };
}

export const ProductPrice: React.FC<ProductPriceProps> = ({
  price,
  originalPrice,
  currency,
  installments,
}) => {
  const discount = originalPrice ? calculateDiscount(originalPrice, price) : 0;

  return (
    <div className="mb-6">
      <div className="flex items-baseline mb-1">
        <span className="text-3xl font-bold">
          {formatPrice(price, currency)}
        </span>
        {discount > 0 && (
          <span className="ml-2 text-green-600 font-medium">
            {discount}% {UI_STRINGS.COMMON.OFF}
          </span>
        )}
      </div>
      {originalPrice && (
        <div className="text-gray-500 line-through">
          {formatPrice(originalPrice, currency)}
        </div>
      )}
      {installments && (
        <div className="text-gray-600 mt-2">
          {UI_STRINGS.PRODUCT_DETAIL.PRICING.SAME_PRICE_IN}{' '}
          {installments.quantity}{' '}
          {UI_STRINGS.PRODUCT_DETAIL.PRICING.INSTALLMENTS_OF}{' '}
          <span className="font-medium">
            {formatPrice(installments.amount, currency)}
          </span>
        </div>
      )}
      <div className="text-gray-600 mt-1">
        {UI_STRINGS.PRODUCT_DETAIL.PRICING.PRICE_WITHOUT_TAX}{' '}
        <span className="font-medium">
          {formatPrice(calculatePriceWithoutTax(price), currency)}
        </span>
      </div>
    </div>
  );
};

import React from 'react';
import { UI_STRINGS } from '@/shared/constants';

export const ProductPaymentMethods: React.FC = () => {
  return (
    <div className="mb-6">
      <button
        type="button"
        className="text-blue-600 hover:underline text-sm font-medium"
      >
        {UI_STRINGS.PRODUCT_DETAIL.PAYMENT_METHODS.VIEW}
      </button>
    </div>
  );
};

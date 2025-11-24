import React from 'react';
import { UI_STRINGS } from '@/shared/constants';

interface ProductBreadcrumbProps {
  title: string;
}

export const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({
  title,
}) => {
  return (
    <div className="text-sm text-gray-500 mb-4">
      <span>{UI_STRINGS.PRODUCT_DETAIL.BREADCRUMB.HOME}</span> &gt;{' '}
      <span>{UI_STRINGS.PRODUCT_DETAIL.BREADCRUMB.PRODUCTS}</span> &gt;{' '}
      <span>{title.split(' ')[0]}</span>
    </div>
  );
};

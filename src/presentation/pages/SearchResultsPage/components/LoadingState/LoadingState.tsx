import React from 'react';
import { ProductList } from '@/presentation/components/ProductList/ProductList';

export const LoadingState: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <ProductList products={[]} isLoading={true} />
    </div>
  );
};

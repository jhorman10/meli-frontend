import React from 'react';
import { Link } from 'react-router-dom';
import { UI_STRINGS } from '@/shared/constants';

interface ProductErrorStateProps {
  error: Error;
}

export const ProductErrorState: React.FC<ProductErrorStateProps> = ({
  error,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {UI_STRINGS.COMMON.ERROR}
        </h1>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <Link to="/" className="text-blue-600 underline">
          {UI_STRINGS.COMMON.BACK_TO_HOME}
        </Link>
      </div>
    </div>
  );
};

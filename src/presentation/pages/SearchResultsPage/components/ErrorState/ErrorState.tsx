import React from 'react';
import { UI_STRINGS } from '@/shared/constants';

interface ErrorStateProps {
  error: Error;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {UI_STRINGS.SEARCH.ERROR_TITLE}
        </h1>
        <p className="text-gray-600">{error.message}</p>
      </div>
    </div>
  );
};

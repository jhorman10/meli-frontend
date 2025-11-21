import React from 'react';

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto p-4 space-y-4 animate-pulse">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Image placeholder */}
          <div className="w-full lg:w-1/2 h-64 bg-gray-200 rounded"></div>
          {/* Text placeholders */}
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
        {/* Additional detail placeholders */}
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        <div className="h-4 bg-gray-200 rounded w-3/6"></div>
      </div>
    </div>
  );
};

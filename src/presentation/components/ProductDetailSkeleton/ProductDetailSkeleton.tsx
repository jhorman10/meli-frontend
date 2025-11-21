import React from 'react';

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-[70%_30%] gap-10 animate-pulse">
      {/* LEFT COLUMN */}
      <div className="flex flex-col gap-10">
        {/* Gallery skeleton */}
        <div className="grid grid-cols-[30%_70%] gap-6">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded" />
            ))}
          </div>

          {/* Main image */}
          <div className="bg-gray-200 rounded-lg h-[600px]" />
        </div>

        {/* Description skeleton */}
        <div className="border border-gray-200 rounded-lg p-8 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="border border-gray-200 rounded-lg p-6 space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-8 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-12 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-10 bg-gray-200 rounded w-full" />
        <div className="h-10 bg-gray-200 rounded w-full" />
      </div>
    </div>
  );
};

import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-sm shadow-sm border border-gray-200 p-5 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        {/* Esqueleto de imagen */}
        <div className="shrink-0 w-32 h-32 bg-gray-200 rounded" />

        {/* Esqueleto de información del producto */}
        <div className="flex-1 space-y-3">
          {/* Insignia de marca */}
          <div className="h-5 bg-gray-200 rounded w-20" />

          {/* Título */}
          <div className="space-y-2">
            <div className="h-5 bg-gray-200 rounded w-full" />
            <div className="h-5 bg-gray-200 rounded w-3/4" />
          </div>

          {/* Precio */}
          <div className="flex items-center gap-2">
            <div className="h-7 bg-gray-200 rounded w-32" />
            <div className="h-5 bg-gray-200 rounded w-20" />
            <div className="h-5 bg-gray-200 rounded w-16" />
          </div>

          {/* Calificación */}
          <div className="h-4 bg-gray-200 rounded w-40" />

          {/* Cuotas y envío */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-56" />
            <div className="h-4 bg-gray-200 rounded w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

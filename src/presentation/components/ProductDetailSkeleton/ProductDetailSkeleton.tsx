import React from 'react';

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 animate-pulse">
      {/* Esqueleto de migas de pan */}
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />

      <div className="flex flex-col md:flex-row gap-8">
        {/* COLUMNA IZQUIERDA - Imágenes */}
        <div className="md:w-1/2">
          <div className="bg-white p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Miniaturas */}
              <div className="flex md:flex-col gap-2 order-2 md:order-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-16 h-16 bg-gray-200 rounded-md" />
                ))}
              </div>

              {/* Imagen Principal */}
              <div className="w-full md:w-auto flex-1 order-1 md:order-2">
                <div className="bg-gray-200 h-80 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA - Información del Producto */}
        <div className="md:w-1/2 rounded-lg shadow-sm m-4 p-4 space-y-4">
          {/* Insignia de estado */}
          <div className="h-6 bg-gray-200 rounded w-32" />

          {/* Título */}
          <div className="h-8 bg-gray-200 rounded w-full" />

          {/* Calificación */}
          <div className="h-5 bg-gray-200 rounded w-40" />

          {/* Precios */}
          <div className="space-y-2">
            <div className="h-10 bg-gray-200 rounded w-48" />
            <div className="h-4 bg-gray-200 rounded w-32" />
            <div className="h-4 bg-gray-200 rounded w-56" />
            <div className="h-4 bg-gray-200 rounded w-64" />
          </div>

          {/* Enlace de métodos de pago */}
          <div className="h-4 bg-gray-200 rounded w-40" />

          {/* Envío */}
          <div className="border-t border-b border-gray-200 py-4 space-y-3">
            <div className="flex gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-40" />
                <div className="h-3 bg-gray-200 rounded w-48" />
                <div className="h-3 bg-gray-200 rounded w-56" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-32" />
              </div>
            </div>
          </div>

          {/* Selector de stock */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32" />
            <div className="h-10 bg-gray-200 rounded w-full" />
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="h-12 bg-gray-200 rounded-lg flex-1" />
            <div className="h-12 bg-gray-200 rounded-lg flex-1" />
          </div>
        </div>
      </div>

      {/* Esqueleto de la sección de descripción */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-32" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="h-5 bg-gray-200 rounded w-48" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
};

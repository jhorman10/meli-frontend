import React from 'react';
import { useImageLightbox } from '../../../application/hooks/useImageLightbox';

interface ImageLightboxProps {
  images: { id: string; url: string }[];
  initialIndex: number;
  onClose: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  initialIndex,
  onClose,
}) => {
  const { currentIndex, isZoomed, handleNext, handlePrev, toggleZoom } =
    useImageLightbox({
      images,
      initialIndex,
      onClose,
    });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Botón de Cerrar */}
      <button
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 p-2"
        onClick={onClose}
        aria-label="Cerrar lightbox"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Botones de Navegación */}
      {images.length > 1 && (
        <>
          <button
            className="absolute left-2 md:left-4 text-white hover:text-gray-300 z-50 p-3 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm transition-colors"
            onClick={handlePrev}
            aria-label="Imagen anterior"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 md:h-10 md:w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="absolute right-2 md:right-4 text-white hover:text-gray-300 z-50 p-3 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm transition-colors"
            onClick={handleNext}
            aria-label="Siguiente imagen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 md:h-10 md:w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Contenedor de Imagen */}
      <div
        className="relative w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`relative transition-transform duration-300 ease-out cursor-zoom-in ${
            isZoomed ? 'cursor-zoom-out scale-150' : ''
          }`}
          onClick={toggleZoom}
          style={{
            maxWidth: isZoomed ? 'none' : '100%',
            maxHeight: isZoomed ? 'none' : '100%',
          }}
        >
          <img
            src={images[currentIndex].url}
            alt={`Vista de producto ${currentIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain select-none"
            draggable={false}
          />
        </div>
      </div>

      {/* Contador de Imágenes */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

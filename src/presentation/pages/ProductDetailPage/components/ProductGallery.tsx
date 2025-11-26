import React from 'react';

interface ProductGalleryProps {
  pictures: { id: string; url: string }[];
  thumbnail: string;
  title: string;
  selectedImage: { id?: string; url: string } | null;
  onImageSelect: (image: { id?: string; url: string }) => void;
}

import { ImageLightbox } from '@/presentation/components/ImageLightbox/ImageLightbox';

export const ProductGallery = React.memo<ProductGalleryProps>(
  ({ pictures, thumbnail, title, selectedImage, onImageSelect }) => {
    const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);

    // Memoizamos las imágenes a mostrar (máximo 4) para evitar re-cálculos innecesarios
    const displayPictures = React.useMemo(
      () => pictures.slice(0, 4),
      [pictures]
    );

    // Determinar índice de imagen actual para el lightbox
    const currentImageIndex = React.useMemo(() => {
      const currentId = selectedImage?.id;
      if (!currentId) return 0;
      return pictures.findIndex((p) => p.id === currentId);
    }, [selectedImage, pictures]);

    return (
      <div className="bg-white p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Miniaturas */}
          <div className="flex md:flex-col gap-2 order-2 md:order-1">
            {displayPictures.map((picture) => (
              <button
                key={picture.id}
                onClick={() =>
                  onImageSelect({ id: picture.id, url: picture.url })
                }
                className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                  selectedImage?.id === picture.id
                    ? 'border-blue-500'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={picture.url}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          {/* Imagen Principal */}
          <div className="w-full md:w-auto flex-1 order-1 md:order-2">
            <div
              className="bg-gray-100 h-80 rounded-lg flex items-center justify-center p-4 cursor-zoom-in group relative"
              onClick={() => setIsLightboxOpen(true)}
            >
              <img
                src={selectedImage?.url || thumbnail}
                alt={title}
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-2 right-2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {isLightboxOpen && (
          <ImageLightbox
            images={pictures}
            initialIndex={currentImageIndex !== -1 ? currentImageIndex : 0}
            onClose={() => setIsLightboxOpen(false)}
          />
        )}
      </div>
    );
  }
);

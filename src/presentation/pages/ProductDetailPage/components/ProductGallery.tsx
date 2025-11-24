import React from 'react';

interface ProductGalleryProps {
  pictures: { id: string; url: string }[];
  thumbnail: string;
  title: string;
  selectedImage: string;
  onImageSelect: (url: string) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  pictures,
  thumbnail,
  title,
  selectedImage,
  onImageSelect,
}) => {
  return (
    <div className="bg-white p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Miniaturas */}
        <div className="flex md:flex-col gap-2 order-2 md:order-1">
          {pictures.slice(0, 4).map((picture) => (
            <button
              key={picture.id}
              onClick={() => onImageSelect(picture.url)}
              className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                selectedImage === picture.url
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
          <div className="bg-gray-100 h-80 rounded-lg flex items-center justify-center p-4">
            <img
              src={selectedImage || thumbnail}
              alt={title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

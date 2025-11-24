import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { ProductDetailSkeleton } from '@/presentation/components/ProductDetailSkeleton/ProductDetailSkeleton';
import { useProductDetailPage } from '@/application/hooks/useProductDetailPage';
import { UI_STRINGS } from '@/shared/constants';
import {
  ProductBreadcrumb,
  ProductGallery,
  ProductHeader,
  ProductPrice,
  ProductPaymentMethods,
  ProductShipping,
  ProductStock,
  ProductActions,
  ProductDescription,
} from './components';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    product,
    isLoading,
    error,
    selectedImage,
    setSelectedImage,
    quantity,
    setQuantity,
  } = useProductDetailPage(id ?? '');

  if (isLoading) return <ProductDetailSkeleton />;

  if (error) {
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
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {UI_STRINGS.PRODUCT_DETAIL.NOT_FOUND}
          </h1>
          <Link to="/" className="text-blue-600 underline">
            {UI_STRINGS.COMMON.BACK_TO_HOME}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <ProductBreadcrumb title={product.title} />

      <div className="flex flex-col md:flex-row gap-8">
        {/* ================= COLUMNA IZQUIERDA - Imágenes del Producto ================= */}
        <div className="md:w-1/2">
          <ProductGallery
            pictures={product.pictures}
            thumbnail={product.thumbnail}
            title={product.title}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
          />
        </div>

        {/* ================= COLUMNA DERECHA - Información del Producto ================= */}
        <div className="md:w-1/2 rounded-lg shadow-sm m-4 p-4 text-left">
          <ProductHeader
            condition={product.condition}
            soldQuantity={product.soldQuantity}
            title={product.title}
            rating={product.rating}
          />

          <ProductPrice
            price={product.price}
            originalPrice={product.originalPrice}
            currency={product.currency}
            installments={product.installments}
          />

          <ProductPaymentMethods />

          <ProductShipping freeShipping={product.freeShipping} />

          <ProductStock
            availableQuantity={product.availableQuantity}
            quantity={quantity}
            onQuantityChange={setQuantity}
          />

          <ProductActions
            onBuyNow={() => console.log('Buy now clicked')}
            onAddToCart={() => console.log('Add to cart clicked')}
          />
        </div>
      </div>

      <ProductDescription
        description={product.description}
        attributes={product.attributes}
      />
    </div>
  );
};

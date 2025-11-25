import React from 'react';
import { useParams } from 'react-router-dom';

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
  ProductErrorState,
  ProductNotFoundState,
} from './components';
import { SEO } from '@/presentation/components/SEO/SEO';

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
    return <ProductErrorState error={error} />;
  }

  if (!product) {
    return <ProductNotFoundState />;
  }

  const conditionLabel =
    product.condition === 'new'
      ? UI_STRINGS.PRODUCT_CONDITIONS.NEW
      : UI_STRINGS.PRODUCT_CONDITIONS.USED;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <SEO
        title={`${product.title} | Me-Li`}
        description={`Compre ${product.title} a un excelente precio en Me-Li. ${conditionLabel}.`}
      />
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
        <div className="md:w-1/2 bg-white rounded-lg shadow-sm m-4 p-4 text-left">
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

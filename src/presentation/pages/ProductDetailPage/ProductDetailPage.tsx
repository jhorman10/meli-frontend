import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductAPI } from '@/infrastructure/api/ProductAPI';
import type { ProductDetails } from '@/domain/entities/Product';
import { ProductDetailSkeleton } from '@/presentation/components/ProductDetailSkeleton/ProductDetailSkeleton';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        setError(null);
        const productAPI = new ProductAPI();
        const data = await productAPI.getById(id);
        setProduct(data);
        setSelectedImage(data.pictures[0]?.url || data.thumbnail);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Error al cargar el producto'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscount = (): number => {
    if (!product?.originalPrice || !product?.price) return 0;
    return Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );
  };

  if (isLoading) return <ProductDetailSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/" className="text-blue-600 underline">
            Volver al inicio
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
            Producto no encontrado
          </h1>
          <Link to="/" className="text-blue-600 underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const discount = calculateDiscount();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-[70%_30%] gap-10">
      {/* ================= LEFT COLUMN (70%) ================= */}
      <div className="flex flex-col gap-10">
        {/* Thumbnails (30%) + Main Image (70%) */}
        <div className="grid grid-cols-[30%_70%] gap-6">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {product.pictures.slice(0, 7).map((picture) => (
              <button
                key={picture.id}
                onClick={() => setSelectedImage(picture.url)}
                className={`aspect-square rounded border overflow-hidden transition-all ${
                  selectedImage === picture.url
                    ? 'border-blue-500'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <img src={picture.url} className="w-full h-full object-cover" />
              </button>
            ))}

            {product.pictures.length > 7 && (
              <div className="aspect-square rounded border border-gray-300 bg-gray-100 flex items-center justify-center text-gray-500 text-xs">
                +{product.pictures.length - 7}
              </div>
            )}
          </div>

          {/* Main Image */}
          <div className="bg-white border border-gray-200 rounded-lg p-10 flex items-center justify-center h-[600px]">
            <img
              src={selectedImage || product.thumbnail}
              alt={product.title}
              className="max-h-full object-contain"
            />
          </div>
        </div>

        {/* Descripción */}
        {product.description?.plain_text && (
          <div className="border border-gray-200 rounded-lg p-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Descripción
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {product.description.plain_text}
            </p>
          </div>
        )}
      </div>

      {/* ================= RIGHT COLUMN (30%) ================= */}
      <div className="border border-gray-200 rounded-lg p-6 h-fit">
        {/* Condition & Sales */}
        <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
          {product.condition === 'new' && <span>Nuevo</span>}
          {product.soldQuantity > 0 && (
            <>
              <span className="text-gray-300">|</span>
              <span>{product.soldQuantity} vendidos</span>
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-light text-gray-900 mb-4">
          {product.title}
        </h1>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating!.average)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating.average.toFixed(1)}
            </span>
            <span className="text-sm text-gray-400">
              ({product.rating.total})
            </span>
          </div>
        )}

        {/* Pricing */}
        <div className="mb-6">
          {product.originalPrice && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              {discount > 0 && (
                <span className="text-green-600 font-semibold">
                  {discount}% OFF
                </span>
              )}
            </div>
          )}

          <div className="text-[2.8rem] font-light text-gray-900 leading-none">
            {formatPrice(product.price)}
          </div>

          {product.installments && (
            <p className="text-base text-gray-600 mt-2">
              en {product.installments.quantity}x{' '}
              {formatPrice(product.installments.amount)}
            </p>
          )}
        </div>

        {/* Shipping */}
        {product.freeShipping && (
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-start gap-2">
              <svg
                className="w-6 h-6 text-[#00a650]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
              <div>
                <p className="text-[#00a650] font-semibold">Llega gratis hoy</p>
                <p className="text-sm text-gray-600">
                  Solo en CABA y zonas de GBA
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stock */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-1">Stock disponible</p>
          <div className="flex items-center gap-3">
            <span className="font-medium">1 unidad</span>
            {product.availableQuantity > 1 && (
              <span className="text-sm text-gray-500">
                ({product.availableQuantity} disponibles)
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3 mb-8">
          <button className="w-full bg-[#3483fa] hover:bg-[#2968c8] text-white font-medium py-3 rounded transition">
            Comprar ahora
          </button>

          <button className="w-full bg-[#e8f0fe] hover:bg-[#d7e3fd] text-[#3483fa] font-medium py-3 rounded transition">
            Agregar al carrito
          </button>
        </div>

        {/* Characteristics */}
        {product.attributes && product.attributes.length > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-base font-medium text-gray-900 mb-3">
              Características principales
            </h3>
            <dl className="space-y-2">
              {product.attributes.slice(0, 6).map((attr) => (
                <div key={attr.id} className="grid grid-cols-2 gap-4 text-sm">
                  <dt className="text-gray-600">{attr.name}</dt>
                  <dd className="text-gray-900">{attr.value_name}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
};

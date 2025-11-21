import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ProductAPI } from '@/infrastructure/api/ProductAPI';
import type { ProductDetails } from '@/domain/entities/Product';
import { ProductDetailSkeleton } from '@/presentation/components/ProductDetailSkeleton/ProductDetailSkeleton';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        const productAPI = new ProductAPI();
        const productData = await productAPI.getById(id);
        setProduct(productData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Error al cargar el producto'
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: product?.currency || 'ARS',
    }).format(price);
  };

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/" className="btn-primary">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Producto no encontrado
          </h1>
          <Link to="/" className="btn-primary">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver a la búsqueda
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="aspect-square bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>

            {product.pictures.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.pictures.map((picture) => (
                  <img
                    key={picture.id}
                    src={picture.url}
                    alt={`Imagen ${picture.id}`}
                    className="aspect-square bg-white rounded border border-gray-200 cursor-pointer hover:border-primary-500"
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="ml-3 text-xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {product.installments && (
                <p className="text-gray-600">
                  en {product.installments.quantity}x{' '}
                  {formatPrice(product.installments.amount)}
                </p>
              )}
            </div>

            <div className="space-y-4 mb-6">
              {product.condition === 'new' && (
                <div className="flex items-center">
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    Nuevo
                  </span>
                </div>
              )}

              {product.freeShipping && (
                <div className="flex items-center text-green-600">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  Envío gratis
                </div>
              )}

              {product.rating && (
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating!.average) ? 'fill-current' : 'fill-gray-300'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">
                    {product.rating.average.toFixed(1)} ({product.rating.total}{' '}
                    opiniones)
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Características principales
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  {product.attributes?.map((attr) => (
                    <div key={attr.id} className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        {attr.name}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {attr.value_name}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Descripción
              </h3>
              <p className="text-gray-600 whitespace-pre-line mb-6">
                {product.description?.plain_text}
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Información del producto
              </h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Condición:</dt>
                  <dd className="font-medium">
                    {product.condition === 'new' ? 'Nuevo' : 'Usado'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Disponibles:</dt>
                  <dd className="font-medium">
                    {product.availableQuantity} unidades
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Vendidos:</dt>
                  <dd className="font-medium">
                    {product.soldQuantity} unidades
                  </dd>
                </div>
                {product.warranty && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Garantía:</dt>
                    <dd className="font-medium">{product.warranty}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="mt-8 space-y-3">
              <button className="w-full btn-primary text-lg py-3">
                Comprar ahora
              </button>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors">
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

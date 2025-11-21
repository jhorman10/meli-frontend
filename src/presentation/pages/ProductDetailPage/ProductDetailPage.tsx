import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { ProductDetailSkeleton } from '@/presentation/components/ProductDetailSkeleton/ProductDetailSkeleton';
import {
  formatPrice,
  calculateDiscount,
  calculatePriceWithoutTax,
} from '@/shared/utils';
import { useProductDetailPage } from '@/application/hooks/useProductDetailPage';

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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-4">{error.message}</p>
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

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <span>Inicio</span> &gt; <span>Productos</span> &gt;{' '}
        <span>{product.title.split(' ')[0]}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* ================= LEFT COLUMN - Product Images ================= */}
        <div className="md:w-1/2">
          <div className="bg-white p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-2 order-2 md:order-1">
                {product.pictures.slice(0, 4).map((picture) => (
                  <button
                    key={picture.id}
                    onClick={() => setSelectedImage(picture.url)}
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
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="w-full md:w-auto flex-1 order-1 md:order-2">
                <div className="bg-gray-100 h-80 rounded-lg flex items-center justify-center p-4">
                  <img
                    src={selectedImage || product.thumbnail}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN - Product Info ================= */}
        <div className="md:w-1/2 rounded-lg shadow-sm m-4 p-4 text-left">
          {/* Product Status */}
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {product.condition === 'new' ? 'Nuevo' : 'Usado'}
            </span>
            {product.soldQuantity > 0 && (
              <span className="text-gray-600 text-sm ml-2">
                {product.soldQuantity} vendidos
              </span>
            )}
          </div>

          {/* Product Title */}
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating!.average)
                        ? 'fill-current'
                        : 'fill-gray-300'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating.average.toFixed(1)} ({product.rating.total})
              </span>
            </div>
          )}

          {/* Pricing */}
          <div className="mb-6">
            <div className="flex items-baseline mb-1">
              <span className="text-3xl font-bold">
                {formatPrice(product.price, product.currency)}
              </span>
              {discount > 0 && (
                <span className="ml-2 text-green-600 font-medium">
                  {discount}% OFF
                </span>
              )}
            </div>
            {product.originalPrice && (
              <div className="text-gray-500 line-through">
                {formatPrice(product.originalPrice, product.currency)}
              </div>
            )}
            {product.installments && (
              <div className="text-gray-600 mt-2">
                Mismo precio en {product.installments.quantity} cuotas de{' '}
                <span className="font-medium">
                  {formatPrice(product.installments.amount, product.currency)}
                </span>
              </div>
            )}
            <div className="text-gray-600 mt-1">
              Precio sin impuestos nacionales:{' '}
              <span className="font-medium">
                {formatPrice(
                  calculatePriceWithoutTax(product.price),
                  product.currency
                )}
              </span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <button
              type="button"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Ver los medios de pago
            </button>
          </div>

          {/* Shipping */}
          {product.freeShipping && (
            <div className="border-t border-b border-gray-200 py-4 mb-6">
              <div className="flex items-start mb-3">
                <svg
                  className="w-5 h-5 text-green-600 mt-1 mr-2 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-medium">Llega gratis hoy</h3>
                  <p className="text-sm text-gray-600">
                    Solo en CABA y zonas de GBA
                  </p>
                  <p className="text-sm text-gray-600">
                    Comprando dentro de las próximas 2h 27 min
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-600 mt-1 mr-2 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-medium">
                    Retirá gratis a partir del jueves en correos y otros puntos
                  </h3>
                  <button
                    type="button"
                    className="text-blue-600 hover:underline text-sm font-medium mt-1"
                  >
                    Ver en el mapa
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stock */}
          <div className="mb-6">
            <p className="font-medium mb-2">Stock disponible</p>
            <div className="flex items-center gap-2 flex-wrap">
              <label htmlFor="quantity" className="text-gray-600">
                Cantidad:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5"
              >
                {[...Array(Math.min(product.availableQuantity, 10))].map(
                  (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'unidad' : 'unidades'}
                    </option>
                  )
                )}
              </select>
              <span className="text-gray-600">
                ({product.availableQuantity} disponibles)
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Comprar ahora
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-blue-100 text-blue-600 font-medium rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      {/* Product Description */}
      {product.description?.plainText && (
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Descripción</h2>
          <p className="text-gray-700 mb-4 whitespace-pre-line">
            {product.description.plainText}
          </p>
          {product.attributes && product.attributes.length > 0 && (
            <div className="border-t border-gray-200 mt-4 pt-4">
              <h3 className="font-medium mb-2">Características principales:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {product.attributes.slice(0, 6).map((attr) => (
                  <li key={attr.id}>
                    <span className="font-medium">{attr.name}:</span>{' '}
                    {attr.valueName}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

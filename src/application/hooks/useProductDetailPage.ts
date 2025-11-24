import { useState, useEffect } from 'react';
import { getProductService } from '@/application/di/providers';
import type { ProductDetailsDTO } from '@/application/dto/ProductDTO';
import { ERROR_MESSAGES } from '@/shared/constants';

/**
 * Hook personalizado que encapsula toda la lógica de la página de detalle del producto:
 *   • Obtiene datos del producto vía ProductService
 *   • Maneja el estado de carga / error
 *   • Maneja la imagen seleccionada para la galería
 *   • Maneja la selección de cantidad
 *
 * El componente puede permanecer puramente presentacional y simplemente renderizar los valores
 * retornados por este hook.
 */
export const useProductDetailPage = (productId: string) => {
  const [product, setProduct] = useState<ProductDetailsDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const productService = getProductService();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError(new Error(ERROR_MESSAGES.PRODUCT.INVALID_ID));
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const details = await productService.getProductById(productId);
        setProduct(details);
        setSelectedImage(details.pictures[0]?.url || details.thumbnail);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error(ERROR_MESSAGES.PRODUCT.UNKNOWN)
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId, productService]);

  return {
    product,
    isLoading,
    error,
    selectedImage,
    setSelectedImage,
    quantity,
    setQuantity,
  };
};

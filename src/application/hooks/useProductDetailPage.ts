import { useState, useEffect } from 'react';
import { getProductService } from '@/application/di/providers';
import type { ProductDetailsDTO } from '@/application/dto/ProductDTO';
import { ERROR_MESSAGES } from '@/shared/constants';

/**
 * Custom hook that encapsulates all product‑detail page logic:
 *   • Fetches product data via ProductService
 *   • Manages loading / error state
 *   • Handles selected image for the gallery
 *   • Manages quantity selection
 *
 * The component can stay purely presentational and simply render the values
 * returned by this hook.
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

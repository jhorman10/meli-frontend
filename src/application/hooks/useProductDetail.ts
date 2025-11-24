import { useState, useEffect } from 'react';
import { getProductService } from '../di/providers';
import type { ProductDetailsDTO } from '../dto/ProductDTO';

interface UseProductDetailReturn {
  product: ProductDetailsDTO | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook useProductDetail
 * Obtiene detalles del producto por ID usando ProductService
 * Retorna ProductDetailsDTO para la capa de presentación
 */
export const useProductDetail = (productId: string): UseProductDetailReturn => {
  const [product, setProduct] = useState<ProductDetailsDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const productService = getProductService();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError(new Error('ID de producto inválido'));
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const productDetails = await productService.getProductById(productId);
        setProduct(productDetails);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error desconocido'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId, productService]);

  return { product, isLoading, error };
};

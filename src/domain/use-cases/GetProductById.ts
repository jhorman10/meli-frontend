import type { ProductRepository } from '@/domain/repositories/ProductRepository';
import type { ProductDetails } from '@/domain/entities/Product';

/**
 * GetProductById Use Case
 * Retrieves detailed product information by ID
 */
export class GetProductById {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string): Promise<ProductDetails> {
    // Validate ID
    if (!id || !id.trim()) {
      throw new Error('El ID del producto es requerido');
    }

    // Get product details
    const product = await this.productRepository.getById(id);

    if (!product) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    return product;
  }
}

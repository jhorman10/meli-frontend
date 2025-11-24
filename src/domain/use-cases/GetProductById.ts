import type { ProductRepository } from '@/domain/repositories/ProductRepository';
import type { ProductDetails } from '@/domain/entities/Product';

/**
 * Caso de Uso GetProductById
 * Recupera información detallada del producto por ID
 */
export class GetProductById {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string): Promise<ProductDetails> {
    // Validar ID
    if (!id || !id.trim()) {
      throw new Error('El ID del producto es requerido');
    }

    // Obtener detalles del producto
    const product = await this.productRepository.getById(id);

    if (!product) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    return product;
  }
}

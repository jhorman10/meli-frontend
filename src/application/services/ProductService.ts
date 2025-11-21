import type { ProductRepository } from '@/domain/repositories/ProductRepository';
import { GetProductById } from '@/domain/use-cases/GetProductById';
import { ProductMapper } from '../mappers/ProductMapper';
import type { ProductDetailsDTO } from '../dto/ProductDTO';

/**
 * ProductService
 * Application service for product-related operations
 * Orchestrates use cases and handles DTO mapping
 */
export class ProductService {
  private getProductByIdUseCase: GetProductById;

  constructor(productRepository: ProductRepository) {
    this.getProductByIdUseCase = new GetProductById(productRepository);
  }

  /**
   * Get product details by ID
   * Returns ProductDetailsDTO for presentation layer
   */
  async getProductById(id: string): Promise<ProductDetailsDTO> {
    try {
      const product = await this.getProductByIdUseCase.execute(id);
      return ProductMapper.toDetailsDTO(product);
    } catch (error) {
      // Transform domain errors to application-level errors
      if (error instanceof Error) {
        throw new Error(`Error al obtener el producto: ${error.message}`);
      }
      throw new Error('Error desconocido al obtener el producto');
    }
  }
}

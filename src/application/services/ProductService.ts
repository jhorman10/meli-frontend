import type { ProductRepository } from '@/domain/repositories/ProductRepository';
import { GetProductById } from '@/domain/use-cases/GetProductById';
import { ProductMapper } from '../mappers/ProductMapper';
import type { ProductDetailsDTO } from '../dto/ProductDTO';
import { ERROR_MESSAGES } from '@/shared/constants';

/**
 * ProductService
 * Servicio de aplicación para operaciones relacionadas con productos
 * Orquesta casos de uso y maneja el mapeo de DTOs
 */
export class ProductService {
  private getProductByIdUseCase: GetProductById;

  constructor(productRepository: ProductRepository) {
    this.getProductByIdUseCase = new GetProductById(productRepository);
  }

  /**
   * Obtener detalles del producto por ID
   * Retorna ProductDetailsDTO para la capa de presentación
   */
  async getProductById(id: string): Promise<ProductDetailsDTO> {
    try {
      const product = await this.getProductByIdUseCase.execute(id);
      return ProductMapper.toDetailsDTO(product);
    } catch (error) {
      // Transformar errores de dominio a errores de nivel de aplicación
      if (error instanceof Error) {
        throw new Error(
          `${ERROR_MESSAGES.PRODUCT.FETCH_ERROR}: ${error.message}`
        );
      }
      throw new Error(ERROR_MESSAGES.PRODUCT.UNKNOWN_ERROR);
    }
  }
}

import type {
  ProductRepository,
  SearchParams,
} from '@/domain/repositories/ProductRepository';
import { SearchProducts } from '@/domain/use-cases/SearchProducts';
import { SearchResultMapper } from '../mappers/SearchResultMapper';
import type { SearchResultDTO, SearchParamsDTO } from '../dto/SearchResultDTO';

/**
 * SearchService
 * Servicio de aplicación para operaciones de búsqueda
 * Orquesta casos de uso de búsqueda y maneja el mapeo de DTOs
 */
export class SearchService {
  private searchProductsUseCase: SearchProducts;

  constructor(productRepository: ProductRepository) {
    this.searchProductsUseCase = new SearchProducts(productRepository);
  }

  /**
   * Buscar productos
   * Retorna SearchResultDTO para la capa de presentación
   */
  async searchProducts(params: SearchParamsDTO): Promise<SearchResultDTO> {
    try {
      // Convertir parámetros DTO a parámetros de dominio
      const domainParams: SearchParams =
        SearchResultMapper.toDomainParams(params);

      // Ejecutar caso de uso
      const searchResult =
        await this.searchProductsUseCase.execute(domainParams);

      // Mapear a DTO
      return SearchResultMapper.toDTO(searchResult, domainParams);
    } catch (error) {
      // Transformar errores de dominio a errores de nivel de aplicación
      if (error instanceof Error) {
        throw new Error(`Error en la búsqueda: ${error.message}`);
      }
      throw new Error('Error desconocido en la búsqueda');
    }
  }

  /**
   * Búsqueda rápida solo con una cadena de consulta
   * Método de conveniencia para búsquedas simples
   */
  async quickSearch(
    query: string,
    limit: number = 20
  ): Promise<SearchResultDTO> {
    return this.searchProducts({ query, limit });
  }
}

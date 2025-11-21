import type {
  ProductRepository,
  SearchParams,
} from '@/domain/repositories/ProductRepository';
import { SearchProducts } from '@/domain/use-cases/SearchProducts';
import { SearchResultMapper } from '../mappers/SearchResultMapper';
import type { SearchResultDTO, SearchParamsDTO } from '../dto/SearchResultDTO';

/**
 * SearchService
 * Application service for search-related operations
 * Orchestrates search use cases and handles DTO mapping
 */
export class SearchService {
  private searchProductsUseCase: SearchProducts;

  constructor(private productRepository: ProductRepository) {
    this.searchProductsUseCase = new SearchProducts(productRepository);
  }

  /**
   * Search products
   * Returns SearchResultDTO for presentation layer
   */
  async searchProducts(params: SearchParamsDTO): Promise<SearchResultDTO> {
    try {
      // Convert DTO params to domain params
      const domainParams: SearchParams =
        SearchResultMapper.toDomainParams(params);

      // Execute use case
      const searchResult =
        await this.searchProductsUseCase.execute(domainParams);

      // Map to DTO
      return SearchResultMapper.toDTO(searchResult, domainParams);
    } catch (error) {
      // Transform domain errors to application-level errors
      if (error instanceof Error) {
        throw new Error(`Error en la búsqueda: ${error.message}`);
      }
      throw new Error('Error desconocido en la búsqueda');
    }
  }

  /**
   * Quick search with just a query string
   * Convenience method for simple searches
   */
  async quickSearch(
    query: string,
    limit: number = 20
  ): Promise<SearchResultDTO> {
    return this.searchProducts({ query, limit });
  }
}

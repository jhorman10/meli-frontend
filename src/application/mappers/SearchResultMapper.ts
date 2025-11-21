import type {
  SearchResult,
  SearchParams,
} from '@/domain/repositories/ProductRepository';
import type { SearchResultDTO, SearchParamsDTO } from '../dto/SearchResultDTO';
import { ProductMapper } from './ProductMapper';

/**
 * SearchResultMapper
 * Maps between search domain objects and DTOs
 */
export class SearchResultMapper {
  /**
   * Convert domain SearchResult to SearchResultDTO
   */
  static toDTO(
    searchResult: SearchResult,
    params: SearchParams
  ): SearchResultDTO {
    const limit = params.limit || 20;
    const offset = params.offset || 0;

    return {
      products: ProductMapper.toDTOList(searchResult.products),
      total: searchResult.total,
      query: searchResult.query,
      pagination: {
        limit,
        offset,
        hasMore: offset + searchResult.products.length < searchResult.total,
      },
      metadata: {
        appliedFilters: [],
      },
    };
  }

  /**
   * Convert SearchParamsDTO to domain SearchParams
   */
  static toDomainParams(dto: SearchParamsDTO): SearchParams {
    return {
      query: dto.query,
      limit: dto.limit,
      offset: dto.offset,
    };
  }
}

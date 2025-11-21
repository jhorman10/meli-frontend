import type { ProductDTO } from './ProductDTO';

/**
 * Search Result Data Transfer Object
 * Contains search results with metadata and pagination info
 */
export interface SearchResultDTO {
  products: ProductDTO[];
  total: number;
  query: string;
  pagination: {
    limit: number;
    offset: number;
    hasMore: boolean;
  };
  metadata: {
    searchTime?: number;
    appliedFilters?: string[];
  };
}

/**
 * Search Params DTO
 * Parameters for search operations
 */
export interface SearchParamsDTO {
  query: string;
  limit?: number;
  offset?: number;
  filters?: {
    condition?: 'new' | 'used';
    freeShipping?: boolean;
    minPrice?: number;
    maxPrice?: number;
  };
}

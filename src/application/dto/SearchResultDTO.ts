import type { ProductDTO } from './ProductDTO';

/**
 * Objeto de Transferencia de Datos de Resultados de Búsqueda
 * Contiene resultados de búsqueda con metadatos e información de paginación
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
 * DTO de Parámetros de Búsqueda
 * Parámetros para operaciones de búsqueda
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

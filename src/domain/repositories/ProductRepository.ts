import type { Product, ProductDetails } from '@/domain/entities/Product';

export interface SearchParams {
  query: string;
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  products: Product[];
  total: number;
  query: string;
}

export interface ProductRepository {
  search(params: SearchParams): Promise<SearchResult>;
  getById(id: string): Promise<ProductDetails>;
}

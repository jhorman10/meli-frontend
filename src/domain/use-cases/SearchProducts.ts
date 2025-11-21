import type {
  ProductRepository,
  SearchParams,
  SearchResult,
} from '@/domain/repositories/ProductRepository';

export class SearchProducts {
  constructor(private productRepository: ProductRepository) {}

  async execute(params: SearchParams): Promise<SearchResult> {
    // Validate query
    if (!params.query.trim()) {
      throw new Error('La búsqueda no puede estar vacía');
    }

    if (params.query.length < 3) {
      throw new Error('La búsqueda debe tener al menos 3 caracteres');
    }

    // Set default pagination
    const searchParams: SearchParams = {
      ...params,
      limit: params.limit || 20,
      offset: params.offset || 0,
    };

    // Execute search
    return this.productRepository.search(searchParams);
  }
}

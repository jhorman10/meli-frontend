// import { SearchProducts as SearchProductsUseCase } from "@/domain/use-cases/SearchProducts";
import type {
  ProductRepository,
  SearchParams,
  SearchResult,
} from '@/domain/repositories/ProductRepository';

export class SearchProducts {
  constructor(private productRepository: ProductRepository) {}

  async execute(params: SearchParams): Promise<SearchResult> {
    if (!params.query.trim()) {
      throw new Error('La búsqueda no puede estar vacía');
    }

    if (params.query.length < 3) {
      throw new Error('La búsqueda debe tener al menos 3 caracteres');
    }

    return this.productRepository.search(params);
  }
}

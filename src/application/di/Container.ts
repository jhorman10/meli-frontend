import type { ProductRepository } from '@/domain/repositories/ProductRepository';
import { ProductAPI } from '@/infrastructure/api/ProductAPI';
import { ProductService } from '../services/ProductService';
import { SearchService } from '../services/SearchService';

/**
 * Dependency Injection Container
 * Singleton pattern to manage application dependencies
 */
export class Container {
  private static instance: Container;
  private productRepository: ProductRepository | null = null;
  private productService: ProductService | null = null;
  private searchService: SearchService | null = null;

  private constructor() {}

  /**
   * Get container singleton instance
   */
  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  /**
   * Get ProductRepository instance
   */
  getProductRepository(): ProductRepository {
    if (!this.productRepository) {
      this.productRepository = new ProductAPI();
    }
    return this.productRepository;
  }

  /**
   * Get ProductService instance
   */
  getProductService(): ProductService {
    if (!this.productService) {
      this.productService = new ProductService(this.getProductRepository());
    }
    return this.productService;
  }

  /**
   * Get SearchService instance
   */
  getSearchService(): SearchService {
    if (!this.searchService) {
      this.searchService = new SearchService(this.getProductRepository());
    }
    return this.searchService;
  }

  /**
   * Reset all instances (useful for testing)
   */
  reset(): void {
    this.productRepository = null;
    this.productService = null;
    this.searchService = null;
  }

  /**
   * Set custom repository (useful for testing)
   */
  setProductRepository(repository: ProductRepository): void {
    this.productRepository = repository;
    // Reset dependent services
    this.productService = null;
    this.searchService = null;
  }
}

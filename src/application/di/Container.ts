import type { ProductRepository } from '@/domain/repositories/ProductRepository';
import { ProductAPI } from '@/infrastructure/api/ProductAPI';
import { ProductService } from '../services/ProductService';
import { SearchService } from '../services/SearchService';

/**
 * Contenedor de Inyección de Dependencias
 * Patrón Singleton para manejar dependencias de la aplicación
 */
export class Container {
  private static instance: Container;
  private productRepository: ProductRepository | null = null;
  private productService: ProductService | null = null;
  private searchService: SearchService | null = null;

  private constructor() {}

  /**
   * Obtener instancia singleton del contenedor
   */
  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  /**
   * Obtener instancia de ProductRepository
   */
  getProductRepository(): ProductRepository {
    if (!this.productRepository) {
      this.productRepository = new ProductAPI();
    }
    return this.productRepository;
  }

  /**
   * Obtener instancia de ProductService
   */
  getProductService(): ProductService {
    if (!this.productService) {
      this.productService = new ProductService(this.getProductRepository());
    }
    return this.productService;
  }

  /**
   * Obtener instancia de SearchService
   */
  getSearchService(): SearchService {
    if (!this.searchService) {
      this.searchService = new SearchService(this.getProductRepository());
    }
    return this.searchService;
  }

  /**
   * Reiniciar todas las instancias (útil para pruebas)
   */
  reset(): void {
    this.productRepository = null;
    this.productService = null;
    this.searchService = null;
  }

  /**
   * Establecer repositorio personalizado (útil para pruebas)
   */
  setProductRepository(repository: ProductRepository): void {
    this.productRepository = repository;
    // Reiniciar servicios dependientes
    this.productService = null;
    this.searchService = null;
  }
}

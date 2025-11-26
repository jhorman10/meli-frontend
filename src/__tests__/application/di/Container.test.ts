import { Container } from '@/application/di/Container';
import type { ProductRepository } from '@/domain/repositories/ProductRepository';
import { ProductService } from '@/application/services/ProductService';
import { SearchService } from '@/application/services/SearchService';
import { ProductAPI } from '@/infrastructure/api/ProductAPI';

describe('Container', () => {
  let container: Container;

  beforeEach(() => {
    // Reset singleton instance for isolation (though typically difficult with singletons,
    // the Container class has a reset method or we can just get the instance)
    container = Container.getInstance();
    container.reset();
  });

  it('should return the same instance (Singleton)', () => {
    const instance1 = Container.getInstance();
    const instance2 = Container.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should provide ProductRepository', () => {
    const repo = container.getProductRepository();
    expect(repo).toBeInstanceOf(ProductAPI);
  });

  it('should provide ProductService', () => {
    const service = container.getProductService();
    expect(service).toBeInstanceOf(ProductService);
  });

  it('should provide SearchService', () => {
    const service = container.getSearchService();
    expect(service).toBeInstanceOf(SearchService);
  });

  it('should reuse service instances', () => {
    const service1 = container.getProductService();
    const service2 = container.getProductService();
    expect(service1).toBe(service2);
  });

  it('should allow setting a custom repository', () => {
    const mockRepo: ProductRepository = {
      search: jest.fn(),
      getById: jest.fn(),
    };
    container.setProductRepository(mockRepo);
    expect(container.getProductRepository()).toBe(mockRepo);
  });
});

import { SearchService } from '@/application/services/SearchService';
import type {
  ProductRepository,
  SearchResult,
} from '@/domain/repositories/ProductRepository';
import type { Product } from '@/domain/entities/Product';

describe('SearchService', () => {
  let mockRepository: jest.Mocked<ProductRepository>;
  let service: SearchService;

  beforeEach(() => {
    mockRepository = {
      search: jest.fn(),
      getById: jest.fn(),
    } as jest.Mocked<ProductRepository>;

    service = new SearchService(mockRepository);
  });

  const mockProducts: Product[] = [
    {
      id: 'MLA1',
      title: 'iPhone 13',
      price: 500000,
      currency: 'ARS',
      condition: 'new',
      thumbnail: 'thumb1.jpg',
      freeShipping: true,
    },
    {
      id: 'MLA2',
      title: 'iPhone 12',
      price: 400000,
      currency: 'ARS',
      condition: 'used',
      thumbnail: 'thumb2.jpg',
      freeShipping: false,
    },
  ];

  describe('searchProducts', () => {
    it('should search products and map to DTO', async () => {
      const mockResult: SearchResult = {
        products: mockProducts,
        total: 2,
        query: 'iphone',
      };

      mockRepository.search.mockResolvedValue(mockResult);

      const result = await service.searchProducts({ query: 'iphone' });

      expect(result.products).toHaveLength(2);
      expect(result.total).toBe(2);
      expect(result.query).toBe('iphone');
      expect(result.pagination.limit).toBe(20);
      expect(result.pagination.offset).toBe(0);
    });

    it('should handle custom pagination', async () => {
      const mockResult: SearchResult = {
        products: mockProducts,
        total: 100,
        query: 'laptop',
      };

      mockRepository.search.mockResolvedValue(mockResult);

      const result = await service.searchProducts({
        query: 'laptop',
        limit: 10,
        offset: 20,
      });

      expect(result.pagination.limit).toBe(10);
      expect(result.pagination.offset).toBe(20);
      expect(result.pagination.hasMore).toBe(true);
    });

    it('should transform domain errors to application errors', async () => {
      mockRepository.search.mockRejectedValue(
        new Error('La búsqueda debe tener al menos 3 caracteres')
      );

      await expect(service.searchProducts({ query: 'ab' })).rejects.toThrow(
        'Error en la búsqueda'
      );
    });

    it('should handle unknown errors', async () => {
      mockRepository.search.mockRejectedValue('Unknown error');

      await expect(service.searchProducts({ query: 'test' })).rejects.toThrow(
        'Error desconocido en la búsqueda'
      );
    });

    it('should handle empty results', async () => {
      const mockResult: SearchResult = {
        products: [],
        total: 0,
        query: 'nonexistent',
      };

      mockRepository.search.mockResolvedValue(mockResult);

      const result = await service.searchProducts({ query: 'nonexistent' });

      expect(result.products).toHaveLength(0);
      expect(result.total).toBe(0);
      expect(result.pagination.hasMore).toBe(false);
    });

    it('should map products with formatted data', async () => {
      const productsWithDetails: Product[] = [
        {
          id: 'MLA1',
          title: 'iPhone 13',
          price: 500000,
          originalPrice: 600000,
          currency: 'ARS',
          condition: 'new',
          thumbnail: 'thumb1.jpg',
          freeShipping: true,
          rating: { average: 4.5, total: 100 },
          installments: { quantity: 12, amount: 50000 },
        },
      ];

      const mockResult: SearchResult = {
        products: productsWithDetails,
        total: 1,
        query: 'iphone',
      };

      mockRepository.search.mockResolvedValue(mockResult);

      const result = await service.searchProducts({ query: 'iphone' });

      expect(result.products[0].formattedPrice).toContain('500');
      expect(result.products[0].formattedPrice).toContain('000');
      expect(result.products[0].discountPercentage).toBe(17);
      expect(result.products[0].rating?.formattedAverage).toBe('4.5');
      expect(result.products[0].installments?.formattedAmount).toContain('50');
      expect(result.products[0].installments?.formattedAmount).toContain('000');
    });
  });

  describe('quickSearch', () => {
    it('should perform quick search with default limit', async () => {
      const mockResult: SearchResult = {
        products: mockProducts,
        total: 2,
        query: 'phone',
      };

      mockRepository.search.mockResolvedValue(mockResult);

      const result = await service.quickSearch('phone');

      expect(result.products).toHaveLength(2);
      expect(result.pagination.limit).toBe(20);
    });

    it('should perform quick search with custom limit', async () => {
      const mockResult: SearchResult = {
        products: mockProducts,
        total: 50,
        query: 'laptop',
      };

      mockRepository.search.mockResolvedValue(mockResult);

      const result = await service.quickSearch('laptop', 10);

      expect(result.pagination.limit).toBe(10);
    });

    it('should handle quick search errors', async () => {
      mockRepository.search.mockRejectedValue(new Error('Search failed'));

      await expect(service.quickSearch('test')).rejects.toThrow(
        'Error en la búsqueda'
      );
    });
  });
});

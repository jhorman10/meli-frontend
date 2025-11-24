import { SearchResultMapper } from '@/application/mappers/SearchResultMapper';
import type {
  SearchResult,
  SearchParams,
} from '@/domain/repositories/ProductRepository';
import type { Product } from '@/domain/entities/Product';

describe('SearchResultMapper', () => {
  describe('toDTO', () => {
    const mockProducts: Product[] = [
      {
        id: 'MLA1',
        title: 'Product 1',
        price: 100,
        currency: 'ARS',
        condition: 'new',
        thumbnail: 'thumb1.jpg',
        freeShipping: true,
      },
      {
        id: 'MLA2',
        title: 'Product 2',
        price: 200,
        currency: 'ARS',
        condition: 'used',
        thumbnail: 'thumb2.jpg',
        freeShipping: false,
      },
    ];

    it('should map search result to DTO with default pagination', () => {
      const searchResult: SearchResult = {
        products: mockProducts,
        total: 100,
        query: 'iphone',
      };

      const params: SearchParams = {
        query: 'iphone',
      };

      const dto = SearchResultMapper.toDTO(searchResult, params);

      expect(dto.products).toHaveLength(2);
      expect(dto.total).toBe(100);
      expect(dto.query).toBe('iphone');
      expect(dto.pagination.limit).toBe(20);
      expect(dto.pagination.offset).toBe(0);
      expect(dto.pagination.hasMore).toBe(true);
    });

    it('should map search result with custom pagination', () => {
      const searchResult: SearchResult = {
        products: mockProducts,
        total: 50,
        query: 'laptop',
      };

      const params: SearchParams = {
        query: 'laptop',
        limit: 10,
        offset: 0,
      };

      const dto = SearchResultMapper.toDTO(searchResult, params);

      expect(dto.pagination.limit).toBe(10);
      expect(dto.pagination.offset).toBe(0);
      expect(dto.pagination.hasMore).toBe(true);
    });

    it('should calculate hasMore correctly when no more results', () => {
      const searchResult: SearchResult = {
        products: mockProducts,
        total: 2,
        query: 'test',
      };

      const params: SearchParams = {
        query: 'test',
        limit: 20,
        offset: 0,
      };

      const dto = SearchResultMapper.toDTO(searchResult, params);

      expect(dto.pagination.hasMore).toBe(false);
    });

    it('should calculate hasMore with offset', () => {
      const searchResult: SearchResult = {
        products: mockProducts,
        total: 25,
        query: 'test',
      };

      const params: SearchParams = {
        query: 'test',
        limit: 10,
        offset: 20,
      };

      const dto = SearchResultMapper.toDTO(searchResult, params);

      expect(dto.pagination.hasMore).toBe(true);
    });

    it('should include metadata with empty filters', () => {
      const searchResult: SearchResult = {
        products: mockProducts,
        total: 10,
        query: 'test',
      };

      const params: SearchParams = {
        query: 'test',
      };

      const dto = SearchResultMapper.toDTO(searchResult, params);

      expect(dto.metadata).toBeDefined();
      expect(dto.metadata.appliedFilters).toEqual([]);
    });

    it('should handle empty products array', () => {
      const searchResult: SearchResult = {
        products: [],
        total: 0,
        query: 'nonexistent',
      };

      const params: SearchParams = {
        query: 'nonexistent',
      };

      const dto = SearchResultMapper.toDTO(searchResult, params);

      expect(dto.products).toHaveLength(0);
      expect(dto.total).toBe(0);
      expect(dto.pagination.hasMore).toBe(false);
    });
  });

  describe('toDomainParams', () => {
    it('should convert DTO params to domain params', () => {
      const dtoParams = {
        query: 'laptop',
        limit: 30,
        offset: 10,
      };

      const domainParams = SearchResultMapper.toDomainParams(dtoParams);

      expect(domainParams.query).toBe('laptop');
      expect(domainParams.limit).toBe(30);
      expect(domainParams.offset).toBe(10);
    });

    it('should convert params with only query', () => {
      const dtoParams = {
        query: 'phone',
      };

      const domainParams = SearchResultMapper.toDomainParams(dtoParams);

      expect(domainParams.query).toBe('phone');
      expect(domainParams.limit).toBeUndefined();
      expect(domainParams.offset).toBeUndefined();
    });
  });
});

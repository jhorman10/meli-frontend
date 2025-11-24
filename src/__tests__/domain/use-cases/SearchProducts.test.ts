import { SearchProducts } from '@/domain/use-cases/SearchProducts';
import type {
  ProductRepository,
  SearchResult,
  SearchParams,
} from '@/domain/repositories/ProductRepository';
import type { Product } from '@/domain/entities/Product';

describe('SearchProducts', () => {
  let mockRepository: jest.Mocked<ProductRepository>;
  let useCase: SearchProducts;

  beforeEach(() => {
    mockRepository = {
      search: jest.fn(),
      getById: jest.fn(),
    } as jest.Mocked<ProductRepository>;

    useCase = new SearchProducts(mockRepository);
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
  ];

  it('should search products successfully', async () => {
    const mockResult: SearchResult = {
      products: mockProducts,
      total: 1,
      query: 'iphone',
    };

    mockRepository.search.mockResolvedValue(mockResult);

    const result = await useCase.execute({ query: 'iphone' });

    expect(result).toEqual(mockResult);
    expect(mockRepository.search).toHaveBeenCalledWith({
      query: 'iphone',
      limit: 20,
      offset: 0,
    });
  });

  it('should throw error when query is empty', async () => {
    await expect(useCase.execute({ query: '' })).rejects.toThrow(
      'La búsqueda no puede estar vacía'
    );
    expect(mockRepository.search).not.toHaveBeenCalled();
  });

  it('should throw error when query is whitespace only', async () => {
    await expect(useCase.execute({ query: '   ' })).rejects.toThrow(
      'La búsqueda no puede estar vacía'
    );
    expect(mockRepository.search).not.toHaveBeenCalled();
  });

  it('should throw error when query is less than 3 characters', async () => {
    await expect(useCase.execute({ query: 'ab' })).rejects.toThrow(
      'La búsqueda debe tener al menos 3 caracteres'
    );
    expect(mockRepository.search).not.toHaveBeenCalled();
  });

  it('should apply default pagination when not provided', async () => {
    const mockResult: SearchResult = {
      products: mockProducts,
      total: 1,
      query: 'laptop',
    };

    mockRepository.search.mockResolvedValue(mockResult);

    await useCase.execute({ query: 'laptop' });

    expect(mockRepository.search).toHaveBeenCalledWith({
      query: 'laptop',
      limit: 20,
      offset: 0,
    });
  });

  it('should use custom pagination when provided', async () => {
    const mockResult: SearchResult = {
      products: mockProducts,
      total: 100,
      query: 'phone',
    };

    mockRepository.search.mockResolvedValue(mockResult);

    const params: SearchParams = {
      query: 'phone',
      limit: 50,
      offset: 10,
    };

    await useCase.execute(params);

    expect(mockRepository.search).toHaveBeenCalledWith({
      query: 'phone',
      limit: 50,
      offset: 10,
    });
  });

  it('should handle empty search results', async () => {
    const mockResult: SearchResult = {
      products: [],
      total: 0,
      query: 'nonexistent',
    };

    mockRepository.search.mockResolvedValue(mockResult);

    const result = await useCase.execute({ query: 'nonexistent' });

    expect(result.products).toHaveLength(0);
    expect(result.total).toBe(0);
  });

  it('should propagate repository errors', async () => {
    const error = new Error('API error');
    mockRepository.search.mockRejectedValue(error);

    await expect(useCase.execute({ query: 'test' })).rejects.toThrow(
      'API error'
    );
  });

  it('should accept query with exactly 3 characters', async () => {
    const mockResult: SearchResult = {
      products: mockProducts,
      total: 1,
      query: 'abc',
    };

    mockRepository.search.mockResolvedValue(mockResult);

    await useCase.execute({ query: 'abc' });

    expect(mockRepository.search).toHaveBeenCalled();
  });
});

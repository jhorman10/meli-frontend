import { GetProductById } from '@/domain/use-cases/GetProductById';
import type { ProductRepository } from '@/domain/repositories/ProductRepository';
import type { ProductDetails } from '@/domain/entities/Product';

describe('GetProductById', () => {
  let mockRepository: jest.Mocked<ProductRepository>;
  let useCase: GetProductById;

  beforeEach(() => {
    mockRepository = {
      search: jest.fn(),
      getById: jest.fn(),
    } as jest.Mocked<ProductRepository>;

    useCase = new GetProductById(mockRepository);
  });

  it('should get product successfully', async () => {
    const mockProduct: ProductDetails = {
      id: 'MLA123',
      title: 'iPhone 13',
      price: 500000,
      currency: 'ARS',
      condition: 'new',
      thumbnail: 'https://example.com/thumb.jpg',
      freeShipping: true,
      availableQuantity: 10,
      soldQuantity: 50,
      permalink: 'https://example.com/product',
      pictures: [],
    };

    mockRepository.getById.mockResolvedValue(mockProduct);

    const result = await useCase.execute('MLA123');

    expect(result).toEqual(mockProduct);
    expect(mockRepository.getById).toHaveBeenCalledWith('MLA123');
  });

  it('should throw error when ID is empty', async () => {
    await expect(useCase.execute('')).rejects.toThrow(
      'El ID del producto es requerido'
    );
    expect(mockRepository.getById).not.toHaveBeenCalled();
  });

  it('should throw error when ID is whitespace only', async () => {
    await expect(useCase.execute('   ')).rejects.toThrow(
      'El ID del producto es requerido'
    );
    expect(mockRepository.getById).not.toHaveBeenCalled();
  });

  it('should throw error when product is not found', async () => {
    mockRepository.getById.mockRejectedValue(
      new Error('Producto con ID MLA999 no encontrado')
    );

    await expect(useCase.execute('MLA999')).rejects.toThrow(
      'Producto con ID MLA999 no encontrado'
    );
    expect(mockRepository.getById).toHaveBeenCalledWith('MLA999');
  });

  it('should propagate repository errors', async () => {
    const error = new Error('Database error');
    mockRepository.getById.mockRejectedValue(error);

    await expect(useCase.execute('MLA123')).rejects.toThrow('Database error');
  });

  it('should handle product with all optional fields', async () => {
    const mockProduct: ProductDetails = {
      id: 'MLA123',
      title: 'iPhone 13',
      price: 500000,
      originalPrice: 600000,
      currency: 'ARS',
      condition: 'new',
      thumbnail: 'https://example.com/thumb.jpg',
      freeShipping: true,
      availableQuantity: 10,
      soldQuantity: 50,
      permalink: 'https://example.com/product',
      pictures: [{ id: '1', url: 'https://example.com/1.jpg' }],
      description: { plain_text: 'Nuevo en caja' },
      attributes: [{ id: 'COLOR', name: 'Color', value_name: 'Negro' }],
      warranty: '12 meses',
      rating: { average: 4.5, total: 100 },
      installments: { quantity: 12, amount: 50000 },
    };

    mockRepository.getById.mockResolvedValue(mockProduct);

    const result = await useCase.execute('MLA123');

    expect(result).toEqual(mockProduct);
  });
});

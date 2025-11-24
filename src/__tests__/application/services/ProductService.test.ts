import { ProductService } from '@/application/services/ProductService';
import type { ProductRepository } from '@/domain/repositories/ProductRepository';
import type { ProductDetails } from '@/domain/entities/Product';

describe('ProductService', () => {
  let mockRepository: jest.Mocked<ProductRepository>;
  let service: ProductService;

  beforeEach(() => {
    mockRepository = {
      search: jest.fn(),
      getById: jest.fn(),
    } as jest.Mocked<ProductRepository>;

    service = new ProductService(mockRepository);
  });

  describe('getProductById', () => {
    it('should get product and map to DTO', async () => {
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
        pictures: [{ id: '1', url: 'https://example.com/1.jpg' }],
      };

      mockRepository.getById.mockResolvedValue(mockProduct);

      const result = await service.getProductById('MLA123');

      expect(result.id).toBe('MLA123');
      expect(result.title).toBe('iPhone 13');
      expect(result.formattedPrice).toContain('500');
      expect(result.formattedPrice).toContain('000');
      expect(result.availableQuantity).toBe(10);
      expect(result.pictures).toHaveLength(1);
    });

    it('should handle empty ID error', async () => {
      await expect(service.getProductById('')).rejects.toThrow(
        'Error al obtener el producto'
      );
    });

    it('should handle product not found error', async () => {
      mockRepository.getById.mockRejectedValue(
        new Error('Producto con ID MLA999 no encontrado')
      );

      await expect(service.getProductById('MLA999')).rejects.toThrow(
        'Error al obtener el producto'
      );
    });

    it('should transform domain errors to application errors', async () => {
      mockRepository.getById.mockRejectedValue(new Error('Repository error'));

      await expect(service.getProductById('MLA123')).rejects.toThrow(
        'Error al obtener el producto: Repository error'
      );
    });

    it('should handle unknown errors', async () => {
      mockRepository.getById.mockRejectedValue('Unknown error');

      await expect(service.getProductById('MLA123')).rejects.toThrow(
        'Error desconocido al obtener el producto'
      );
    });

    it('should map product with all details', async () => {
      const mockProduct: ProductDetails = {
        id: 'MLA123',
        title: 'iPhone 13',
        price: 400000,
        originalPrice: 500000,
        currency: 'ARS',
        condition: 'new',
        thumbnail: 'https://example.com/thumb.jpg',
        freeShipping: true,
        availableQuantity: 10,
        soldQuantity: 50,
        permalink: 'https://example.com/product',
        pictures: [],
        description: { plain_text: 'Nuevo en caja' },
        attributes: [{ id: 'COLOR', name: 'Color', value_name: 'Negro' }],
        warranty: '12 meses',
        rating: { average: 4.5, total: 100 },
        installments: { quantity: 12, amount: 40000 },
      };

      mockRepository.getById.mockResolvedValue(mockProduct);

      const result = await service.getProductById('MLA123');

      expect(result.discountPercentage).toBe(20);
      expect(result.description?.plainText).toBe('Nuevo en caja');
      expect(result.attributes).toHaveLength(1);
      expect(result.warranty).toBe('12 meses');
      expect(result.rating?.formattedAverage).toBe('4.5');
      expect(result.installments?.formattedAmount).toContain('40');
      expect(result.installments?.formattedAmount).toContain('000');
    });
  });
});

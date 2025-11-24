import { ProductMapper } from '@/application/mappers/ProductMapper';
import type { Product, ProductDetails } from '@/domain/entities/Product';

describe('ProductMapper', () => {
  describe('toDTO', () => {
    it('should map basic product to DTO', () => {
      const product: Product = {
        id: 'MLA123',
        title: 'iPhone 13',
        price: 500000,
        currency: 'ARS',
        condition: 'new',
        thumbnail: 'https://example.com/thumb.jpg',
        freeShipping: true,
      };

      const dto = ProductMapper.toDTO(product);

      expect(dto.id).toBe('MLA123');
      expect(dto.title).toBe('iPhone 13');
      expect(dto.price).toBe(500000);
      expect(dto.currency).toBe('ARS');
      expect(dto.formattedPrice).toContain('500');
      expect(dto.formattedPrice).toContain('000');
      expect(dto.discountPercentage).toBe(0);
    });

    it('should calculate discount percentage when original price exists', () => {
      const product: Product = {
        id: 'MLA123',
        title: 'iPhone 13',
        price: 400000,
        originalPrice: 500000,
        currency: 'ARS',
        condition: 'new',
        thumbnail: 'https://example.com/thumb.jpg',
        freeShipping: true,
      };

      const dto = ProductMapper.toDTO(product);

      expect(dto.discountPercentage).toBe(20);
      expect(dto.originalPrice).toBe(500000);
      expect(dto.formattedOriginalPrice).toContain('500');
      expect(dto.formattedOriginalPrice).toContain('000');
    });

    it('should map product with rating', () => {
      const product: Product = {
        id: 'MLA123',
        title: 'iPhone 13',
        price: 500000,
        currency: 'ARS',
        condition: 'new',
        thumbnail: 'https://example.com/thumb.jpg',
        freeShipping: false,
        rating: {
          average: 4.5,
          total: 150,
        },
      };

      const dto = ProductMapper.toDTO(product);

      expect(dto.rating).toBeDefined();
      expect(dto.rating?.average).toBe(4.5);
      expect(dto.rating?.total).toBe(150);
      expect(dto.rating?.formattedAverage).toBe('4.5');
    });

    it('should map product with installments', () => {
      const product: Product = {
        id: 'MLA123',
        title: 'iPhone 13',
        price: 500000,
        currency: 'ARS',
        condition: 'new',
        thumbnail: 'https://example.com/thumb.jpg',
        freeShipping: true,
        installments: {
          quantity: 12,
          amount: 50000,
        },
      };

      const dto = ProductMapper.toDTO(product);

      expect(dto.installments).toBeDefined();
      expect(dto.installments?.quantity).toBe(12);
      expect(dto.installments?.amount).toBe(50000);
      expect(dto.installments?.formattedAmount).toContain('50');
      expect(dto.installments?.formattedAmount).toContain('000');
    });
  });

  describe('toDetailsDTO', () => {
    it('should map product details to DTO', () => {
      const product: ProductDetails = {
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
        pictures: [
          { id: '1', url: 'https://example.com/1.jpg' },
          { id: '2', url: 'https://example.com/2.jpg' },
        ],
      };

      const dto = ProductMapper.toDetailsDTO(product);

      expect(dto.availableQuantity).toBe(10);
      expect(dto.soldQuantity).toBe(50);
      expect(dto.permalink).toBe('https://example.com/product');
      expect(dto.pictures).toHaveLength(2);
      expect(dto.pictures[0]).toEqual({
        id: '1',
        url: 'https://example.com/1.jpg',
      });
    });

    it('should map product with description', () => {
      const product: ProductDetails = {
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
        description: {
          plain_text: 'Producto nuevo en caja',
        },
      };

      const dto = ProductMapper.toDetailsDTO(product);

      expect(dto.description).toBeDefined();
      expect(dto.description?.plainText).toBe('Producto nuevo en caja');
    });

    it('should map product with attributes', () => {
      const product: ProductDetails = {
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
        attributes: [
          { id: 'COLOR', name: 'Color', value_name: 'Negro' },
          { id: 'STORAGE', name: 'Almacenamiento', value_name: '128 GB' },
        ],
      };

      const dto = ProductMapper.toDetailsDTO(product);

      expect(dto.attributes).toHaveLength(2);
      expect(dto.attributes?.[0]).toEqual({
        id: 'COLOR',
        name: 'Color',
        valueName: 'Negro',
      });
    });

    it('should map product with warranty', () => {
      const product: ProductDetails = {
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
        warranty: '12 meses de garantía de fábrica',
      };

      const dto = ProductMapper.toDetailsDTO(product);

      expect(dto.warranty).toBe('12 meses de garantía de fábrica');
    });
  });

  describe('toDTOList', () => {
    it('should map array of products to DTOs', () => {
      const products: Product[] = [
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

      const dtos = ProductMapper.toDTOList(products);

      expect(dtos).toHaveLength(2);
      expect(dtos[0].id).toBe('MLA1');
      expect(dtos[1].id).toBe('MLA2');
    });

    it('should handle empty array', () => {
      const dtos = ProductMapper.toDTOList([]);
      expect(dtos).toHaveLength(0);
    });
  });

  describe('toDomain', () => {
    it('should convert DTO back to domain entity', () => {
      const dto = {
        id: 'MLA123',
        title: 'iPhone 13',
        price: 500000,
        formattedPrice: '$ 500.000',
        currency: 'ARS',
        condition: 'new' as const,
        thumbnail: 'https://example.com/thumb.jpg',
        freeShipping: true,
        discountPercentage: 0,
      };

      const product = ProductMapper.toDomain(dto);

      expect(product.id).toBe('MLA123');
      expect(product.title).toBe('iPhone 13');
      expect(product.price).toBe(500000);
      expect(product.currency).toBe('ARS');
    });

    it('should convert DTO with rating', () => {
      const dto = {
        id: 'MLA123',
        title: 'iPhone 13',
        price: 500000,
        formattedPrice: '$ 500.000',
        currency: 'ARS',
        condition: 'new' as const,
        thumbnail: 'https://example.com/thumb.jpg',
        freeShipping: true,
        discountPercentage: 0,
        rating: {
          average: 4.5,
          total: 150,
          formattedAverage: '4.5',
        },
      };

      const product = ProductMapper.toDomain(dto);

      expect(product.rating).toBeDefined();
      expect(product.rating?.average).toBe(4.5);
      expect(product.rating?.total).toBe(150);
    });

    it('should convert DTO with installments', () => {
      const dto = {
        id: 'MLA123',
        title: 'iPhone 13',
        price: 500000,
        formattedPrice: '$ 500.000',
        currency: 'ARS',
        condition: 'new' as const,
        thumbnail: 'https://example.com/thumb.jpg',
        freeShipping: true,
        discountPercentage: 0,
        installments: {
          quantity: 12,
          amount: 50000,
          formattedAmount: '$ 50.000',
        },
      };

      const product = ProductMapper.toDomain(dto);

      expect(product.installments).toBeDefined();
      expect(product.installments?.quantity).toBe(12);
      expect(product.installments?.amount).toBe(50000);
    });
  });
});

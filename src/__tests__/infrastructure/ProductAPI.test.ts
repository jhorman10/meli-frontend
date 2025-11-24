import { ProductAPI } from '@/infrastructure/api/ProductAPI';
import type { SearchParams } from '@/domain/repositories/ProductRepository';

// Mock global fetch
global.fetch = jest.fn();

describe('ProductAPI', () => {
  let api: ProductAPI;
  const baseURL = 'http://test-api.com';

  beforeEach(() => {
    api = new ProductAPI(baseURL);
    (fetch as jest.Mock).mockClear();
  });

  describe('search', () => {
    const mockSearchParams: SearchParams = {
      query: 'iphone',
      limit: 10,
      offset: 0,
    };

    const mockResponse = {
      results: [
        {
          id: 'MLA123',
          title: 'iPhone 13',
          price: 1000,
          currency_id: 'ARS',
          condition: 'new',
          thumbnail: 'http://image.com/1.jpg',
          shipping: { free_shipping: true },
          installments: { quantity: 12, amount: 100 },
        },
      ],
      paging: { total: 100 },
      query: 'iphone',
    };

    it('should fetch products with correct URL parameters', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await api.search(mockSearchParams);

      const expectedUrl = new URL(`${baseURL}/items`);
      expectedUrl.searchParams.set('q', 'iphone');
      expectedUrl.searchParams.set('limit', '10');
      expectedUrl.searchParams.set('offset', '0');

      expect(fetch).toHaveBeenCalledWith(expectedUrl.toString());
    });

    it('should return formatted search results', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await api.search(mockSearchParams);

      expect(result.products).toHaveLength(1);
      expect(result.products[0]).toEqual(
        expect.objectContaining({
          id: 'MLA123',
          title: 'iPhone 13',
          price: 1000,
          freeShipping: true,
        })
      );
      expect(result.total).toBe(100);
    });

    it('should throw error when fetch fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
      });

      await expect(api.search(mockSearchParams)).rejects.toThrow(
        'Error al buscar productos: Internal Server Error'
      );
    });
  });

  describe('getById', () => {
    const productId = 'MLA123';
    const mockProductDetail = {
      id: 'MLA123',
      title: 'iPhone 13',
      price: 1000,
      currency_id: 'ARS',
      condition: 'new',
      thumbnail: 'http://image.com/1.jpg',
      pictures: [{ url: 'http://image.com/1.jpg' }],
      shipping: { free_shipping: true },
      original_price: 1200,
      available_quantity: 5,
      sold_quantity: 100,
      permalink: 'http://meli.com/iphone',
      installments: { quantity: 12, amount: 100 },
    };

    it('should fetch product details with correct URL', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProductDetail,
      });

      await api.getById(productId);

      expect(fetch).toHaveBeenCalledWith(`${baseURL}/items/${productId}`);
    });

    it('should return formatted product details', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProductDetail,
      });

      const result = await api.getById(productId);

      expect(result).toEqual(
        expect.objectContaining({
          id: 'MLA123',
          title: 'iPhone 13',
          originalPrice: 1200,
          pictures: expect.any(Array),
        })
      );
    });

    it('should throw error when fetch fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(api.getById(productId)).rejects.toThrow(
        'Error al obtener producto: Not Found'
      );
    });
  });
});

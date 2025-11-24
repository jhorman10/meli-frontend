import { renderHook, waitFor } from '@testing-library/react';
import { useProductDetail } from '@/application/hooks/useProductDetail';
import { getProductService } from '@/application/di/providers';
import type { ProductDetailsDTO } from '@/application/dto/ProductDTO';

// Mock dependencies
jest.mock('@/application/di/providers', () => ({
  getProductService: jest.fn(),
}));

const mockProductService = {
  getProductById: jest.fn(),
};

(getProductService as jest.Mock).mockReturnValue(mockProductService);

describe('useProductDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockProductDetails: ProductDetailsDTO = {
    id: 'MLA123',
    title: 'iPhone 13',
    price: 500000,
    formattedPrice: '$ 500.000',
    currency: 'ARS',
    condition: 'new',
    thumbnail: 'https://example.com/thumb.jpg',
    freeShipping: true,
    discountPercentage: 0,
    availableQuantity: 10,
    soldQuantity: 50,
    permalink: 'https://example.com/product',
    pictures: [{ id: '1', url: 'https://example.com/1.jpg' }],
  };

  it('should return initial loading state', () => {
    mockProductService.getProductById.mockImplementation(
      () => new Promise(() => {})
    );

    const { result } = renderHook(() => useProductDetail('MLA123'));

    expect(result.current.product).toBeNull();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should fetch product successfully', async () => {
    mockProductService.getProductById.mockResolvedValue(mockProductDetails);

    const { result } = renderHook(() => useProductDetail('MLA123'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.product).toEqual(mockProductDetails);
    expect(result.current.error).toBeNull();
    expect(mockProductService.getProductById).toHaveBeenCalledWith('MLA123');
  });

  it('should handle fetch error', async () => {
    const error = new Error('Failed to fetch product');
    mockProductService.getProductById.mockRejectedValue(error);

    const { result } = renderHook(() => useProductDetail('MLA123'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.product).toBeNull();
    expect(result.current.error).toEqual(error);
  });

  it('should handle invalid product ID', async () => {
    const { result } = renderHook(() => useProductDetail(''));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.product).toBeNull();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('ID de producto inválido');
    expect(mockProductService.getProductById).not.toHaveBeenCalled();
  });

  it('should handle unknown errors', async () => {
    mockProductService.getProductById.mockRejectedValue('Unknown error');

    const { result } = renderHook(() => useProductDetail('MLA123'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Error desconocido');
  });

  it('should refetch when productId changes', async () => {
    mockProductService.getProductById.mockResolvedValue(mockProductDetails);

    const { result, rerender } = renderHook(({ id }) => useProductDetail(id), {
      initialProps: { id: 'MLA123' },
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockProductService.getProductById).toHaveBeenCalledWith('MLA123');

    const newProductDetails = { ...mockProductDetails, id: 'MLA456' };
    mockProductService.getProductById.mockResolvedValue(newProductDetails);

    rerender({ id: 'MLA456' });

    await waitFor(() => {
      expect(result.current.product?.id).toBe('MLA456');
    });

    expect(mockProductService.getProductById).toHaveBeenCalledWith('MLA456');
  });

  it('should reset state when fetching new product', async () => {
    mockProductService.getProductById.mockResolvedValue(mockProductDetails);

    const { result, rerender } = renderHook(({ id }) => useProductDetail(id), {
      initialProps: { id: 'MLA123' },
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    mockProductService.getProductById.mockImplementation(
      () => new Promise(() => {})
    );

    rerender({ id: 'MLA456' });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
  });
});

import type {
  ProductRepository,
  SearchParams,
  SearchResult,
} from '@/domain/repositories/ProductRepository';
import type { Product, ProductDetails } from '@/domain/entities/Product';
import type {
  MeliSearchResponse,
  MeliSearchItem,
  MeliProductDetail,
} from './types/MeliAPITypes';

export class ProductAPI implements ProductRepository {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    console.debug('[ProductAPI] Initialized with baseURL:', this.baseURL);
  }

  async search(params: SearchParams): Promise<SearchResult> {
    const url = new URL(
      `${this.baseURL}/items`,
      typeof window !== 'undefined'
        ? window.location.origin
        : 'http://localhost'
    );
    url.searchParams.set('q', params.query);

    if (params.limit) {
      url.searchParams.set('limit', params.limit.toString());
    }

    if (params.offset !== undefined) {
      url.searchParams.set('offset', params.offset.toString());
    }

    try {
      const response = await fetch(url.toString());
      await new Promise((r) => setTimeout(r, 500));

      if (!response.ok) {
        throw new Error(`Error al buscar productos: ${response.statusText}`);
      }

      const data: MeliSearchResponse = await response.json();

      return {
        products: data.results.map((item) => this.mapToProduct(item)),
        total: data.paging?.total ?? 0,
        query: data.query,
      };
    } catch (error) {
      console.error('[ProductAPI] Search failed:', error);
      throw error;
    }
  }

  async getById(id: string): Promise<ProductDetails> {
    const url = `${this.baseURL}/items/${id}`;
    try {
      const response = await fetch(url);
      await new Promise((r) => setTimeout(r, 500));

      if (!response.ok) {
        throw new Error(`Error al obtener producto: ${response.statusText}`);
      }

      const data: MeliProductDetail = await response.json();
      return this.mapToProductDetails(data);
    } catch (error) {
      console.error('[ProductAPI] GetById failed for:', id, error);
      throw error;
    }
  }

  private mapToProduct(data: MeliSearchItem | MeliProductDetail): Product {
    const thumbnail =
      'thumbnail' in data && data.thumbnail
        ? data.thumbnail
        : 'pictures' in data && data.pictures.length > 0
          ? data.pictures[0].url
          : '';

    return {
      id: data.id,
      title: data.title,
      price: data.price,
      currency: data.currency_id,
      condition: data.condition,
      thumbnail,
      freeShipping: data.shipping?.free_shipping ?? false,
      rating: data.reviews
        ? {
            average: data.reviews.rating_average,
            total: data.reviews.total,
          }
        : undefined,
      installments: data.installments,
    };
  }

  private mapToProductDetails(data: MeliProductDetail): ProductDetails {
    return {
      ...this.mapToProduct(data),
      originalPrice: data.original_price,
      availableQuantity: data.available_quantity,
      soldQuantity: data.sold_quantity,
      permalink: data.permalink,
      pictures: data.pictures,
    };
  }
}

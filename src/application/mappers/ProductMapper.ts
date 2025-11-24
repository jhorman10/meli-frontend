import type { Product, ProductDetails } from '@/domain/entities/Product';
import type { ProductDTO, ProductDetailsDTO } from '../dto/ProductDTO';
import { formatPrice, calculateDiscount } from '@/shared/utils';

/**
 * ProductMapper
 * Mapea entre entidades de dominio y DTOs
 */
export class ProductMapper {
  /**
   * Convertir Product de dominio a ProductDTO
   */
  static toDTO(product: Product): ProductDTO {
    const discountPercentage = product.originalPrice
      ? calculateDiscount(product.originalPrice, product.price)
      : 0;

    return {
      id: product.id,
      title: product.title,
      price: product.price,
      formattedPrice: formatPrice(product.price, product.currency),
      originalPrice: product.originalPrice,
      formattedOriginalPrice: product.originalPrice
        ? formatPrice(product.originalPrice, product.currency)
        : undefined,
      discountPercentage,
      currency: product.currency,
      condition: product.condition,
      thumbnail: product.thumbnail,
      freeShipping: product.freeShipping,
      rating: product.rating
        ? {
            average: product.rating.average,
            total: product.rating.total,
            formattedAverage: product.rating.average.toFixed(1),
          }
        : undefined,
      installments: product.installments
        ? {
            quantity: product.installments.quantity,
            amount: product.installments.amount,
            formattedAmount: formatPrice(
              product.installments.amount,
              product.currency
            ),
          }
        : undefined,
    };
  }

  /**
   * Convertir ProductDetails a ProductDetailsDTO
   */
  static toDetailsDTO(product: ProductDetails): ProductDetailsDTO {
    const baseDTO = this.toDTO(product);

    return {
      ...baseDTO,
      availableQuantity: product.availableQuantity,
      soldQuantity: product.soldQuantity,
      permalink: product.permalink,
      description: product.description
        ? {
            plainText: product.description.plain_text,
          }
        : undefined,
      pictures: product.pictures.map((pic) => ({
        id: pic.id,
        url: pic.url,
      })),
      attributes: product.attributes?.map((attr) => ({
        id: attr.id,
        name: attr.name,
        valueName: attr.value_name,
      })),
      warranty: product.warranty,
    };
  }

  /**
   * Convertir array de Products a array de ProductDTOs
   */
  static toDTOList(products: Product[]): ProductDTO[] {
    return products.map((product) => this.toDTO(product));
  }

  /**
   * Convertir ProductDTO de vuelta a Product de dominio
   * (Usado cuando se envían datos de vuelta a la capa de dominio)
   */
  static toDomain(dto: ProductDTO): Product {
    return {
      id: dto.id,
      title: dto.title,
      price: dto.price,
      originalPrice: dto.originalPrice,
      currency: dto.currency,
      condition: dto.condition,
      thumbnail: dto.thumbnail,
      freeShipping: dto.freeShipping,
      rating: dto.rating
        ? {
            average: dto.rating.average,
            total: dto.rating.total,
          }
        : undefined,
      installments: dto.installments
        ? {
            quantity: dto.installments.quantity,
            amount: dto.installments.amount,
          }
        : undefined,
    };
  }
}

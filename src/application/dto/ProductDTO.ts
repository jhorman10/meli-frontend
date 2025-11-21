/**
 * Product Data Transfer Object
 * Used to transfer product data between application and presentation layers
 */
export interface ProductDTO {
  id: string;
  title: string;
  price: number;
  formattedPrice: string;
  originalPrice?: number;
  formattedOriginalPrice?: string;
  discountPercentage: number;
  currency: string;
  condition: 'new' | 'used';
  thumbnail: string;
  freeShipping: boolean;
  rating?: {
    average: number;
    total: number;
    formattedAverage: string;
  };
  installments?: {
    quantity: number;
    amount: number;
    formattedAmount: string;
  };
}

/**
 * Product Details Data Transfer Object
 * Extended version with additional details for product detail page
 */
export interface ProductDetailsDTO extends ProductDTO {
  availableQuantity: number;
  soldQuantity: number;
  permalink: string;
  description?: {
    plainText: string;
  };
  pictures: {
    id: string;
    url: string;
  }[];
  attributes?: {
    id: string;
    name: string;
    valueName: string;
  }[];
  warranty?: string;
}

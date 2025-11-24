/**
 * Objeto de Transferencia de Datos de Producto
 * Usado para transferir datos de producto entre las capas de aplicación y presentación
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
 * Objeto de Transferencia de Datos de Detalles del Producto
 * Versión extendida con detalles adicionales para la página de detalle del producto
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

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency: string;
  condition: 'new' | 'used';
  thumbnail: string;
  freeShipping: boolean;
  rating?: {
    average: number;
    total: number;
  };
  installments?: {
    quantity: number;
    amount: number;
  };
}

export interface ProductDetails extends Product {
  availableQuantity: number;
  originalPrice?: number;
  soldQuantity: number;
  permalink: string;
  description?: {
    plain_text: string;
  };
  pictures: {
    id: string;
    url: string;
  }[];
  attributes?: {
    id: string;
    name: string;
    value_name: string;
  }[];
  warranty?: string;
}

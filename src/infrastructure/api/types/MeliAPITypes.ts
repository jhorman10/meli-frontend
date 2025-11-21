// Tipos basados en la estructura real de la API de Mercado Libre

export interface MeliInstallments {
  quantity: number;
  amount: number;
  rate?: number;
  currency_id?: string;
}

export interface MeliShipping {
  free_shipping: boolean;
  mode?: string;
  logistic_type?: string;
  store_pick_up?: boolean;
}

export interface MeliReviews {
  rating_average: number;
  total: number;
}

export interface MeliPicture {
  id: string;
  url: string;
}

export interface MeliCity {
  name: string;
}

export interface MeliState {
  name: string;
}

export interface MeliSellerAddress {
  city: MeliCity;
  state: MeliState;
}

export interface MeliAttribute {
  id: string;
  name: string;
  value_name: string;
}

export interface MeliDescription {
  plain_text: string;
}

// Respuesta de búsqueda (search endpoint)
export interface MeliSearchItem {
  id: string;
  title: string;
  price: number;
  currency_id: string;
  condition: 'new' | 'used';
  thumbnail: string;
  installments?: MeliInstallments;
  shipping: MeliShipping;
  reviews?: MeliReviews;
}

export interface MeliPaging {
  total: number;
  offset: number;
  limit: number;
}

export interface MeliSearchResponse {
  query: string;
  paging: MeliPaging;
  results: MeliSearchItem[];
}

// Respuesta de producto individual (product detail endpoint)
export interface MeliProductDetail {
  id: string;
  title: string;
  price: number;
  original_price?: number;
  currency_id: string;
  available_quantity: number;
  sold_quantity: number;
  condition: 'new' | 'used';
  permalink: string;
  pictures: MeliPicture[];
  installments?: MeliInstallments;
  shipping: MeliShipping;
  seller_address: MeliSellerAddress;
  attributes: MeliAttribute[];
  warranty?: string;
  description?: MeliDescription;
  reviews?: MeliReviews;
  thumbnail?: string;
}

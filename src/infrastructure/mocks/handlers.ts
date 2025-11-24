import { http, HttpResponse } from 'msw';

// Usar variable de entorno para la base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const products = [
  {
    id: 'MLA123456789',
    title: 'Apple iPhone 13 (128 GB) - Medianoche',
    price: 1367999,
    currency_id: 'ARS',
    condition: 'new',
    thumbnail: 'https://http2.mlstatic.com/D_123456-MLA0000000000_092023-I.jpg',
    installments: { quantity: 12, amount: 113999.92 },
    shipping: { free_shipping: true },
    reviews: { rating_average: 4.9, total: 35 },
  },
  {
    id: 'MLA987654321',
    title: 'Apple iPhone 16 Pro Max 256gb',
    price: 2299000,
    currency_id: 'ARS',
    condition: 'new',
    thumbnail: 'https://http2.mlstatic.com/D_987654-MLA0000000000_092023-I.jpg',
    shipping: { free_shipping: false },
  },
  {
    id: 'MLA555555555',
    title: 'iPhone 8 64 GB Plata - Reacondicionado',
    price: 412500,
    currency_id: 'ARS',
    condition: 'used',
    thumbnail: 'https://http2.mlstatic.com/D_555555-MLA0000000000_092023-I.jpg',
    shipping: { free_shipping: false },
    reviews: { rating_average: 5.0, total: 2 },
  },
];

export const handlers = [
  http.get(`${API_BASE_URL}/items`, ({ request }) => {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('q') || '';
    const query = searchQuery.toLowerCase();

    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );

    if (filteredProducts.length > 0) {
      return HttpResponse.json({
        query: searchQuery,
        paging: { total: filteredProducts.length, offset: 0, limit: 3 },
        results: filteredProducts,
      });
    }

    return HttpResponse.json({
      query: searchQuery,
      results: [],
      paging: { total: 0, offset: 0, limit: 0 },
    });
  }),

  http.get(`${API_BASE_URL}/items/:id`, ({ params }) => {
    return HttpResponse.json({
      id: params.id as string,
      title: 'Apple iPhone 16 Pro (256gb) - Nuevo - Liberado - Caja Sellada',
      price: 2509380.59,
      original_price: 3023244.99,
      currency_id: 'ARS',
      available_quantity: 3,
      sold_quantity: 5,
      condition: 'new',
      permalink: 'https://www.mercadolibre.com.ar/p/MLA998877665',
      thumbnail:
        'https://http2.mlstatic.com/D_987654-MLA0000000000_092023-I.jpg',
      shipping: {
        free_shipping: true,
        mode: 'me2',
        logistic_type: 'fulfillment',
        store_pick_up: false,
      },
      pictures: [
        {
          id: '1',
          url: 'https://http2.mlstatic.com/D_987654-MLA0000000000_092023-I.jpg',
        },
        {
          id: '2',
          url: 'https://http2.mlstatic.com/D_876543-MLA0000000000_092023-I.jpg',
        },
      ],
      installments: {
        quantity: 9,
        amount: 278820.07,
        rate: 0,
        currency_id: 'ARS',
      },
      seller_address: {
        city: {
          name: 'CABA',
        },
        state: {
          name: 'Buenos Aires',
        },
      },
      attributes: [
        {
          id: 'BRAND',
          name: 'Marca',
          value_name: 'Apple',
        },
        {
          id: 'MODEL',
          name: 'Modelo',
          value_name: 'iPhone 16 Pro',
        },
        {
          id: 'STORAGE_CAPACITY',
          name: 'Capacidad de almacenamiento',
          value_name: '256 GB',
        },
      ],
      warranty: 'Garantía del vendedor: 3 meses',
      description: {
        plain_text:
          'El iPhone 14 viene con el sistema de dos cámaras más impresionante en un iPhone 14, para que tomes fotos espectaculares con mucha o poca luz. Y te da más tranquilidad gracias a una funcionalidad de seguridad que salva vidas.',
      },
      reviews: {
        rating_average: 5.0,
        total: 1,
      },
    });
  }),
];

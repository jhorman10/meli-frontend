import { http, HttpResponse } from 'msw';

// Usar variable de entorno para la base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const products = [
  {
    id: 'MLA123456789',
    title: 'Apple iPhone 13 (128 GB) - Medianoche',
    price: 1367999,
    currency_id: 'ARS',
    condition: 'new',
    thumbnail:
      'https://http2.mlstatic.com/D_NQ_NP_2X_841488-MLA46114990795_052021-F.webp',
    pictures: [
      {
        id: '1',
        url: 'https://http2.mlstatic.com/D_NQ_NP_2X_841488-MLA46114990795_052021-F.webp',
      },
      {
        id: '2',
        url: 'https://http2.mlstatic.com/D_NQ_NP_2X_978378-MLA46115014650_052021-F.webp',
      },
      {
        id: '3',
        url: 'https://http2.mlstatic.com/D_NQ_NP_2X_704662-MLA46114951969_052021-F.webp',
      },
      {
        id: '4',
        url: 'https://http2.mlstatic.com/D_NQ_NP_2X_916090-MLA46115009009_052021-F.webp',
      },
    ],
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
    thumbnail:
      'https://http2.mlstatic.com/D_NQ_NP_2X_618374-MLA75195760214_032024-F.webp',
    pictures: [
      {
        id: '1',
        url: 'https://http2.mlstatic.com/D_NQ_NP_2X_618374-MLA75195760214_032024-F.webp',
      },
      {
        id: '2',
        url: 'https://http2.mlstatic.com/D_NQ_NP_2X_821023-MLA75195760213_032024-F.webp',
      },
      {
        id: '3',
        url: 'https://http2.mlstatic.com/D_NQ_NP_2X_930253-MLA75195746808_032024-F.webp',
      },
      {
        id: '4',
        url: 'https://http2.mlstatic.com/D_NQ_NP_2X_650838-MLA75195760216_032024-F.webp',
      },
    ],
    shipping: { free_shipping: false },
  },
  {
    id: 'MLA555555555',
    title: 'iPhone 8 64 GB Plata - Reacondicionado',
    price: 412500,
    currency_id: 'ARS',
    condition: 'used',
    thumbnail:
      'https://http2.mlstatic.com/D_NQ_NP_2X_711280-MLA40667796994_022020-F.webp',
    pictures: [
      {
        id: '1',
        url: 'https://http2.mlstatic.com/D_NQ_NP_2X_711280-MLA40667796994_022020-F.webp',
      },
      {
        id: '2',
        url: 'https://http2.mlstatic.com/D_NQ_NP_2X_659827-MLA40667738997_022020-F.webp',
      },
      {
        id: '3',
        url: 'https://http2.mlstatic.com/D_NQ_NP_2X_785572-MLA40667797007_022020-F.webp',
      },
      {
        id: '4',
        url: 'https://http2.mlstatic.com/D_NQ_NP_2X_644996-MLA40667738992_022020-F.webp',
      },
    ],
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
    const { id } = params;
    const product = products.find((p) => p.id === id);

    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({
      id: product.id,
      title: product.title,
      price: product.price,
      original_price: product.price * 1.2, // Mock original price
      currency_id: product.currency_id,
      available_quantity: 3,
      sold_quantity: 5,
      condition: product.condition,
      permalink: `https://www.mercadolibre.com.ar/p/${product.id}`,
      thumbnail: product.thumbnail,
      shipping: {
        free_shipping: product.shipping.free_shipping,
        mode: 'me2',
        logistic_type: 'fulfillment',
        store_pick_up: false,
      },
      pictures: product.pictures || [
        {
          id: '1',
          url: product.thumbnail,
        },
      ],
      installments: product.installments || {
        quantity: 9,
        amount: product.price / 9,
        rate: 0,
        currency_id: product.currency_id,
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
          value_name: product.title,
        },
      ],
      warranty: 'Garantía del vendedor: 3 meses',
      description: {
        plain_text: `Descripción detallada del producto ${product.title}. Este es un producto excelente con características increíbles.`,
      },
      reviews: product.reviews || {
        rating_average: 0,
        total: 0,
      },
    });
  }),
];

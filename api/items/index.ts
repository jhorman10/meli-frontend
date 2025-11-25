import type { VercelRequest, VercelResponse } from '@vercel/node';

// Datos simulados (en producción real, esto vendría de una BD)
const mockData = {
  search: {
    query: 'iphone',
    paging: {
      total: 1500,
      offset: 0,
      limit: 3,
    },
    results: [
      {
        id: 'MLA123456789',
        title: 'Apple iPhone 13 (128 GB) - Medianoche',
        price: 1367999,
        currency_id: 'ARS',
        condition: 'new',
        thumbnail:
          'https://http2.mlstatic.com/D_NQ_NP_123456-MLA00000000000_092023-I.jpg',
        installments: {
          quantity: 12,
          amount: 113999.92,
        },
        shipping: {
          free_shipping: true,
        },
        reviews: {
          rating_average: 4.9,
          total: 35,
        },
      },
      {
        id: 'MLA987654321',
        title: 'Apple iPhone 16 Pro Max 256gb',
        price: 2299000,
        currency_id: 'ARS',
        condition: 'new',
        thumbnail:
          'https://http2.mlstatic.com/D_NQ_NP_987654-MLA00000000001_092024-I.jpg',
        shipping: {
          free_shipping: true,
        },
      },
      {
        id: 'MLA555555555',
        title: 'iPhone 8 64 GB Plata - Reacondicionado',
        price: 412500,
        currency_id: 'ARS',
        condition: 'used',
        thumbnail:
          'https://http2.mlstatic.com/D_NQ_NP_555555-MLA00000000002_082023-I.jpg',
        reviews: {
          rating_average: 5.0,
          total: 2,
        },
      },
    ],
  },
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers para permitir requests desde el frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { q, limit = '10', offset = '0' } = req.query;

  // Simular búsqueda (en producción real, filtrarías por query)
  const response = {
    query: q || '',
    paging: {
      total: mockData.search.paging.total,
      offset: parseInt(offset as string, 10),
      limit: parseInt(limit as string, 10),
    },
    results: mockData.search.results,
  };

  return res.status(200).json(response);
}

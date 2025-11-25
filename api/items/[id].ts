import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ProductData {
  id: string;
  title: string;
  price: number;
  original_price?: number;
  currency_id: string;
  available_quantity: number;
  sold_quantity: number;
  condition: 'new' | 'used';
  permalink: string;
  pictures: Array<{ id: string; url: string }>;
  installments?: {
    quantity: number;
    amount: number;
    rate: number;
    currency_id: string;
  };
  shipping: {
    free_shipping: boolean;
    mode: string;
    logistic_type: string;
    store_pick_up: boolean;
  };
  seller_address: {
    city: { name: string };
    state: { name: string };
  };
  attributes: Array<{
    id: string;
    name: string;
    value_name: string;
  }>;
  warranty: string;
  description: {
    plain_text: string;
  };
  reviews?: {
    rating_average: number;
    total: number;
  };
}

// Datos simulados de productos
const products: Record<string, ProductData> = {
  MLA998877665: {
    id: 'MLA998877665',
    title: 'Apple iPhone 16 Pro (256gb) - Nuevo - Liberado - Caja Sellada',
    price: 2509380.59,
    original_price: 3023244.99,
    currency_id: 'ARS',
    available_quantity: 3,
    sold_quantity: 5,
    condition: 'new',
    permalink: 'https://www.mercadolibre.com.ar/p/MLA998877665',
    pictures: [
      {
        id: '1',
        url: 'https://http2.mlstatic.com/D_987654-MLA0000000000_092023-I.jpg',
      },
      {
        id: '2',
        url: 'https://http2.mlstatic.com/D_987655-MLA0000000001_092023-I.jpg',
      },
    ],
    installments: {
      quantity: 9,
      amount: 278820.07,
      rate: 0,
      currency_id: 'ARS',
    },
    shipping: {
      free_shipping: true,
      mode: 'me2',
      logistic_type: 'fulfillment',
      store_pick_up: false,
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
  },
  MLA123456789: {
    id: 'MLA123456789',
    title: 'Apple iPhone 13 (128 GB) - Medianoche',
    price: 1367999,
    original_price: 1500000,
    currency_id: 'ARS',
    available_quantity: 10,
    sold_quantity: 150,
    condition: 'new',
    permalink: 'https://www.mercadolibre.com.ar/p/MLA123456789',
    pictures: [
      {
        id: '1',
        url: 'https://http2.mlstatic.com/D_NQ_NP_123456-MLA00000000000_092023-I.jpg',
      },
    ],
    installments: {
      quantity: 12,
      amount: 113999.92,
      rate: 0,
      currency_id: 'ARS',
    },
    shipping: {
      free_shipping: true,
      mode: 'me2',
      logistic_type: 'fulfillment',
      store_pick_up: false,
    },
    seller_address: {
      city: {
        name: 'Palermo',
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
        value_name: 'iPhone 13',
      },
      {
        id: 'STORAGE_CAPACITY',
        name: 'Capacidad de almacenamiento',
        value_name: '128 GB',
      },
    ],
    warranty: 'Garantía oficial de Apple: 12 meses',
    description: {
      plain_text:
        'El iPhone 13 cuenta con el sistema de cámara dual más avanzado que tuvo un iPhone. Captura fotos increíbles con poca luz con el nuevo modo Noche, y graba videos en Dolby Vision HDR.',
    },
    reviews: {
      rating_average: 4.9,
      total: 35,
    },
  },
  MLA987654321: {
    id: 'MLA987654321',
    title: 'Apple iPhone 16 Pro Max 256gb',
    price: 2299000,
    original_price: 2500000,
    currency_id: 'ARS',
    available_quantity: 5,
    sold_quantity: 25,
    condition: 'new',
    permalink: 'https://www.mercadolibre.com.ar/p/MLA987654321',
    pictures: [
      {
        id: '1',
        url: 'https://http2.mlstatic.com/D_NQ_NP_987654-MLA00000000001_092024-I.jpg',
      },
    ],
    installments: {
      quantity: 12,
      amount: 191583.33,
      rate: 0,
      currency_id: 'ARS',
    },
    shipping: {
      free_shipping: true,
      mode: 'me2',
      logistic_type: 'fulfillment',
      store_pick_up: false,
    },
    seller_address: {
      city: {
        name: 'Microcentro',
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
        value_name: 'iPhone 16 Pro Max',
      },
      {
        id: 'STORAGE_CAPACITY',
        name: 'Capacidad de almacenamiento',
        value_name: '256 GB',
      },
    ],
    warranty: 'Garantía oficial de Apple: 12 meses',
    description: {
      plain_text:
        'El iPhone 16 Pro Max representa lo último en tecnología móvil. Con su increíble sistema de cámaras profesional y el chip A18 Pro, lleva tu experiencia móvil a un nivel completamente nuevo.',
    },
    reviews: {
      rating_average: 4.8,
      total: 12,
    },
  },
  MLA555555555: {
    id: 'MLA555555555',
    title: 'iPhone 8 64 GB Plata - Reacondicionado',
    price: 412500,
    currency_id: 'ARS',
    available_quantity: 2,
    sold_quantity: 8,
    condition: 'used',
    permalink: 'https://www.mercadolibre.com.ar/p/MLA555555555',
    pictures: [
      {
        id: '1',
        url: 'https://http2.mlstatic.com/D_NQ_NP_555555-MLA00000000002_082023-I.jpg',
      },
    ],
    shipping: {
      free_shipping: false,
      mode: 'me2',
      logistic_type: 'fulfillment',
      store_pick_up: true,
    },
    seller_address: {
      city: {
        name: 'Villa Crespo',
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
        value_name: 'iPhone 8',
      },
      {
        id: 'STORAGE_CAPACITY',
        name: 'Capacidad de almacenamiento',
        value_name: '64 GB',
      },
    ],
    warranty: 'Garantía del vendedor: 6 meses',
    description: {
      plain_text:
        'iPhone 8 reacondicionado en excelentes condiciones. Totalmente funcional con batería nueva. El teléfono ha sido completamente probado y restaurado a sus especificaciones originales.',
    },
    reviews: {
      rating_average: 5.0,
      total: 2,
    },
  },
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  const product = products[id];

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  return res.status(200).json(product);
}

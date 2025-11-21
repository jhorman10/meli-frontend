# Shared Layer

Esta carpeta contiene **utilidades y constantes compartidas** que pueden ser utilizadas por todas las capas de la aplicación.

## 📁 Estructura

```
shared/
├── utils/           # Funciones utilitarias reutilizables
│   ├── formatters.ts    # Formateo de precios, números, etc.
│   ├── calculations.ts  # Cálculos de negocios (descuentos, impuestos)
│   └── index.ts
├── constants/       # Constantes de configuración
│   ├── currency.ts      # Constantes de moneda y locale
│   └── index.ts
└── index.ts         # Punto de entrada principal
```

## 🔧 Utilidades Disponibles

### Formatters (`utils/formatters.ts`)

#### `formatPrice(price: number, currency: string, locale?: string): string`

Formatea un precio con el formato de moneda correspondiente.

**Ejemplo:**

```typescript
import { formatPrice } from '@/shared/utils';

const price = formatPrice(1500, 'ARS'); // "$1.500"
```

#### `formatRating(rating: number): string`

Formatea un rating a un decimal.

**Ejemplo:**

```typescript
import { formatRating } from '@/shared/utils';

const rating = formatRating(4.5); // "4.5"
```

---

### Calculations (`utils/calculations.ts`)

#### `calculateDiscount(originalPrice: number, currentPrice: number): number`

Calcula el porcentaje de descuento entre el precio original y el precio actual.

**Ejemplo:**

```typescript
import { calculateDiscount } from '@/shared/utils';

const discount = calculateDiscount(1000, 750); // 25
```

#### `calculatePriceWithoutTax(price: number, taxRate?: number): number`

Calcula el precio sin impuestos. Por defecto usa el IVA argentino (21%).

**Ejemplo:**

```typescript
import { calculatePriceWithoutTax } from '@/shared/utils';

const priceWithoutTax = calculatePriceWithoutTax(1210); // 1000
```

---

## 📌 Constantes Disponibles

### Currency (`constants/currency.ts`)

- **`DEFAULT_CURRENCY`**: `'ARS'` - Moneda por defecto
- **`DEFAULT_LOCALE`**: `'es-AR'` - Locale por defecto para formateo
- **`DEFAULT_TAX_RATE`**: `0.21` - Tasa de IVA (21%)

**Ejemplo:**

```typescript
import { DEFAULT_CURRENCY, DEFAULT_TAX_RATE } from '@/shared/constants';

console.log(DEFAULT_CURRENCY); // "ARS"
console.log(DEFAULT_TAX_RATE); // 0.21
```

---

## 💡 Uso Recomendado

### Importar desde el índice principal

```typescript
// ✅ Recomendado
import { formatPrice, calculateDiscount } from '@/shared/utils';
import { DEFAULT_CURRENCY } from '@/shared/constants';

// ✅ También válido
import { formatPrice, DEFAULT_CURRENCY } from '@/shared';
```

### Evitar importaciones directas de archivos internos

```typescript
// ❌ Evitar
import { formatPrice } from '@/shared/utils/formatters';
```

---

## 🎯 Principios

1. **Reutilizable**: Las utilidades deben ser genéricas y aplicables en múltiples contextos
2. **Sin Dependencias de Capa**: No debe depender de domain, application, infrastructure o presentation
3. **Puras**: Las funciones deben ser puras (sin efectos secundarios)
4. **Testeables**: Todas las utilidades deben ser fáciles de testear

---

## ✨ Beneficios

- ✅ **Evita duplicación de código**
- ✅ **Facilita el mantenimiento**
- ✅ **Consistencia** en toda la aplicación
- ✅ **Fácil de testear** de forma aislada

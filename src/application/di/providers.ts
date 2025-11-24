import { Container } from './Container';
import type { ProductService } from '../services/ProductService';
import type { SearchService } from '../services/SearchService';

/**
 * Proveedores de Servicios
 * Funciones de fábrica convenientes para obtener instancias de servicios
 */

/**
 * Obtener instancia de ProductService
 */
export const getProductService = (): ProductService => {
  return Container.getInstance().getProductService();
};

/**
 * Obtener instancia de SearchService
 */
export const getSearchService = (): SearchService => {
  return Container.getInstance().getSearchService();
};

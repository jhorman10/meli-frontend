import { Container } from './Container';
import type { ProductService, SearchService } from '../services';

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

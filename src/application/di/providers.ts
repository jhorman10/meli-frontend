import { Container } from './Container';
import type { ProductService } from '../services/ProductService';
import type { SearchService } from '../services/SearchService';

/**
 * Service Providers
 * Convenient factory functions to get service instances
 */

/**
 * Get ProductService instance
 */
export const getProductService = (): ProductService => {
  return Container.getInstance().getProductService();
};

/**
 * Get SearchService instance
 */
export const getSearchService = (): SearchService => {
  return Container.getInstance().getSearchService();
};

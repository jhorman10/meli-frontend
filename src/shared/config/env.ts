/**
 * Environment configuration helper
 * Abstracts access to environment variables to support both Vite and Jest environments
 */
export const getApiUrl = (): string => {
  return import.meta.env.VITE_API_URL || '/api';
};

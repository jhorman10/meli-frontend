/**
 * Mock for environment configuration
 * Used in Jest tests to bypass import.meta syntax error
 */
export const getApiUrl = (): string => {
  return 'http://localhost:3001';
};

/**
 * productsApi.ts
 * Mock API functions for fetching product data.
 */
import { mockProducts } from '../../../mock/products';
import type { Product } from '../../../mock/types/product';

/**
 * Fetches mock products asynchronously (simulates API call)
 * @returns Promise<Product[]>
 */
export const fetchProducts = async (): Promise<Product[]> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 500);
  });
};

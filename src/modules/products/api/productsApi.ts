/**
 * productsApi.ts
 *
 * This file contains the API service functions for products.
 * It uses the central axiosInstance to make requests to the API.
 */
import axiosInstance from '../../../core/api/axiosInstance';
import type { Product } from '../../../mock/types/product';

/**
 * Fetches all products from the API.
 * @returns {Promise<Product[]>} A promise that resolves to an array of products.
 */
export const getProducts = async (): Promise<Product[]> => {
  const response = await axiosInstance.get<Product[]>('/products');
  return response.data;
};

/**
 * Fetches a single product by its ID.
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<Product>} A promise that resolves to the product.
 */
export const getProductById = async (id: string): Promise<Product> => {
  const response = await axiosInstance.get<Product>(`/products/${id}`);
  return response.data;
};

/**
 * Creates a new product.
 * @param {Omit<Product, 'id'>} product - The product data to create (without id).
 * @returns {Promise<Product>} A promise that resolves to the newly created product.
 */
export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await axiosInstance.post<Product>('/products', product);
  return response.data;
};

/**
 * Updates an existing product.
 * @param {Product} product - The full product data to update.
 * @returns {Promise<Product>} A promise that resolves to the updated product.
 */
export const updateProduct = async (product: Product): Promise<Product> => {
  const response = await axiosInstance.put<Product>(`/products/${product.id}`, product);
  return response.data;
};

/**
 * Deletes a product by its ID.
 * @param {string} id - The ID of the product to delete.
 * @returns {Promise<void>} A promise that resolves when the product is deleted.
 */
export const deleteProduct = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/products/${id}`);
};

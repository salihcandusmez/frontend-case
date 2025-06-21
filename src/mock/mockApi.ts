/**
 * mockApi.ts
 *
 * This file sets up the Axios mock adapter to simulate API requests
 * for development purposes. It intercepts calls made with `axiosInstance`
 * and returns mock data instead of making real HTTP requests.
 */
import MockAdapter from 'axios-mock-adapter';
import axiosInstance from '../core/api/axiosInstance';
import { mockProducts } from './products';
import { mockUsers } from './users';
import type { Product } from './types/product';
import type { User } from './types/user';

const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

// --- Product Mocks ---

// GET /api/products
mock.onGet('/products').reply(() => {
  return [200, mockProducts];
});

// GET /api/products/:id
mock.onGet(/\/products\/.+/).reply((config) => {
  const id = config.url?.split('/').pop() || '0';
  const product = mockProducts.find((p) => p.id === id);
  return product ? [200, product] : [404, { message: 'Product not found' }];
});

// POST /api/products
mock.onPost('/products').reply((config) => {
  const newProduct = JSON.parse(config.data) as Omit<Product, 'id'>;
  const newId = new Date().getTime().toString();
  const createdProduct: Product = { id: newId, ...newProduct };
  mockProducts.push(createdProduct);
  return [201, createdProduct];
});

// PUT /api/products/:id
mock.onPut(/\/products\/.+/).reply((config) => {
  const id = config.url?.split('/').pop() || '0';
  const updatedData = JSON.parse(config.data) as Partial<Product>;
  const productIndex = mockProducts.findIndex((p) => p.id === id);
  if (productIndex !== -1) {
    mockProducts[productIndex] = { ...mockProducts[productIndex], ...updatedData };
    return [200, mockProducts[productIndex]];
  }
  return [404, { message: 'Product not found' }];
});

// DELETE /api/products/:id
mock.onDelete(/\/products\/.+/).reply((config) => {
  const id = config.url?.split('/').pop() || '0';
  const productIndex = mockProducts.findIndex((p) => p.id === id);
  if (productIndex !== -1) {
    mockProducts.splice(productIndex, 1);
    return [204]; // No Content
  }
  return [404, { message: 'Product not found' }];
});

// --- User Mocks ---

// GET /api/users
mock.onGet('/users').reply(() => {
  return [200, mockUsers];
});

// GET /api/users/:id
mock.onGet(/\/users\/.+/).reply((config) => {
  const id = config.url?.split('/').pop() || '0';
  const user = mockUsers.find((u) => u.id === id);
  return user ? [200, user] : [404, { message: 'User not found' }];
});

// POST /api/users
mock.onPost('/users').reply((config) => {
  const newUser = JSON.parse(config.data) as Omit<User, 'id'>;
  const newId = new Date().getTime().toString();
  const createdUser: User = { id: newId, ...newUser };
  mockUsers.push(createdUser);
  return [201, createdUser];
});

// PUT /api/users/:id
mock.onPut(/\/users\/.+/).reply((config) => {
  const id = config.url?.split('/').pop() || '0';
  const updatedData = JSON.parse(config.data) as Partial<User>;
  const userIndex = mockUsers.findIndex((u) => u.id === id);
  if (userIndex !== -1) {
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updatedData };
    return [200, mockUsers[userIndex]];
  }
  return [404, { message: 'User not found' }];
});

// DELETE /api/users/:id
mock.onDelete(/\/users\/.+/).reply((config) => {
  const id = config.url?.split('/').pop() || '0';
  const userIndex = mockUsers.findIndex((u) => u.id === id);
  if (userIndex !== -1) {
    mockUsers.splice(userIndex, 1);
    return [204]; // No Content
  }
  return [404, { message: 'User not found' }];
});

export default mock;

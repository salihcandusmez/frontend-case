/**
 * usersApi.ts
 *
 * This file contains the API service functions for users.
 * It uses the central axiosInstance to make requests to the API.
 */
import axiosInstance from '../../../core/api/axiosInstance';
import type { User } from '../../../mock/types/user';

/**
 * Fetches all users from the API.
 * @returns {Promise<User[]>} A promise that resolves to an array of users.
 */
export const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>('/users');
  return response.data;
};

/**
 * Fetches a single user by its ID.
 * @param {string} id - The ID of the user to fetch.
 * @returns {Promise<User>} A promise that resolves to the user.
 */
export const getUserById = async (id: string): Promise<User> => {
  const response = await axiosInstance.get<User>(`/users/${id}`);
  return response.data;
};

/**
 * Creates a new user.
 * @param {Omit<User, 'id'>} user - The user data to create (without id).
 * @returns {Promise<User>} A promise that resolves to the newly created user.
 */
export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await axiosInstance.post<User>('/users', user);
  return response.data;
};

/**
 * Updates an existing user.
 * @param {User} user - The full user data to update.
 * @returns {Promise<User>} A promise that resolves to the updated user.
 */
export const updateUser = async (user: User): Promise<User> => {
  const response = await axiosInstance.put<User>(`/users/${user.id}`, user);
  return response.data;
};

/**
 * Deletes a user by its ID.
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<void>} A promise that resolves when the user is deleted.
 */
export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`);
};

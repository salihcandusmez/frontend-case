/**
 * usersApi.ts
 * Mock API functions for fetching user data.
 */
import { mockUsers } from '../../../mock/users';
import type { User } from '../../../mock/types/user';

/**
 * Fetches mock users asynchronously (simulates API call)
 * @returns Promise<User[]>
 */
export const fetchUsers = async (): Promise<User[]> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers);
    }, 500);
  });
};

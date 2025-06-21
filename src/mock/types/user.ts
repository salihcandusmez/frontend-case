/**
 * User type definition
 * Represents a user entity in the system.
 */
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
};

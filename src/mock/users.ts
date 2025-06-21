/**
 * users.ts
 * Mock user data for development.
 */
import type { User } from './types/user';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@example.com',
    role: 'admin',
    status: 'active',
  },
  {
    id: '2',
    name: 'Ayşe Kaya',
    email: 'ayse.kaya@example.com',
    role: 'user',
    status: 'active',
  },
  {
    id: '3',
    name: 'Mehmet Demir',
    email: 'mehmet.demir@example.com',
    role: 'user',
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Fatma Şahin',
    email: 'fatma.sahin@example.com',
    role: 'user',
    status: 'active',
  },
  {
    id: '5',
    name: 'Mustafa Çelik',
    email: 'mustafa.celik@example.com',
    role: 'admin',
    status: 'inactive',
  },
];

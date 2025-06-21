import type { User } from './types/user';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    role: 'admin',
    status: 'active',
  },
  {
    id: '2',
    name: 'Ayşe Demir',
    email: 'ayse@example.com',
    role: 'user',
    status: 'active',
  },
  {
    id: '3',
    name: 'Mehmet Kaya',
    email: 'mehmet@example.com',
    role: 'user',
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Elif Çelik',
    email: 'elif@example.com',
    role: 'admin',
    status: 'active',
  },
];

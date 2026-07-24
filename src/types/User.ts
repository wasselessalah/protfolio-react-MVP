export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'super-admin';
  avatar?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

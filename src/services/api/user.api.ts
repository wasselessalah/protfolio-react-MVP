import api from '../axios';
import { User } from '../../types/User';

export const userApi = {
  getAll: async () => {
    const { data } = await api.get<User[]>('/users');
    return data;
  },
  getById: async (id: string) => {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },
  create: async (payload: Partial<User>) => {
    const { data } = await api.post<User>('/users', payload);
    return data;
  },
  update: async (id: string, payload: Partial<User>) => {
    const { data } = await api.put<User>(`/users/${id}`, payload);
    return data;
  },
  delete: async (id: string) => {
    const { data } = await api.delete(`/users/${id}`);
    return data;
  }
};

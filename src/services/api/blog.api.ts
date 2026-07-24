import api from '../axios';
import type { Blog } from '../../types/Blog';
import type { ApiResponse } from '../../types/ApiResponse';

export const blogApi = {
  getAll: async (): Promise<Blog[]> => {
    const { data } = await api.get<ApiResponse<Blog[]>>('/blogs');
    return data.data;
  },
  getById: async (id: string): Promise<Blog> => {
    const { data } = await api.get<ApiResponse<Blog>>(`/blogs/${id}`);
    return data.data;
  },
  create: async (payload: Partial<Blog>): Promise<Blog> => {
    const { data } = await api.post<ApiResponse<Blog>>('/blogs', payload);
    return data.data;
  },
  update: async (id: string, payload: Partial<Blog>): Promise<Blog> => {
    const { data } = await api.put<ApiResponse<Blog>>(`/blogs/${id}`, payload);
    return data.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/blogs/${id}`);
  },
};

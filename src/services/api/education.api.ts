import api from '../axios';
import type { Education } from '../../types/Education';
import type { ApiResponse } from '../../types/ApiResponse';

// Note: backend route is /education (not /educations)
export const educationApi = {
  getAll: async (): Promise<Education[]> => {
    const { data } = await api.get<ApiResponse<Education[]>>('/education');
    return data.data;
  },
  getById: async (id: string): Promise<Education> => {
    const { data } = await api.get<ApiResponse<Education>>(`/education/${id}`);
    return data.data;
  },
  create: async (payload: Partial<Education>): Promise<Education> => {
    const { data } = await api.post<ApiResponse<Education>>('/education', payload);
    return data.data;
  },
  update: async (id: string, payload: Partial<Education>): Promise<Education> => {
    const { data } = await api.put<ApiResponse<Education>>(`/education/${id}`, payload);
    return data.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/education/${id}`);
  },
};

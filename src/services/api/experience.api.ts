import api from '../axios';
import type { Experience } from '../../types/Experience';
import type { ApiResponse } from '../../types/ApiResponse';

export const experienceApi = {
  getAll: async (): Promise<Experience[]> => {
    const { data } = await api.get<ApiResponse<Experience[]>>('/experiences');
    return data.data;
  },
  getById: async (id: string): Promise<Experience> => {
    const { data } = await api.get<ApiResponse<Experience>>(`/experiences/${id}`);
    return data.data;
  },
  create: async (payload: Partial<Experience>): Promise<Experience> => {
    const { data } = await api.post<ApiResponse<Experience>>('/experiences', payload);
    return data.data;
  },
  update: async (id: string, payload: Partial<Experience>): Promise<Experience> => {
    const { data } = await api.put<ApiResponse<Experience>>(`/experiences/${id}`, payload);
    return data.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/experiences/${id}`);
  },
};

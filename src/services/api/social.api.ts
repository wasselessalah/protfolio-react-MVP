import api from '../axios';
import type { Social } from '../../types/Social';
import type { ApiResponse } from '../../types/ApiResponse';

export const socialApi = {
  getAll: async (): Promise<Social[]> => {
    const { data } = await api.get<ApiResponse<Social[]>>('/socials');
    return data.data;
  },
  getById: async (id: string): Promise<Social> => {
    const { data } = await api.get<ApiResponse<Social>>(`/socials/${id}`);
    return data.data;
  },
  create: async (payload: Partial<Social>): Promise<Social> => {
    const { data } = await api.post<ApiResponse<Social>>('/socials', payload);
    return data.data;
  },
  update: async (id: string, payload: Partial<Social>): Promise<Social> => {
    const { data } = await api.put<ApiResponse<Social>>(`/socials/${id}`, payload);
    return data.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/socials/${id}`);
  },
};

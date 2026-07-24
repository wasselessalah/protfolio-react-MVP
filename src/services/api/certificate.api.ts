import api from '../axios';
import type { Certificate } from '../../types/Certificate';
import type { ApiResponse } from '../../types/ApiResponse';

export const certificateApi = {
  getAll: async (): Promise<Certificate[]> => {
    const { data } = await api.get<ApiResponse<Certificate[]>>('/certificates');
    return data.data;
  },
  getById: async (id: string): Promise<Certificate> => {
    const { data } = await api.get<ApiResponse<Certificate>>(`/certificates/${id}`);
    return data.data;
  },
  create: async (payload: Partial<Certificate>): Promise<Certificate> => {
    const { data } = await api.post<ApiResponse<Certificate>>('/certificates', payload);
    return data.data;
  },
  update: async (id: string, payload: Partial<Certificate>): Promise<Certificate> => {
    const { data } = await api.put<ApiResponse<Certificate>>(`/certificates/${id}`, payload);
    return data.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/certificates/${id}`);
  },
};

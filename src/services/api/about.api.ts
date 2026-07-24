import api from '../axios';
import type { About } from '../../types/About';
import type { ApiResponse } from '../../types/ApiResponse';

export const aboutApi = {
  get: async (): Promise<About> => {
    const { data } = await api.get<ApiResponse<About>>('/about');
    return data.data;
  },
  update: async (payload: Partial<About>): Promise<About> => {
    const { data } = await api.put<ApiResponse<About>>('/about', payload);
    return data.data;
  },
};

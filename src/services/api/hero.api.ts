import api from '../axios';
import type { Hero } from '../../types/Hero';
import type { ApiResponse } from '../../types/ApiResponse';

export const heroApi = {
  get: async (): Promise<Hero> => {
    const { data } = await api.get<ApiResponse<Hero>>('/hero');
    return data.data;
  },
  update: async (payload: Partial<Hero>): Promise<Hero> => {
    const { data } = await api.put<ApiResponse<Hero>>('/hero', payload);
    return data.data;
  },
};

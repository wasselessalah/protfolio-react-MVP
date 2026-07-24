import api from '../axios';
import type { Settings } from '../../types/Settings';
import type { ApiResponse } from '../../types/ApiResponse';

export const settingsApi = {
  get: async (): Promise<Settings> => {
    const { data } = await api.get<ApiResponse<Settings>>('/settings');
    return data.data;
  },
  update: async (payload: Partial<Settings>): Promise<Settings> => {
    const { data } = await api.put<ApiResponse<Settings>>('/settings', payload);
    return data.data;
  },
};

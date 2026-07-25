import api from '../axios';
import type { Resume } from '../../types/Resume';
import type { ApiResponse } from '../../types/ApiResponse';

export const resumeApi = {
  getCurrent: async (): Promise<Resume | null> => {
    const { data } = await api.get<ApiResponse<Resume | null>>('/resume');
    return data.data;
  },
};

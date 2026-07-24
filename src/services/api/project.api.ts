import api from '../axios';
import type { Project } from '../../types/Project';
import type { ApiResponse } from '../../types/ApiResponse';

export const projectApi = {
  getAll: async (): Promise<Project[]> => {
    const { data } = await api.get<ApiResponse<Project[]>>('/projects');
    return data.data;
  },
  getById: async (id: string): Promise<Project> => {
    const { data } = await api.get<ApiResponse<Project>>(`/projects/${id}`);
    return data.data;
  },
  getBySlug: async (slug: string): Promise<Project> => {
    const { data } = await api.get<ApiResponse<Project>>(`/projects/slug/${slug}`);
    return data.data;
  },
  create: async (payload: Partial<Project>): Promise<Project> => {
    const { data } = await api.post<ApiResponse<Project>>('/projects', payload);
    return data.data;
  },
  update: async (id: string, payload: Partial<Project>): Promise<Project> => {
    const { data } = await api.put<ApiResponse<Project>>(`/projects/${id}`, payload);
    return data.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },
};

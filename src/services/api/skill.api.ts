import api from '../axios';
import type { Skill, SkillCategory } from '../../types/Skill';
import type { ApiResponse } from '../../types/ApiResponse';

export const skillApi = {
  getAll: async (): Promise<Skill[]> => {
    const { data } = await api.get<ApiResponse<Skill[]>>('/skills');
    return data.data;
  },
  getById: async (id: string): Promise<Skill> => {
    const { data } = await api.get<ApiResponse<Skill>>(`/skills/${id}`);
    return data.data;
  },
  create: async (payload: Partial<Skill>): Promise<Skill> => {
    const { data } = await api.post<ApiResponse<Skill>>('/skills', payload);
    return data.data;
  },
  update: async (id: string, payload: Partial<Skill>): Promise<Skill> => {
    const { data } = await api.put<ApiResponse<Skill>>(`/skills/${id}`, payload);
    return data.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/skills/${id}`);
  },
};

export const skillCategoryApi = {
  getAll: async (): Promise<SkillCategory[]> => {
    const { data } = await api.get<ApiResponse<SkillCategory[]>>('/skill-categories');
    return data.data;
  },
  getById: async (id: string): Promise<SkillCategory> => {
    const { data } = await api.get<ApiResponse<SkillCategory>>(`/skill-categories/${id}`);
    return data.data;
  },
  create: async (payload: Partial<SkillCategory>): Promise<SkillCategory> => {
    const { data } = await api.post<ApiResponse<SkillCategory>>('/skill-categories', payload);
    return data.data;
  },
  update: async (id: string, payload: Partial<SkillCategory>): Promise<SkillCategory> => {
    const { data } = await api.put<ApiResponse<SkillCategory>>(`/skill-categories/${id}`, payload);
    return data.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/skill-categories/${id}`);
  },
};

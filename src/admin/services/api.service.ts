// src/admin/services/api.service.ts
import api from '../lib/axios';
import { ApiResponse, DashboardStats, Project, Blog, Message, About, Hero, Settings, Social, Skill, SkillCategory, Experience, Education, Certificate } from '../types';

// ── Generic CRUD helpers ──────────────────────────
const getAll = <T>(endpoint: string, params?: Record<string, unknown>) =>
  api.get<ApiResponse<T[]>>(endpoint, { params }).then((r) => r.data);

const getOne = <T>(endpoint: string, id: string) =>
  api.get<ApiResponse<T>>(`${endpoint}/${id}`).then((r) => r.data);

const create = <T>(endpoint: string, body: unknown) =>
  api.post<ApiResponse<T>>(endpoint, body).then((r) => r.data);

const update = <T>(endpoint: string, id: string, body: unknown) =>
  api.put<ApiResponse<T>>(`${endpoint}/${id}`, body).then((r) => r.data);

const updateSingleton = <T>(endpoint: string, body: unknown) =>
  api.put<ApiResponse<T>>(endpoint, body).then((r) => r.data);

const remove = (endpoint: string, id: string) =>
  api.delete(`${endpoint}/${id}`).then((r) => r.data);

// ── Dashboard ────────────────────────────────────
export const dashboardService = {
  getStats: () => api.get<ApiResponse<DashboardStats>>('/dashboard/stats').then((r) => r.data),
};

// ── Auth ─────────────────────────────────────────
export const authService = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }).then((r) => r.data),
  logout: () => api.post('/auth/logout').then((r) => r.data),
  getMe: () => api.get('/auth/me').then((r) => r.data),
  refresh: () => api.post('/auth/refresh').then((r) => r.data),
};

// ── Projects ─────────────────────────────────────
export const projectService = {
  getAll: (params?: Record<string, unknown>) => getAll<Project>('/projects', params),
  getOne: (id: string) => getOne<Project>('/projects', id),
  create: (body: Partial<Project>) => create<Project>('/projects', body),
  update: (id: string, body: Partial<Project>) => update<Project>('/projects', id, body),
  delete: (id: string) => remove('/projects', id),
  duplicate: (id: string) => api.post(`/projects/${id}/duplicate`).then((r) => r.data),
  toggleFeatured: (id: string) => api.patch(`/projects/${id}/toggle-featured`).then((r) => r.data),
  archive: (id: string) => api.patch(`/projects/${id}/archive`).then((r) => r.data),
  uploadImage: (id: string, file: File) => {
    const fd = new FormData();
    fd.append('image', file);
    return api.post(`/projects/${id}/upload-image`, fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data);
  },
};

// ── Skills ────────────────────────────────────────
export const skillService = {
  getAll: (params?: Record<string, unknown>) => getAll<Skill>('/skills', params),
  getOne: (id: string) => getOne<Skill>('/skills', id),
  create: (body: Partial<Skill>) => create<Skill>('/skills', body),
  update: (id: string, body: Partial<Skill>) => update<Skill>('/skills', id, body),
  delete: (id: string) => remove('/skills', id),
  getCategories: () => getAll<SkillCategory>('/skill-categories'),
  createCategory: (body: Partial<SkillCategory>) => create<SkillCategory>('/skill-categories', body),
  updateCategory: (id: string, body: Partial<SkillCategory>) => update<SkillCategory>('/skill-categories', id, body),
  deleteCategory: (id: string) => remove('/skill-categories', id),
};

// ── Experience ────────────────────────────────────
export const experienceService = {
  getAll: (params?: Record<string, unknown>) => getAll<Experience>('/experiences', params),
  getOne: (id: string) => getOne<Experience>('/experiences', id),
  create: (body: Partial<Experience>) => create<Experience>('/experiences', body),
  update: (id: string, body: Partial<Experience>) => update<Experience>('/experiences', id, body),
  delete: (id: string) => remove('/experiences', id),
};

// ── Education ─────────────────────────────────────
export const educationService = {
  getAll: () => getAll<Education>('/education'),
  create: (body: Partial<Education>) => create<Education>('/education', body),
  update: (id: string, body: Partial<Education>) => update<Education>('/education', id, body),
  delete: (id: string) => remove('/education', id),
};

// ── Certificates ──────────────────────────────────
export const certificateService = {
  getAll: () => getAll<Certificate>('/certificates'),
  create: (body: Partial<Certificate>) => create<Certificate>('/certificates', body),
  update: (id: string, body: Partial<Certificate>) => update<Certificate>('/certificates', id, body),
  delete: (id: string) => remove('/certificates', id),
};

// ── Blog ──────────────────────────────────────────
export const blogService = {
  getAll: (params?: Record<string, unknown>) => getAll<Blog>('/blogs', params),
  getOne: (id: string) => getOne<Blog>('/blogs', id),
  create: (body: Partial<Blog>) => create<Blog>('/blogs', body),
  update: (id: string, body: Partial<Blog>) => update<Blog>('/blogs', id, body),
  delete: (id: string) => remove('/blogs', id),
};

// ── Messages ──────────────────────────────────────
export const messageService = {
  getAll: (params?: Record<string, unknown>) => getAll<Message>('/messages', params),
  getOne: (id: string) => getOne<Message>('/messages', id),
  update: (id: string, body: Partial<Message>) => update<Message>('/messages', id, body),
  delete: (id: string) => remove('/messages', id),
};

// ── About ─────────────────────────────────────────
export const aboutService = {
  get: () => api.get<ApiResponse<About>>('/about').then((r) => r.data),
  update: (body: Partial<About>) => updateSingleton<About>('/about', body),
};

// ── Hero ──────────────────────────────────────────
export const heroService = {
  get: () => api.get<ApiResponse<Hero>>('/hero').then((r) => r.data),
  update: (body: Partial<Hero>) => updateSingleton<Hero>('/hero', body),
};

// ── Settings ──────────────────────────────────────
export const settingsService = {
  get: () => api.get<ApiResponse<Settings>>('/settings').then((r) => r.data),
  update: (body: Partial<Settings>) => updateSingleton<Settings>('/settings', body),
};

// ── Socials ───────────────────────────────────────
export const socialService = {
  getAll: () => getAll<Social>('/socials'),
  create: (body: Partial<Social>) => create<Social>('/socials', body),
  update: (id: string, body: Partial<Social>) => update<Social>('/socials', id, body),
  delete: (id: string) => remove('/socials', id),
};

// ── Upload ────────────────────────────────────────
export const uploadService = {
  upload: (file: File, folder: string) => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', folder);
    return api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data);
  },
  uploadMultiple: (files: File[], folder: string) => {
    const fd = new FormData();
    files.forEach((f) => fd.append('files', f));
    fd.append('folder', folder);
    return api.post('/upload/multiple', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data);
  },
  delete: (publicId: string) => api.delete(`/upload/${encodeURIComponent(publicId)}`).then((r) => r.data),
  getMediaLibrary: (folder = 'portfolio', next_cursor?: string) =>
    api.get('/upload/media-library', { params: { folder, next_cursor } }).then((r) => r.data),
  getFolders: () => api.get('/upload/folders').then((r) => r.data),
};

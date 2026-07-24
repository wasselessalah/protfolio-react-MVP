import api from '../axios';
import type { Message } from '../../types/Message';
import type { ApiResponse } from '../../types/ApiResponse';

export type CreateMessagePayload = Pick<Message, 'name' | 'email' | 'subject' | 'message'>;

export const messageApi = {
  getAll: async (): Promise<Message[]> => {
    const { data } = await api.get<ApiResponse<Message[]>>('/messages');
    return data.data;
  },
  getById: async (id: string): Promise<Message> => {
    const { data } = await api.get<ApiResponse<Message>>(`/messages/${id}`);
    return data.data;
  },
  create: async (payload: CreateMessagePayload): Promise<Message> => {
    const { data } = await api.post<ApiResponse<Message>>('/messages', payload);
    return data.data;
  },
  update: async (id: string, payload: Partial<Message>): Promise<Message> => {
    const { data } = await api.put<ApiResponse<Message>>(`/messages/${id}`, payload);
    return data.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/messages/${id}`);
  },
};

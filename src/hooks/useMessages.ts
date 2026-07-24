import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messageApi, type CreateMessagePayload } from '../services/api/message.api';
import type { Message } from '../types/Message';

export const useMessages = () =>
  useQuery({
    queryKey: ['messages'],
    queryFn: messageApi.getAll,
  });

export const useMessage = (id: string) =>
  useQuery({
    queryKey: ['message', id],
    queryFn: () => messageApi.getById(id),
    enabled: !!id,
  });

/** Used by the public Contact form — sends a message to the portfolio owner */
export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateMessagePayload) => messageApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
};

export const useUpdateMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Message> }) =>
      messageApi.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      queryClient.invalidateQueries({ queryKey: ['message', variables.id] });
    },
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: messageApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
};

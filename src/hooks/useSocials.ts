import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { socialApi } from '../services/api/social.api';
import { Social } from '../types/Social';

export const useSocials = () => {
  return useQuery({
    queryKey: ['socials'],
    queryFn: socialApi.getAll,
  });
};

export const useSocial = (id: string) => {
  return useQuery({
    queryKey: ['social', id],
    queryFn: () => socialApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateSocial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: socialApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socials'] });
    },
  });
};

export const useUpdateSocial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Social> }) => socialApi.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['socials'] });
      queryClient.invalidateQueries({ queryKey: ['social', variables.id] });
    },
  });
};

export const useDeleteSocial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: socialApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socials'] });
    },
  });
};

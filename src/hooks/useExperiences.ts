import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { experienceApi } from '../services/api/experience.api';
import { Experience } from '../types/Experience';

export const useExperiences = () => {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: experienceApi.getAll,
  });
};

export const useExperience = (id: string) => {
  return useQuery({
    queryKey: ['experience', id],
    queryFn: () => experienceApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: experienceApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
    },
  });
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Experience> }) => experienceApi.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      queryClient.invalidateQueries({ queryKey: ['experience', variables.id] });
    },
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: experienceApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
    },
  });
};

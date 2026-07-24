import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { educationApi } from '../services/api/education.api';
import { Education } from '../types/Education';

export const useEducations = () => {
  return useQuery({
    queryKey: ['educations'],
    queryFn: educationApi.getAll,
  });
};

export const useEducation = (id: string) => {
  return useQuery({
    queryKey: ['education', id],
    queryFn: () => educationApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: educationApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['educations'] });
    },
  });
};

export const useUpdateEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Education> }) => educationApi.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['educations'] });
      queryClient.invalidateQueries({ queryKey: ['education', variables.id] });
    },
  });
};

export const useDeleteEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: educationApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['educations'] });
    },
  });
};

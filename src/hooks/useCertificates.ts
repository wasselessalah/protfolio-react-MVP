import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { certificateApi } from '../services/api/certificate.api';
import { Certificate } from '../types/Certificate';

export const useCertificates = () => {
  return useQuery({
    queryKey: ['certificates'],
    queryFn: certificateApi.getAll,
  });
};

export const useCertificate = (id: string) => {
  return useQuery({
    queryKey: ['certificate', id],
    queryFn: () => certificateApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: certificateApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
    },
  });
};

export const useUpdateCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Certificate> }) => certificateApi.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
      queryClient.invalidateQueries({ queryKey: ['certificate', variables.id] });
    },
  });
};

export const useDeleteCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: certificateApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
    },
  });
};

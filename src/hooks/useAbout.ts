import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { aboutApi } from '../services/api/about.api';

export const useAbout = () => {
  return useQuery({
    queryKey: ['about'],
    queryFn: aboutApi.get,
  });
};

export const useUpdateAbout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: aboutApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about'] });
    },
  });
};

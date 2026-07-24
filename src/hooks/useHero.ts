import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { heroApi } from '../services/api/hero.api';

export const useHero = () => {
  return useQuery({
    queryKey: ['hero'],
    queryFn: heroApi.get,
  });
};

export const useUpdateHero = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: heroApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero'] });
    },
  });
};

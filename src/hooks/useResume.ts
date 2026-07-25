import { useQuery } from '@tanstack/react-query';
import { resumeApi } from '../services/api/resume.api';

export const useResume = () => {
  return useQuery({
    queryKey: ['resume-current'],
    queryFn: resumeApi.getCurrent,
  });
};

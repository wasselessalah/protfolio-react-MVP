import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { skillApi, skillCategoryApi } from '../services/api/skill.api';
import type { Skill, SkillCategory } from '../types/Skill';

// ── Skill hooks ───────────────────────────────────

export const useSkills = () =>
  useQuery({
    queryKey: ['skills'],
    queryFn: skillApi.getAll,
  });

export const useSkill = (id: string) =>
  useQuery({
    queryKey: ['skill', id],
    queryFn: () => skillApi.getById(id),
    enabled: !!id,
  });

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: skillApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Skill> }) =>
      skillApi.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      queryClient.invalidateQueries({ queryKey: ['skill', variables.id] });
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: skillApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
  });
};

// ── Skill Category hooks ──────────────────────────

export const useSkillCategories = () =>
  useQuery({
    queryKey: ['skill-categories'],
    queryFn: skillCategoryApi.getAll,
  });

export const useSkillCategory = (id: string) =>
  useQuery({
    queryKey: ['skill-category', id],
    queryFn: () => skillCategoryApi.getById(id),
    enabled: !!id,
  });

export const useCreateSkillCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: skillCategoryApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skill-categories'] });
    },
  });
};

export const useUpdateSkillCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<SkillCategory> }) =>
      skillCategoryApi.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['skill-categories'] });
      queryClient.invalidateQueries({ queryKey: ['skill-category', variables.id] });
    },
  });
};

export const useDeleteSkillCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: skillCategoryApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skill-categories'] });
    },
  });
};

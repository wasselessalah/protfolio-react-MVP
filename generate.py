import os

base_dir = '/home/wassel/project/jareb/portfolio/frontend/src'
types_dir = os.path.join(base_dir, 'types')
api_dir = os.path.join(base_dir, 'services', 'api')
hooks_dir = os.path.join(base_dir, 'hooks')

os.makedirs(types_dir, exist_ok=True)
os.makedirs(api_dir, exist_ok=True)
os.makedirs(hooks_dir, exist_ok=True)

models = {
    'About': '''export interface About {
  _id: string;
  name: string;
  title: string;
  subtitle: string;
  location: string;
  email: string;
  phone?: string;
  availability: 'Available' | 'Busy' | 'Not Available';
  avatar?: string;
  coverImage?: string;
  shortBio: string;
  longBio: string;
  yearsOfExperience: string;
  totalProjects: string;
  technologies: string[];
  resumeUrl?: string;
  updatedAt: string;
}''',
    'Blog': '''export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  status: 'Draft' | 'Published' | 'Archived';
  featured: boolean;
  readTime: number;
  views: number;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}''',
    'Certificate': '''export interface Certificate {
  _id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  skills: string[];
  featured: boolean;
  displayOrder: number;
}''',
    'Education': '''export interface Education {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  logo?: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  grade?: string;
  description: string;
  activities: string[];
  displayOrder: number;
}''',
    'Experience': '''export interface Experience {
  _id: string;
  company: string;
  position: string;
  logo?: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies: string[];
  achievements: string[];
  type: 'Full-time' | 'Part-time' | 'Freelance' | 'Internship' | 'Contract';
  displayOrder: number;
}''',
    'Hero': '''export interface Hero {
  _id: string;
  greeting: string;
  name: string;
  titles: string[];
  description: string;
  ctaPrimary: string;
  ctaPrimaryUrl: string;
  ctaSecondary: string;
  ctaSecondaryUrl: string;
  backgroundType: 'gradient' | 'particles' | 'aurora' | 'none';
  badges: string[];
  updatedAt: string;
}''',
    'Message': '''export interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived' | 'spam';
  reply?: string;
  repliedAt?: string;
  ip?: string;
  createdAt: string;
  updatedAt: string;
}''',
    'Project': '''export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  category: string;
  status: 'Completed' | 'In Progress' | 'Archived' | 'Draft';
  featured: boolean;
  thumbnail?: string;
  gallery: string[];
  videoUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  figmaUrl?: string;
  technologies: string[];
  skills: string[];
  features: string[];
  challenges: string[];
  solutions: string[];
  role: string;
  team: string;
  client?: string;
  duration: string;
  year: string;
  tags: string[];
  priority: number;
  displayOrder: number;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}''',
    'Settings': '''export interface Settings {
  _id: string;
  siteName: string;
  siteUrl: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  googleAnalyticsId?: string;
  githubUsername: string;
  cloudinaryCloudName?: string;
  maintenanceMode: boolean;
  allowMessages: boolean;
  theme: 'dark' | 'light' | 'system';
  accentColor: string;
  updatedAt: string;
}''',
    'Skill': '''export interface Skill {
  _id: string;
  name: string;
  logo?: string;
  color: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  percentage: number;
  years: number;
  projects: number;
  icon: string;
  categoryId: string; // Ref to SkillCategory
  featured: boolean;
  displayOrder: number;
}
export interface SkillCategory {
  _id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  displayOrder: number;
}''',
    'Social': '''export interface Social {
  _id: string;
  platform: string;
  url: string;
  icon: string;
  username: string;
  visible: boolean;
  displayOrder: number;
}''',
    'User': '''export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'super-admin';
  avatar?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}'''
}

singleton_models = ['Hero', 'About', 'Settings']

for model, type_def in models.items():
    type_path = os.path.join(types_dir, model + ".ts")
    with open(type_path, 'w') as f:
        f.write(type_def + '\n')
    
    camel_name = model[0].lower() + model[1:]
    endpoint = camel_name + 's'
    if model in singleton_models:
        endpoint = camel_name
    elif model == 'Blog':
        endpoint = 'blogs'
    elif model == 'Category':
        endpoint = 'categories'

    # Generate API
    if model in singleton_models:
        api_content = (
            "import api from '../axios';\n"
            "import { " + model + " } from '../../types/" + model + "';\n\n"
            "export const " + camel_name + "Api = {\n"
            "  get: async () => {\n"
            "    const { data } = await api.get<" + model + ">('/" + endpoint + "');\n"
            "    return data;\n"
            "  },\n"
            "  update: async (payload: Partial<" + model + ">) => {\n"
            "    const { data } = await api.put<" + model + ">('/" + endpoint + "', payload);\n"
            "    return data;\n"
            "  }\n"
            "};\n"
        )
    else:
        api_content = (
            "import api from '../axios';\n"
            "import { " + model + " } from '../../types/" + model + "';\n\n"
            "export const " + camel_name + "Api = {\n"
            "  getAll: async () => {\n"
            "    const { data } = await api.get<" + model + "[]>('/" + endpoint + "');\n"
            "    return data;\n"
            "  },\n"
            "  getById: async (id: string) => {\n"
            "    const { data } = await api.get<" + model + ">(`/" + endpoint + "/${id}`);\n"
            "    return data;\n"
            "  },\n"
            "  create: async (payload: Partial<" + model + ">) => {\n"
            "    const { data } = await api.post<" + model + ">('/" + endpoint + "', payload);\n"
            "    return data;\n"
            "  },\n"
            "  update: async (id: string, payload: Partial<" + model + ">) => {\n"
            "    const { data } = await api.put<" + model + ">(`/" + endpoint + "/${id}`, payload);\n"
            "    return data;\n"
            "  },\n"
            "  delete: async (id: string) => {\n"
            "    const { data } = await api.delete(`/" + endpoint + "/${id}`);\n"
            "    return data;\n"
            "  }\n"
            "};\n"
        )

    api_path = os.path.join(api_dir, camel_name + ".api.ts")
    with open(api_path, 'w') as f:
        f.write(api_content)

    # Generate Hook
    if model in singleton_models:
        hook_content = (
            "import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';\n"
            "import { " + camel_name + "Api } from '../services/api/" + camel_name + ".api';\n"
            "import { " + model + " } from '../types/" + model + "';\n\n"
            "export const use" + model + " = () => {\n"
            "  return useQuery({\n"
            "    queryKey: ['" + camel_name + "'],\n"
            "    queryFn: " + camel_name + "Api.get,\n"
            "  });\n"
            "};\n\n"
            "export const useUpdate" + model + " = () => {\n"
            "  const queryClient = useQueryClient();\n"
            "  return useMutation({\n"
            "    mutationFn: " + camel_name + "Api.update,\n"
            "    onSuccess: () => {\n"
            "      queryClient.invalidateQueries({ queryKey: ['" + camel_name + "'] });\n"
            "    },\n"
            "  });\n"
            "};\n"
        )
        hook_path = os.path.join(hooks_dir, "use" + model + ".ts")
    else:
        hook_content = (
            "import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';\n"
            "import { " + camel_name + "Api } from '../services/api/" + camel_name + ".api';\n"
            "import { " + model + " } from '../types/" + model + "';\n\n"
            "export const use" + model + "s = () => {\n"
            "  return useQuery({\n"
            "    queryKey: ['" + camel_name + "s'],\n"
            "    queryFn: " + camel_name + "Api.getAll,\n"
            "  });\n"
            "};\n\n"
            "export const use" + model + " = (id: string) => {\n"
            "  return useQuery({\n"
            "    queryKey: ['" + camel_name + "', id],\n"
            "    queryFn: () => " + camel_name + "Api.getById(id),\n"
            "    enabled: !!id,\n"
            "  });\n"
            "};\n\n"
            "export const useCreate" + model + " = () => {\n"
            "  const queryClient = useQueryClient();\n"
            "  return useMutation({\n"
            "    mutationFn: " + camel_name + "Api.create,\n"
            "    onSuccess: () => {\n"
            "      queryClient.invalidateQueries({ queryKey: ['" + camel_name + "s'] });\n"
            "    },\n"
            "  });\n"
            "};\n\n"
            "export const useUpdate" + model + " = () => {\n"
            "  const queryClient = useQueryClient();\n"
            "  return useMutation({\n"
            "    mutationFn: ({ id, payload }: { id: string; payload: Partial<" + model + "> }) => " + camel_name + "Api.update(id, payload),\n"
            "    onSuccess: (_, variables) => {\n"
            "      queryClient.invalidateQueries({ queryKey: ['" + camel_name + "s'] });\n"
            "      queryClient.invalidateQueries({ queryKey: ['" + camel_name + "', variables.id] });\n"
            "    },\n"
            "  });\n"
            "};\n\n"
            "export const useDelete" + model + " = () => {\n"
            "  const queryClient = useQueryClient();\n"
            "  return useMutation({\n"
            "    mutationFn: " + camel_name + "Api.delete,\n"
            "    onSuccess: () => {\n"
            "      queryClient.invalidateQueries({ queryKey: ['" + camel_name + "s'] });\n"
            "    },\n"
            "  });\n"
            "};\n"
        )
        hook_path = os.path.join(hooks_dir, "use" + model + "s.ts")

    with open(hook_path, 'w') as f:
        f.write(hook_content)

print("Files generated successfully.")

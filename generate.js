const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src');
const typesDir = path.join(baseDir, 'types');
const apiDir = path.join(baseDir, 'services', 'api');
const hooksDir = path.join(baseDir, 'hooks');

[typesDir, apiDir, hooksDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const models = {
  'About': `export interface About {
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
}`,
  'Blog': `export interface Blog {
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
}`,
  'Certificate': `export interface Certificate {
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
}`,
  'Education': `export interface Education {
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
}`,
  'Experience': `export interface Experience {
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
}`,
  'Hero': `export interface Hero {
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
}`,
  'Message': `export interface Message {
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
}`,
  'Project': `export interface Project {
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
}`,
  'Settings': `export interface Settings {
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
}`,
  'Skill': `export interface Skill {
  _id: string;
  name: string;
  logo?: string;
  color: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  percentage: number;
  years: number;
  projects: number;
  icon: string;
  categoryId: string;
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
}`,
  'Social': `export interface Social {
  _id: string;
  platform: string;
  url: string;
  icon: string;
  username: string;
  visible: boolean;
  displayOrder: number;
}`,
  'User': `export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'super-admin';
  avatar?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}`
};

const singletonModels = ['Hero', 'About', 'Settings'];

Object.entries(models).forEach(([model, typeDef]) => {
  // Write type file
  fs.writeFileSync(path.join(typesDir, \`\${model}.ts\`), typeDef + '\\n');

  const camelName = model.charAt(0).toLowerCase() + model.slice(1);
  let endpoint = camelName + 's';
  if (singletonModels.includes(model)) endpoint = camelName;
  if (model === 'Blog') endpoint = 'blogs';
  if (model === 'Category') endpoint = 'categories';

  // Generate API content
  let apiContent = '';
  if (singletonModels.includes(model)) {
    apiContent = \`import api from '../axios';
import { \${model} } from '../../types/\${model}';

export const \${camelName}Api = {
  get: async () => {
    const { data } = await api.get<\${model}>('/\${endpoint}');
    return data;
  },
  update: async (payload: Partial<\${model}>) => {
    const { data } = await api.put<\${model}>('/\${endpoint}', payload);
    return data;
  }
};
\`;
  } else {
    apiContent = \`import api from '../axios';
import { \${model} } from '../../types/\${model}';

export const \${camelName}Api = {
  getAll: async () => {
    const { data } = await api.get<\${model}[]>('/\${endpoint}');
    return data;
  },
  getById: async (id: string) => {
    const { data } = await api.get<\${model}>(\`/\${endpoint}/\${id}\`);
    return data;
  },
  create: async (payload: Partial<\${model}>) => {
    const { data } = await api.post<\${model}>('/\${endpoint}', payload);
    return data;
  },
  update: async (id: string, payload: Partial<\${model}>) => {
    const { data } = await api.put<\${model}>(\`/\${endpoint}/\${id}\`, payload);
    return data;
  },
  delete: async (id: string) => {
    const { data } = await api.delete(\`/\${endpoint}/\${id}\`);
    return data;
  }
};
\`;
  }
  fs.writeFileSync(path.join(apiDir, \`\${camelName}.api.ts\`), apiContent);

  // Generate Hook content
  let hookContent = '';
  if (singletonModels.includes(model)) {
    hookContent = \`import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { \${camelName}Api } from '../services/api/\${camelName}.api';
import { \${model} } from '../types/\${model}';

export const use\${model} = () => {
  return useQuery({
    queryKey: ['\${camelName}'],
    queryFn: \${camelName}Api.get,
  });
};

export const useUpdate\${model} = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: \${camelName}Api.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['\${camelName}'] });
    },
  });
};
\`;
    fs.writeFileSync(path.join(hooksDir, \`use\${model}.ts\`), hookContent);
  } else {
    hookContent = \`import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { \${camelName}Api } from '../services/api/\${camelName}.api';
import { \${model} } from '../types/\${model}';

export const use\${model}s = () => {
  return useQuery({
    queryKey: ['\${camelName}s'],
    queryFn: \${camelName}Api.getAll,
  });
};

export const use\${model} = (id: string) => {
  return useQuery({
    queryKey: ['\${camelName}', id],
    queryFn: () => \${camelName}Api.getById(id),
    enabled: !!id,
  });
};

export const useCreate\${model} = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: \${camelName}Api.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['\${camelName}s'] });
    },
  });
};

export const useUpdate\${model} = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<\${model}> }) => \${camelName}Api.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['\${camelName}s'] });
      queryClient.invalidateQueries({ queryKey: ['\${camelName}', variables.id] });
    },
  });
};

export const useDelete\${model} = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: \${camelName}Api.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['\${camelName}s'] });
    },
  });
};
\`;
    fs.writeFileSync(path.join(hooksDir, \`use\${model}s.ts\`), hookContent);
  }
});

console.log('Files generated successfully.');

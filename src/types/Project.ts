// src/types/Project.ts
export interface ProjectImage {
  url: string;
  publicId: string;
  alt?: string;
  order: number;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  category: string;
  status: 'Completed' | 'In Progress' | 'Archived' | 'Draft';
  featured: boolean;
  thumbnail?: string;
  thumbnailPublicId?: string;
  gallery: ProjectImage[];
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
}

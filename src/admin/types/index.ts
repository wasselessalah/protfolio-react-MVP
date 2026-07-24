// src/admin/types/index.ts

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'super-admin';
  avatar?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
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
}

export interface Skill {
  _id: string;
  name: string;
  logo?: string;
  color: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  percentage: number;
  years: number;
  projects: number;
  icon: string;
  categoryId: string | SkillCategory;
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
}

export interface Experience {
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
  type: string;
  displayOrder: number;
}

export interface Education {
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
}

export interface Certificate {
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
}

export interface Blog {
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
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived' | 'spam';
  reply?: string;
  repliedAt?: string;
  createdAt: string;
}

export interface Social {
  _id: string;
  platform: string;
  url: string;
  icon: string;
  username: string;
  visible: boolean;
  displayOrder: number;
}

export interface About {
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
}

export interface Hero {
  _id: string;
  greeting: string;
  name: string;
  titles: string[];
  description: string;
  ctaPrimary: string;
  ctaPrimaryUrl: string;
  ctaSecondary: string;
  ctaSecondaryUrl: string;
  backgroundType: string;
  badges: string[];
}

export interface Settings {
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
  theme: string;
  accentColor: string;
}

export interface DashboardStats {
  stats: {
    totalProjects: number;
    featuredProjects: number;
    totalSkills: number;
    totalCertificates: number;
    totalBlogs: number;
    publishedBlogs: number;
    totalMessages: number;
    unreadMessages: number;
    totalExperiences: number;
  };
  charts: {
    projectsByCategory: Array<{ _id: string; count: number }>;
    projectsByStatus: Array<{ _id: string; count: number }>;
    blogsByStatus: Array<{ _id: string; count: number }>;
    messagesByStatus: Array<{ _id: string; count: number }>;
  };
  recent: {
    projects: Project[];
    messages: Message[];
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

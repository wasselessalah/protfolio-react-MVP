// src/types/About.ts
export interface About {
  _id: string;
  name: string;
  title: string;
  subtitle: string;
  location: string;
  city: string;
  country: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  availability: 'Available' | 'Busy' | 'Not Available';
  avatar?: string;
  coverImage?: string;
  shortBio: string;
  longBio: string;
  yearsOfExperience: string;
  totalProjects: string;
  technologies: string[];
  resumeUrl?: string;
  resumePublicId?: string;
  updatedAt: string;
}

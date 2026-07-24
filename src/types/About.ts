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
  updatedAt: string;
}

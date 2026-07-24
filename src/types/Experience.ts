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
  type: 'Full-time' | 'Part-time' | 'Freelance' | 'Internship' | 'Contract';
  displayOrder: number;
}

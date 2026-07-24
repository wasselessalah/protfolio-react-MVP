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
}

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

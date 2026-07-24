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
  backgroundType: 'gradient' | 'particles' | 'aurora' | 'none';
  badges: string[];
  updatedAt: string;
}

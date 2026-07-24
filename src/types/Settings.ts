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
  theme: 'dark' | 'light' | 'system';
  accentColor: string;
  updatedAt: string;
}

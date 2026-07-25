// src/types/Social.ts
export type SocialPlatform = 'GitHub' | 'LinkedIn' | 'Facebook' | 'Instagram' | 'YouTube';

export interface Social {
  _id: string;
  platform: SocialPlatform;
  url: string;
  username: string;
  visible: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

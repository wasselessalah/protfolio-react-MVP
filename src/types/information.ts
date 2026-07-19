// src/types/information.ts

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
}

export interface HeroButtons {
  primary: {
    text: string;
    href: string;
  };

  secondary: {
    text: string;
    href: string;
  };
}

export interface PersonalInformation {
  name: string;
  role: string;
  title: string;
  subtitle: string;
  avatar: string;
  location: string;
  availability: string;
  resume: string;
  social: SocialLinks;
  buttons: HeroButtons;
}

export interface AboutInformation {
  title: string;
  description: string[];
  experience: string;
  projects: string;
  technologies: string[];
}

export interface Information {
  personal: PersonalInformation;
  about: AboutInformation;
}
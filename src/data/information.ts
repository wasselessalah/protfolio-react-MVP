// src/data/information.ts

import avatar1 from "@/assets/images/profile/avatar.png"; // Original
import avatar2 from "@/assets/images/profile/avatar1.png"; // Workspace portrait
import avatar3 from "@/assets/images/profile/avatar2.png"; // Studio portrait

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
}

export interface AvatarCollection {
  primary: string;
  workspace: string;
  studio: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  location: string;
  avatar: string;
  avatars: AvatarCollection;
  social: SocialLinks;
}

export interface AboutInfo {
  title: string;
  description: string[];
  experience: string;
  projects: string;
  technologies: string[];
}

export interface Information {
  personal: PersonalInfo;
  about: AboutInfo;
}

export const information: Information = {
  personal: {
    name: "Wassel Essalah",

    title: "Full Stack Developer",

    subtitle:
      "I'm a passionate Full Stack Developer specializing in React, TypeScript, Node.js, Express, and modern cloud technologies. I build fast, scalable, and user-focused web applications with clean architecture and exceptional user experiences.",

    location: "Sousse, Tunisia",

    // Default avatar
    avatar: avatar1,

    // All available avatars
    avatars: {
      primary: avatar1,
      workspace: avatar2,
      studio: avatar3,
    },

    social: {
      github: "https://github.com/wasselessalah",
      linkedin: "https://www.linkedin.com/in/essalah-wassel-626993300/",
      twitter: "https://twitter.com/yourusername",
    },
  },

  about: {
    title: "About Me",

    description: [
      "I'm a Full Stack Developer passionate about building modern web applications with clean architecture and exceptional user experiences.",

      "My primary stack includes React, TypeScript, Next.js, Node.js, Express, MongoDB, PostgreSQL, Tailwind CSS, and Docker. I enjoy transforming ideas into scalable, production-ready software.",

      "I'm continuously improving my software engineering skills while exploring Cloud, DevOps, and Artificial Intelligence to build high-quality digital products.",
    ],

    experience: "2+ Years",

    projects: "15+ Projects",

    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "Tailwind CSS",
      "Docker",
      "Git",
      "GitHub",
      "REST API",
      "Linux",
      "Firebase",
      "Vite",
    ],
  },
};
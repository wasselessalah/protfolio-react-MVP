// src/data/information.ts

import avatar from "@/assets/images/profile/avatar.png";

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  location: string;
  avatar: string;
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
      "I'm a passionate Full Stack Developer specializing in React, TypeScript, Node.js, Express, and modern cloud technologies. I enjoy creating fast, scalable, and user-friendly web applications that solve real-world problems.",

    location: "Sousse, Tunisia",

    avatar,

    social: {
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
      twitter: "https://twitter.com/yourusername",
    },
  },

  about: {
    title: "About Me",

    description: [
      "I'm a Full Stack Developer passionate about building modern web applications with clean architecture and exceptional user experiences.",

      "My primary stack includes React, TypeScript, Next.js, Node.js, Express, MongoDB, PostgreSQL, and Tailwind CSS. I enjoy transforming ideas into scalable, production-ready software.",

      "I'm constantly learning new technologies, improving my software engineering skills, and exploring Cloud, DevOps, and Artificial Intelligence to build better digital products.",
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
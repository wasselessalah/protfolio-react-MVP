// src/data/experience.ts

export type ExperienceType = "education" | "project" | "certificate" | "achievement" | "freelance";

export interface ExperienceItem {
  id: number;
  type: ExperienceType;
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  skills?: string[];
  icon: string;
  color: string;
  link?: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: 1,
    type: "education",
    title: "Cloud Engineering",
    organization: "EPI Sousse",
    location: "Sousse, Tunisia",
    startDate: "Sep 2026",
    endDate: "Jun 2028",
    current: true,
    description: "Pursuing a degree in Cloud Engineering, specializing in cloud infrastructure, DevOps practices, and scalable system design.",
    skills: ["Cloud Computing", "DevOps", "Linux", "Docker", "AWS"],
    icon: "🎓",
    color: "#3B82F6",
  },
  {
    id: 2,
    type: "project",
    title: "PAVER AI Platform",
    organization: "Startup Collaboration",
    location: "Remote",
    startDate: "Jan 2026",
    endDate: "Jun 2026",
    description: "Built an AI-powered learning platform with automated badge generation and a FastAPI microservice for AI scoring. Led full-stack development using Next.js, Express, and PostgreSQL.",
    skills: ["Next.js", "FastAPI", "PostgreSQL", "OpenAI API", "Docker", "JWT"],
    icon: "🤖",
    color: "#8B5CF6",
  },
  {
    id: 3,
    type: "project",
    title: "Booking Platform",
    organization: "Personal Project",
    location: "Remote",
    startDate: "Aug 2025",
    endDate: "Dec 2025",
    description: "Developed a full-stack accommodation booking platform with real-time availability, admin dashboard, and secure payment flow.",
    skills: ["React", "Node.js", "Express", "MongoDB", "JWT", "Cloudinary"],
    icon: "🏨",
    color: "#22C55E",
  },
  {
    id: 4,
    type: "freelance",
    title: "Accia CMS",
    organization: "Private Client",
    location: "Remote",
    startDate: "Mar 2026",
    endDate: "Jun 2026",
    description: "Delivered a complete content management system with authentication, role management, media uploads, and an admin dashboard for a private client.",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Clerk", "Cloudinary", "MongoDB"],
    icon: "💼",
    color: "#F59E0B",
  },
  {
    id: 5,
    type: "achievement",
    title: "500+ Hours of Code",
    organization: "Self-Learning",
    startDate: "2024",
    description: "Dedicated 500+ hours to mastering modern web development technologies including React, TypeScript, Node.js, and cloud platforms.",
    icon: "⚡",
    color: "#06B6D4",
  },
  {
    id: 6,
    type: "certificate",
    title: "JavaScript & React Mastery",
    organization: "Online Platforms",
    startDate: "2024",
    description: "Completed comprehensive JavaScript and React development courses covering advanced patterns, hooks, and performance optimization.",
    skills: ["JavaScript", "React", "Redux", "Testing"],
    icon: "📜",
    color: "#F59E0B",
  },
  {
    id: 7,
    type: "achievement",
    title: "15+ Projects Delivered",
    organization: "Personal Portfolio",
    startDate: "2024",
    endDate: "2026",
    description: "Successfully delivered 15+ web applications ranging from small tools to full-stack platforms with real-world clients.",
    icon: "🚀",
    color: "#22C55E",
  },
];

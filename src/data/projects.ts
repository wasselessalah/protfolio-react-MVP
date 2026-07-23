// src/data/projects.ts

/* ============================
   ACCIA CMS
============================ */

import acciaThumbnail from "@/assets/images/projects/accia/thumbnailAccia.png";
import accia1 from "@/assets/images/projects/accia/1.png";
import accia2 from "@/assets/images/projects/accia/2.png";
import accia3 from "@/assets/images/projects/accia/3.png";

/* ============================
   BOOKING PLATFORM
============================ */

import bookingThumbnail from "@/assets/images/projects/booking/thumbnailBoocking.png";
import booking1 from "@/assets/images/projects/booking/1.png";
import booking2 from "@/assets/images/projects/booking/2.png";
import booking3 from "@/assets/images/projects/booking/3.png";
import booking4 from "@/assets/images/projects/booking/4.png";

/* ============================
   PAVER AI
============================ */

import paverThumbnail from "@/assets/images/projects/paver/ThumbnailPaver.png";
import paver1 from "@/assets/images/projects/paver/1.png";
import paver2 from "@/assets/images/projects/paver/2.png";
import paver3 from "@/assets/images/projects/paver/3.png";
import paver4 from "@/assets/images/projects/paver/4.png";
import paver5 from "@/assets/images/projects/paver/5.png";
import paver6 from "@/assets/images/projects/paver/6.png";
import paver7 from "@/assets/images/projects/paver/7.png";
import paver8 from "@/assets/images/projects/paver/8.png";

/* ============================
   TYPES
============================ */

export type ProjectCategory =
  | "AI"
  | "Web App"
  | "Dashboard"
  | "CMS"
  | "E-Commerce"
  | "Portfolio";

export type ProjectStatus =
  | "Completed"
  | "In Progress"
  | "Archived";

export interface ProjectLinks {
  github?: string;
  live?: string;
  figma?: string;
}

export interface Project {
  id: number;

  title: string;

  slug: string;

  description: string;

  fullDescription: string;

  thumbnail: string;

  gallery: string[];

  category: ProjectCategory;

  year: string;

  duration: string;

  status: ProjectStatus;

  role: string;

  team: string;

  client?: string;

  technologies: string[];

  skills: string[];

  features: string[];

  links: ProjectLinks;
}

/* ============================
   PROJECTS
============================ */

export const projects: Project[] = [
  {
    id: 1,

    title: "Accia CMS",

    slug: "accia-cms",

    description:
      "Modern CMS for managing articles, users, media, and documents.",

    fullDescription:
      "Accia CMS is a scalable content management platform built with modern technologies. It provides authentication, role management, media uploads, document management, and a responsive administration dashboard. Client needed one platform to manage and publish posts, events, images, and PDFs — instead of juggling multiple tools. I built a full content management system with an admin dashboard, secure file uploads, and Clerk-based authentication for safe session handling.Built with Next.js, Tailwind CSS, and NextUI for a fast, responsive interface. Admins can create, edit, and manage all content types from one place.",

    thumbnail: acciaThumbnail,

    gallery: [
      acciaThumbnail,
      accia1,
      accia2,
      accia3,
    ],

    category: "CMS",

    year: "2026",

    duration: "3 Months",

    status: "Completed",

    role: "Full Stack Developer",

    team: "2 Developers",

    client: "Private Client",

    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Cloudinary",
      "Clerk",
    ],

    skills: [
      "Frontend Development",
      "Backend Development",
      "REST API",
      "Authentication",
      "Responsive Design",
      "Dashboard Development",
      "State Management",
      "CRUD Operations",
    ],

    features: [
      "Authentication",
      "Role Management",
      "User Management",
      "Media Upload",
      "PDF Management",
      "Rich Text Editor",
      "Dashboard Analytics",
      "Responsive Design",
      "Dark Mode",
    ],

    links: {
      github: "",
      live: "",
      figma: "",
    },
  },

  {
    id: 2,

    title: "Booking Platform",

    slug: "booking-platform",

    description:
      "Online reservation platform for hotels, apartments, cafés, and restaurants.",

    fullDescription:
      "A complete booking platform where users can search, reserve, and manage accommodations. Includes an administration dashboard for managing bookings, users, and properties.Built a complete booking platform for hotels, cafés, and private homes — letting hosts list spaces and guests book instantly. I built the frontend with React, Next.js, and Tailwind CSS for a fast, responsive experience, and RESTful APIs with Express.js and secure authentication for safe transactions.",

    thumbnail: bookingThumbnail,

    gallery: [
      bookingThumbnail,
      booking1,
      booking2,
      booking3,
      booking4,
    ],

    category: "Web App",

    year: "2026",

    duration: "4 Months",

    status: "Completed",

    role: "Full Stack Developer",

    team: "Solo",

    client: "Personal Project",

    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "JWT",
      "Cloudinary",
    ],

    skills: [
      "REST API Development",
      "Authentication",
      "CRUD",
      "Database Design",
      "Responsive UI",
      "Deployment",
    ],

    features: [
      "Property Search",
      "Booking System",
      "Authentication",
      "Favorites",
      "User Profile",
      "Admin Dashboard",
      "Reservation Management",
      "Responsive Design",
    ],

    links: {
      github: "",
      live: "",
      figma: "",
    },
  },

  {
    id: 3,

    title: "PAVER AI",

    slug: "paver-ai",

    description:
      "AI-powered learning platform with intelligent badges and progress tracking.",

    fullDescription:
      "PAVER AI is an educational platform that uses Artificial Intelligence to personalize learning, generate verified badges, and monitor learner progress through interactive dashboards and AI-powered recommendations. Freelancers with real training often stay invisible to recruiters with no way to prove skill growth. I built PAVER, an AI platform that auto-generates verified badges based on learning paths and behavior, giving freelancers instant, trustworthy credibility signals. I designed the AI scoring engine, deployed it as a Python/FastAPI microservice, and built the full app in Next.js + Express + PostgreSQL, with JWT/Google auth, real-time chat, and a chatbot assistant. Delivered in Agile/Scrum sprints with iterative releases.",

    thumbnail: paverThumbnail,

    gallery: [
      paverThumbnail,
      paver1,
      paver2,
      paver3,
      paver4,
      paver5,
      paver6,
      paver7,
    ],

    category: "AI",

    year: "2026",

    duration: "6 Months",

    status: "Completed",

    role: "Full Stack Developer",

    team: "4 Developers",

    client: "Startup",

    technologies: [
      "Next.js",
      "React",
      "Express",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "OpenAI API",
      "JWT",
    ],

    skills: [
      "Artificial Intelligence",
      "API Development",
      "Microservices",
      "Backend Development",
      "Database Design",
      "Cloud Deployment",
      "Docker",
      "Authentication",
    ],

    features: [
      "AI Assistant",
      "Learning Paths",
      "Verified Badges",
      "Progress Analytics",
      "Real-Time Chat",
      "Google Authentication",
      "Admin Dashboard",
      "Role Management",
    ],

    links: {
      github: "",
      live: "",
      figma: "",
    },
  },
];
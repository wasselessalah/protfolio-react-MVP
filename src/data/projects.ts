// src/data/projects.ts
import project1 from "@/assets/images/projects/thumbnailAccia.png";
import project2 from "@/assets/images/projects/thumbnailBoocking.png";
import project3 from "@/assets/images/projects/ThumbnailPaver.png";

export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce app with payment integration",
    image: project1,                    // ← Use imported image
    technologies: ["React", "Node.js", "MongoDB"],
    link: "https://github.com",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates",
    image: project2,
    technologies: ["React", "Firebase", "Tailwind"],
    link: "https://github.com",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Real-time weather app with geolocation",
    image: project3,
    technologies: ["React", "API", "Chart.js"],
    link: "https://github.com",
  },
];
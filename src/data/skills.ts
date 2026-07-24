// src/data/skills.ts

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface Skill {
  name: string;
  level: SkillLevel;
  percentage: number;
  years: number;
  projects: number;
  color: string;
  icon: string; // emoji or text icon
}

export interface SkillCategory {
  id: string;
  category: string;
  icon: string;
  color: string;
  bgColor: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    category: "Frontend",
    icon: "⚡",
    color: "#3B82F6",
    bgColor: "rgba(59,130,246,0.1)",
    skills: [
      { name: "React", level: "Expert", percentage: 92, years: 2, projects: 10, color: "#61DAFB", icon: "⚛️" },
      { name: "TypeScript", level: "Advanced", percentage: 85, years: 2, projects: 8, color: "#3178C6", icon: "📘" },
      { name: "Next.js", level: "Advanced", percentage: 82, years: 1.5, projects: 6, color: "#FFFFFF", icon: "▲" },
      { name: "Tailwind CSS", level: "Expert", percentage: 90, years: 2, projects: 10, color: "#06B6D4", icon: "🌊" },
      { name: "HTML/CSS", level: "Expert", percentage: 95, years: 3, projects: 15, color: "#E34F26", icon: "🏗️" },
      { name: "JavaScript", level: "Advanced", percentage: 88, years: 2.5, projects: 12, color: "#F7DF1E", icon: "🟨" },
    ],
  },
  {
    id: "backend",
    category: "Backend",
    icon: "🛠️",
    color: "#22C55E",
    bgColor: "rgba(34,197,94,0.1)",
    skills: [
      { name: "Node.js", level: "Advanced", percentage: 82, years: 2, projects: 8, color: "#8CC84B", icon: "🟢" },
      { name: "Express", level: "Advanced", percentage: 83, years: 2, projects: 8, color: "#FFFFFF", icon: "⚡" },
      { name: "Python", level: "Intermediate", percentage: 65, years: 1, projects: 3, color: "#3776AB", icon: "🐍" },
      { name: "FastAPI", level: "Intermediate", percentage: 60, years: 1, projects: 2, color: "#009688", icon: "🚀" },
      { name: "REST API", level: "Expert", percentage: 90, years: 2, projects: 10, color: "#FF6B6B", icon: "🔌" },
    ],
  },
  {
    id: "database",
    category: "Database",
    icon: "🗄️",
    color: "#8B5CF6",
    bgColor: "rgba(139,92,246,0.1)",
    skills: [
      { name: "MongoDB", level: "Advanced", percentage: 80, years: 2, projects: 7, color: "#47A248", icon: "🍃" },
      { name: "PostgreSQL", level: "Intermediate", percentage: 70, years: 1, projects: 3, color: "#336791", icon: "🐘" },
      { name: "Firebase", level: "Intermediate", percentage: 65, years: 1, projects: 3, color: "#FFA000", icon: "🔥" },
    ],
  },
  {
    id: "cloud",
    category: "Cloud & DevOps",
    icon: "☁️",
    color: "#06B6D4",
    bgColor: "rgba(6,182,212,0.1)",
    skills: [
      { name: "Docker", level: "Intermediate", percentage: 68, years: 1, projects: 3, color: "#2496ED", icon: "🐳" },
      { name: "AWS", level: "Beginner", percentage: 40, years: 0.5, projects: 1, color: "#FF9900", icon: "☁️" },
      { name: "Linux", level: "Intermediate", percentage: 70, years: 1.5, projects: 5, color: "#FCC624", icon: "🐧" },
      { name: "Git", level: "Expert", percentage: 90, years: 3, projects: 15, color: "#F05032", icon: "🌿" },
      { name: "Vercel", level: "Advanced", percentage: 80, years: 1.5, projects: 6, color: "#FFFFFF", icon: "▲" },
    ],
  },
  {
    id: "ai",
    category: "AI & Tools",
    icon: "🤖",
    color: "#F59E0B",
    bgColor: "rgba(245,158,11,0.1)",
    skills: [
      { name: "OpenAI API", level: "Intermediate", percentage: 65, years: 1, projects: 2, color: "#412991", icon: "🤖" },
      { name: "Cloudinary", level: "Advanced", percentage: 78, years: 1, projects: 4, color: "#3448C5", icon: "🌤️" },
      { name: "Figma", level: "Intermediate", percentage: 65, years: 1, projects: 6, color: "#A259FF", icon: "🎨" },
      { name: "VS Code", level: "Expert", percentage: 95, years: 3, projects: 15, color: "#007ACC", icon: "💻" },
    ],
  },
];
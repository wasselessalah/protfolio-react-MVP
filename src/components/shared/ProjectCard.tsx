// src/components/shared/ProjectCard.tsx

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { FaExternalLinkAlt } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  technologies,
  link,
}: ProjectCardProps) {
  const { theme } = useTheme();

  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl",
        theme === "dark"
          ? "bg-gray-800 shadow-lg hover:shadow-blue-500/20"
          : "bg-white shadow-md hover:shadow-blue-300/40"
      )}
    >
      {/* Project Image */}
      <div className="group relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${title}`}
            className="rounded-full bg-blue-600 p-4 text-white transition hover:scale-110 hover:bg-blue-700"
          >
            <FaExternalLinkAlt size={20} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 p-6">
        <div>
          <h3
            className={cn(
              "text-xl font-bold",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}
          >
            {title}
          </h3>

          <p
            className={cn(
              "mt-2 text-sm leading-6",
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            )}
          >
            {description}
          </p>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                theme === "dark"
                  ? "bg-blue-900/40 text-blue-300"
                  : "bg-blue-100 text-blue-700"
              )}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
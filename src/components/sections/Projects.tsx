// src/components/sections/Projects.tsx

import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import ProjectCard from "@/components/shared/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  const { theme } = useTheme();

  return (
    <section
      id="projects"
      className={cn(
        "py-24 transition-colors duration-300",
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      )}
    >
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full bg-blue-600/10 px-4 py-2 text-sm font-semibold text-blue-600">
            My Work
          </span>
          <h2
            className={cn(
              "mt-6 text-4xl font-bold md:text-5xl",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}
          >
            Featured Projects
          </h2>
          <p
            className={cn(
              "mx-auto mt-6 max-w-2xl text-lg",
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            )}
          >
            A selection of things I've built — click any card for the full story.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
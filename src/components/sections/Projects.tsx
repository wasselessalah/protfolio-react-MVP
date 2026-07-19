import { projects } from "@/data/projects";
import ProjectCard from "@/components/shared/ProjectCard";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export default function Projects() {
  const { theme } = useTheme();

  return (
    <section className="container mx-auto px-6 pb-24">
      {/* Stats */}

      <div className="mb-16 grid gap-6 md:grid-cols-3">

        <div
          className={cn(
            "rounded-2xl p-8 text-center",
            theme === "dark"
              ? "bg-gray-800"
              : "bg-white shadow"
          )}
        >
          <h2 className="text-4xl font-bold text-blue-600">
            {projects.length}+
          </h2>

          <p className="mt-2 text-gray-500">
            Projects
          </p>
        </div>

        <div
          className={cn(
            "rounded-2xl p-8 text-center",
            theme === "dark"
              ? "bg-gray-800"
              : "bg-white shadow"
          )}
        >
          <h2 className="text-4xl font-bold text-purple-600">
            15+
          </h2>

          <p className="mt-2 text-gray-500">
            Technologies
          </p>
        </div>

        <div
          className={cn(
            "rounded-2xl p-8 text-center",
            theme === "dark"
              ? "bg-gray-800"
              : "bg-white shadow"
          )}
        >
          <h2 className="text-4xl font-bold text-green-600">
            100%
          </h2>

          <p className="mt-2 text-gray-500">
            Responsive
          </p>
        </div>

      </div>

      {/* Grid */}

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
          />
        ))}

      </div>
    </section>
  );
}
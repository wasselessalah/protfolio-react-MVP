import { useTheme } from "@/context/ThemeContext";
import Projects from "@/components/sections/Projects";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const { theme } = useTheme();

  return (
    <main
      className={cn(
        "min-h-screen pt-24 transition-colors duration-300",
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-b from-white via-gray-50 to-white"
      )}
    >
      {/* Hero */}
      <section className="container mx-auto px-6 py-20 text-center">
        <span className="rounded-full bg-blue-600/10 px-4 py-2 text-sm font-semibold text-blue-500">
          Portfolio
        </span>

        <h1
          className={cn(
            "mt-6 text-5xl font-bold md:text-6xl",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}
        >
          My Projects
        </h1>

        <p
          className={cn(
            "mx-auto mt-6 max-w-2xl text-lg",
            theme === "dark"
              ? "text-gray-400"
              : "text-gray-600"
          )}
        >
          Explore some of my recent work. Each project demonstrates my
          experience building scalable, responsive and modern web
          applications.
        </p>
      </section>

      <Projects />
    </main>
  );
}
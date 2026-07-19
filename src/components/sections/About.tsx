// src/components/sections/About.tsx

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { information } from "@/data/information";
import { cn } from "@/lib/utils";

export default function About() {
  const { theme } = useTheme();

  const { personal, about } = information;

  if (!about) {
    return (
      <section className="py-24 text-center">
        <h2 className="text-2xl font-bold">About section not found.</h2>
      </section>
    );
  }

  return (
    <section
      id="about"
      className={cn(
        "py-24 transition-colors duration-300",
        theme === "dark" ? "bg-gray-900" : "bg-white"
      )}
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="rounded-full bg-blue-600/10 px-4 py-2 text-sm font-semibold text-blue-600">
            {about.title}
          </span>

          <h2
            className={cn(
              "mt-6 text-4xl font-bold md:text-5xl",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}
          >
            Get to know me
          </h2>

          <p
            className={cn(
              "mx-auto mt-6 max-w-2xl text-lg",
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            )}
          >
            Passionate about building scalable, modern, and user-friendly web
            applications.
          </p>
        </motion.div>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-3xl" />

              <img
                src={personal.avatar}
                alt={personal.name}
                className="relative h-80 w-80 rounded-full border-4 border-white object-cover shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3
              className={cn(
                "text-4xl font-bold",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}
            >
              {personal.name}
            </h3>

            <p className="mt-2 text-xl font-semibold text-blue-600">
              {personal.title}
            </p>

            <div className="mt-8 space-y-5">
              {about.description?.map((paragraph) => (
                <p
                  key={paragraph}
                  className={cn(
                    "leading-8",
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Statistics */}
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div
                className={cn(
                  "rounded-2xl p-6 text-center",
                  theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                )}
              >
                <h4 className="text-3xl font-bold text-blue-600">
                  {about.experience}
                </h4>

                <p
                  className={cn(
                    "mt-2 text-sm",
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  )}
                >
                  Experience
                </p>
              </div>

              <div
                className={cn(
                  "rounded-2xl p-6 text-center",
                  theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                )}
              >
                <h4 className="text-3xl font-bold text-purple-600">
                  {about.projects}
                </h4>

                <p
                  className={cn(
                    "mt-2 text-sm",
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  )}
                >
                  Projects
                </p>
              </div>

              <div
                className={cn(
                  "rounded-2xl p-6 text-center",
                  theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                )}
              >
                <h4 className="text-3xl font-bold text-green-600">
                  {about.technologies.length}+
                </h4>

                <p
                  className={cn(
                    "mt-2 text-sm",
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  )}
                >
                  Technologies
                </p>
              </div>
            </div>

            {/* Technologies */}
            <div className="mt-12">
              <h4
                className={cn(
                  "mb-5 text-xl font-semibold",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}
              >
                My Tech Stack
              </h4>

              <div className="flex flex-wrap gap-3">
                {about.technologies?.map((tech) => (
                  <span
                    key={tech}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition duration-300 hover:scale-105",
                      theme === "dark"
                        ? "bg-blue-900/30 text-blue-300"
                        : "bg-blue-100 text-blue-700"
                    )}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
// src/components/sections/About.tsx

import { motion } from "framer-motion";
import { FaBriefcase, FaCode, FaLayerGroup } from "react-icons/fa";
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
            <div className="relative w-72 h-80 sm:w-80 sm:h-96">
              {/* Layered ambient glow, consistent with Hero */}
              <div
                className={cn(
                  "absolute -inset-6 rounded-[2.5rem] blur-3xl opacity-40",
                  theme === "dark"
                    ? "bg-gradient-to-br from-blue-500 to-purple-600"
                    : "bg-gradient-to-br from-blue-300 to-purple-300"
                )}
              />

              {/* Dashed decorative ring, offset behind the photo */}
              <div
                className={cn(
                  "absolute -top-4 -right-4 w-full h-full rounded-[2rem] border-2 border-dashed",
                  theme === "dark" ? "border-blue-500/40" : "border-blue-400/50"
                )}
              />

              {/* Photo frame */}
              <div
                className={cn(
                  "relative w-full h-full rounded-[2rem] overflow-hidden",
                  "ring-4 shadow-2xl transition-transform duration-300 hover:-translate-y-1",
                  theme === "dark" ? "ring-blue-500/50" : "ring-blue-400/50"
                )}
              >
                <img
                  src={personal.avatars.workspace}
                  alt={personal.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating experience badge */}
              <div
                className={cn(
                  "absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl px-5 py-4 shadow-xl",
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                )}
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-600/10 text-blue-600">
                  <FaBriefcase size={18} />
                </div>
                <div>
                  <p
                    className={cn(
                      "text-xl font-bold leading-none",
                      theme === "dark" ? "text-white" : "text-gray-900"
                    )}
                  >
                    {about.experience}
                  </p>
                  <p
                    className={cn(
                      "text-xs mt-1",
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    )}
                  >
                    Experience
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
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
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              <div
                className={cn(
                  "group rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1",
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-800/70"
                    : "bg-gray-100 hover:bg-gray-50 hover:shadow-lg"
                )}
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                  <FaBriefcase size={18} />
                </div>
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
                  "group rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1",
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-800/70"
                    : "bg-gray-100 hover:bg-gray-50 hover:shadow-lg"
                )}
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-600/10 text-purple-600 transition-transform duration-300 group-hover:scale-110">
                  <FaLayerGroup size={18} />
                </div>
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
                  "group rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1",
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-800/70"
                    : "bg-gray-100 hover:bg-gray-50 hover:shadow-lg"
                )}
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-green-600/10 text-green-600 transition-transform duration-300 group-hover:scale-110">
                  <FaCode size={18} />
                </div>
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
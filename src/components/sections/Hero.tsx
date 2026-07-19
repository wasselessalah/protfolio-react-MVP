// src/components/sections/Hero.tsx

import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaArrowDown,
} from "react-icons/fa";
import { information } from "@/data/information";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
  const { personal } = information;
const { theme } = useTheme();

  return (
  <section
  id="home"
  className={cn(
    "relative overflow-hidden min-h-screen pt-20 flex items-center justify-center transition-colors duration-300",
    theme === "dark"
      ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
      : "bg-gradient-to-b from-white via-gray-50 to-white"
  )}
>
  
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
    </div>

      <div className="container mx-auto px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* ================= Left ================= */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              👋 Welcome to my portfolio
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight lg:text-7xl">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-violet-600 bg-clip-text text-transparent">
                {personal.name}
              </span>
            </h1>

            <h2 className="mt-5 text-2xl font-semibold text-primary">
              {personal.title}
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              {personal.subtitle}
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#projects"
                className={cn(
                  "rounded-xl bg-primary px-7 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg"
                )}
              >
                View Projects
              </a>

              <a
                href="#contact"
                className={cn(
                  "rounded-xl border border-border px-7 py-3 font-semibold transition-all duration-300 hover:bg-accent"
                )}
              >
                Contact Me
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-10 flex items-center gap-5">
              <a
                href={personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border p-3 transition hover:-translate-y-1 hover:border-primary hover:text-primary"
              >
                <FaGithub size={22} />
              </a>

              <a
                href={personal.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border p-3 transition hover:-translate-y-1 hover:border-primary hover:text-primary"
              >
                <FaLinkedin size={22} />
              </a>

              <a
                href={personal.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border p-3 transition hover:-translate-y-1 hover:border-primary hover:text-primary"
              >
                <FaTwitter size={22} />
              </a>
            </div>
          </motion.div>

          {/* ================= Right ================= */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 opacity-30 blur-3xl" />

              {/* Ring */}
              <div className="absolute -inset-4 rounded-full border border-primary/20" />

              {/* Avatar */}
              <div className="relative h-80 w-80 overflow-hidden rounded-full border-4 border-background shadow-2xl lg:h-[420px] lg:w-[420px]">
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Floating Card */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute -bottom-4 -left-8 rounded-2xl border bg-background/90 px-5 py-3 shadow-xl backdrop-blur"
              >
                <p className="text-sm font-medium text-muted-foreground">
                  Available for work
                </p>
                <p className="font-bold text-green-500">● Open to opportunities</p>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute -right-6 top-12 rounded-2xl border bg-background/90 px-5 py-3 shadow-xl backdrop-blur"
              >
                <p className="text-sm text-muted-foreground">
                  Tech Stack
                </p>
                <p className="font-semibold">
                  React • Node • TS
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="mt-20 flex justify-center"
        >
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground transition hover:text-primary"
          >
            <span className="text-sm">Scroll Down</span>
            <FaArrowDown />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
// src/components/sections/Hero.tsx

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { information } from "@/data/information";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const { personal } = information;
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="home"
      className={cn(
        "relative p-3 overflow-hidden min-h-screen pt-20 flex items-center",
        isDark
          ? "bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900"
          : "bg-gradient-to-b from-white via-zinc-50/50 to-white"
      )}
    >
      {/* ---- Background Grid Pattern ---- */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* ---- Ambient Orbs ---- */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={cn(
            "absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-3xl",
            isDark ? "bg-indigo-600/10" : "bg-indigo-200/30"
          )}
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
          className={cn(
            "absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full blur-3xl",
            isDark ? "bg-violet-600/10" : "bg-violet-200/30"
          )}
        />
      </div>

      <div className="container-premium mx-auto flex min-h-[calc(100vh-5rem)] items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid w-full items-center gap-12 lg:grid-cols-2"
        >
          {/* ================= Left: Content ================= */}
          <div className="order-2 lg:order-1">
            {/* Availability Badge */}
            <motion.div variants={itemVariants}>
              <span className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium",
                isDark
                  ? "border-zinc-800 bg-zinc-900/60 text-zinc-300 backdrop-blur-sm"
                  : "border-zinc-200 bg-white/80 text-zinc-600 backdrop-blur-sm shadow-sm"
              )}>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available for freelance work
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 variants={itemVariants} className="mt-8 text-display-xl">
              Hi, I'm{" "}
              <span className="gradient-text">
                {personal.name}
              </span>
            </motion.h1>

            {/* Role Subtitle */}
            <motion.p variants={itemVariants} className="mt-5 text-heading-lg text-zinc-500 dark:text-zinc-400">
              {personal.title}
            </motion.p>

            {/* Description */}
            <motion.p variants={itemVariants} className="mt-6 max-w-xl text-body-base text-zinc-600 dark:text-zinc-400">
              {personal.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4">
              <a
                href="#projects"
                className={cn(
                  "group inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:bg-white dark:text-zinc-900 dark:shadow-zinc-900/40",
                  "focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                )}
              >
                View Projects
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className={cn(
                  "group inline-flex items-center gap-2 rounded-xl border px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5",
                  isDark
                    ? "border-zinc-700 bg-zinc-900/40 text-zinc-200 hover:bg-zinc-800/60"
                    : "border-zinc-300 bg-white/60 text-zinc-700 hover:bg-white hover:shadow-md"
                )}
              >
                Contact Me
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="mt-10 flex items-center gap-3">
              {[
                { href: personal.social.github, icon: <FaGithub size={20} />, label: "GitHub" },
                { href: personal.social.linkedin, icon: <FaLinkedin size={20} />, label: "LinkedIn" },
                { href: personal.social.twitter, icon: <FaTwitter size={20} />, label: "Twitter" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 hover:-translate-y-1",
                    isDark
                      ? "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-white"
                      : "border-zinc-200 bg-white/60 text-zinc-500 hover:border-zinc-300 hover:text-zinc-900 hover:shadow-sm"
                  )}
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* ================= Right: Avatar ================= */}
          <motion.div
            variants={itemVariants}
            className="order-1 mx-auto flex justify-center lg:order-2"
          >
            <div className="relative">
              {/* Outer Glow Ring */}
              <div className={cn(
                "absolute -inset-6 rounded-full blur-2xl",
                isDark ? "bg-indigo-500/10" : "bg-indigo-300/20"
              )} />

              {/* Rotating Border Ring */}
              <div className={cn(
                "absolute -inset-3 rounded-full border",
                isDark ? "border-zinc-800/50" : "border-zinc-200/50"
              )} />

              {/* Avatar Image */}
              <div className={cn(
                "relative h-[280px] w-[280px] overflow-hidden rounded-full border-4 shadow-2xl lg:h-[380px] lg:w-[380px]",
                isDark
                  ? "border-zinc-800 bg-zinc-900 shadow-zinc-950/50"
                  : "border-white shadow-zinc-300/50"
              )}>
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Floating Card: Availability */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className={cn(
                  "absolute -bottom-5 -left-6 rounded-2xl border px-5 py-3 shadow-xl backdrop-blur-md",
                  isDark
                    ? "border-zinc-800 bg-zinc-900/80 text-zinc-200"
                    : "border-white bg-white/80 text-zinc-700"
                )}
              >
                <p className="text-xs font-medium text-zinc-500">Available for</p>
                <p className="text-sm font-bold text-emerald-500">Freelance Work</p>
              </motion.div>

              {/* Floating Card: Tech Stack */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className={cn(
                  "absolute -right-4 top-8 rounded-2xl border px-5 py-3 shadow-xl backdrop-blur-md",
                  isDark
                    ? "border-zinc-800 bg-zinc-900/80 text-zinc-200"
                    : "border-white bg-white/80 text-zinc-700"
                )}
              >
                <p className="text-xs font-medium text-zinc-500">Tech Stack</p>
                <p className="text-sm font-bold">React · Node · TS</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a
            href="#about"
            aria-label="Scroll to about section"
            className={cn(
              "flex flex-col items-center gap-2 text-sm transition-colors duration-300",
              isDark ? "text-zinc-600 hover:text-zinc-400" : "text-zinc-400 hover:text-zinc-600"
            )}
          >
            <span className="caption">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-8 w-5 rounded-full border-2 border-current flex items-start justify-center pt-1.5"
            >
              <span className={cn(
                "h-1.5 w-1.5 rounded-full",
                isDark ? "bg-zinc-600" : "bg-zinc-400"
              )} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

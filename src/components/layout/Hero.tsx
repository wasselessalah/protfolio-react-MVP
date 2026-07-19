import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaArrowDown,
} from "react-icons/fa";

import { useTheme } from "@/context/ThemeContext";
import { information } from "@/data/information";
import { cn } from "@/lib/utils";

export default function Hero() {
  const { theme } = useTheme();

  const { personal } = information;

  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true);

    let index = 0;

    const interval = setInterval(() => {
      if (index <= personal.role.length) {
        setDisplayedText(personal.role.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [personal.role]);

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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div
          className={cn(
            "absolute -top-20 -left-20 h-96 w-96 rounded-full blur-3xl opacity-20",
            theme === "dark"
              ? "bg-blue-600"
              : "bg-blue-300"
          )}
        />

        <div
          className={cn(
            "absolute -bottom-20 -right-20 h-96 w-96 rounded-full blur-3xl opacity-20",
            theme === "dark"
              ? "bg-purple-600"
              : "bg-purple-300"
          )}
        />

      </div>

      <div className="container mx-auto px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={
            isVisible
              ? { opacity: 1, y: 0 }
              : {}
          }
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-14 items-center"
        >
          {/* ================= Left Content ================= */}
<div className="order-2 lg:order-1">

  {/* Badge */}
  <div
    className={cn(
      "inline-flex items-center gap-2 rounded-full border px-4 py-2 mb-8",
      theme === "dark"
        ? "border-gray-700 bg-gray-800/50"
        : "border-gray-200 bg-white"
    )}
  >
    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />

    <span
      className={cn(
        "text-sm font-medium",
        theme === "dark"
          ? "text-green-400"
          : "text-green-600"
      )}
    >
      {personal.availability}
    </span>
  </div>

  {/* Heading */}
  <h1
    className={cn(
      "text-5xl md:text-6xl xl:text-7xl font-bold leading-tight",
      theme === "dark"
        ? "text-white"
        : "text-gray-900"
    )}
  >
    Hi, I'm{" "}

    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        theme === "dark"
          ? "from-blue-400 via-cyan-400 to-purple-500"
          : "from-blue-600 via-cyan-600 to-purple-600"
      )}
    >
      {personal.name}
    </span>
  </h1>

  {/* Animated Role */}
  <div
    className={cn(
      "mt-6 text-xl md:text-2xl font-medium h-8",
      theme === "dark"
        ? "text-gray-300"
        : "text-gray-600"
    )}
  >
    {displayedText}
    <span className="animate-pulse">|</span>
  </div>

  {/* Title */}
  <h2
    className={cn(
      "mt-8 text-2xl font-semibold",
      theme === "dark"
        ? "text-white"
        : "text-gray-900"
    )}
  >
    {personal.title}
  </h2>

  {/* Description */}
  <p
    className={cn(
      "mt-6 max-w-xl text-lg leading-8",
      theme === "dark"
        ? "text-gray-400"
        : "text-gray-600"
    )}
  >
    {personal.subtitle}
  </p>

  {/* Buttons */}
  <div className="mt-10 flex flex-wrap gap-4">

    <NavLink
      to={personal.buttons.primary.href}
      className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700"
    >
      {personal.buttons.primary.text}
    </NavLink>

    <NavLink
      to={personal.buttons.secondary.href}
      className={cn(
        "rounded-xl border px-7 py-3 font-semibold transition-all duration-300 hover:scale-105",
        theme === "dark"
          ? "border-gray-600 text-gray-200 hover:border-blue-500 hover:text-blue-400"
          : "border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600"
      )}
    >
      {personal.buttons.secondary.text}
    </NavLink>

  </div>

  {/* Social Links */}
  <div className="mt-10 flex items-center gap-4">

    <a
      href={personal.social.github}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
      className={cn(
        "rounded-xl p-3 transition-all duration-300 hover:-translate-y-1",
        theme === "dark"
          ? "bg-gray-800 hover:bg-blue-600 text-white"
          : "bg-gray-100 hover:bg-blue-600 hover:text-white"
      )}
    >
      <FaGithub size={22} />
    </a>

    <a
      href={personal.social.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className={cn(
        "rounded-xl p-3 transition-all duration-300 hover:-translate-y-1",
        theme === "dark"
          ? "bg-gray-800 hover:bg-blue-600 text-white"
          : "bg-gray-100 hover:bg-blue-600 hover:text-white"
      )}
    >
      <FaLinkedin size={22} />
    </a>

    <a
      href={personal.social.twitter}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
      className={cn(
        "rounded-xl p-3 transition-all duration-300 hover:-translate-y-1",
        theme === "dark"
          ? "bg-gray-800 hover:bg-blue-600 text-white"
          : "bg-gray-100 hover:bg-blue-600 hover:text-white"
      )}
    >
      <FaTwitter size={22} />
    </a>

  </div>

</div>{/* ================= Right Content ================= */}
<div className="order-1 lg:order-2 flex justify-center">

  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={
      isVisible
        ? { opacity: 1, scale: 1 }
        : {}
    }
    transition={{
      duration: 0.8,
      delay: 0.2,
    }}
    className="relative"
  >

    {/* Animated Glow */}
    <div
      className={cn(
        "absolute inset-0 rounded-full blur-3xl opacity-30 animate-pulse",
        theme === "dark"
          ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600"
          : "bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-300"
      )}
    />

    {/* Decorative Ring */}
    <div
      className={cn(
        "absolute -inset-5 rounded-full border",
        theme === "dark"
          ? "border-blue-500/20"
          : "border-blue-400/20"
      )}
    />

    {/* Avatar */}
    <motion.div
      animate={{
        y: [0, -12, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative"
    >

      <div
        className={cn(
          "w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-4",
          theme === "dark"
            ? "border-gray-800"
            : "border-white"
        )}
      >
        <img
          src={personal.avatar}
          alt={personal.name}
          loading="eager"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

    </motion.div>

    {/* Experience Card */}
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 4,
      }}
      className={cn(
        "absolute -left-8 top-10 rounded-2xl px-5 py-4 shadow-xl backdrop-blur-lg",
        theme === "dark"
          ? "bg-gray-800/80 border border-gray-700"
          : "bg-white/90 border border-gray-200"
      )}
    >

      <p className="text-2xl font-bold text-blue-500">
        {information.about.experience}
      </p>

      <p
        className={cn(
          "text-sm mt-1",
          theme === "dark"
            ? "text-gray-400"
            : "text-gray-600"
        )}
      >
        Experience
      </p>

    </motion.div>

    {/* Projects Card */}
    <motion.div
      animate={{
        y: [0, 8, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 5,
      }}
      className={cn(
        "absolute -right-8 bottom-12 rounded-2xl px-5 py-4 shadow-xl backdrop-blur-lg",
        theme === "dark"
          ? "bg-gray-800/80 border border-gray-700"
          : "bg-white/90 border border-gray-200"
      )}
    >

      <p className="text-2xl font-bold text-purple-500">
        {information.about.projects}
      </p>

      <p
        className={cn(
          "text-sm mt-1",
          theme === "dark"
            ? "text-gray-400"
            : "text-gray-600"
        )}
      >
        Projects
      </p>

    </motion.div>

    {/* Location */}
    <motion.div
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 6,
      }}
      className={cn(
        "absolute left-1/2 -bottom-8 -translate-x-1/2 rounded-full px-6 py-3 shadow-lg backdrop-blur-lg",
        theme === "dark"
          ? "bg-gray-800/80 border border-gray-700"
          : "bg-white/90 border border-gray-200"
      )}
    >

      <span
        className={cn(
          "font-medium",
          theme === "dark"
            ? "text-gray-300"
            : "text-gray-700"
        )}
      >
        📍 {personal.location}
      </span>

    </motion.div>

  </motion.div>

</div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 12, 0] }}
          transition={{
            delay: 1,
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3"
        >
          <span
            className={cn(
              "text-sm font-medium tracking-wide",
              theme === "dark"
                ? "text-gray-500"
                : "text-gray-500"
            )}
          >
            Scroll Down
          </span>

          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border",
              theme === "dark"
                ? "border-gray-700 bg-gray-800"
                : "border-gray-300 bg-white"
            )}
          >
            <FaArrowDown
              className={cn(
                theme === "dark"
                  ? "text-gray-400"
                  : "text-gray-600"
              )}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
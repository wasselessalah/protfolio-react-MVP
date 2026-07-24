// src/components/layout/Hero.tsx  (also used as sections/Hero.tsx)
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiGithub, FiLinkedin, FiTwitter, FiDownload,
  FiMail, FiMapPin, FiCheck, FiCode, FiStar, FiGitBranch
} from "react-icons/fi";
import { information } from "@/data/information";

const roles = [
  "Full Stack Developer",
  "React Specialist",
  "Node.js Engineer",
  "Cloud Engineering Student",
];

const floatingCodeSnippet = `const developer = {
  name: "Wassel Essalah",
  passion: "Code",
  focus: "Clean Architecture",
  goal: "Make an Impact",
  alwaysLearning: true
}`;

const statsData = [
  { label: "Projects", value: "15+", color: "#3B82F6" },
  { label: "Experience", value: "2+ yrs", color: "#8B5CF6" },
  { label: "Technologies", value: "20+", color: "#06B6D4" },
  { label: "GitHub Stars", value: "50+", color: "#22C55E" },
];

const techBadges = ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Docker", "AWS", "PostgreSQL"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { personal } = information;

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 35);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen">
      {/* Profile Cover */}
      <div className="profile-cover">
        {/* Animated neon lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full"
              style={{
                top: `${30 + i * 30}%`,
                background: `linear-gradient(90deg, transparent, rgba(59,130,246,${0.2 - i * 0.05}), transparent)`,
              }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "linear", delay: i * 1.5 }}
            />
          ))}
          {/* Neon circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[rgba(59,130,246,0.1)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[rgba(139,92,246,0.06)]" />
        </div>

        {/* Floating tech badges in cover */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {techBadges.slice(0, 4).map((tech, i) => (
            <motion.div
              key={tech}
              className="absolute tech-chip text-[10px]"
              style={{
                left: `${15 + i * 20}%`,
                top: `${20 + (i % 2) * 40}%`,
                opacity: 0.5,
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Profile Section - sits over the cover */}
      <div className="px-6 lg:px-10 -mt-16 relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* Avatar + CTA row */}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative"
            >
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden ring-4 ring-[#050816] shadow-2xl neon-blue">
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Online indicator */}
              <span className="online-dot absolute bottom-2 right-2" />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="mailto:wasselessalah@gmail.com"
                className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm"
              >
                <FiMail size={15} /> Hire Me
              </a>
              <a
                href="/resume.pdf"
                download
                className="btn-ghost flex items-center gap-2 px-5 py-2.5 text-sm"
              >
                <FiDownload size={15} /> Resume
              </a>
              <a
                href={personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost flex items-center gap-2 px-5 py-2.5 text-sm"
              >
                <FiGithub size={15} /> GitHub
              </a>
            </motion.div>
          </div>

          {/* Name + Title */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Name + Verification */}
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl font-900 text-white tracking-tight">
                {personal.name}
              </h1>
              <span className="flex items-center gap-1.5 bg-[rgba(59,130,246,0.15)] text-[#3B82F6] text-xs font-700 px-2.5 py-1 rounded-full border border-[rgba(59,130,246,0.3)]">
                <FiCheck size={11} className="fill-current" /> Verified Dev
              </span>
            </div>

            {/* Typewriter Role */}
            <p className="text-lg font-600 text-[#3B82F6] mb-1 h-7">
              {displayed}
              <span className="inline-block w-0.5 h-5 bg-[#3B82F6] ml-0.5 align-middle animate-[blink_1s_ease-in-out_infinite]" />
            </p>

            {/* Location + Status */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748B] mb-4">
              <span className="flex items-center gap-1.5">
                <FiMapPin size={13} /> {personal.location}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                Open for Internship &amp; Freelance
              </span>
            </div>

            {/* Bio */}
            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-2xl mb-6">
              {personal.subtitle}
            </p>

            {/* Social links row */}
            <div className="flex items-center gap-2 mb-8">
              {[
                { href: personal.social.github, icon: FiGithub, label: "GitHub" },
                { href: personal.social.linkedin, icon: FiLinkedin, label: "LinkedIn" },
                { href: personal.social.twitter, icon: FiTwitter, label: "Twitter" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-[#475569] hover:text-[#3B82F6] hover:bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.1)] hover:border-[rgba(59,130,246,0.3)] transition-all duration-200"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
          >
            {statsData.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="stat-card text-center cursor-default"
              >
                <p className="text-2xl font-800 mb-1" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs text-[#64748B] font-500">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Lower section: floating cards + code snippet */}
          <div className="grid lg:grid-cols-2 gap-6 mb-10">

            {/* Code Snippet Card */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="code-block animate-float"
            >
              <div className="code-block-header">
                <div className="code-dot bg-[#EF4444]" />
                <div className="code-dot bg-[#F59E0B]" />
                <div className="code-dot bg-[#22C55E]" />
                <span className="ml-3 text-[#475569] text-xs">developer.ts</span>
              </div>
              <pre className="p-4 text-xs text-[#94A3B8] overflow-x-auto custom-scroll">
                <code>
                  {floatingCodeSnippet.split("\n").map((line, i) => (
                    <span key={i} className="block">
                      {line.includes("name") ? (
                        <><span className="text-[#64748B]">{line.split('"')[0]}"</span><span className="text-[#22C55E]">Wassel Essalah</span><span className="text-[#64748B]">",</span></>
                      ) : line.includes("true") ? (
                        <><span className="text-[#94A3B8]">{line.split("true")[0]}</span><span className="text-[#F59E0B]">true</span></>
                      ) : line.includes(":") && !line.includes("{") ? (
                        <><span className="text-[#94A3B8]">{line.split(":")[0]}:</span><span className="text-[#3B82F6]">{line.split(":").slice(1).join(":")}</span></>
                      ) : (
                        <span className="text-[#64748B]">{line}</span>
                      )}
                    </span>
                  ))}
                </code>
              </pre>
            </motion.div>

            {/* Achievement + GitHub Cards */}
            <div className="flex flex-col gap-3">

              {/* GitHub Activity Card */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="glass-card p-4 animate-float-reverse"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[rgba(59,130,246,0.1)] flex items-center justify-center">
                    <FiGithub size={18} className="text-[#3B82F6]" />
                  </div>
                  <div>
                    <p className="text-sm font-700 text-white">GitHub Activity</p>
                    <p className="text-xs text-[#64748B]">@wasselessalah</p>
                  </div>
                </div>
                {/* Mini contribution graph */}
                <div className="grid grid-cols-12 gap-0.5">
                  {[...Array(48)].map((_, i) => {
                    const intensity = Math.random();
                    return (
                      <div
                        key={i}
                        className="h-2.5 rounded-sm"
                        style={{
                          background: intensity > 0.7
                            ? "#3B82F6"
                            : intensity > 0.4
                            ? "rgba(59,130,246,0.4)"
                            : intensity > 0.1
                            ? "rgba(59,130,246,0.15)"
                            : "rgba(59,130,246,0.05)",
                        }}
                      />
                    );
                  })}
                </div>
                <p className="text-xs text-[#64748B] mt-2">524 contributions this year</p>
              </motion.div>

              {/* Achievement Cards */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: FiCode, label: "500+ hrs", sub: "Code written", color: "#8B5CF6", bg: "rgba(139,92,246,0.1)" },
                  { icon: FiStar, label: "Top Builder", sub: "Projects done", color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
                  { icon: FiGitBranch, label: "15+ Repos", sub: "GitHub repos", color: "#22C55E", bg: "rgba(34,197,94,0.1)" },
                  { icon: FiCheck, label: "100%", sub: "Commitment", color: "#06B6D4", bg: "rgba(6,182,212,0.1)" },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="glass-card p-3 flex items-center gap-2 hover-lift cursor-default"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: item.bg }}>
                      <item.icon size={14} style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-700 text-white leading-none mb-0.5">{item.label}</p>
                      <p className="text-[10px] text-[#64748B]">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
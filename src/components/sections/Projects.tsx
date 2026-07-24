// src/components/sections/Projects.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiEye, FiHeart, FiMessageCircle,
         FiShare2, FiClock, FiStar, FiArrowRight } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import ProjectDetailSheet from "@/components/shared/project-card/ProjectDetailSheet";

const STATUS_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  Completed:   { label: "Completed",   color: "#22C55E", bg: "rgba(34,197,94,0.12)" },
  "In Progress": { label: "In Progress", color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  Archived:    { label: "Archived",    color: "#64748B", bg: "rgba(100,116,139,0.12)" },
};

const CATEGORY_COLORS: Record<string, string> = {
  AI: "#8B5CF6", "Web App": "#3B82F6", Dashboard: "#06B6D4",
  CMS: "#22C55E", "E-Commerce": "#F59E0B", Portfolio: "#EC4899",
};

// Seeded interaction numbers (deterministic per project)
function seed(id: number, base: number) { return base + id * 37 + 14; }

interface Props { limit?: number; }

function ProjectPostCard({ project }: { project: Project }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(seed(project.id, 42));
  const views = seed(project.id, 180);
  const comments = seed(project.id, 8);
  const status = STATUS_STYLES[project.status] ?? STATUS_STYLES.Completed;
  const categoryColor = CATEGORY_COLORS[project.category] ?? "#3B82F6";

  const hasLink = (url?: string) => Boolean(url && url.trim());

  function handleLike() {
    setLiked((v) => !v);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  }

  return (
    <Sheet>
      <motion.article
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="post-card group"
      >
        {/* Card Header - Author row */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden ring-1 ring-[rgba(59,130,246,0.2)]">
              <img src="/src/assets/images/profile/avatar.png" alt="Wassel" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-700 text-white leading-none">Wassel Essalah</p>
              <p className="text-xs text-[#64748B] mt-0.5">{project.year} · {project.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-700 px-2.5 py-1 rounded-full"
              style={{ color: categoryColor, background: `${categoryColor}18`, border: `1px solid ${categoryColor}30` }}
            >
              {project.category}
            </span>
            <span
              className="text-[10px] font-700 px-2.5 py-1 rounded-full"
              style={{ color: status.color, background: status.bg, border: `1px solid ${status.color}40` }}
            >
              {status.label}
            </span>
          </div>
        </div>

        {/* Thumbnail */}
        <SheetTrigger asChild>
          <div className="relative mx-5 mb-4 rounded-xl overflow-hidden cursor-pointer">
            <div className="aspect-video">
              <img
                src={project.thumbnail}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* Play/View overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 border border-white/20 text-white text-sm font-600">
                View Case Study →
              </div>
            </div>
            {/* Views count */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-white/70 text-xs bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1">
              <FiEye size={11} />
              {views}
            </div>
          </div>
        </SheetTrigger>

        {/* Content */}
        <div className="px-5">
          <SheetTrigger asChild>
            <button className="text-left w-full">
              <h3 className="text-base font-700 text-white mb-1 hover:text-[#3B82F6] transition-colors">{project.title}</h3>
            </button>
          </SheetTrigger>
          <p className="text-sm text-[#64748B] leading-relaxed mb-3 line-clamp-2">{project.description}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 5).map((tech) => (
              <span key={tech} className="tech-chip">{tech}</span>
            ))}
            {project.technologies.length > 5 && (
              <span className="tech-chip text-[#3B82F6]">+{project.technologies.length - 5}</span>
            )}
          </div>

          {/* Engagement Bar */}
          <div className="flex items-center justify-between py-3 border-t border-[rgba(59,130,246,0.08)]">
            <div className="flex items-center gap-1 text-xs text-[#475569]">
              <span className="flex items-center gap-0.5">
                <span className="w-4 h-4 rounded-full bg-[#3B82F6] flex items-center justify-center text-[8px]">👍</span>
                <span className="w-4 h-4 rounded-full bg-[#EC4899] -ml-1 flex items-center justify-center text-[8px]">❤️</span>
              </span>
              <span className="ml-1">{likeCount}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#475569]">
              <span>{comments} comments</span>
              <span>·</span>
              <span><FiStar size={10} className="inline mr-0.5" />{project.role}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 py-2 border-t border-[rgba(59,130,246,0.08)]">
            <button
              onClick={handleLike}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-600 transition-all duration-200 ${
                liked ? "text-[#3B82F6] bg-[rgba(59,130,246,0.1)]" : "text-[#64748B] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#94A3B8]"
              }`}
            >
              <FiHeart size={15} className={liked ? "fill-[#3B82F6]" : ""} />
              Like
            </button>
            <SheetTrigger asChild>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-600 text-[#64748B] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#94A3B8] transition-all duration-200">
                <FiMessageCircle size={15} />
                View
              </button>
            </SheetTrigger>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-600 text-[#64748B] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#94A3B8] transition-all duration-200">
              <FiShare2 size={15} />
              Share
            </button>
          </div>

          {/* Links */}
          {(hasLink(project.links.github) || hasLink(project.links.live)) && (
            <div className="flex gap-2 pb-4 pt-1">
              {hasLink(project.links.github) && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 btn-ghost text-xs px-3 py-1.5"
                >
                  <FiGithub size={13} /> Source Code
                </a>
              )}
              {hasLink(project.links.live) && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="btn-primary flex items-center gap-1.5 text-xs px-3 py-1.5"
                >
                  <FiExternalLink size={13} /> Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </motion.article>

      <ProjectDetailSheet project={project} isDark={true} />
    </Sheet>
  );
}

export default function Projects({ limit }: Props) {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;
  const isHomePage = Boolean(limit);

  return (
    <section className="section-wrapper px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="section-label">
            <FiClock size={12} />
            {isHomePage ? "Featured Work" : "All Projects"}
          </div>
          <h2 className="section-title">
            {isHomePage ? "My Latest" : "Project"} <span className="gradient-text-blue">Projects</span>
          </h2>
          <p className="section-subtitle mt-3">
            {isHomePage
              ? "A selection of real-world apps I've built — click any project for the full story."
              : "Every project is a social post — explore the full case study, tech stack, and journey."}
          </p>
        </motion.div>

        {/* Project feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {displayedProjects.map((project) => (
            <ProjectPostCard key={project.id} project={project} />
          ))}
        </div>

        {/* View all CTA */}
        {isHomePage && projects.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <NavLink
              to="/projects"
              className="inline-flex items-center gap-2 btn-outline px-8 py-3 text-sm"
            >
              View All Projects <FiArrowRight size={15} />
            </NavLink>
          </motion.div>
        )}
      </div>
    </section>
  );
}
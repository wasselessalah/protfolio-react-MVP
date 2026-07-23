// src/components/shared/ProjectCard.tsx

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { FiCalendar, FiClock, FiArrowUpRight } from "react-icons/fi";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import type { Project } from "@/data/projects";
import StatusBadge from "@/components/shared/project-card/StatusBadge";
import TechChip from "@/components/shared/project-card/TechChip";
import ProjectDetailSheet from "@/components/shared/project-card/ProjectDetailSheet";

interface ProjectCardProps {
  project: Project;
}

const MAX_VISIBLE_CHIPS = 4;

export default function ProjectCard({ project }: ProjectCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { title, description, thumbnail, category, year, duration, status, technologies, links } =
    project;

  const hasLink = (url?: string) => Boolean(url && url.trim().length > 0);
  const visibleTech = technologies.slice(0, MAX_VISIBLE_CHIPS);
  const hiddenTechCount = technologies.length - visibleTech.length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* A real trigger element that stays keyboard-accessible: div + role="button"
            so we can safely nest the floating <a> inside without invalid HTML nesting. */}
        <motion.div
          role="button"
          tabIndex={0}
          aria-haspopup="dialog"
          aria-label={`View details for ${title}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.currentTarget.click();
            }
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "group relative cursor-pointer rounded-2xl transition-all duration-300",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2",
            isDark ? "focus-visible:ring-offset-zinc-950" : "focus-visible:ring-offset-white"
          )}
        >
          {/* Signature hover glow */}
          <div
            className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500/40 to-violet-500/40 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60"
            aria-hidden="true"
          />

          <article
            className={cn(
              "relative overflow-hidden rounded-2xl transition-all duration-300",
              "group-hover:-translate-y-1.5",
              isDark
                ? "bg-zinc-900/70 backdrop-blur-xl ring-1 ring-white/10 shadow-xl shadow-black/20 group-hover:ring-white/20"
                : "bg-white ring-1 ring-zinc-200 shadow-sm group-hover:shadow-2xl group-hover:shadow-zinc-300/50"
            )}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={thumbnail}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/10" />

              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-zinc-900 shadow-sm backdrop-blur-sm">
                {category}
              </span>

              <span className="absolute right-4 top-4 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-sm">
                <StatusBadge status={status} isDark size="sm" />
              </span>

              {hasLink(links.live) && (
                <a
                  href={links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open live demo of ${title}`}
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    "absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full",
                    "bg-white text-zinc-900 opacity-0 shadow-lg transition-all duration-300",
                    "translate-y-2 group-hover:translate-y-0 group-hover:opacity-100",
                    "hover:scale-110 hover:bg-indigo-500 hover:text-white",
                    "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  )}
                >
                  <FiArrowUpRight size={18} />
                </a>
              )}
            </div>

            {/* Body */}
            <div className="space-y-4 p-6">
              <div>
                <h3
                  className={cn(
                    "text-lg font-semibold tracking-tight sm:text-xl",
                    isDark ? "text-white" : "text-zinc-900"
                  )}
                >
                  {title}
                </h3>
                <p
                  className={cn(
                    "mt-2 line-clamp-2 text-sm leading-relaxed",
                    isDark ? "text-zinc-400" : "text-zinc-600"
                  )}
                >
                  {description}
                </p>
              </div>

              <div
                className={cn(
                  "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs",
                  isDark ? "text-zinc-500" : "text-zinc-400"
                )}
              >
                <span className="inline-flex items-center gap-1.5">
                  <FiCalendar size={13} aria-hidden="true" />
                  {year}
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <FiClock size={13} aria-hidden="true" />
                  {duration}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {visibleTech.map((tech) => (
                  <TechChip key={tech} label={tech} isDark={isDark} />
                ))}
                {hiddenTechCount > 0 && (
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium",
                      isDark ? "bg-zinc-800 text-zinc-400" : "bg-zinc-100 text-zinc-500"
                    )}
                  >
                    +{hiddenTechCount}
                  </span>
                )}
              </div>
            </div>
          </article>
        </motion.div>
      </SheetTrigger>

      <ProjectDetailSheet project={project} isDark={isDark} />
    </Sheet>
  );
}
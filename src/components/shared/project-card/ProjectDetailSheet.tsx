// src/components/shared/project-card/ProjectDetailSheet.tsx

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  FiCalendar,
  FiClock,
  FiUsers,
  FiUser,
  FiBriefcase,
  FiArrowUpRight,
  FiGithub,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
} from "react-icons/fi";
import { SiFigma } from "react-icons/si";
import { SheetContent } from "@/components/ui/sheet";
import type { Project } from "@/data/projects";
import StatusBadge from "@/components/shared/project-card/StatusBadge";
import TechChip from "@/components/shared/project-card/TechChip";
import ActionButton from "@/components/shared/project-card/Actionbutton";
import MetaItem from "@/components/shared/project-card/Metaitem";

interface ProjectDetailSheetProps {
  project: Project;
  isDark: boolean;
}

export default function ProjectDetailSheet({ project, isDark }: ProjectDetailSheetProps) {
  const {
    title,
    fullDescription,
    thumbnail,
    gallery,
    category,
    year,
    duration,
    status,
    role,
    team,
    client,
    technologies,
    skills,
    features,
    links,
  } = project;

  // Ensure images array is always populated with valid string URLs
  const images: string[] =
    gallery && gallery.length > 0
      ? gallery
      : thumbnail
      ? [thumbnail]
      : [];

  const hasLink = (url?: string) => Boolean(url && url.trim().length > 0);

  // Active Lightbox Image State (null = closed)
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setActiveImageIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  }, [images.length]);

  // Keyboard Navigation for Fullscreen Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === "Escape") setActiveImageIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, handleNext, handlePrev]);

  const metaItems: { icon: React.ReactNode; label: string; value: string }[] = [
    { icon: <FiCalendar size={16} />, label: "Year", value: year },
    { icon: <FiClock size={16} />, label: "Duration", value: duration },
    { icon: <FiUsers size={16} />, label: "Team", value: team },
    { icon: <FiBriefcase size={16} />, label: "Role", value: role },
    ...(client ? [{ icon: <FiUser size={16} />, label: "Client", value: client }] : []),
  ];

  return (
    <>
      <SheetContent
        side="right"
        className={cn(
          "flex w-full flex-col gap-0 p-0 sm:w-[80vw] sm:min-w-[80vw] md:min-w-[50vw] border-l shadow-2xl transition-colors duration-200",
          isDark ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-200"
        )}
      >
        {/* Header - Solid background */}
        <div
          className={cn(
            "sticky top-0 z-10 shrink-0 border-b px-6 py-5 sm:px-10 transition-colors",
            isDark
              ? "border-zinc-800 bg-zinc-950 text-white"
              : "border-zinc-200 bg-white text-zinc-900"
          )}
        >
          <h2 className="pr-8 text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h2>
          <div className="mt-2.5 flex items-center gap-2.5 text-sm">
            <StatusBadge status={status} isDark={isDark} />
            <span className={isDark ? "text-zinc-700" : "text-zinc-300"} aria-hidden="true">
              •
            </span>
            <span className={cn("font-medium", isDark ? "text-zinc-400" : "text-zinc-600")}>
              {category}
            </span>
          </div>
        </div>

        {/* Scrollable Body */}
        <div
          className={cn(
            "flex-1 overflow-y-auto px-6 py-8 sm:px-10",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          )}
        >
          <div className="mx-auto max-w-3xl space-y-10">
            {/* Overview */}
            <section aria-labelledby="overview-heading">
              <h3
                id="overview-heading"
                className={cn(
                  "text-xs font-bold uppercase tracking-widest",
                  isDark ? "text-indigo-400" : "text-indigo-600"
                )}
              >
                Overview
              </h3>
              <p
                className={cn(
                  "mt-3 text-[15px] sm:text-base leading-relaxed font-normal",
                  isDark ? "text-zinc-300" : "text-zinc-700"
                )}
              >
                {fullDescription}
              </p>
            </section>

            {/* Project Details Grid */}
            <section
              aria-labelledby="details-heading"
              className={cn(
                "rounded-2xl p-6 border transition-all",
                isDark
                  ? "border-zinc-800 bg-zinc-900/80"
                  : "border-zinc-200 bg-zinc-50 shadow-sm"
              )}
            >
              <h3 id="details-heading" className="sr-only">
                Project details
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
                {metaItems.map((item) => (
                  <MetaItem key={item.label} {...item} isDark={isDark} />
                ))}
              </div>
            </section>

            {/* Technologies */}
            <section aria-labelledby="tech-heading">
              <h3
                id="tech-heading"
                className={cn(
                  "text-xs font-bold uppercase tracking-widest",
                  isDark ? "text-indigo-400" : "text-indigo-600"
                )}
              >
                Technologies
              </h3>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <TechChip key={tech} label={tech} isDark={isDark} variant="outline" />
                ))}
              </div>
            </section>

            {/* Skills */}
            {skills && skills.length > 0 && (
              <section aria-labelledby="skills-heading">
                <h3
                  id="skills-heading"
                  className={cn(
                    "text-xs font-bold uppercase tracking-widest",
                    isDark ? "text-indigo-400" : "text-indigo-600"
                  )}
                >
                  Skills Applied
                </h3>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <TechChip key={skill} label={skill} isDark={isDark} variant="outline" />
                  ))}
                </div>
              </section>
            )}

            {/* Features */}
            {features && features.length > 0 && (
              <section aria-labelledby="features-heading">
                <h3
                  id="features-heading"
                  className={cn(
                    "text-xs font-bold uppercase tracking-widest",
                    isDark ? "text-indigo-400" : "text-indigo-600"
                  )}
                >
                  Key Features
                </h3>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className={cn(
                        "flex items-start gap-3 text-sm leading-relaxed rounded-lg p-3 transition-colors",
                        isDark
                          ? "bg-zinc-900 text-zinc-300 border border-zinc-800"
                          : "bg-zinc-50 text-zinc-700 border border-zinc-200"
                      )}
                    >
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Gallery Section */}
            {images.length > 0 && (
              <section aria-labelledby="gallery-heading">
                <h3
                  id="gallery-heading"
                  className={cn(
                    "text-xs font-bold uppercase tracking-widest",
                    isDark ? "text-indigo-400" : "text-indigo-600"
                  )}
                >
                  Gallery ({images.length})
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {images.map((imageSrc, i) => (
                    <button
                      key={`gallery-item-${i}`}
                      type="button"
                      onClick={() => setActiveImageIndex(i)}
                      className={cn(
                        "group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500",
                        isDark
                          ? "border-zinc-800 bg-zinc-900 hover:border-zinc-700 shadow-lg"
                          : "border-zinc-200 bg-zinc-100 hover:border-zinc-300 shadow-sm"
                      )}
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden">
                        <img
                          src={imageSrc}
                          alt={`${title} preview ${i + 1}`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                        <span className="flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-xs font-medium text-white shadow-md">
                          <FiMaximize2 size={14} /> Fullscreen View
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Footer */}
        {links && (hasLink(links.live) || hasLink(links.github) || hasLink(links.figma)) && (
          <div
            className={cn(
              "sticky bottom-0 z-10 shrink-0 border-t px-6 py-4 sm:px-10 transition-colors",
              isDark ? "border-zinc-800 bg-zinc-950" : "border-zinc-200 bg-white"
            )}
          >
            <div className="mx-auto flex max-w-3xl flex-wrap gap-3">
              {hasLink(links.live) && (
                <ActionButton
                  href={links.live!}
                  label="View Live"
                  icon={<FiArrowUpRight size={16} />}
                  variant="primary"
                  isDark={isDark}
                />
              )}
              {hasLink(links.github) && (
                <ActionButton
                  href={links.github!}
                  label="Source Code"
                  icon={<FiGithub size={16} />}
                  variant="secondary"
                  isDark={isDark}
                />
              )}
              {hasLink(links.figma) && (
                <ActionButton
                  href={links.figma!}
                  label="Design"
                  icon={<SiFigma size={16} />}
                  variant="secondary"
                  isDark={isDark}
                />
              )}
            </div>
          </div>
        )}
      </SheetContent>

      {/* Screen Lightbox */}
      {activeImageIndex !== null && images[activeImageIndex] && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 sm:p-10 transition-opacity"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Header Controls */}
          <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between text-white">
            <span className="text-sm font-semibold tracking-wide text-zinc-300">
              {activeImageIndex + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={() => setActiveImageIndex(null)}
              className="rounded-full bg-zinc-800/80 p-2 text-white transition-colors hover:bg-zinc-700 focus:outline-none"
              aria-label="Close image display"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Lightbox Image */}
          <div
            className="relative flex max-h-full max-w-6xl items-center justify-center overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[activeImageIndex]}
              alt={`${title} full image ${activeImageIndex + 1}`}
              className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
          </div>

          {/* Controls */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-zinc-800/80 p-3 text-white transition-colors hover:bg-zinc-700 focus:outline-none"
                aria-label="Previous image"
              >
                <FiChevronLeft size={28} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-zinc-800/80 p-3 text-white transition-colors hover:bg-zinc-700 focus:outline-none"
                aria-label="Next image"
              >
                <FiChevronRight size={28} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
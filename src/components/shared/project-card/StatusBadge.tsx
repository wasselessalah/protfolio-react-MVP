// src/components/shared/project-card/StatusBadge.tsx
import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/data/projects";

interface StatusBadgeProps {
  status: ProjectStatus;
  isDark: boolean;
  size?: "sm" | "md";
}

const STATUS_DOT: Record<ProjectStatus, string> = {
  Completed: "bg-emerald-500",
  "In Progress": "bg-amber-500",
  Archived: "bg-zinc-400",
};

export default function StatusBadge({ status, isDark, size = "md" }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium",
        size === "sm" ? "text-xs" : "text-sm",
        isDark ? "text-zinc-400" : "text-zinc-500"
      )}
    >
      <span
        className={cn("h-1.5 w-1.5 shrink-0 rounded-full", STATUS_DOT[status])}
        aria-hidden="true"
      />
      {status}
    </span>
  );
}
// src/components/shared/project-card/TechChip.tsx
import { cn } from "@/lib/utils";

interface TechChipProps {
  label: string;
  isDark: boolean;
  variant?: "solid" | "outline";
}

export default function TechChip({ label, isDark, variant = "solid" }: TechChipProps) {
  if (variant === "outline") {
    return (
      <span
        className={cn(
          "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors duration-200",
          isDark
            ? "border-zinc-700 text-zinc-300 hover:border-zinc-600"
            : "border-zinc-200 text-zinc-700 hover:border-zinc-300"
        )}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium transition-all duration-200",
        isDark
          ? "bg-gradient-to-r from-indigo-500/15 to-violet-500/15 text-indigo-300 ring-1 ring-inset ring-indigo-400/20 hover:ring-indigo-400/40"
          : "bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300"
      )}
    >
      {label}
    </span>
  );
}
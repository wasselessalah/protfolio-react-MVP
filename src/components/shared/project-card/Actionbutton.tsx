// src/components/shared/project-card/ActionButton.tsx
import { cn } from "@/lib/utils";
import { FiLoader } from "react-icons/fi";

interface ActionButtonProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  variant: "primary" | "secondary";
  isDark: boolean;
  loading?: boolean;
}

export default function ActionButton({
  href,
  label,
  icon,
  variant,
  isDark,
  loading = false,
}: ActionButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <a
      href={loading ? undefined : href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      aria-busy={loading}
      aria-disabled={loading}
      onClick={(e) => loading && e.preventDefault()}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold",
        "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        loading && "pointer-events-none opacity-70",
        isPrimary
          ? cn(
              "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25",
              "hover:shadow-xl hover:shadow-indigo-500/35 hover:-translate-y-0.5",
              "focus-visible:ring-indigo-400",
              isDark ? "focus-visible:ring-offset-zinc-900" : "focus-visible:ring-offset-white"
            )
          : cn(
              "border hover:-translate-y-0.5",
              isDark
                ? "border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-600 focus-visible:ring-zinc-500 focus-visible:ring-offset-zinc-900"
                : "border-zinc-300 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400 focus-visible:ring-zinc-400 focus-visible:ring-offset-white"
            )
      )}
    >
      {loading ? <FiLoader className="animate-spin" size={15} /> : icon}
      {label}
    </a>
  );
}
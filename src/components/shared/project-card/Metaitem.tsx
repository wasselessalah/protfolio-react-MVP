// src/components/shared/project-card/MetaItem.tsx
import { cn } from "@/lib/utils";

interface MetaItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isDark: boolean;
}

export default function MetaItem({ icon, label, value, isDark }: MetaItemProps) {
  return (
    <div className="flex items-start gap-2.5">
      <span
        className={cn(
          "mt-0.5 shrink-0",
          isDark ? "text-zinc-500" : "text-zinc-400"
        )}
        aria-hidden="true"
      >
        {icon}
      </span>
      <div>
        <p
          className={cn(
            "text-xs font-medium uppercase tracking-wide",
            isDark ? "text-zinc-500" : "text-zinc-400"
          )}
        >
          {label}
        </p>
        <p
          className={cn(
            "mt-0.5 text-sm font-medium",
            isDark ? "text-zinc-200" : "text-zinc-800"
          )}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
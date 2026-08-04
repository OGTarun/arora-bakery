import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface FloatingObjectProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  label: string;
  sublabel?: string;
}

export function FloatingObject({
  icon: Icon,
  label,
  sublabel,
  className,
  ...props
}: FloatingObjectProps) {
  return (
    <div
      className={cn(
        "absolute flex items-center gap-3 rounded-3xl border border-white/70 bg-white/65 px-5 py-3.5 shadow-soft backdrop-blur-xl transition-shadow duration-300 hover:shadow-float",
        className
      )}
      {...props}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span>
        <span className="block text-sm font-medium text-foreground">{label}</span>
        {sublabel && (
          <span className="block text-xs text-muted-foreground">{sublabel}</span>
        )}
      </span>
    </div>
  );
}

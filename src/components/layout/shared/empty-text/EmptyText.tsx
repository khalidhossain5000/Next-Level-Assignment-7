/** biome-ignore-all lint/a11y/useSemanticElements: <explanation> */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EmptyTextProps = {
  badge?: string;
  title?: string;
  description?: string;
  action?: ReactNode;
  compact?: boolean;
  className?: string;
  glowClassName?: string;
  badgeClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  actionClassName?: string;
};

const EmptyText = ({
  badge = "Not found",
  title = "No data found",

  compact = false,
  className,
  glowClassName,
  badgeClassName,
  contentClassName,
  titleClassName,

}: EmptyTextProps) => {
  return (
    <div
      role="status"
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-destructive/30 bg-destructive/5 text-center",
        compact ? "gap-3 px-4 py-8" : "gap-5 px-6 py-14 sm:py-20",
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-destructive/60 to-transparent"
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/20 blur-3xl",
          glowClassName
        )}
      />

      {badge && (
        <span
          className={cn(
            "relative inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-destructive",
            badgeClassName
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
          {badge}
        </span>
      )}

      <div className={cn("relative max-w-sm space-y-1.5", contentClassName)}>
        <h3
          className={cn(
            "font-semibold tracking-tight text-foreground",
            compact ? "text-lg" : "text-xl sm:text-2xl",
            titleClassName
          )}
        >
          {title}
        </h3>
       
      </div>

     
    </div>
  );
};

export default EmptyText;
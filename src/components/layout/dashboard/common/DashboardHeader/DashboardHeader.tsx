"use client";

import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";
import ModeToggle from "@/components/layout/shared/modeToggle/ModeToggle";

type DashboardHeaderProps = {
  title: string;
  description?: string;
  showDateTime?: boolean;
};

const DashboardHeader = ({
  title,
  description,
  showDateTime = false,
}: DashboardHeaderProps) => {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    if (!showDateTime) return;

    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);

    return () => clearInterval(timer);
  }, [showDateTime]);

  return (
    <section className="flex flex-col gap-4  pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {showDateTime && now && (
          <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground">
            <FiClock className="size-4 text-primary" />

            <span className="tabular-nums">
              {now.toLocaleDateString(undefined, {
                weekday: "short",
                day: "2-digit",
                month: "short",
              })}
            </span>

            <span className="h-3.5 w-px bg-border" />

            <span className="tabular-nums font-medium text-foreground/80">
              {now.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>
        )}

        <div className="hidden lg:block">
          <ModeToggle />
        </div>
      </div>
    </section>
  );
};

export default DashboardHeader;
import React from "react";
import { FiMapPin, FiZap } from "react-icons/fi";

type PageHeaderProps = {
  badgeText: string;
  title: React.ReactNode;
  description: string;
};

const PageHeader = ({ badgeText, title, description }: PageHeaderProps) => {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card/65 shadow-lg shadow-primary/[0.04] backdrop-blur-xl">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-180px] h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <div className="absolute right-[-120px] top-16 h-72 w-72 rounded-full bg-primary/6 blur-[100px]" />

        <div className="absolute left-[-140px] top-40 h-64 w-64 rounded-full bg-primary/5 blur-[100px]" />

        <div
          className="absolute inset-x-0 top-0 h-[320px] opacity-[0.03] dark:opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "38px 38px",
          }}
        />
      </div>

      {/* Decorative top line */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />

      {/* Decorative power line */}
      <div className="pointer-events-none absolute right-10 top-1/2 hidden -translate-y-1/2 opacity-40 lg:block">
        <div className="flex items-center gap-2">
          <span className="h-px w-16 bg-primary/20" />
          <span className="size-2 rounded-full bg-primary/40" />
          <span className="h-px w-10 bg-primary/20" />
          <span className="size-1.5 rounded-full bg-primary/30" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-11">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-2 text-xs font-semibold text-primary shadow-sm">
            <span className="flex size-6 items-center justify-center rounded-full bg-primary/10">
              <FiMapPin className="size-3.5" />
            </span>

            {badgeText}
          </div>

          {/* Title */}
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="mt-1 hidden shrink-0 rounded-2xl border border-primary/15 bg-primary/10 p-3 text-primary shadow-sm sm:flex">
              <FiZap className="size-5.5" />
            </div>

            <div>
              <h1 className="font-manrope text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.9rem]">
                {title}
              </h1>

              <p className="mt-3 max-w-2xl font-inter text-sm leading-7 text-muted-foreground sm:mt-4 sm:text-base">
                {description}
              </p>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="mt-7 flex items-center gap-2.5">
            <div className="h-1 w-12 rounded-full bg-primary" />
            <div className="h-1 w-6 rounded-full bg-primary/30" />
            <div className="h-1 w-2 rounded-full bg-primary/15" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;

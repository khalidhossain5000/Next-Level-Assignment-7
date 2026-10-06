"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion } from "motion/react";

type HomeSectionHeaderProps = {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  children: ReactNode;
};

const HomeSectionHeader = ({
  badge,
  title,
  highlight,
  description,
  children,
}: HomeSectionHeaderProps) => {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative isolate w-full overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />

        {/* Glow top center */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-32 -z-10 mx-auto h-72 w-[min(60rem,90%)] rounded-full bg-primary/15 blur-3xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Glow bottom right */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-24 -z-10 size-96 rounded-full bg-chart-2/15 blur-3xl"
          animate={{ opacity: [1, 0.5, 1], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Glow left */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-1/2 -z-10 size-96 rounded-full bg-chart-4/10 blur-3xl"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Top hairline */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"
        />

        {/* Centered content */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto mb-10 max-w-3xl text-center lg:mb-14"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              {badge}
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {title}{" "}
              <span className="bg-linear-to-r from-primary to-chart-3 bg-clip-text text-transparent">
                {highlight}
              </span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              {description}
            </p>
          </motion.div>

          {children}
        </div>
      </section>
    </MotionConfig>
  );
};

export default HomeSectionHeader;
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Zap, AlertTriangle, Activity } from "lucide-react";

const ReportOutageCta = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background py-16 sm:py-20 lg:py-28">
      {/* === ANIMATED BACKGROUND GLOWS === */}
      <motion.div
        aria-hidden
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.75, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-40 top-1/2 -z-10 h-130 w-130 -translate-y-1/2 rounded-full bg-primary/25 blur-[120px]"
      />
      <motion.div
        aria-hidden
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="pointer-events-none absolute -right-40 top-1/3 -z-10 h-140 w-140 rounded-full bg-primary/30 blur-[130px]"
      />
      <motion.div
        aria-hidden
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/3 bottom-0 -z-10 h-100 w-100 rounded-full bg-primary/20 blur-[110px]"
      />

      {/* Grid overlay with radial mask */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,--theme(--color-border/40%)_1px,transparent_1px),linear-gradient(to_bottom,--theme(--color-border/40%)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_at_center,black_25%,transparent_75%)]"
      />

      {/* Floating sparkles / dots */}
      <FloatingSparkles />

      {/* === CONTENT === */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* LEFT — Text content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm sm:text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Live outage reporting
            <span className="absolute inset-0 -z-10 rounded-full bg-primary/10 blur-md" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="mt-6 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Experiencing a{" "}
            <span className="relative inline-block">
              <span className="bg-linear-to-r from-primary via-primary to-primary/50 bg-clip-text text-transparent">
                power outage?
              </span>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="absolute -bottom-1 left-0 h-0.75 w-full origin-left rounded-full bg-linear-to-r from-primary to-transparent"
              />
            </span>{" "}
            Let us know right away.
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
            className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            Report an outage in seconds and help our team restore power faster.
            Your report keeps the whole community informed and our grid resilient.
          </motion.p>

          {/* Feature bullets */}
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.28, ease: "easeOut" }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground lg:justify-start"
          >
            {["Real-time tracking", "Instant alerts", "Community-wide"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_2px] shadow-primary/50" />
                {item}
              </li>
            ))}
          </motion.ul>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.36, ease: "easeOut" }}
            className="mt-8 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
          >
            <div className="relative group w-full sm:w-auto">
              {/* Animated glow ring behind button */}
              <motion.span
                aria-hidden
                animate={{
                  opacity: [0.5, 0.9, 0.5],
                  scale: [1, 1.06, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-1 -z-10 rounded-2xl bg-linear-to-r from-primary/60 via-primary/40 to-primary/60 blur-lg"
              />
              <Link
                href="/dashboard/reportoutage"
                className="relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto sm:text-base"
              >
                {/* Shimmer sweep */}
                <motion.span
                  aria-hidden
                  initial={{ x: "-120%" }}
                  animate={{ x: "220%" }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                  className="absolute inset-y-0 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/40 to-transparent"
                />
                <Zap className="relative h-4 w-4" />
                <span className="relative">Report an Outage</span>
                <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* Footnote */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-4 text-xs text-muted-foreground sm:text-sm"
          >
            Takes less than 30 seconds · No account required
          </motion.p>
        </div>

        {/* RIGHT — Animated visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center lg:max-w-lg"
        >
          {/* Pulsing concentric rings */}
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              aria-hidden
              animate={{
                scale: [0.6, 1.15],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.85,
              }}
              className="absolute h-full w-full rounded-full border border-primary/50"
            />
          ))}

          {/* Static subtle ring */}
          <div className="absolute h-[85%] w-[85%] rounded-full border border-primary/20" />
          <div className="absolute h-[62%] w-[62%] rounded-full border border-primary/15" />

          {/* Rotating dashed ring */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute h-[75%] w-[75%] rounded-full border border-dashed border-primary/30"
          />

          {/* Orbiting dot */}
          <motion.div
            aria-hidden
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute h-[75%] w-[75%]"
          >
            <span className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_16px_4px] shadow-primary/60" />
          </motion.div>

          {/* Center glowing core */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              boxShadow: [
                "0 0 40px 10px rgba(99,102,241,0.35)",
                "0 0 80px 20px rgba(99,102,241,0.55)",
                "0 0 40px 10px rgba(99,102,241,0.35)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full border border-primary/40 bg-linear-to-br from-primary/20 to-primary/5 backdrop-blur-md sm:h-40 sm:w-40"
          >
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="h-14 w-14 text-primary sm:h-16 sm:w-16" strokeWidth={1.5} />
            </motion.div>
          </motion.div>

          {/* Floating stat cards */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute -left-2 top-8 z-20 sm:left-0 lg:-left-4"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-3 py-2 shadow-lg shadow-primary/10 backdrop-blur-md"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15">
                <Activity className="h-3.5 w-3.5 text-primary" />
              </span>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Grid status</p>
                <p className="text-xs font-semibold text-foreground">Monitoring</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20, y: -20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="absolute -right-2 bottom-10 z-20 sm:right-0 lg:-right-4"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-3 py-2 shadow-lg shadow-primary/10 backdrop-blur-md"
            >
              <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-destructive/15">
                <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 animate-pulse rounded-full bg-destructive" />
              </span>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">New reports</p>
                <p className="text-xs font-semibold text-foreground">+12 in 5 min</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* Decorative floating sparkles */
function FloatingSparkles() {
  const sparkles = Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    left: `${(i * 37) % 100}%`,
    top: `${(i * 53) % 100}%`,
    size: 2 + (i % 3),
    delay: (i % 6) * 0.6,
    duration: 6 + (i % 5),
  }));

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], y: [0, -40, -80] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
          }}
          className="absolute rounded-full bg-primary shadow-[0_0_8px_2px] shadow-primary/60"
        />
      ))}
    </div>
  );
}

export default ReportOutageCta;
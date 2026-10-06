"use client";

import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  RadioTower,
  Wrench,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

import HomeSectionHeader from "@/components/layout/shared/home-section-header/HomeSectionHeader";

const workflowSteps = [
  {
    step: "01",
    title: "Monitor",
    description:
      "Monitor power zones, substations, feeders, and infrastructure status from one centralized system.",
    icon: RadioTower,
    accent: "text-primary",
    iconBg: "bg-primary/10",
    border: "border-primary/15",
    glow: "bg-primary/15",
    line: "from-primary/60",
  },
  {
    step: "02",
    title: "Schedule",
    description:
      "Plan load shedding and maintenance events with clear timing and area-based scheduling.",
    icon: CalendarClock,
    accent: "text-[#f9a300]",
    iconBg: "bg-[#f9a300]/10",
    border: "border-[#f9a300]/20",
    glow: "bg-[#f9a300]/15",
    line: "from-[#f9a300]/60",
  },
  {
    step: "03",
    title: "Report",
    description:
      "Report unexpected outages and power issues so the right team can identify and respond quickly.",
    icon: AlertTriangle,
    accent: "text-[#009689]",
    iconBg: "bg-[#009689]/10",
    border: "border-[#009689]/20",
    glow: "bg-[#009689]/15",
    line: "from-[#009689]/60",
  },
  {
    step: "04",
    title: "Resolve",
    description:
      "Technicians receive assignments, work on incidents, and restore reliable power service efficiently.",
    icon: Wrench,
    accent: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "bg-emerald-500/15",
    line: "from-emerald-500/60",
  },
];

const HowWeWorks = () => {
  return (
    <HomeSectionHeader
      badge="How PowerPulse Works"
      title="From power monitoring to"
      highlight="faster resolution"
      description="PowerPulse brings infrastructure monitoring, outage management, scheduling, and technician coordination into one connected workflow."
      containerClassName="py-16 sm:py-20 lg:py-24"
    >
      <div className="relative mx-auto max-w-6xl">
        {/* Background ambient glow */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"
          animate={{
            opacity: [0.35, 0.7, 0.35],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Workflow connector */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-10 hidden h-[calc(100%-5rem)] w-px -translate-x-1/2 bg-linear-to-b from-primary/20 via-[#009689]/30 to-transparent lg:block"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {workflowSteps.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.step}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 28,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.55,
                      ease: "easeOut",
                    },
                  },
                }}
                className="group relative"
              >
                {/* Connector dot */}
                <div
                  aria-hidden
                  className="absolute left-1/2 top-8 z-20 hidden size-3 -translate-x-1/2 rounded-full border-2 border-background bg-primary shadow-[0_0_0_5px_color-mix(in_oklab,var(--primary)_10%,transparent),0_0_18px_color-mix(in_oklab,var(--primary)_40%,transparent)] lg:block"
                />

                <div
                  className={`relative overflow-hidden rounded-2xl border ${item.border} bg-card/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                >
                  {/* Card glow */}
                  <motion.div
                    aria-hidden
                    className={`pointer-events-none absolute -right-14 -top-14 size-36 rounded-full ${item.glow} blur-3xl`}
                    animate={{
                      opacity: [0.45, 0.8, 0.45],
                      scale: [1, 1.12, 1],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.4,
                    }}
                  />

                  {/* Top accent */}
                  <div
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-px bg-linear-to-r ${item.line} to-transparent`}
                  />

                  <div className="relative">
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`flex size-12 items-center justify-center rounded-xl ${item.iconBg} ${item.accent} transition-transform duration-300 group-hover:scale-105`}
                      >
                        <Icon className="size-5" />
                      </div>

                      <span
                        className={`text-4xl font-black leading-none tracking-tight ${item.accent} opacity-10 transition-opacity duration-300 group-hover:opacity-20`}
                      >
                        {item.step}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="mt-6">
                      <div className="flex items-center gap-2">
                        <span
                          className={`size-1.5 rounded-full ${item.iconBg.replace(
                            "bg-",
                            "bg-"
                          )}`}
                        />

                        <span
                          className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${item.accent}`}
                        >
                          Step {item.step}
                        </span>
                      </div>

                      <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground">
                        {item.title}
                      </h3>

                      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom feature line */}
                    <div className="mt-6 flex items-center gap-2">
                      <div
                        className={`h-1.5 w-9 rounded-full bg-linear-to-r ${item.line} to-transparent`}
                      />

                      <div className="h-px flex-1 bg-border/70" />

                      <CheckCircle2
                        className={`size-4 ${item.accent} opacity-60 transition-opacity duration-300 group-hover:opacity-100`}
                      />
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom workflow statement */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.55,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="relative mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-primary/10 bg-card/70 px-5 py-4 text-center backdrop-blur-sm sm:px-6"
        >
          {/* Tiny glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
          />

          <div className="relative flex flex-col items-center justify-center gap-2 sm:flex-row">
            <div className="flex items-center gap-2">
              <Zap className="size-4 text-[#f9a300]" />

              <span className="text-sm font-semibold text-foreground">
                One connected workflow
              </span>
            </div>

            <span className="hidden text-muted-foreground sm:inline">•</span>

            <span className="text-sm text-muted-foreground">
              Monitor smarter. Respond faster. Keep power reliable.
            </span>
          </div>
        </motion.div>
      </div>
    </HomeSectionHeader>
  );
};

export default HowWeWorks;

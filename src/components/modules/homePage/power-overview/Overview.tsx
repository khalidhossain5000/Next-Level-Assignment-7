"use client";

import { useEffect, useState } from "react";
import { CalendarClock, MapPinned, ShieldCheck, Zap } from "lucide-react";
import {
  MotionConfig,
  animate,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";

import HomeCardSkeleton from "@/components/loader/skleton-loading/others/home-card.skeleton";
import {
  useGetAllZone,
  useGetLoadSheddingSchedule,
  useGetPlannedOutage,
  useGetTechnicianCount,
} from "@/hooks";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Overview = () => {
  const { data: zone, isPending: zonePending } = useGetAllZone();

  const { data: loadShedding, isPending: loadSheddingPending } =
    useGetLoadSheddingSchedule();

  const { data: plannedOutage, isPending: plannedOutagePending } =
    useGetPlannedOutage();

  const { data: technicianCount, isPending: technicianCountPending } =
    useGetTechnicianCount();

  const shouldReduceMotion = useReducedMotion();
  const [hasEntered, setHasEntered] = useState(false);
  const [progress, setProgress] = useState(0);

 //count up
  useEffect(() => {
    if (!hasEntered || shouldReduceMotion) return;

    const controls = animate(0, 1, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (latest) => setProgress(latest),
    });

    return () => controls.stop();
  }, [hasEntered, shouldReduceMotion]);

  if (
    zonePending ||
    loadSheddingPending ||
    plannedOutagePending ||
    technicianCountPending
  ) {
    return <HomeCardSkeleton length={4} />;
  }

  const zoneCount = zone?.data?.length || 0;
  const loadSheddingCount = loadShedding?.data?.data?.length || 0;
  const plannedOutageCount = plannedOutage?.data?.data?.length || 0;
  const technicianCountValue = Number(technicianCount?.data) || 0;

  const displayProgress = shouldReduceMotion ? 1 : progress;

  const overviewItems = [
    {
      title: "Power Zones",
      value: zoneCount,
      description: "Distribution zones monitored across the network",
      icon: MapPinned,
      iconClass: "bg-primary/10 text-primary ring-primary/20",
      wash: "from-primary/10",
      glow: "bg-primary/25",
      line: "from-primary to-primary/0",
      dot: "bg-primary",
    },
    {
      title: "Load Shedding",
      value: loadSheddingCount,
      description: "Scheduled supply-shortage events",
      icon: Zap,
      iconClass: "bg-chart-2/10 text-chart-2 ring-chart-2/20",
      wash: "from-chart-2/10",
      glow: "bg-chart-2/25",
      line: "from-chart-2 to-chart-2/0",
      dot: "bg-chart-2",
    },
    {
      title: "Planned Outages",
      value: plannedOutageCount,
      description: "Upcoming maintenance windows",
      icon: CalendarClock,
      iconClass: "bg-chart-3/10 text-chart-3 ring-chart-3/20",
      wash: "from-chart-3/10",
      glow: "bg-chart-3/25",
      line: "from-chart-3 to-chart-3/0",
      dot: "bg-chart-3",
    },
    {
      title: "Technicians",
      value: technicianCountValue,
      description: "Service professionals ready to respond",
      icon: ShieldCheck,
      iconClass: "bg-chart-4/10 text-chart-4 ring-chart-4/20",
      wash: "from-chart-4/10",
      glow: "bg-chart-4/25",
      line: "from-chart-4 to-chart-4/0",
      dot: "bg-chart-4",
    },
  ];

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
              Platform Overview
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              PowerPulse{" "}
              <span className="bg-linear-to-r from-primary to-chart-3 bg-clip-text text-transparent">
                by the numbers
              </span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              Live data from across the network: the power zones we monitor,
              upcoming load shedding and planned outages, and the technicians
              available to restore your service.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            onViewportEnter={() => setHasEntered(true)}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4"
          >
            {overviewItems.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-primary/40"
                >
                  {/* Top color wash */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b to-transparent ${item.wash}`}
                  />

                  {/* Hover glow */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -right-10 -top-10 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${item.glow}`}
                  />

                  <div className="relative">
                    {/* Icon + live dot */}
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex size-12 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110 ${item.iconClass}`}
                      >
                        <Icon className="size-5" />
                      </div>

                      <span className="relative flex size-2">
                        <span
                          className={`absolute inline-flex size-full animate-ping rounded-full opacity-60 ${item.dot}`}
                        />
                        <span
                          className={`relative inline-flex size-2 rounded-full ${item.dot}`}
                        />
                      </span>
                    </div>

                    {/* Value */}
                    <p className="mt-8 text-4xl font-bold tracking-tight text-foreground tabular-nums sm:text-5xl">
                      {Math.round(item.value * displayProgress)}
                    </p>

                    <h3 className="mt-2 text-sm font-semibold text-foreground">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                      {item.description}
                    </p>

                    {/* Bottom accent */}
                    <div
                      className={`mt-6 h-0.5 w-10 rounded-full bg-linear-to-r transition-all duration-500 group-hover:w-full ${item.line}`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default Overview;

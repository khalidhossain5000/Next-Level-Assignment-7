"use client";

import {
  CalendarClock,
  CheckCircle2,
  MapPinned,
  ShieldCheck,
  UsersRound,
  Zap,
} from "lucide-react";

import HomeCardSkeleton from "@/components/loader/skleton-loading/others/home-card.skeleton";
import {
  useGetAllZone,
  useGetLoadSheddingSchedule,
  useGetPlannedOutage,
  useGetTechnicianCount,
} from "@/hooks";

const Overview = () => {
  const { data: zone, isPending: zonePending } = useGetAllZone();

  const { data: loadShedding, isPending: loadSheddingPending } =
    useGetLoadSheddingSchedule();

  const { data: plannedOutage, isPending: plannedOutagePending } =
    useGetPlannedOutage();

  const { data: technicianCount, isPending: technicianCountPending } =
    useGetTechnicianCount();

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
  const technicianCountValue = technicianCount?.data || 0;

  const overviewItems = [
    {
      title: "Power Zones",
      value: zoneCount,
      description: "Active distribution zones",
      icon: MapPinned,
      iconColor: "text-primary",
      iconBg: "bg-primary/10",
      glow: "bg-primary/20",
      accent: "from-primary via-primary/60 to-transparent",
    },
    {
      title: "Load Shedding",
      value: loadSheddingCount,
      description: "Scheduled power events",
      icon: Zap,
      iconColor: "text-[#f9a300]",
      iconBg: "bg-[#f9a300]/10",
      glow: "bg-[#f9a300]/20",
      accent: "from-[#f9a300] via-[#f9a300]/60 to-transparent",
    },
    {
      title: "Planned Outages",
      value: plannedOutageCount,
      description: "Upcoming maintenance events",
      icon: CalendarClock,
      iconColor: "text-[#009689]",
      iconBg: "bg-[#009689]/10",
      glow: "bg-[#009689]/20",
      accent: "from-[#009689] via-[#009689]/60 to-transparent",
    },
    {
      title: "Technicians",
      value: technicianCountValue,
      description: "Available service professionals",
      icon: ShieldCheck,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-500/10",
      glow: "bg-emerald-500/15",
      accent: "from-emerald-500 via-emerald-500/50 to-transparent",
    },
  ];

  return (
    <section className="relative py-4 max-w-7xl mx-auto">
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-0 size-72 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-1/4 size-72 translate-x-1/2 rounded-full bg-[#009689]/5 blur-3xl"
      />

      <div className="relative">
        {/* Section Header */}
        <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <span className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
              System Overview
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              PowerPulse at a glance
            </h2>

            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
              A quick look at the power infrastructure, scheduled events, and
              service network.
            </p>
          </div>

          <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
            <CheckCircle2 className="size-4 text-emerald-500" />
            System monitored
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {overviewItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Card glow */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -right-12 -top-12 size-32 rounded-full ${item.glow} opacity-60 blur-3xl transition-all duration-300 group-hover:scale-125 group-hover:opacity-90`}
                />

                {/* Top accent */}
                <div
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-0.5 bg-linear-to-r ${item.accent}`}
                />

                <div className="relative">
                  {/* Icon + status */}
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex size-11 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor} transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Icon className="size-5" />
                    </div>

                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Live
                    </span>
                  </div>

                  {/* Value */}
                  <div className="mt-6">
                    <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      {item.value}
                    </p>

                    <h3 className="mt-1 text-sm font-semibold text-foreground">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <div className="mt-5 flex items-center gap-2">
                    <div
                      className={`h-1 w-8 rounded-full bg-linear-to-r ${item.accent}`}
                    />

                    <div className="h-px flex-1 bg-border/70" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom info strip */}
        <div className="mt-4 rounded-2xl border border-border/70 bg-card/70 px-4 py-3 backdrop-blur-sm sm:px-5">
          <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <UsersRound className="size-3.5 text-[#009689]" />
              <span>
                PowerPulse connects infrastructure data with service teams.
              </span>
            </div>

            <span className="font-medium text-foreground">
              Real-time overview
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;

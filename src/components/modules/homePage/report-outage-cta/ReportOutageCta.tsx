/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Activity, ArrowRight, BellRing, Users, Zap } from "lucide-react";
import { useGetMe } from "@/hooks";



type Phase = "powered" | "fault" | "report" | "restored";

const DURATION: Record<Phase, number> = {
  powered: 4200,
  fault: 2400,
  report: 2600,
  restored: 2200,
};
const NEXT: Record<Phase, Phase> = {
  powered: "fault",
  fault: "report",
  report: "restored",
  restored: "powered",
};
const STEPS: { id: Phase; label: string }[] = [
  { id: "powered", label: "Power on" },
  { id: "fault", label: "Outage" },
  { id: "report", label: "Reported" },
  { id: "restored", label: "Restored" },
];

// wire split in two halves at the fault point
const SEG_A = "M100 130 Q160 165 218.75 183.75";
const SEG_B = "M218.75 183.75 Q277.5 202.5 335 205";
const FEED = "M0 152 Q22 138 40 130";

const flow = {
  animate: { strokeDashoffset: [0, -30] },
  transition: { duration: 0.9, repeat: Infinity, ease: "linear" as const },
};

const Orb = ({ path, begin }: { path: string; begin: string }) => (
  <circle
    r="3.5"
    className="fill-primary"
    style={{ filter: "drop-shadow(0 0 5px var(--color-primary))" }}
  >
    <animateMotion dur="2.2s" begin={begin} repeatCount="indefinite" path={path} />
  </circle>
);

const PowerLineScene = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("powered");

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setTimeout(() => setPhase(NEXT[phase]), DURATION[phase]);
    return () => clearTimeout(id);
  }, [phase, inView, reduce]);

  const powered = phase === "powered" || phase === "restored";

  const windowAnim = {
    powered: { opacity: 1 },
    fault: { opacity: [1, 0.15, 0.9, 0.1, 0.5, 0], transition: { duration: 1.1 } },
    report: { opacity: 0.05 },
    restored: { opacity: [0.05, 1, 0.3, 1, 0.7, 1], transition: { duration: 0.9 } },
  }[phase];

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card/50 shadow-2xl shadow-primary/10 backdrop-blur-sm sm:max-w-lg lg:max-w-none"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent"
      />

      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        role="img"
        aria-label="Power line cycling through outage, report and restore"
      >
        <defs>
          <radialGradient id="house-glow">
            <stop offset="0%" style={{ stopColor: "var(--color-primary)", stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: "var(--color-primary)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        {/* ground */}
        <line x1="20" y1="330" x2="380" y2="330" className="stroke-border" strokeWidth="2" />

        {/* tower */}
        <g className="stroke-foreground/45" strokeWidth="2.5">
          <path d="M50 330 L70 110 L90 330" />
          <path d="M56 270 L84 270 M60 220 L80 220 M64 170 L76 170" />
          <path d="M56 270 L80 220 M84 270 L60 220 M60 220 L76 170 M80 220 L64 170" strokeWidth="1.5" />
          <path d="M40 130 L100 130" />
          <circle cx="40" cy="130" r="3" className="fill-card" />
          <circle cx="100" cy="130" r="3" className="fill-card" />
        </g>

        {/* wires  */}
        <g className="stroke-foreground/30" strokeWidth="2.5">
          <path d={FEED} />
          <path d={SEG_A} />
          <path d={SEG_B} />
        </g>

        {/* energy flowing along the wires */}
        <g className="stroke-primary" strokeWidth="3" strokeDasharray="3 12">
          <motion.path d={FEED} {...flow} />
          <motion.path d={SEG_A} {...flow} />
        </g>
        <motion.g
          animate={{ opacity: powered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="stroke-primary"
          strokeWidth="3"
          strokeDasharray="3 12"
        >
          <motion.path d={SEG_B} {...flow} />
        </motion.g>

        {/* energy orbs */}
        <Orb path={SEG_A} begin="0s" />
        <Orb path={SEG_A} begin="1.1s" />
        <motion.g animate={{ opacity: powered ? 1 : 0 }} transition={{ duration: 0.4 }}>
          <Orb path={SEG_B} begin="0s" />
          <Orb path={SEG_B} begin="1.1s" />
        </motion.g>

        {/* house glow */}
        <motion.circle
          cx="335"
          cy="290"
          r="125"
          fill="url(#house-glow)"
          animate={{ opacity: powered ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* house */}
        <g className="stroke-foreground/45" strokeWidth="2.5">
          <rect x="290" y="250" width="90" height="80" className="fill-card" />
          <path d="M280 252 L335 205 L390 252" className="fill-card" />
          <rect x="313" y="272" width="44" height="36" rx="4" className="fill-muted" strokeWidth="1.5" />
        </g>
        <motion.rect
          x="313"
          y="272"
          width="44"
          height="36"
          rx="4"
          className="fill-primary"
          style={{ filter: "drop-shadow(0 0 10px var(--color-primary))" }}
          animate={windowAnim}
        />

        {/* outage spark at the fault point */}
        {phase === "fault" && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.2, 1, 0.4, 1, 0.3, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          >
            <circle cx="219" cy="184" r="20" className="fill-destructive/25" />
            <path
              d="M212 162 L222 177 L213 181 L227 202"
              className="stroke-destructive"
              strokeWidth="3"
            />
          </motion.g>
        )}

        {/* report ripples from the house */}
        {phase === "report" &&
          [0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx="335"
              cy="290"
              r="16"
              className="stroke-primary"
              strokeWidth="2"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              initial={{ scale: 0.2, opacity: 0.8 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
            />
          ))}
      </svg>

      {/* progress steps */}
      <div className="absolute inset-x-4 bottom-4 grid grid-cols-4 gap-2 sm:inset-x-6 sm:bottom-6 sm:gap-3">
        {STEPS.map((s) => {
          const active = s.id === phase;
          const bad = active && s.id === "fault";
          return (
            <div key={s.id} className="flex flex-col gap-2">
              <span
                className={`h-1 rounded-full transition-colors duration-300 ${active ? (bad ? "bg-destructive" : "bg-primary") : "bg-border"
                  }`}
              />
              <span
                className={`text-[11px] font-medium transition-colors duration-300 sm:text-xs ${active ? (bad ? "text-destructive" : "text-foreground") : "text-muted-foreground"
                  }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// headline reveal part by part

const Words = ({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) => (
  <span className={className}>
    {text.split(" ").map((word, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
        className="mr-[0.25em] inline-block last:mr-0"
      >
        {word}
      </motion.span>
    ))}
  </span>
);



const ReportOutageCta = () => {
  const { data, isPending } = useGetMe()
  const user = data?.data
  return (
    <section className="relative w-full overflow-hidden bg-background py-16 sm:py-20 lg:py-28">
      {/* full-width glow background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-primary/5 via-transparent to-primary/10"
      />
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-32 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-primary/25 blur-[120px]"
      />
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="pointer-events-none absolute -right-32 top-1/3 -z-10 h-[36rem] w-[36rem] rounded-full bg-primary/30 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,--theme(--color-border/40%)_1px,transparent_1px),linear-gradient(to_bottom,--theme(--color-border/40%)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_at_center,black_25%,transparent_75%)]"
      />

      {/* content */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* LEFT */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm sm:text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Live outage reporting
          </motion.div>

          <h2 className="mt-6 max-w-2xl text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl xl:text-6xl">
            <Words text="Experiencing a power outage?" delay={0.15} />
            <br />
            <Words text="Let us know right away." delay={0.55} className="text-muted-foreground" />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.9 }}
            className="mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg"
          >
            Report an outage in seconds and help our team restore power faster.
            Your report keeps the whole community informed and our grid resilient.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 1 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground lg:justify-start"
          >
            {[
              { icon: Activity, label: "Real-time tracking" },
              { icon: BellRing, label: "Instant alerts" },
              { icon: Users, label: "Community-wide" },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 1.1 }}
            className="group relative mt-8 w-full sm:w-auto"
          >
            <motion.span
              aria-hidden
              animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-1 -z-10 rounded-2xl bg-linear-to-r from-primary/60 via-primary/40 to-primary/60 blur-lg"
            />
            <Link
              href={user ? "/customer/report-outage" : "/login"}

            >
              <button 
                disabled={isPending}
                type="button"
                className="cursor-pointer relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto disabled:bg-slate-500">
                <span
                  aria-hidden
                  className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[420%]"
                />
                <Zap className="relative h-5 w-5" />
                {
                  user ? <span className="relative">Report an Outage</span> : <span className="relative">Login To Report Outage</span>
                }
                <ArrowRight className="relative h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>


          </motion.div>

          <p className="mt-4 text-xs text-muted-foreground sm:text-sm ">
            Takes less than 60 seconds.
          </p>
        </div>

        {/* RIGHT */}
        <PowerLineScene />
      </div>
    </section>
  );
};

export default ReportOutageCta;
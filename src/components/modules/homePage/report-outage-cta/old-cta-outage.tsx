"use client";

import Link from "next/link";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { ArrowRight, Zap, Activity, BellRing, Users } from "lucide-react";



type GridHandle = { pulse: (clientX: number, clientY: number) => void };

type Zone = {
  x: number;
  y: number;
  r: number;
  age: number;
  restoreAt: number; 
  restoredAge: number | null;
};
type Pulse = { x: number; y: number; r: number; max: number };

const SPACING = 26;

const PowerGrid = forwardRef<GridHandle>(function PowerGrid(_, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const primaryProbe = useRef<HTMLSpanElement>(null);
  const mutedProbe = useRef<HTMLSpanElement>(null);
  const spawnRef = useRef<(x: number, y: number) => void>(() => {});
  const reduce = useReducedMotion();

  useImperativeHandle(ref, () => ({
    pulse: (cx, cy) => {
      const c = canvasRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      spawnRef.current(cx - rect.left, cy - rect.top);
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let sinceZone = 2.2; // first blackout comes quickly
    let frame = 0;
    let primary = "#6366f1";
    let muted = "#888";

    const zones: Zone[] = [];
    const pulses: Pulse[] = [];
    const mouse = { x: -999, y: -999, on: false };

    const readColors = () => {
      if (primaryProbe.current)
        primary = getComputedStyle(primaryProbe.current).color || primary;
      if (mutedProbe.current)
        muted = getComputedStyle(mutedProbe.current).color || muted;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    spawnRef.current = (x, y) => {
      pulses.push({ x, y, r: 0, max: Math.hypot(w, h) * 0.75 });
      // a restore wave heals every active blackout zone
      zones.forEach((z) => {
        if (z.restoredAge === null) z.restoredAge = 0;
      });
    };

    const draw = (t: number, dt: number) => {
      ctx.clearRect(0, 0, w, h);
      frame++;
      if (frame % 45 === 0) readColors();

      // --- simulate ---
      sinceZone += dt;
      if (sinceZone > 5 && zones.length < 2) {
        sinceZone = 0;
        zones.push({
          x: w * (0.1 + Math.random() * 0.8),
          y: h * (0.15 + Math.random() * 0.7),
          r: 120 + Math.random() * 90,
          age: 0,
          restoreAt: 2.6,
          restoredAge: null,
        });
      }
      for (let i = zones.length - 1; i >= 0; i--) {
        const z = zones[i];
        z.age += dt;
        if (z.restoredAge === null && z.age > z.restoreAt) {
          z.restoredAge = 0;
          pulses.push({ x: z.x, y: z.y, r: 0, max: z.r * 2.2 });
        }
        if (z.restoredAge !== null) z.restoredAge += dt;
        if (z.restoredAge !== null && z.restoredAge > 0.9) zones.splice(i, 1);
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].r += 420 * dt;
        if (pulses[i].r > pulses[i].max) pulses.splice(i, 1);
      }

      // --- draw nodes ---
      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      const offX = (w - (cols - 1) * SPACING) / 2;
      const offY = (h - (rows - 1) * SPACING) / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = offX + i * SPACING;
          const y = offY + j * SPACING;

          // cursor spotlight
          let b = 0.12;
          if (mouse.on) {
            const d = Math.hypot(x - mouse.x, y - mouse.y);
            const s = Math.max(0, 1 - d / 170);
            b += s * s * 0.85;
          }
          // restore waves
          for (const p of pulses) {
            const d = Math.hypot(x - p.x, y - p.y);
            const ring = Math.max(0, 1 - Math.abs(d - p.r) / 46);
            b += ring * ring * (1 - p.r / p.max) * 1.1;
          }
          // blackout zones
          let dark = 0;
          for (const z of zones) {
            const d = Math.hypot(x - z.x, y - z.y);
            if (d > z.r) continue;
            let strength = Math.min(1, z.age / 0.35);
            if (z.restoredAge !== null)
              strength *= Math.max(0, 1 - z.restoredAge / 0.7);
            const flicker =
              0.8 + 0.2 * Math.sin(t * 0.03 + i * 12.9 + j * 78.2);
            dark = Math.max(dark, (1 - d / z.r) ** 0.6 * strength * flicker);
          }

          b = Math.min(1, b) * (1 - dark);

          // resting dot
          ctx.globalAlpha = 0.35 * (1 - dark * 0.9);
          ctx.fillStyle = muted;
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();

          // powered dot
          if (b > 0.18) {
            ctx.globalAlpha = Math.min(1, b);
            ctx.fillStyle = primary;
            ctx.beginPath();
            ctx.arc(x, y, 1 + b * 2.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (visible) draw(now, dt);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.on = true;
    };
    const onLeave = () => (mouse.on = false);

    resize();
    readColors();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(host);

    if (reduce) {
      draw(0, 0); // single static frame
    } else {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  return (
    <>
      <span ref={primaryProbe} className="hidden text-primary" aria-hidden />
      <span
        ref={mutedProbe}
        className="hidden text-muted-foreground"
        aria-hidden
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
      />
    </>
  );
});

/* ------------------------------------------------------------------ */
/*  Word-by-word headline reveal                                       */
/* ------------------------------------------------------------------ */

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
        initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          duration: 0.6,
          delay: delay + i * 0.07,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mr-[0.25em] inline-block last:mr-0"
      >
        {word}
      </motion.span>
    ))}
  </span>
);



const ReportOutageCtaOld = () => {
  const grid = useRef<GridHandle>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  // magnetic button
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 16, mass: 0.4 });

  const firePulse = () => {
    const r = btnRef.current?.getBoundingClientRect();
    if (r) grid.current?.pulse(r.left + r.width / 2, r.top + r.height / 2);
  };

  return (
    <section className="relative w-full bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-border bg-card"
      >
        {/* living power grid */}
        <PowerGrid ref={grid} />

        {/* keeps the text area calm so copy stays readable */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_50%_50%,var(--color-card)_20%,transparent_100%)]"
        />
        {/* soft primary light from above */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[70%] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]"
        />
        {/* top edge highlight */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent"
        />

        {/* content */}
        <div className="relative z-10 flex flex-col items-center px-6 py-16 text-center sm:px-10 sm:py-20 lg:py-24">
          {/* the one flicker: a bolt that stutters on like a failing bulb */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 1, 0.1, 1, 0.25, 1, 0.5, 1] }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              times: [0, 0.1, 0.2, 0.35, 0.45, 0.6, 0.7, 1],
            }}
            className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 shadow-[0_0_40px_-4px] shadow-primary/50"
          >
            <Zap className="h-6 w-6 text-primary" strokeWidth={1.75} />
          </motion.div>

          <h2 className="mt-8 max-w-3xl text-balance text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            <Words text="Experiencing a power outage?" delay={0.5} />
            <br />
            <Words
              text="Let us know right away."
              delay={0.9}
              className="text-muted-foreground"
            />
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg"
          >
            Report an outage in seconds and help our team restore power faster.
            Your report keeps the whole community informed.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="mt-10"
          >
            <motion.div
              style={{ x, y }}
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                mx.set((e.clientX - (r.left + r.width / 2)) * 0.25);
                my.set((e.clientY - (r.top + r.height / 2)) * 0.35);
              }}
              onPointerEnter={firePulse}
              onPointerLeave={() => {
                mx.set(0);
                my.set(0);
              }}
              className="group relative p-3"
            >
              {/* sonar rings */}
              {[0, 1].map((i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  animate={{ scale: [1, 1.5], opacity: [0.45, 0] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: i * 1.2,
                  }}
                  className="pointer-events-none absolute inset-3 rounded-xl border border-primary"
                />
              ))}

              <Link
                ref={btnRef}
                href="/dashboard/reportoutage"
                onClick={firePulse}
                className="relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {/* sheen on hover only */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[420%]"
                />
                <Zap className="relative h-5 w-5" />
                <span className="relative">Report an outage</span>
                <ArrowRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.9 }}
            className="mt-2 text-sm text-muted-foreground"
          >
            Takes less than 30 seconds. No account required.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 2.1 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
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
        </div>
      </motion.div>
    </section>
  );
};

export default ReportOutageCtaOld;

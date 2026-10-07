/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
/** biome-ignore-all lint/a11y/useSemanticElements: <explanation> */
"use client";

import { motion, useReducedMotion } from "motion/react";

/*
  Story: the lights are out -> the "POWER PULSE" sign flickers on letter by
  letter while a battery charges -> brief power cut -> repeat.
  One shared loop length keeps the sign, battery and room glow in sync.
*/

const LOOP = 3.6; // seconds
const WORDS = ["POWER", "PULSE"];
const CELLS = 10;

const loop = { duration: LOOP, repeat: Infinity, ease: "linear" as const };

const OFF = "0 0 0px var(--color-primary)";
const ON = "0 0 26px var(--color-primary)";

const Letter = ({
  ch,
  idx,
  accent,
  reduce,
}: {
  ch: string;
  idx: number;
  accent: boolean;
  reduce: boolean | null;
}) => {
  const t = 0.04 + idx * 0.035;
  return (
    <motion.span
      aria-hidden
      className={accent ? "text-primary" : "text-foreground"}
      initial={false}
      animate={
        reduce
          ? { opacity: 1, textShadow: ON }
          : {
              opacity: [0.12, 0.12, 1, 0.25, 1, 1, 1, 0.12, 0.12],
              textShadow: [OFF, OFF, ON, OFF, ON, ON, ON, OFF, OFF],
            }
      }
      transition={{
        ...loop,
        times: [0, t, t + 0.03, t + 0.06, t + 0.09, 0.82, 0.9, 0.96, 1],
      }}
    >
      {ch}
    </motion.span>
  );
};

const Cell = ({ i, reduce }: { i: number; reduce: boolean | null }) => {
  const t = 0.05 + i * 0.04;
  return (
    <motion.span
      aria-hidden
      className="h-3 w-3.5 rounded-xs bg-primary sm:h-3.5 sm:w-5"
      style={{ boxShadow: "0 0 10px var(--color-primary)" }}
      initial={false}
      animate={
        reduce
          ? { opacity: 1 }
          : { opacity: [0.12, 0.12, 1, 1, 0.12, 0.12] }
      }
      transition={{ ...loop, times: [0, t, t + 0.02, 0.88, 0.92, 1] }}
    />
  );
};

const GlobalPageLoading = () => {
  const reduce = useReducedMotion();
  let idx = 0;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-background px-6"
    >
      <span className="sr-only">Loading Power Pulse</span>

      {/* the room lights up with the sign */}
      <motion.div
        aria-hidden
        initial={false}
        animate={reduce ? { opacity: 0.6 } : { opacity: [0.1, 0.1, 0.65, 0.65, 0.1, 0.1] }}
        transition={{ ...loop, times: [0, 0.08, 0.45, 0.88, 0.92, 1] }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[90vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/35 blur-[110px]"
      />

      <div className="relative flex flex-col items-center text-center">
        {/* neon sign */}
        <h1
          aria-label="Power Pulse"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-4xl font-extrabold tracking-[0.12em] sm:gap-x-8 sm:text-6xl lg:text-7xl"
        >
          {WORDS.map((word, w) => (
            <span key={word} className="flex">
              {word.split("").map((ch) => (
                <Letter key={idx} ch={ch} idx={idx++} accent={w === 1} reduce={reduce} />
              ))}
            </span>
          ))}
        </h1>

        {/* battery charging */}
        <div className="mt-10 flex items-center sm:mt-12">
          <div className="flex gap-1 rounded-lg border border-border bg-card/60 p-1.5 backdrop-blur-sm sm:gap-1.5 sm:p-2">
            {Array.from({ length: CELLS }).map((_, i) => (
              <Cell key={i} i={i} reduce={reduce} />
            ))}
          </div>
          <span className="h-3 w-1 rounded-r-sm bg-border sm:h-4 sm:w-1.5" />
        </div>

        <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground sm:text-xs">
          Loading
        </p>
      </div>
    </div>
  );
};

export default GlobalPageLoading;
"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const STEPS = ["Talk", "Remember", "Understand", "Follow up", "Take initiative"];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const step = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Roadmap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <div className="rounded-2xl border border-[var(--rem-line)] bg-[var(--rem-panel)] p-3">
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex flex-wrap items-center justify-center gap-2 text-sm sm:flex-nowrap"
      >
        {STEPS.map((label, i) => (
          <motion.div key={label} variants={step} className="flex items-center gap-2">
            <span
              className={`whitespace-nowrap rounded-full px-3 py-2 font-medium ${
                i === 0
                  ? "bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300"
                  : "bg-[var(--rem-soft)] text-[var(--rem-muted)]"
              }`}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <span aria-hidden="true" className="text-[var(--rem-muted)]/50">
                →
              </span>
            )}
          </motion.div>
        ))}
      </motion.div>
      <p className="mt-3 text-center text-xs font-medium text-[var(--rem-muted)]">
        Current focus starts with natural conversation. The rest connects as Rem matures.
      </p>
    </div>
  );
}

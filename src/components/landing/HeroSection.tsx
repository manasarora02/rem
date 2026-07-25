"use client";

import { motion } from "motion/react";
import { WaitlistForm } from "@/components/landing/WaitlistForm";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export function HeroSection() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="visible"
      className="px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20 lg:px-12"
    >
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl flex-col items-center justify-center text-center">
        <div className="mx-auto max-w-3xl">
          <motion.p
            variants={item}
            className="text-sm font-medium uppercase tracking-[0.14em] text-[var(--rem-muted)]"
          >
            Your personal manager
          </motion.p>

          <h1 className="mx-auto mt-5 max-w-4xl text-balance text-[clamp(3rem,8vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-[var(--rem-ink)]">
            <span className="block">You have enough to think about.</span>
            <span className="block text-[var(--rem-muted)]">Let Rem remember the rest.</span>
          </h1>

          <motion.p
            variants={item}
            className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-8 text-[var(--rem-muted)] sm:text-xl"
          >
            Rem is your personal manager that remembers your commitments, follow-ups, and important
            details—and brings them back when they need your attention.
          </motion.p>

          <motion.div
            variants={item}
            className="mx-auto mt-10 w-full max-w-xl rounded-2xl border border-[var(--rem-line)] bg-[var(--rem-panel)] p-3"
          >
            <WaitlistForm id="early-access" />
          </motion.div>

          <motion.div variants={item} className="mt-7 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => scrollToId("demo")}
              className="group inline-flex w-fit items-center gap-2 rounded-full text-sm font-semibold text-[var(--rem-ink)] transition-colors hover:text-[var(--rem-accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--rem-accent)]"
            >
              See how Rem works
              <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">
                ↓
              </span>
            </button>

            <p className="flex items-center gap-2 text-sm text-[var(--rem-muted)]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--rem-accent)]" />
              Currently being built in public.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

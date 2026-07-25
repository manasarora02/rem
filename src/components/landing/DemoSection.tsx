"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ConversationDemo } from "@/components/landing/ConversationDemo";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export function DemoSection() {
  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true, amount: 0.3 });

  const closeRef = useRef(null);
  const closeInView = useInView(closeRef, { once: true, amount: 0.4 });

  return (
    <section
      id="demo"
      className="border-y border-[var(--rem-line)] bg-[var(--rem-paper-warm)] px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <motion.div
        ref={introRef}
        variants={container}
        initial="hidden"
        animate={introInView ? "visible" : "hidden"}
        className="mx-auto max-w-2xl text-center"
      >
        <motion.p variants={item} className="text-sm font-medium text-[var(--rem-muted)]">
          <span>&ldquo;I need to remember that.&rdquo;</span>{" "}
          <span aria-hidden="true" className="text-[var(--rem-muted)]/50">
            →
          </span>{" "}
          <span className="text-[var(--rem-accent-strong)]">&ldquo;I&apos;ll tell Rem.&rdquo;</span>
        </motion.p>
        <motion.h2
          variants={item}
          className="mt-4 text-balance text-[clamp(2rem,3vw+1.25rem,4rem)] font-semibold tracking-[-0.03em] text-[var(--rem-ink)]"
        >
          Just tell Rem.
        </motion.h2>
        <motion.p variants={item} className="mt-4 text-lg leading-8 text-[var(--rem-muted)]">
          No complicated system to maintain. Tell Rem what&apos;s happening naturally.
        </motion.p>
      </motion.div>

      <div className="mt-14">
        <ConversationDemo />
      </div>

      <motion.div
        ref={closeRef}
        initial={{ opacity: 0, y: 16 }}
        animate={closeInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-18 max-w-3xl text-center"
      >
        <p className="text-balance text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--rem-ink)]">
          No task created. No reminder configured. You just told Rem.
        </p>
        <p className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-8 text-[var(--rem-muted)]">
          Rem is being designed to understand what&apos;s happening, remember it, and bring it
          back when it matters.
        </p>
      </motion.div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { AssistantComparison } from "@/components/landing/AssistantComparison";
import { CorePrinciples } from "@/components/landing/CorePrinciples";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export function WhyRemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      id="why-rem"
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <motion.div variants={item} className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-end">
        <h2 className="max-w-2xl text-balance text-[clamp(2.2rem,4.5vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--rem-ink)]">
          Your brain shouldn&apos;t have to manage everything.
        </h2>
        <div className="max-w-xl text-lg leading-8 text-[var(--rem-muted)]">
          <p>
            Every day, dozens of small commitments pass through our heads. Things we need to do.
            People we need to contact. Things we&apos;re waiting for. Promises we&apos;ve made.
            Deadlines approaching.
          </p>
          <p className="mt-5">
            Most productivity tools give you another system to maintain.{" "}
            <span className="font-semibold text-[var(--rem-ink)]">
              Rem is being built to help carry that mental load with you.
            </span>
          </p>
        </div>
      </motion.div>

      <motion.div variants={item} className="mx-auto mt-20 max-w-5xl">
        <AssistantComparison />
      </motion.div>

      <motion.div variants={item} className="mx-auto mt-20 max-w-6xl">
        <CorePrinciples />
      </motion.div>
    </motion.section>
  );
}

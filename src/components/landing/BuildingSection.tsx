"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Roadmap } from "@/components/landing/Roadmap";
import { EarlyAccessCTA } from "@/components/landing/EarlyAccessCTA";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export function BuildingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      id="building-rem"
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-[var(--rem-paper-warm)] px-5 py-24 sm:px-8 sm:py-28 lg:px-12"
    >
      <motion.div variants={item} className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-[clamp(2rem,3vw+1.25rem,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--rem-ink)]">
          I&apos;m building the personal manager I always wanted.
        </h2>
        <p className="mt-6 text-lg leading-8 text-[var(--rem-muted)]">
          Rem is still early. Instead of trying to build everything at once, Rem is being
          developed one capability at a time. Each part is built, tested, refined, and then
          connected to the next.
        </p>
      </motion.div>

      <motion.div variants={item} className="mx-auto mt-14 max-w-2xl">
        <Roadmap />
      </motion.div>

      <motion.div variants={item}>
        <EarlyAccessCTA />
      </motion.div>
    </motion.section>
  );
}

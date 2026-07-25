"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ConversationMessage } from "@/components/landing/ConversationMessage";
import { MemoryContext } from "@/components/landing/MemoryContext";
import { TimeTransition } from "@/components/landing/TimeTransition";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.4 } },
};

const step = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

export function ConversationDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="mx-auto flex max-w-2xl flex-col gap-5 rounded-2xl border border-[var(--rem-line)] bg-[var(--rem-panel)] p-6 text-left sm:p-8"
    >
      <motion.div variants={step}>
        <ConversationMessage sender="user">
          I went to meet the client about the advance today. He wasn&apos;t available and said
          he&apos;d call me later.
        </ConversationMessage>
      </motion.div>

      <motion.div variants={step}>
        <ConversationMessage sender="rem">
          Got it. You&apos;re still waiting on the client about the advance. I&apos;ll keep that
          in mind.
        </ConversationMessage>
      </motion.div>

      <motion.div variants={step}>
        <MemoryContext label="Remembered" value="Client · advance pending" />
      </motion.div>

      <motion.div variants={step} className="py-1">
        <TimeTransition>2 days later</TimeTransition>
      </motion.div>

      <motion.div variants={step}>
        <ConversationMessage sender="rem" label="Rem · followed up" proactive>
          You still haven&apos;t heard back from the client about the advance. Given the
          communication delays, it might be worth following up today.
        </ConversationMessage>
      </motion.div>
    </motion.div>
  );
}

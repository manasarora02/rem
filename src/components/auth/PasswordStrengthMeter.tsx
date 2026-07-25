"use client";

import { motion } from "motion/react";
import {
  passwordBarLevel,
  passwordStrengthLabel,
  PASSWORD_MIN_LENGTH,
  type PasswordStrengthLabel,
} from "@/lib/validation";

const SEGMENT_COUNT = 4;

const TEXT_COLOR: Record<PasswordStrengthLabel, string> = {
  Weak: "text-rose-400",
  Fair: "text-amber-300",
  Strong: "text-sky-400",
  "Very Strong": "text-sky-300",
};

const BAR_COLOR: Record<PasswordStrengthLabel, string> = {
  Weak: "bg-rose-400",
  Fair: "bg-amber-300",
  Strong: "bg-sky-400",
  "Very Strong": "bg-sky-300",
};

export function PasswordStrengthMeter({ password }: { password: string }) {
  if (password.length === 0) return null;

  const label = passwordStrengthLabel(password);
  const level = passwordBarLevel(password);

  return (
    <div className="flex flex-col gap-2.5 pt-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-stone-300">Password strength</span>
        <motion.span
          key={label}
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`text-sm font-medium ${TEXT_COLOR[label]}`}
        >
          {label}
        </motion.span>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: SEGMENT_COUNT }, (_, i) => i + 1).map((segment) => (
          <div key={segment} className="h-1 flex-1 overflow-hidden rounded-full bg-stone-800">
            <motion.div
              className={`h-full rounded-full ${BAR_COLOR[label]} ${
                label === "Very Strong" ? "shadow-[0_0_8px_rgba(125,211,252,0.6)]" : ""
              }`}
              initial={false}
              animate={{ width: segment <= level ? "100%" : "0%" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: segment * 0.05 }}
            />
          </div>
        ))}
      </div>
      <p className="text-xs leading-relaxed text-stone-500">
        Use at least {PASSWORD_MIN_LENGTH} characters, combined with a mix of uppercase,
        lowercase, numbers, and symbols.
      </p>
    </div>
  );
}

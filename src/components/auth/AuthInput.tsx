"use client";

import { useId, useState } from "react";
import { motion } from "motion/react";

type AuthInputProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
};

export function AuthInput({
  label,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
}: AuthInputProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-stone-300 transition-colors"
      >
        {label}
      </label>
      <motion.input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        animate={error ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.35 }}
        className={`rounded-lg border bg-stone-900/60 px-4 py-2.5 text-stone-50 outline-none transition-colors duration-200 ${
          error
            ? "border-red-500"
            : focused
              ? "border-sky-400"
              : "border-stone-700"
        }`}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

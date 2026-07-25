"use client";

import { motion } from "motion/react";

export function SubmitButton({
  loading,
  disabled,
  children,
}: {
  loading: boolean;
  disabled?: boolean;
  children: string;
}) {
  const isDisabled = loading || disabled;

  return (
    <motion.button
      type="submit"
      disabled={isDisabled}
      whileHover={{ scale: isDisabled ? 1 : 1.01 }}
      whileTap={{ scale: isDisabled ? 1 : 0.98 }}
      className="flex w-full items-center justify-center rounded-lg bg-sky-400 px-4 py-2.5 font-medium text-stone-950 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
    >
      {loading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
          className="h-4 w-4 rounded-full border-2 border-stone-950/30 border-t-stone-950"
        />
      ) : (
        children
      )}
    </motion.button>
  );
}

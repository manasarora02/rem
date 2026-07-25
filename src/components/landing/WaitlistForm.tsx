"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { waitlistSchema } from "@/lib/waitlist";
import { createClient } from "@/lib/supabase/client";
import { useWaitlistStatus } from "@/components/landing/WaitlistStatusContext";

export function WaitlistForm({ id, className = "" }: { id?: string; className?: string }) {
  const { joined, markJoined } = useWaitlistStatus();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    const result = waitlistSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: insertError } = await supabase
      .from("waitlist")
      .insert({ email: result.data.email });

    setLoading(false);

    if (insertError) {
      if (insertError.code === "23505") {
        setDuplicate(true);
        markJoined();
        return;
      }
      setFormError("Something went wrong. Please try again.");
      return;
    }
    markJoined();
  }

  if (joined) {
    return (
      <motion.p
        id={id}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-800 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-300 ${className}`}
      >
        {duplicate
          ? "You're already on the list."
          : "You're in. We'll let you know when Rem is ready for you."}
      </motion.p>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} className={`flex flex-col gap-2 ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={`${id ?? "waitlist"}-email`}>
          Your email
        </label>
        <input
          id={`${id ?? "waitlist"}-email`}
          type="email"
          value={email}
          autoComplete="email"
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          className={`min-h-12 flex-1 rounded-xl border bg-[var(--rem-panel)] px-4 text-base text-[var(--rem-ink)] outline-none transition-colors placeholder:text-[var(--rem-muted)] focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:focus:ring-sky-950/40 ${
            error ? "border-red-400" : "border-[var(--rem-line)]"
          }`}
        />
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.01 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="min-h-12 rounded-xl bg-[var(--rem-accent)] px-5 text-sm font-bold text-sky-950 transition-colors hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rem-ink)] disabled:cursor-not-allowed disabled:opacity-50 sm:w-44"
        >
          {loading ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
              className="mx-auto block h-4 w-4 rounded-full border-2 border-sky-950/30 border-t-sky-950"
            />
          ) : (
            "Join Early Access"
          )}
        </motion.button>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </motion.p>
      )}
      {formError && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600 dark:text-red-400"
        >
          {formError}
        </motion.p>
      )}
    </form>
  );
}

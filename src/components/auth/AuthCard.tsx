"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

export function AuthCard({
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkHref,
  children,
}: {
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
  children: ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-stone-950 px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.14),transparent_60%)]" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-sm rounded-2xl border border-sky-950 bg-stone-900/50 p-8 shadow-2xl shadow-sky-950/40 backdrop-blur-sm"
      >
        <h1 className="text-2xl font-semibold tracking-tight text-stone-50">{title}</h1>
        <p className="mt-1 text-sm text-stone-400">{subtitle}</p>
        <div className="mt-6">{children}</div>
        <p className="mt-6 text-center text-sm text-stone-400">
          {footerText}{" "}
          <Link href={footerLinkHref} className="font-medium text-sky-400 underline-offset-4 hover:underline">
            {footerLinkText}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

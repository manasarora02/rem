"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/landing/Logo";
import { ThemeToggle } from "@/components/landing/ThemeToggle";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function go(id: string) {
    setMenuOpen(false);
    scrollToId(id);
  }

  return (
    <nav
      className={`sticky top-0 z-50 border-b px-5 transition-colors duration-300 sm:px-8 lg:px-12 ${
        scrolled
          ? "border-[var(--rem-line)] bg-[var(--rem-paper)]/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between sm:h-[72px]">
        <Logo />

        <div className="hidden items-center gap-7 sm:flex">
          <button
            onClick={() => go("why-rem")}
            className="rounded text-sm font-medium text-[var(--rem-muted)] transition-colors hover:text-[var(--rem-ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--rem-accent)]"
          >
            Why Rem
          </button>
          <button
            onClick={() => go("building-rem")}
            className="rounded text-sm font-medium text-[var(--rem-muted)] transition-colors hover:text-[var(--rem-ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--rem-accent)]"
          >
            Building Rem
          </button>
          <Link
            href="/login"
            className="rounded text-sm font-medium text-[var(--rem-muted)] transition-colors hover:text-[var(--rem-ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--rem-accent)]"
          >
            Log in
          </Link>
          <button
            onClick={() => go("early-access")}
            className="rounded-xl bg-[var(--rem-accent)] px-4 py-2.5 text-sm font-semibold text-sky-950 transition-colors hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--rem-accent)] active:opacity-85"
          >
            Join Early Access
          </button>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 sm:hidden">
          <ThemeToggle />
          <button
            onClick={() => go("early-access")}
            className="rounded-xl bg-[var(--rem-accent)] px-4 py-2.5 text-sm font-semibold text-sky-950 transition-opacity active:opacity-80"
          >
            Join
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--rem-muted)] transition-colors hover:text-[var(--rem-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rem-accent)]"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path
                  d="M2 2L16 16M16 2L2 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M1.5 4.5H16.5M1.5 9H16.5M1.5 13.5H16.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[var(--rem-line)] bg-[var(--rem-paper)] sm:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-2 sm:px-8 lg:px-12">
              <button
                onClick={() => go("why-rem")}
                className="py-3 text-left text-sm font-medium text-[var(--rem-muted)] transition-colors hover:text-[var(--rem-ink)]"
              >
                Why Rem
              </button>
              <button
                onClick={() => go("building-rem")}
                className="py-3 text-left text-sm font-medium text-[var(--rem-muted)] transition-colors hover:text-[var(--rem-ink)]"
              >
                Building Rem
              </button>
              <Link
                href="/login"
                className="py-3 text-sm font-medium text-[var(--rem-muted)] transition-colors hover:text-[var(--rem-ink)]"
              >
                Log in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

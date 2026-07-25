"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "rem-theme";
type Theme = "light" | "dark";

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

function subscribe(callback: () => void) {
  window.addEventListener("rem-theme-change", callback);
  return () => window.removeEventListener("rem-theme-change", callback);
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEY, theme);
  window.dispatchEvent(new Event("rem-theme-change"));
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <button
      type="button"
      onClick={() => applyTheme(theme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`flex h-10 w-10 items-center justify-center rounded-full text-[var(--rem-muted)] transition-colors hover:text-[var(--rem-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rem-accent)] ${className}`}
    >
      {theme === "dark" ? (
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M17 10.5A7.5 7.5 0 1 1 9.5 3a6 6 0 0 0 7.5 7.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="3.75" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M10 2.5v2M10 15.5v2M17.5 10h-2M4.5 10h-2M15.3 4.7l-1.4 1.4M6.1 13.9l-1.4 1.4M15.3 15.3l-1.4-1.4M6.1 6.1 4.7 4.7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}

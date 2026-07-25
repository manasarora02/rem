"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";

const STORAGE_KEY = "rem-waitlist-joined";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) === "1";
}

function getServerSnapshot() {
  return false;
}

type WaitlistStatus = {
  joined: boolean;
  markJoined: () => void;
};

const WaitlistStatusContext = createContext<WaitlistStatus | null>(null);

export function WaitlistStatusProvider({ children }: { children: ReactNode }) {
  const joined = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function markJoined() {
    localStorage.setItem(STORAGE_KEY, "1");
    // The native "storage" event only fires in other tabs, not this one,
    // so dispatch it manually to notify every WaitlistForm on this page.
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <WaitlistStatusContext.Provider value={{ joined, markJoined }}>
      {children}
    </WaitlistStatusContext.Provider>
  );
}

export function useWaitlistStatus() {
  const context = useContext(WaitlistStatusContext);
  if (!context) {
    throw new Error("useWaitlistStatus must be used within a WaitlistStatusProvider");
  }
  return context;
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { createClient } from "@/lib/supabase/client";

export default function Home() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-stone-950">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-8xl font-black tracking-tight text-sky-300 drop-shadow-[0_0_40px_rgba(125,211,252,0.35)]"
      >
        REM
      </motion.h1>
      <Link
        href="/"
        className="absolute top-8 text-sm text-stone-500 transition-colors hover:text-sky-400"
      >
        Home
      </Link>
      <button
        onClick={handleLogout}
        className="absolute bottom-8 text-sm text-stone-500 transition-colors hover:text-sky-400"
      >
        Log out
      </button>
    </div>
  );
}

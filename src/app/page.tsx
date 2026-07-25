import type { Metadata } from "next";
import { MotionConfig } from "motion/react";
import { LandingNav } from "@/components/landing/LandingNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { DemoSection } from "@/components/landing/DemoSection";
import { WhyRemSection } from "@/components/landing/WhyRemSection";
import { BuildingSection } from "@/components/landing/BuildingSection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { WaitlistStatusProvider } from "@/components/landing/WaitlistStatusContext";

export const metadata: Metadata = {
  title: "Rem — your personal manager",
  description:
    "Rem remembers your commitments, follow-ups, and important details, and brings them back when they need your attention.",
};

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <WaitlistStatusProvider>
        <div className="relative isolate min-h-screen bg-[var(--rem-paper)] text-[var(--rem-ink)]">
          <LandingNav />
          <HeroSection />
          <DemoSection />
          <WhyRemSection />
          <BuildingSection />
          <LandingFooter />
        </div>
      </WaitlistStatusProvider>
    </MotionConfig>
  );
}

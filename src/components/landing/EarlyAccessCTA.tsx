import { WaitlistForm } from "@/components/landing/WaitlistForm";

export function EarlyAccessCTA() {
  return (
    <div className="mx-auto mt-20 max-w-3xl rounded-2xl border border-[var(--rem-line)] bg-[var(--rem-panel)] p-6 text-center sm:p-10">
      <h2 className="text-balance text-[clamp(1.85rem,2.5vw+1.25rem,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--rem-ink)]">
        Want to see where Rem goes?
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-[var(--rem-muted)]">
        Join early access and follow along as Rem becomes a personal manager you can actually
        rely on.
      </p>
      <div className="mx-auto mt-8 max-w-xl">
        <WaitlistForm className="text-left" />
      </div>
    </div>
  );
}

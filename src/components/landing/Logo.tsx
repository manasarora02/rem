export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`text-base font-semibold tracking-[0.02em] text-[var(--rem-ink)] ${className}`}>
      REM
    </span>
  );
}

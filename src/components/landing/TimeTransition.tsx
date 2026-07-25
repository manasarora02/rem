export function TimeTransition({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-[var(--rem-line)]" />
      <span className="shrink-0 rounded-full border border-[var(--rem-line)] bg-[var(--rem-panel)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--rem-muted)]">
        {children}
      </span>
      <div className="h-px flex-1 bg-[var(--rem-line)]" />
    </div>
  );
}

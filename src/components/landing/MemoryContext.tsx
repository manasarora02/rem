export function MemoryContext({ label, value }: { label: string; value: string }) {
  return (
    <p className="px-1 text-xs text-[var(--rem-muted)]">
      <span className="font-semibold text-[var(--rem-accent-strong)]">{label}</span>{" "}
      <span aria-hidden="true">·</span> {value}
    </p>
  );
}

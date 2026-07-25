const PRINCIPLES = [
  {
    title: "Remembers",
    description: "Important context shouldn't disappear when a conversation ends.",
  },
  {
    title: "Understands",
    description:
      "Rem is being built to understand commitments, people, deadlines, and things you're waiting on.",
  },
  {
    title: "Takes initiative",
    description: "Important things shouldn't depend entirely on you remembering them first.",
  },
];

export function CorePrinciples() {
  return (
    <div className="grid grid-cols-1 border-y border-[var(--rem-line)] md:grid-cols-3">
      {PRINCIPLES.map((principle) => (
        <div
          key={principle.title}
          className="border-b border-[var(--rem-line)] py-8 md:border-b-0 md:border-r md:px-8 md:last:border-r-0"
        >
          <h3 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--rem-ink)]">
            {principle.title}
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--rem-muted)]">
            {principle.description}
          </p>
        </div>
      ))}
    </div>
  );
}

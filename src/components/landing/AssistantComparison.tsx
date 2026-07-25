const COLUMNS = [
  {
    label: "Traditional assistants",
    steps: ["You remember", "You ask", "They respond"],
    emphasized: false,
  },
  {
    label: "Rem",
    steps: ["You tell", "Rem remembers", "Rem follows up"],
    emphasized: true,
  },
];

export function AssistantComparison() {
  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[var(--rem-line)] bg-[var(--rem-panel)] sm:grid-cols-2">
      {COLUMNS.map((column) => (
        <div
          key={column.label}
          className={`flex flex-col gap-6 px-6 py-8 sm:px-8 ${
            column.emphasized
              ? "bg-sky-50/70 dark:bg-sky-950/20"
              : "border-b border-[var(--rem-line)] sm:border-b-0 sm:border-r"
          }`}
        >
          <span
            className={`text-sm font-semibold ${
              column.emphasized ? "text-[var(--rem-accent-strong)]" : "text-[var(--rem-muted)]"
            }`}
          >
            {column.label}
          </span>
          <div className="flex flex-col gap-3">
            {column.steps.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <span
                  className={`rounded-full border px-3 py-1.5 text-sm ${
                    column.emphasized
                      ? "border-sky-200 bg-[var(--rem-panel)] font-semibold text-[var(--rem-ink)] dark:border-sky-900"
                      : "border-[var(--rem-line)] text-[var(--rem-muted)]"
                  }`}
                >
                  {s}
                </span>
                {i < column.steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={column.emphasized ? "text-[var(--rem-accent-strong)]/70" : "text-[var(--rem-muted)]/50"}
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

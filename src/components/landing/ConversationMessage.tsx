export function ConversationMessage({
  sender,
  label,
  proactive = false,
  children,
}: {
  sender: "user" | "rem";
  label?: string;
  proactive?: boolean;
  children: string;
}) {
  const isUser = sender === "user";

  return (
    <div className={`flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}>
      <span
        className={`px-1 text-xs font-semibold ${
          proactive ? "text-[var(--rem-accent-strong)]" : "text-[var(--rem-muted)]"
        }`}
      >
        {label ?? (isUser ? "You" : "Rem")}
      </span>
      <p
        className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[78%] ${
          isUser
            ? "rounded-tr-md bg-[var(--rem-ink)] text-[var(--rem-paper)]"
            : proactive
              ? "rounded-tl-md bg-sky-50 text-[var(--rem-ink)] dark:bg-sky-950/25"
              : "rounded-tl-md border border-[var(--rem-line)] bg-[var(--rem-panel)] text-[var(--rem-ink)]"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

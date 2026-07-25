import { Logo } from "@/components/landing/Logo";

export function LandingFooter() {
  return (
    <footer className="border-t border-[var(--rem-line)] bg-[var(--rem-paper)] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div>
          <Logo />
          <p className="mt-2 text-sm text-[var(--rem-muted)]">Your personal manager.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-[var(--rem-muted)] sm:justify-end">
          <a
            href="mailto:hello@rem.so"
            className="rounded hover:text-[var(--rem-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rem-accent)]"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

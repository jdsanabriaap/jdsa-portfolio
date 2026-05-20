import type { ReactNode } from "react";

type CalloutVariant = "note" | "highlight";

type CalloutProps = {
  children: ReactNode;
  variant?: CalloutVariant;
  title?: string;
};

const variantClasses: Record<CalloutVariant, string> = {
  note: "border-[var(--color-border-md)] bg-[var(--color-surface)]",
  highlight:
    "border-[var(--color-accent)]/30 bg-[var(--color-surface)]",
};

/** Highlighted note block for MDX project pages. */
export function Callout({
  children,
  variant = "note",
  title,
}: CalloutProps) {
  return (
    <aside
      className={`my-6 rounded-xl border-[0.5px] px-5 py-4 ${variantClasses[variant]}`}
    >
      {title ? (
        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-[var(--color-ink)]">
          {title}
        </p>
      ) : null}
      <div className="text-sm leading-relaxed text-[var(--color-ink-muted)] [&_p]:mb-0">
        {children}
      </div>
    </aside>
  );
}

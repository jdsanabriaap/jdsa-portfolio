import type { ReactNode } from "react";

type TagVariant = "default" | "highlight" | "tech";

type TagProps = {
  children: ReactNode;
  variant?: TagVariant;
};

const variantClasses: Record<TagVariant, string> = {
  default:
    "border-[0.5px] border-[var(--color-border)] bg-[var(--color-paper)] text-[var(--color-ink-muted)]",
  highlight:
    "border-[0.5px] border-[var(--color-border-md)] bg-[var(--color-surface)] text-[var(--color-ink)]",
  tech: "border-[0.5px] border-[var(--color-border)] bg-transparent font-mono text-[var(--color-ink-faint)]",
};

/** Compact pill for skills, tech stack, and metadata chips. */
export function Tag({ children, variant = "default" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-mono tracking-wide ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}

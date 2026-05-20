"use client";

import type { TimelineEntry } from "@/lib/about-data";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type TimelineProps = {
  entries: TimelineEntry[];
};

/** Expandable vertical experience timeline for the about page. */
export function Timeline({ entries }: TimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(entries[0]?.id ?? null);

  return (
    <ol className="space-y-4">
      {entries.map((entry) => {
        const isOpen = expandedId === entry.id;
        return (
          <li
            key={entry.id}
            className="rounded-xl border-[0.5px] border-[var(--color-border)] bg-[var(--color-paper)] transition-colors hover:border-[var(--color-border-md)]"
          >
            <button
              type="button"
              onClick={() =>
                setExpandedId(isOpen ? null : entry.id)
              }
              className="flex w-full flex-col gap-2 p-5 text-left md:p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl text-[var(--color-ink)]">
                  {entry.company}
                </h3>
                <span className="font-mono text-xs text-[var(--color-ink-faint)]">
                  {entry.period}
                </span>
              </div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-muted)]">
                {entry.role}
              </p>
              <p className="text-sm text-[var(--color-ink-muted)]">
                {entry.summary}
              </p>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-2 border-t-[0.5px] border-[var(--color-border)] px-5 pb-5 pt-4 md:px-6 md:pb-6">
                    {entry.details.map((detail) => (
                      <li
                        key={detail}
                        className="text-sm leading-relaxed text-[var(--color-ink-muted)]"
                      >
                        — {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}

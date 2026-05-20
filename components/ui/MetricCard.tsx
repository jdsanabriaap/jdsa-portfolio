"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type MetricCardProps = {
  value: string;
  label: string;
  animate?: boolean;
};

function parseNumericValue(value: string): {
  prefix: string;
  target: number;
  suffix: string;
} | null {
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    target: Number.parseFloat(match[2]),
    suffix: match[3],
  };
}

/** Stat block with optional count-up when scrolled into view. */
export function MetricCard({ value, label, animate = false }: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const parsed = useMemo(() => parseNumericValue(value), [value]);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    setDisplay(value);
  }, [value]);

  useEffect(() => {
    if (!animate || !inView || !parsed) return;
    const duration = 1200;
    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = Math.round(parsed.target * eased);
      setDisplay(`${parsed.prefix}${current}${parsed.suffix}`);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [animate, inView, parsed, value]);

  return (
    <motion.div
      ref={ref}
      initial={animate ? { opacity: 0, y: 16 } : false}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      className="rounded-xl border-[0.5px] border-[var(--color-border)] bg-[var(--color-paper)] px-6 py-5 transition-colors hover:border-[var(--color-border-md)] hover:bg-[var(--color-surface)]"
    >
      <p className="font-display text-3xl text-[var(--color-ink)] md:text-4xl">
        {display}
      </p>
      <p className="mt-2 font-mono text-xs uppercase tracking-wider text-[var(--color-ink-muted)]">
        {label}
      </p>
    </motion.div>
  );
}

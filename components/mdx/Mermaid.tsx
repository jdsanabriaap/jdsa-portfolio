"use client";

import mermaid from "mermaid";
import { useEffect, useId, useState } from "react";

type MermaidProps = {
  chart: string;
};

/** Client-side renderer for Mermaid diagrams embedded in MDX. */
export function Mermaid({ chart }: MermaidProps) {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: document.documentElement.classList.contains("dark")
        ? "dark"
        : "default",
      securityLevel: "strict",
    });

    let cancelled = false;

    void mermaid.render(`mermaid-${id}`, chart.trim()).then(({ svg }) => {
      if (!cancelled) setSvg(svg);
    });

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (!svg) {
    return (
      <div
        className="my-8 rounded-xl border-[0.5px] border-[var(--color-border)] bg-[var(--color-surface)] p-6 font-mono text-xs text-[var(--color-ink-faint)]"
        aria-busy="true"
      >
        Cargando diagrama…
      </div>
    );
  }

  return (
    <div
      className="my-8 overflow-x-auto rounded-xl border-[0.5px] border-[var(--color-border)] bg-[var(--color-surface)] p-6 [&_svg]:mx-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

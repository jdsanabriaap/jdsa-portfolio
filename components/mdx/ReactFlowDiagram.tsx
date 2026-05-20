"use client";

import dynamic from "next/dynamic";
import type { Edge, Node } from "@xyflow/react";

const ReactFlowDiagramInner = dynamic(
  () =>
    import("@/components/mdx/ReactFlowDiagramInner").then(
      (m) => m.ReactFlowDiagramInner,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="diagram-wide my-8 flex h-[480px] items-center justify-center rounded-xl border-[0.5px] border-[var(--color-border)] bg-[var(--color-surface)] font-mono text-xs text-[var(--color-ink-faint)]"
        aria-busy="true"
      >
        Cargando diagrama…
      </div>
    ),
  },
);

type ReactFlowDiagramProps = {
  preset?: "vibewindows";
  nodes?: Node[];
  edges?: Edge[];
};

/** Lazy-loaded interactive architecture diagram for MDX pages. */
export function ReactFlowDiagram(props: ReactFlowDiagramProps) {
  return <ReactFlowDiagramInner {...props} />;
}

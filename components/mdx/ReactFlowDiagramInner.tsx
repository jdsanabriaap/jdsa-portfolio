"use client";

import {
  vibewindowsEdges,
  vibewindowsNodes,
} from "@/lib/diagrams/vibewindows-flow";
import {
  Background,
  Controls,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type ReactFlowDiagramInnerProps = {
  preset?: "vibewindows";
  nodes?: Node[];
  edges?: Edge[];
};

/** Client-side React Flow canvas (loaded dynamically from MDX). */
export function ReactFlowDiagramInner({
  preset = "vibewindows",
  nodes,
  edges,
}: ReactFlowDiagramInnerProps) {
  const resolvedNodes =
    nodes ?? (preset === "vibewindows" ? vibewindowsNodes : []);
  const resolvedEdges =
    edges ?? (preset === "vibewindows" ? vibewindowsEdges : []);

  return (
    <div className="diagram-wide my-8 h-[480px] w-full overflow-hidden rounded-xl border-[0.5px] border-[var(--color-border)] bg-[var(--color-surface)]">
      <ReactFlow
        nodes={resolvedNodes}
        edges={resolvedEdges}
        fitView
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag
        zoomOnScroll
      >
        <Background gap={16} size={1} color="var(--color-border)" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

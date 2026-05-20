import type { ComponentType, ReactNode } from "react";
import * as runtime from "react/jsx-runtime";
import { Callout } from "@/components/mdx/Callout";
import { Figure } from "@/components/mdx/Figure";
import { Mermaid } from "@/components/mdx/Mermaid";
import { ProjectGallery } from "@/components/mdx/ProjectGallery";
import { ReactFlowDiagram } from "@/components/mdx/ReactFlowDiagram";
import { VideoEmbed } from "@/components/mdx/VideoEmbed";
import { MetricCard } from "@/components/ui/MetricCard";

const sharedComponents = {
  MetricCard,
  Mermaid,
  ReactFlowDiagram,
  VideoEmbed,
  Figure,
  Callout,
  ProjectGallery,
};

function useMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default as ComponentType<{
    components?: MdxComponentMap;
  }>;
}

type MdxComponentMap = Record<string, ComponentType<Record<string, unknown>>>;

type MDXContentProps = {
  code: string;
  components?: MdxComponentMap;
};

function MdxCode({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: ReactNode;
}) {
  const match = /language-(\w+)/.exec(className ?? "");
  if (match?.[1] === "mermaid") {
    return <Mermaid chart={String(children).replace(/\n$/, "")} />;
  }
  return (
    <code
      className={`font-mono text-sm ${className ?? ""}`}
      {...props}
    >
      {children}
    </code>
  );
}

/** Renders Velite-compiled MDX with portfolio MDX components. */
export function MDXContent({ code, components }: MDXContentProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="prose-portfolio">
      <Component
        components={
          {
            ...sharedComponents,
            pre: ({ children }: { children?: ReactNode }) => <>{children}</>,
            code: MdxCode,
            ...components,
          } as unknown as MdxComponentMap
        }
      />
    </div>
  );
}

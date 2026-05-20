import { Link } from "@/i18n/routing";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  readMoreLabel: string;
  statusLabels: Record<Project["status"], string>;
};

/** Grid card linking to a project detail page. */
export function ProjectCard({
  project,
  readMoreLabel,
  statusLabels,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col rounded-xl border-[0.5px] border-[var(--color-border)] bg-[var(--color-paper)] p-5 transition-colors hover:border-[var(--color-border-md)] hover:bg-[var(--color-surface)] md:p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="font-display text-xl text-[var(--color-ink)] group-hover:text-[var(--color-accent)]">
          {project.title}
        </h3>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink-faint)]">
          {statusLabels[project.status]}
        </span>
      </div>
      <p className="mb-3 font-mono text-xs text-[var(--color-ink-faint)]">
        {project.period} · {project.client}
      </p>
      <p className="mb-3 flex-1 text-sm leading-relaxed text-[var(--color-ink-muted)]">
        {project.summary}
      </p>
      {project.teaser && project.teaser.length > 0 ? (
        <ul className="mb-4 space-y-1">
          {project.teaser.slice(0, 3).map((line) => (
            <li
              key={line}
              className="font-mono text-[11px] leading-snug text-[var(--color-ink-faint)] before:mr-2 before:content-['—']"
            >
              {line}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mb-4 flex flex-wrap gap-2">
        {project.tags.slice(0, 4).map((tag) => (
          <Tag key={tag} variant="tech">
            {tag}
          </Tag>
        ))}
      </div>
      <span className="font-mono text-xs text-[var(--color-accent)]">
        {readMoreLabel} →
      </span>
    </Link>
  );
}

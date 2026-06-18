import { MDXContent } from "@/components/mdx/MDXContent";
import { ProjectViewRecorder } from "@/components/projects/ProjectViewRecorder";
import { Tag } from "@/components/ui/Tag";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  const projects = getAllProjects();
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({
      locale,
      slug: project.slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations("projects");
  const statusLabels = {
    active: t("statusActive"),
    completed: t("statusCompleted"),
    archived: t("statusArchived"),
  } as const;

  return (
    <article className="py-[52px]">
      <ProjectViewRecorder slug={slug} />
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-10 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-faint)]">
            {statusLabels[project.status]} · {project.period}
          </p>
          <h1 className="mt-3 font-display text-4xl text-[var(--color-ink)] md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-ink-muted)]">
            {project.summary}
          </p>
          <p className="mt-3 font-mono text-sm text-[var(--color-ink-muted)]">
            {project.client}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag} variant="tech">
                {tag}
              </Tag>
            ))}
          </div>
        </header>
        <MDXContent code={project.code} />
      </div>
    </article>
  );
}

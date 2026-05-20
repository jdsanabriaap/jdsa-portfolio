import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getFeaturedProjects } from "@/lib/projects";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tProjects = await getTranslations("projects");
  const featured = getFeaturedProjects();

  const statusLabels = {
    active: tProjects("statusActive"),
    completed: tProjects("statusCompleted"),
    archived: tProjects("statusArchived"),
  } as const;

  return (
    <>
      <Hero />
      <Stats />
      <section className="py-[52px]">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl text-[var(--color-ink)]">
            {t("featuredTitle")}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--color-ink-muted)]">
            {t("featuredSubtitle")}
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featured.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                readMoreLabel={tProjects("readMore")}
                statusLabels={statusLabels}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

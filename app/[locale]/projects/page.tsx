"use client";

import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { RecentProjects } from "@/components/sections/RecentProjects";
import { getAllProjects } from "@/lib/projects";
import { useTranslations } from "next-intl";
export default function ProjectsPage() {
  const t = useTranslations("projects");
  const projects = getAllProjects();

  return (
    <section className="py-[52px]">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="font-display text-4xl text-[var(--color-ink)]">
          {t("title")}
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-[var(--color-ink-muted)]">
          {t("subtitle")}
        </p>
        <div className="mt-10">
          <RecentProjects projects={projects} />
          <ProjectsGrid projects={projects} />
        </div>
      </div>
    </section>
  );
}

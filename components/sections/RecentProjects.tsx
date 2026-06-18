"use client";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { getRecentProjectSlugs } from "@/lib/recent-projects";
import type { Project } from "@/lib/projects";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type RecentProjectsProps = {
  projects: Project[];
};

/** Recently viewed projects restored from localStorage. */
export function RecentProjects({ projects }: RecentProjectsProps) {
  const t = useTranslations("projects");
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    setSlugs(getRecentProjectSlugs());
  }, []);

  const recent = slugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));

  if (recent.length === 0) return null;

  const statusLabels = {
    active: t("statusActive"),
    completed: t("statusCompleted"),
    archived: t("statusArchived"),
  } as const;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-12"
    >
      <h2 className="font-display text-2xl text-[var(--color-ink)]">
        {t("recentTitle")}
      </h2>
      <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
        {t("recentSubtitle")}
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {recent.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            readMoreLabel={t("readMore")}
            statusLabels={statusLabels}
          />
        ))}
      </div>
    </motion.section>
  );
}

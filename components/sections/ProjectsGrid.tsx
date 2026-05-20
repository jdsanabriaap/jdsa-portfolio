"use client";

import { ProjectCard } from "@/components/ui/ProjectCard";
import {
  projectMatchesFilter,
  type Project,
  type ProjectFilterCategory,
} from "@/lib/projects";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

const filters: { id: ProjectFilterCategory; labelKey: string }[] = [
  { id: "all", labelKey: "filterAll" },
  { id: "ai-cv", labelKey: "filterAiCv" },
  { id: "fintech", labelKey: "filterFintech" },
  { id: "automation", labelKey: "filterAutomation" },
  { id: "web", labelKey: "filterWeb" },
];

type ProjectsGridProps = {
  projects: Project[];
};

/** Filterable project grid with layout animations. */
export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const t = useTranslations("projects");
  const [activeFilter, setActiveFilter] =
    useState<ProjectFilterCategory>("all");

  const filtered = useMemo(
    () => projects.filter((p) => projectMatchesFilter(p, activeFilter)),
    [projects, activeFilter],
  );

  const statusLabels = {
    active: t("statusActive"),
    completed: t("statusCompleted"),
    archived: t("statusArchived"),
  } as const;

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`rounded-full border-[0.5px] px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
              activeFilter === filter.id
                ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]"
                : "border-[var(--color-border)] text-[var(--color-ink-muted)] hover:border-[var(--color-border-md)]"
            }`}
          >
            {t(filter.labelKey)}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard
                project={project}
                readMoreLabel={t("readMore")}
                statusLabels={statusLabels}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

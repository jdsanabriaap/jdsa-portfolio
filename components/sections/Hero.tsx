"use client";

import { Link } from "@/i18n/routing";
import { Tag } from "@/components/ui/Tag";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const skillTags = ["Go", "Python", "C#", "FinTech", "Computer Vision"];

/** Home hero with intro copy, CTAs, and availability status card. */
export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="py-[52px] md:py-20">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start"
      >
        <div className="flex flex-col gap-6">
          <motion.p
            variants={item}
            className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-ink-faint)]"
          >
            {t("eyebrow")}
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display text-4xl leading-tight text-[var(--color-ink)] md:text-6xl"
          >
            {t("name")}
          </motion.h1>
          <motion.p
            variants={item}
            className="max-w-xl text-base leading-relaxed text-[var(--color-ink-muted)] md:text-lg"
          >
            {t("role")}
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-2">
            {skillTags.map((tag) => (
              <Tag key={tag} variant="tech">
                {tag}
              </Tag>
            ))}
          </motion.div>
          <motion.div variants={item} className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/projects"
              className="rounded-lg border-[0.5px] border-[var(--color-ink)] bg-[var(--color-ink)] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[var(--color-paper)] transition-opacity hover:opacity-90"
            >
              {t("ctaProjects")}
            </Link>
            <Link
              href="/about"
              className="rounded-lg border-[0.5px] border-[var(--color-border-md)] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-surface)]"
            >
              {t("ctaAbout")}
            </Link>
          </motion.div>
        </div>

        <motion.aside
          variants={item}
          className="rounded-xl border-[0.5px] border-[var(--color-border)] bg-[var(--color-paper)] p-6 md:p-6"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="status-pulse relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink)]">
              {t("statusAvailable")}
            </span>
          </div>
          <div className="space-y-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink-faint)]">
                {t("statusProjects")}
              </p>
              <ul className="mt-2 space-y-1 text-sm text-[var(--color-ink-muted)]">
                <li>{t("projectVibewindows")}</li>
                <li>{t("projectHoliday")}</li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink-faint)]">
                {t("statusStudies")}
              </p>
              <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
                {t("statusStudiesLine")}
              </p>
            </div>
          </div>
        </motion.aside>
      </motion.div>
    </section>
  );
}

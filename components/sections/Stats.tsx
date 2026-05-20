"use client";

import { MetricCard } from "@/components/ui/MetricCard";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

/** Home metrics row with scroll-triggered count-up. */
export function Stats() {
  const t = useTranslations("stats");

  return (
    <section className="py-[52px]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto grid max-w-6xl gap-4 px-6 md:grid-cols-3"
      >
        <MetricCard
          value={t("years.value")}
          label={t("years.label")}
          animate
        />
        <MetricCard
          value={t("acquirers.value")}
          label={t("acquirers.label")}
          animate
        />
        <MetricCard
          value={t("leadTime.value")}
          label={t("leadTime.label")}
          animate
        />
      </motion.div>
    </section>
  );
}

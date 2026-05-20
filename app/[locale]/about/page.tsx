import { Timeline } from "@/components/ui/Timeline";
import { skillGroups, timelineEntries } from "@/lib/about-data";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <section className="py-[52px]">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-12 max-w-2xl">
          <h1 className="font-display text-4xl text-[var(--color-ink)]">
            {t("title")}
          </h1>
          <p className="mt-3 text-sm text-[var(--color-ink-muted)]">
            {t("subtitle")}
          </p>
        </header>

        <Timeline entries={timelineEntries} />

        <h2 className="mt-16 font-display text-2xl text-[var(--color-ink)]">
          {t("skillsTitle")}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.id}
              className="rounded-xl border-[0.5px] border-[var(--color-border)] bg-[var(--color-paper)] p-5 transition-colors hover:border-[var(--color-border-md)] hover:bg-[var(--color-surface)] md:p-6"
            >
              <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-faint)]">
                {t(`skills.${group.titleKey}`)}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-[var(--color-ink-muted)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

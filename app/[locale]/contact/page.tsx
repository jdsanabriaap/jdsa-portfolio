import { ContactChannels } from "@/components/sections/ContactChannels";
import { ContactForm } from "@/components/sections/ContactForm";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

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

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <ContactForm />
          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink-faint)]">
              {t("channelsTitle")}
            </h2>
            <div className="mt-4">
              <ContactChannels />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

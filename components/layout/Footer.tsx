import { getTranslations } from "next-intl/server";

/** Site footer with copyright line. */
export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t-[0.5px] border-[var(--color-border)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 font-mono text-xs text-[var(--color-ink-faint)] md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} Jose David Sanabria Aponte</span>
        <span>{t("rights")}</span>
      </div>
    </footer>
  );
}

import { siteContact } from "@/lib/site-contact";
import { getTranslations } from "next-intl/server";

/** Site footer with contact links, social profiles, and copyright. */
export async function Footer() {
  const t = await getTranslations("footer");

  const links = [
    {
      href: `mailto:${siteContact.email}`,
      label: siteContact.email,
      accent: true,
    },
    {
      href: `tel:${siteContact.phoneE164}`,
      label: siteContact.phoneDisplay,
    },
    {
      href: siteContact.linkedin,
      label: siteContact.linkedinDisplay,
      external: true,
    },
    {
      href: siteContact.github,
      label: siteContact.githubDisplay,
      external: true,
    },
  ] as const;

  return (
    <footer className="border-t-[0.5px] border-[var(--color-border)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6">
        <div className="flex flex-col gap-3 font-mono text-xs sm:flex-row sm:flex-wrap sm:gap-x-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={"external" in link && link.external ? "_blank" : undefined}
              rel={
                "external" in link && link.external
                  ? "noopener noreferrer"
                  : undefined
              }
              className={
                "accent" in link && link.accent
                  ? "text-[var(--color-accent)] transition-opacity hover:opacity-80"
                  : "text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]"
              }
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2 font-mono text-xs text-[var(--color-ink-faint)] md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Jose David Sanabria Aponte</span>
          <span>{t("rights")}</span>
        </div>
      </div>
    </footer>
  );
}

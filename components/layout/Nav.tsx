"use client";

import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTheme } from "@/components/providers/ThemeProvider";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

const navLinks = [
  { href: "/", key: "home" as const },
  { href: "/projects", key: "projects" as const },
  { href: "/about", key: "about" as const },
];

/** Primary navigation with locale, theme toggles, and mobile menu. */
export function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const switchLocale = (next: "es" | "en") => {
    router.replace(pathname, { locale: next });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b-[0.5px] border-[var(--color-border)] bg-[var(--color-paper)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-lg text-[var(--color-ink)]"
        >
          JDSA
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`font-mono text-xs uppercase tracking-wider transition-colors hover:text-[var(--color-accent)] ${
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-ink-muted)]"
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 font-mono text-xs md:flex">
            <button
              type="button"
              onClick={() => switchLocale("es")}
              className={
                locale === "es"
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-ink-faint)]"
              }
              aria-label="Español"
            >
              ES
            </button>
            <span className="text-[var(--color-ink-faint)]">/</span>
            <button
              type="button"
              onClick={() => switchLocale("en")}
              className={
                locale === "en"
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-ink-faint)]"
              }
              aria-label="English"
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border-[0.5px] border-[var(--color-border)] px-3 py-1.5 font-mono text-xs text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-border-md)]"
            aria-label={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border-[0.5px] border-[var(--color-border)] md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
          >
            <span className="font-mono text-sm">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t-[0.5px] border-[var(--color-border)] md:hidden"
          >
            <nav className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-sm uppercase tracking-wider text-[var(--color-ink)]"
                >
                  {t(link.key)}
                </Link>
              ))}
              <div className="flex gap-4 font-mono text-sm">
                <button type="button" onClick={() => switchLocale("es")}>
                  ES
                </button>
                <button type="button" onClick={() => switchLocale("en")}>
                  EN
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

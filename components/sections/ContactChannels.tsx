"use client";

import { buildWhatsAppUrl, siteContact } from "@/lib/site-contact";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Channel = {
  key: "email" | "phone" | "whatsapp" | "linkedin" | "github";
  href: string;
  value: string;
  external?: boolean;
};

/** Quick-access cards for email, phone, WhatsApp, LinkedIn, and GitHub. */
export function ContactChannels() {
  const t = useTranslations("contact");

  const channels: Channel[] = [
    {
      key: "email",
      href: `mailto:${siteContact.email}`,
      value: siteContact.email,
    },
    {
      key: "phone",
      href: `tel:${siteContact.phoneE164}`,
      value: siteContact.phoneDisplay,
    },
    {
      key: "whatsapp",
      href: buildWhatsAppUrl(t("whatsappQuickMessage")),
      value: siteContact.phoneDisplay,
      external: true,
    },
    {
      key: "linkedin",
      href: siteContact.linkedin,
      value: siteContact.linkedinDisplay,
      external: true,
    },
    {
      key: "github",
      href: siteContact.github,
      value: siteContact.githubDisplay,
      external: true,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {channels.map((channel, index) => (
        <motion.a
          key={channel.key}
          href={channel.href}
          target={channel.external ? "_blank" : undefined}
          rel={channel.external ? "noopener noreferrer" : undefined}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.06 }}
          className="rounded-xl border-[0.5px] border-[var(--color-border)] bg-[var(--color-paper)] p-5 transition-colors hover:border-[var(--color-border-md)] hover:bg-[var(--color-surface)] md:p-6"
        >
          <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink-faint)]">
            {t(`${channel.key}Label`)}
          </p>
          <p
            className={`mt-2 text-sm ${
              channel.key === "email"
                ? "text-[var(--color-accent)]"
                : "text-[var(--color-ink)]"
            }`}
          >
            {channel.value}
          </p>
        </motion.a>
      ))}
    </div>
  );
}

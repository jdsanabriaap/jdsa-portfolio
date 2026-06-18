"use client";

import {
  composeWhatsAppMessage,
  emptyContactDraft,
  hasContactDraft,
  isContactDraft,
} from "@/lib/contact-draft";
import { removePersisted } from "@/lib/local-persist";
import { storageKeys } from "@/lib/storage-keys";
import {
  buildGmailComposeUrl,
  buildMailtoUrl,
  buildOutlookComposeUrl,
  buildWhatsAppUrl,
  contactFormLimits,
  maxComposeUrlLength,
  siteContact,
} from "@/lib/site-contact";
import { usePersistedState } from "@/hooks/usePersistedState";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { type FormEvent, useRef, useState } from "react";

function CharCount({
  current,
  max,
}: {
  current: number;
  max: number;
}) {
  const nearLimit = current >= max * 0.9;

  return (
    <p
      className={`mt-1 text-right font-mono text-[10px] ${
        nearLimit
          ? "text-[var(--color-accent)]"
          : "text-[var(--color-ink-faint)]"
      }`}
      aria-live="polite"
    >
      {current}/{max}
    </p>
  );
}

/** Contact form that opens web mail compose, mailto, or WhatsApp. */
export function ContactForm() {
  const t = useTranslations("contact");
  const formRef = useRef<HTMLFormElement>(null);
  const [openingWhatsApp, setOpeningWhatsApp] = useState(false);
  const [form, setForm, hydrated] = usePersistedState(
    storageKeys.contactDraft,
    emptyContactDraft,
    isContactDraft,
  );

  const getEmailPayload = () => ({
    subject: form.subject.trim() || t("defaultSubject"),
    body: composeBody(),
  });

  const composeBody = () => {
    const lines = [form.message.trim()];
    if (form.name.trim()) {
      lines.push("", `${t("formName")}: ${form.name.trim()}`);
    }
    return lines.join("\n");
  };

  const openComposeUrl = (url: string) => {
    if (url.length > maxComposeUrlLength) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const validateForm = () => formRef.current?.reportValidity() ?? false;

  const handleGmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;
    openComposeUrl(buildGmailComposeUrl(getEmailPayload()));
  };

  const handleOutlook = () => {
    if (!validateForm()) return;
    openComposeUrl(buildOutlookComposeUrl(getEmailPayload()));
  };

  const handleMailto = () => {
    if (!validateForm()) return;
    const url = buildMailtoUrl(getEmailPayload());
    if (url.length > maxComposeUrlLength) return;
    window.location.href = url;
  };

  const handleWhatsApp = () => {
    if (openingWhatsApp) return;

    const text = composeWhatsAppMessage({
      name: form.name,
      subject: form.subject,
      message: form.message,
      subjectLabel: t("formSubject"),
      fallbackMessage: t("whatsappQuickMessage"),
    });

    setOpeningWhatsApp(true);
    window.open(buildWhatsAppUrl(text), "_blank", "noopener,noreferrer");
    window.setTimeout(() => setOpeningWhatsApp(false), 1000);
  };

  const clearDraft = () => {
    setForm(emptyContactDraft);
    removePersisted(storageKeys.contactDraft);
  };

  const fieldClass =
    "w-full rounded-lg border-[0.5px] border-[var(--color-border)] bg-[var(--color-paper)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-ink-faint)] focus:border-[var(--color-border-md)]";

  const showDraftNote = hydrated && hasContactDraft(form);

  return (
    <motion.form
      ref={formRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleGmail}
      className="rounded-xl border-[0.5px] border-[var(--color-border)] bg-[var(--color-paper)] p-5 md:p-6"
    >
      <h2 className="font-display text-xl text-[var(--color-ink)]">
        {t("formTitle")}
      </h2>
      <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
        {t("formHint")}
      </p>
      {showDraftNote && (
        <p className="mt-3 font-mono text-[10px] text-[var(--color-ink-faint)]">
          {t("draftLocal")}{" "}
          <button
            type="button"
            onClick={clearDraft}
            className="text-[var(--color-accent)] hover:underline"
          >
            {t("clearDraft")}
          </button>
        </p>
      )}

      <label className="mt-6 block">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink-faint)]">
          {t("formName")}
        </span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          maxLength={contactFormLimits.name}
          value={form.name}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, name: event.target.value }))
          }
          className={`${fieldClass} mt-2`}
          placeholder={t("formNamePlaceholder")}
        />
        <CharCount current={form.name.length} max={contactFormLimits.name} />
      </label>

      <label className="mt-4 block">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink-faint)]">
          {t("formSubject")} *
        </span>
        <input
          type="text"
          name="subject"
          required
          maxLength={contactFormLimits.subject}
          value={form.subject}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, subject: event.target.value }))
          }
          className={`${fieldClass} mt-2`}
          placeholder={t("formSubjectPlaceholder")}
        />
        <CharCount
          current={form.subject.length}
          max={contactFormLimits.subject}
        />
      </label>

      <label className="mt-4 block">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink-faint)]">
          {t("formMessage")} *
        </span>
        <textarea
          name="message"
          required
          rows={6}
          maxLength={contactFormLimits.message}
          value={form.message}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, message: event.target.value }))
          }
          className={`${fieldClass} mt-2 resize-y`}
          placeholder={t("formMessagePlaceholder")}
        />
        <CharCount
          current={form.message.length}
          max={contactFormLimits.message}
        />
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="submit"
          className="rounded-lg bg-[var(--color-ink)] px-5 py-3 font-mono text-xs uppercase tracking-wider text-[var(--color-paper)] transition-opacity hover:opacity-90"
        >
          {t("sendGmail")}
        </button>
        <button
          type="button"
          onClick={handleOutlook}
          className="rounded-lg border-[0.5px] border-[var(--color-border-md)] px-5 py-3 font-mono text-xs uppercase tracking-wider text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface)]"
        >
          {t("sendOutlook")}
        </button>
        <button
          type="button"
          onClick={handleWhatsApp}
          disabled={openingWhatsApp}
          className="rounded-lg border-[0.5px] border-[var(--color-border-md)] px-5 py-3 font-mono text-xs uppercase tracking-wider text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {t("sendWhatsApp")}
        </button>
      </div>

      <p className="mt-4 font-mono text-[10px] text-[var(--color-ink-faint)]">
        {t("mailtoFallback")}{" "}
        <button
          type="button"
          onClick={handleMailto}
          className="text-[var(--color-accent)] hover:underline"
        >
          {t("sendMailto")}
        </button>
        {" · "}
        {t("directEmail")}{" "}
        <a
          href={`mailto:${siteContact.email}`}
          className="text-[var(--color-accent)] hover:underline"
        >
          {siteContact.email}
        </a>
      </p>
    </motion.form>
  );
}

import { contactFormLimits } from "@/lib/site-contact";

export type ContactDraft = {
  name: string;
  subject: string;
  message: string;
};

export const emptyContactDraft: ContactDraft = {
  name: "",
  subject: "",
  message: "",
};

export function isContactDraft(value: unknown): value is ContactDraft {
  if (!value || typeof value !== "object") return false;

  const draft = value as Record<string, unknown>;

  return (
    typeof draft.name === "string" &&
    typeof draft.subject === "string" &&
    typeof draft.message === "string" &&
    draft.name.length <= contactFormLimits.name &&
    draft.subject.length <= contactFormLimits.subject &&
    draft.message.length <= contactFormLimits.message
  );
}

export function hasContactDraft(draft: ContactDraft): boolean {
  return Boolean(
    draft.name.trim() || draft.subject.trim() || draft.message.trim(),
  );
}

type WhatsAppMessageParams = {
  name: string;
  subject: string;
  message: string;
  subjectLabel: string;
  fallbackMessage: string;
};

/** Single-pass WhatsApp body: subject, message, then name as signature. */
export function composeWhatsAppMessage({
  name,
  subject,
  message,
  subjectLabel,
  fallbackMessage,
}: WhatsAppMessageParams): string {
  const parts: string[] = [];
  const trimmedSubject = subject.trim();
  const trimmedMessage = message.trim();
  const trimmedName = name.trim();

  if (trimmedSubject) {
    parts.push(`${subjectLabel}: ${trimmedSubject}`);
  }
  if (trimmedMessage) {
    parts.push(trimmedMessage);
  }
  if (trimmedName) {
    parts.push(`— ${trimmedName}`);
  }

  return parts.length > 0 ? parts.join("\n\n") : fallbackMessage;
}

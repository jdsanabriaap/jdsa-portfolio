/** Public contact details and outbound link builders for the portfolio site. */
export const siteContact = {
  email: "jdsa.dev@pronton.me",
  phoneE164: "+573175031582",
  phoneDisplay: "+57 317 503 1582",
  whatsappNumber: "573175031582",
  linkedin: "https://linkedin.com/in/jdsanabriaa",
  linkedinDisplay: "linkedin.com/in/jdsanabriaa",
  github: "https://github.com/jdsanabriaap",
  githubDisplay: "github.com/jdsanabriaap",
} as const;

/** Field limits sized to keep mailto:/wa.me URLs within safe browser bounds. */
export const contactFormLimits = {
  name: 80,
  subject: 120,
  message: 900,
} as const;

/** Conservative cap for encoded compose URLs across clients. */
export const maxComposeUrlLength = 2000;

type ComposeEmailParams = {
  subject: string;
  body: string;
};

/** Opens the visitor's mail client with a pre-filled message. */
export function buildMailtoUrl({ subject, body }: ComposeEmailParams): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return query
    ? `mailto:${siteContact.email}?${query}`
    : `mailto:${siteContact.email}`;
}

/** Gmail web compose — reliable in Chrome when mailto handlers fail. */
export function buildGmailComposeUrl({
  subject,
  body,
}: ComposeEmailParams): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: siteContact.email,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

/** Outlook web compose — alternative for non-Gmail users. */
export function buildOutlookComposeUrl({
  subject,
  body,
}: ComposeEmailParams): string {
  const params = new URLSearchParams({
    to: siteContact.email,
    subject,
    body,
  });
  return `https://outlook.live.com/mail/0/deeplink/compose?${params.toString()}`;
}

/** Deep link to WhatsApp with an optional pre-filled message. */
export function buildWhatsAppUrl(message: string): string {
  const base = `https://wa.me/${siteContact.whatsappNumber}`;
  if (!message.trim()) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

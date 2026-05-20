export type TimelineEntry = {
  id: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  details: string[];
};

export const timelineEntries: TimelineEntry[] = [
  {
    id: "mercado-pago",
    company: "Mercado Pago",
    role: "Backend Engineer — QR Interop",
    period: "Feb 2024 – Ene 2026",
    summary:
      "Arquitectura config-driven e integraciones LATAM con feature flags.",
    details: [
      "Diseño de adaptadores Go reutilizables por adquirente",
      "Infraestructura de flags para desarrollo paralelo (10+ adquirentes)",
      "~80% de reducción en lead time de nuevas integraciones",
    ],
  },
  {
    id: "petlandia",
    company: "Club House Petlandia",
    role: "Desarrollo web + despliegue cloud",
    period: "Ene 2025",
    summary:
      "Landing estática para guardería y hotel de mascotas — SEO local, WhatsApp y pipeline OCI + Cloudflare.",
    details: [
      "HTML/CSS/JS vanilla, tres páginas SEO (home + satélites)",
      "GitHub Actions: bulk-upload a Object Storage y purge CDN",
      "Sitio en producción en petlandiaclubhouse.com",
    ],
  },
  {
    id: "holiday-integrator",
    company: "Holiday Experiences S.A.S.",
    role: "Freelance — Holiday Integrator",
    period: "2024 – presente",
    summary:
      "Aplicación WPF que compara alojamiento en portales B2B con Playwright, agregación multi-portal y handoff de reserva.",
    details: [
      "Scraping paralelo (BedsOnline, HotelDo, TravelC, …) vía Chromium",
      "Correlación de ofertas con Union-Find restringido",
      "Modos Masiva, Individual y MosaicVisible",
    ],
  },
  {
    id: "holiday-ifx",
    company: "Holiday Experiences S.A.S.",
    role: "Freelance — Cumplimiento de llamadas",
    period: "2024 – presente",
    summary:
      "Pipeline Python para validación de grabaciones y metadatos IFX/Zadarma contra reglas de cumplimiento.",
    details: [
      "Proyecto independiente de Holiday Integrator",
      "Automatización de revisión de llamadas en operación interna",
    ],
  },
  {
    id: "holiday-sync",
    company: "Holiday Experiences S.A.S.",
    role: "Freelance — Sync transfronteriza",
    period: "2024 – presente",
    summary:
      "Sincronización de contratos Colombia → EE.UU. con Selenium y OpenCV sobre UIs legacy sin API estable.",
    details: [
      "Proyecto independiente de Holiday Integrator",
      "Reintentos y captura de evidencia en flujos transfronterizos",
    ],
  },
  {
    id: "unir",
    company: "UNIR",
    role: "Especialización en Inteligencia Artificial",
    period: "En curso",
    summary: "Formación en IA aplicada y sistemas inteligentes.",
    details: [
      "Aprendizaje automático y deep learning",
      "Proyectos aplicados a visión y NLP",
    ],
  },
  {
    id: "udistrital",
    company: "Universidad Distrital",
    role: "Ingeniería de Sistemas",
    period: "Graduado",
    summary: "Base en ingeniería de software y sistemas distribuidos.",
    details: [
      "Fundamentos de algoritmos y estructuras de datos",
      "Proyectos académicos en backend y automatización",
    ],
  },
];

export const skillGroups = [
  {
    id: "languages",
    titleKey: "languages" as const,
    items: ["Go", "Python", "C#", "TypeScript", "SQL"],
  },
  {
    id: "backend",
    titleKey: "backend" as const,
    items: ["REST/gRPC", "WPF/MVVM", ".NET", "Integraciones", "TCP/sockets"],
  },
  {
    id: "aiCv",
    titleKey: "aiCv" as const,
    items: ["MediaPipe", "OpenCV", "Selenium", "Playwright", "ML pipelines"],
  },
  {
    id: "devops",
    titleKey: "devops" as const,
    items: [
      "Docker",
      "CI/CD",
      "GitHub Actions",
      "OCI",
      "Cloudflare",
      "Vercel",
    ],
  },
];

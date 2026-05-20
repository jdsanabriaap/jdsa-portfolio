import { projects } from "#site/content";

export type Project = (typeof projects)[number];

/** Projects sorted by order ascending. */
export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export type ProjectFilterCategory =
  | "all"
  | "ai-cv"
  | "fintech"
  | "automation"
  | "web";

const FILTER_TAG_MAP: Record<Exclude<ProjectFilterCategory, "all">, string[]> =
  {
    "ai-cv": [
      "Computer Vision",
      "MediaPipe",
      "OpenCV",
      "Python",
      "IA",
      "AI",
    ],
    fintech: ["FinTech", "Go", "Integraciones", "LATAM", "Feature Flags"],
    automation: ["Automatización", "Selenium", "Playwright", "WPF"],
    web: [
      "HTML",
      "CSS",
      "JavaScript",
      "OCI",
      "Cloudflare",
      "GitHub Actions",
      "SEO",
    ],
  };

export function projectMatchesFilter(
  project: Project,
  category: ProjectFilterCategory,
): boolean {
  if (category === "all") return true;
  const keywords = FILTER_TAG_MAP[category];
  return project.tags.some((tag) =>
    keywords.some(
      (kw) => tag.toLowerCase().includes(kw.toLowerCase()) || kw === tag,
    ),
  );
}

import type { ProjectFilterCategory } from "@/lib/projects";

const FILTER_IDS: ProjectFilterCategory[] = [
  "all",
  "ai-cv",
  "fintech",
  "automation",
  "web",
];

export function isProjectFilterCategory(
  value: unknown,
): value is ProjectFilterCategory {
  return (
    typeof value === "string" &&
    FILTER_IDS.includes(value as ProjectFilterCategory)
  );
}

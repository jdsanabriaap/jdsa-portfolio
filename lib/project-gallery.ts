/** Static manifest of gallery images per project slug (extend when assets are added). */
export const projectGalleryManifest: Record<
  string,
  { src: string; alt: string }[]
> = {
  vibewindows: [],
  "holiday-portal": [],
  "qr-interop-platform": [],
  "integration-docs-mcp": [],
  "petlandia-landing": [],
};

export function getGalleryImages(slug: string): { src: string; alt: string }[] {
  return projectGalleryManifest[slug] ?? [];
}

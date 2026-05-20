import Image from "next/image";
import { getGalleryImages } from "@/lib/project-gallery";

type ProjectGalleryProps = {
  slug: string;
};

/** Image grid for a project; shows a placeholder until assets are added. */
export function ProjectGallery({ slug }: ProjectGalleryProps) {
  const images = getGalleryImages(slug);

  if (images.length === 0) {
    return (
      <div
        className="my-8 flex min-h-[140px] items-center justify-center rounded-xl border-[0.5px] border-dashed border-[var(--color-border-md)] bg-[var(--color-surface)] px-6 py-10"
        aria-label="Galería pendiente"
      >
        <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-faint)]">
          Galería próximamente — capturas y demos en preparación
        </p>
      </div>
    );
  }

  return (
    <div className="prose-figure my-8 grid gap-4 sm:grid-cols-2">
      {images.map((image) => (
        <div
          key={image.src}
          className="overflow-hidden rounded-xl border-[0.5px] border-[var(--color-border)]"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={640}
            height={360}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 480px"
          />
        </div>
      ))}
    </div>
  );
}

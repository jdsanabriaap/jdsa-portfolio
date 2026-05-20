import Image from "next/image";

type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

/** Responsive image with caption for project MDX content. */
export function Figure({
  src,
  alt,
  caption,
  width = 1200,
  height = 675,
}: FigureProps) {
  return (
    <figure className="prose-figure my-8">
      <div className="overflow-hidden rounded-xl border-[0.5px] border-[var(--color-border)] bg-[var(--color-surface)]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
          sizes="(max-width: 768px) 100vw, 960px"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 font-mono text-xs text-[var(--color-ink-faint)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

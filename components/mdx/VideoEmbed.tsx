"use client";

type VideoEmbedProps = {
  src: string;
  title?: string;
  poster?: string;
};

/** Lazy iframe embed for demo videos in project MDX. */
export function VideoEmbed({ src, title = "Video demo", poster }: VideoEmbedProps) {
  return (
    <div className="my-8 overflow-hidden rounded-xl border-[0.5px] border-[var(--color-border)]">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        className="aspect-video w-full bg-[var(--color-surface)]"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        {...(poster ? { style: { backgroundImage: `url(${poster})` } } : {})}
      />
    </div>
  );
}

interface ProjectImageProps {
  /** Base path without extension, e.g. `/images/project-1`. */
  src: string
  alt: string
  className?: string
  /** First project image is above the fold on the work section; the rest lazy-load. */
  eager?: boolean
  sizes?: string
  /** Set false inside draggable surfaces so the native image drag doesn't win. */
  draggable?: boolean
}

/** Responsive project screenshot: WebP with a JPEG fallback. */
export default function ProjectImage({ src, alt, className, eager = false, sizes = '(min-width: 1024px) 60vw, 100vw', draggable }: ProjectImageProps) {
  return (
    <picture>
      <source srcSet={`${src}-800.webp 800w, ${src}.webp 1600w`} sizes={sizes} type="image/webp" />
      <img
        src={`${src}.jpg`}
        alt={alt}
        width={1600}
        height={1000}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={draggable}
        className={className}
      />
    </picture>
  )
}

import "./OptimizedImage.module.css";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** First screen / LCP candidate */
  priority?: boolean;
  /** Optional WebP (or AVIF) URL — add via build pipeline if desired */
  modernSrc?: string;
};

export function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  modernSrc,
}: Props) {
  if (modernSrc) {
    return (
      <picture>
        <source srcSet={modernSrc} type="image/webp" />
        <img
          src={src}
          alt={alt}
          className={className}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </picture>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

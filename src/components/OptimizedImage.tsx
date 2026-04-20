import { useState } from "react";
import styles from "./OptimizedImage.module.css";

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
  const [loaded, setLoaded] = useState(false);
  const mergedClassName = `${styles.imageBase} ${loaded ? styles.imageLoaded : ""} ${className ?? ""}`.trim();

  if (modernSrc) {
    return (
      <picture>
        <source srcSet={modernSrc} type="image/webp" />
        <img
          src={src}
          alt={alt}
          className={mergedClassName}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
        />
      </picture>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={mergedClassName}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onLoad={() => setLoaded(true)}
    />
  );
}

"use client";

import { useState, type ReactNode } from "react";

/**
 * Affiche la photo, et bascule sur le rendu graphique si elle ne charge pas.
 * Une URL cassée ne doit jamais produire un trou dans la page.
 */
export function FrameImage({
  src,
  alt,
  fallback,
}: {
  src: string;
  alt: string;
  fallback: ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

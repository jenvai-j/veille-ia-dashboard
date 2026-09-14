import { photo } from "@/data/photos";

type Props = {
  slot: string;
  className?: string;
  /** Assombrit le visuel pour poser du texte par-dessus. */
  scrim?: "none" | "soft" | "strong";
  children?: React.ReactNode;
  priority?: boolean;
};

/**
 * Cadre visuel. Affiche la photo de l'emplacement si elle existe, sinon un
 * rendu procédural bi-ton déterministe (dérivé du seed) qui reste dans la
 * direction artistique de la destination.
 */
export function Frame({ slot, className = "", scrim = "soft", children }: Props) {
  const p = photo(slot);
  const [dark, light] = p.duotone;
  const a = (p.seed * 37) % 100;
  const b = (p.seed * 53) % 100;
  const c = (p.seed * 71) % 100;
  const angle = (p.seed * 29) % 360;

  const scrimStyle =
    scrim === "none"
      ? undefined
      : scrim === "strong"
        ? "linear-gradient(to top, rgba(8,9,10,.96) 4%, rgba(8,9,10,.55) 45%, rgba(8,9,10,.25) 100%)"
        : "linear-gradient(to top, rgba(8,9,10,.88) 0%, rgba(8,9,10,.25) 55%, rgba(8,9,10,.05) 100%)";

  return (
    <div
      className={`relative isolate overflow-hidden grain ${className}`}
      style={{ background: dark }}
      role="img"
      aria-label={p.subject}
    >
      {p.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={p.src}
          alt={p.subject}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 drift">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(62% 48% at ${a}% ${b}%, ${light}cc 0%, transparent 62%),
                radial-gradient(48% 62% at ${c}% ${(a + 40) % 100}%, ${light}66 0%, transparent 70%),
                radial-gradient(90% 70% at ${(b + 60) % 100}% 110%, ${dark} 20%, transparent 80%),
                linear-gradient(${angle}deg, ${dark} 0%, ${light}33 55%, ${dark} 100%)
              `,
            }}
          />
          <div
            className="absolute inset-0 opacity-40 mix-blend-soft-light"
            style={{
              background: `repeating-linear-gradient(${angle + 90}deg, transparent 0 22px, ${light}22 22px 23px)`,
            }}
          />
        </div>
      )}

      {scrimStyle && (
        <div
          className="absolute inset-0"
          style={{ background: scrimStyle }}
          aria-hidden
        />
      )}

      {children && <div className="relative h-full w-full">{children}</div>}
    </div>
  );
}

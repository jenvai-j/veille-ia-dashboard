import { ExternalLink } from "lucide-react";
import type { Venue } from "@/data/types";

export function Venues({ venues }: { venues: Venue[] }) {
  return (
    <>
      <ul className="grid gap-3 sm:grid-cols-2">
        {venues.map((v) => (
          <li
            key={v.name}
            className="rounded-2xl border border-bone/10 bg-ink-2 p-5"
          >
            <p className="text-[10px] tracking-[0.18em] text-mute uppercase">
              {v.kind}
            </p>
            <p className="display mt-1.5 text-xl">{v.name}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-mute">{v.blurb}</p>
            {v.link && (
              <a
                href={v.link}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold underline underline-offset-4"
                style={{ color: "var(--accent-1)" }}
              >
                Voir leurs photos officielles
                <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[12px] leading-relaxed text-mute">
        On ne reproduit pas les photos de ces établissements. Les liens renvoient
        vers leurs comptes officiels, où les images sont à jour.
      </p>
    </>
  );
}

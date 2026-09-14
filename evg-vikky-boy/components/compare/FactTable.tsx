import { ExternalLink } from "lucide-react";
import { FACTS } from "@/data/comparison";

function Verdict({ winner }: { winner: (typeof FACTS)[number]["winner"] }) {
  if (winner === "none")
    return (
      <span className="rounded-full bg-bone/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-mute uppercase">
        Pas de gagnant
      </span>
    );
  if (winner === "tie")
    return (
      <span className="rounded-full bg-bone/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-mute uppercase">
        Égalité
      </span>
    );
  return (
    <span className="rounded-full bg-bone px-2.5 py-1 text-[10px] font-bold tracking-wide text-ink uppercase">
      {winner === "tenerife" ? "🇮🇨 Tenerife" : "🇲🇦 Marrakech"}
    </span>
  );
}

export function FactTable() {
  return (
    <ul className="space-y-3">
      {FACTS.map((f) => (
        <li
          key={f.criterion}
          className="rounded-2xl border border-bone/10 bg-ink-2 p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="flex items-center gap-2 text-[14px] font-semibold">
              <span aria-hidden>{f.icon}</span>
              {f.criterion}
            </p>
            <Verdict winner={f.winner} />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div
              data-theme="ocean"
              className="rounded-xl border-l-2 bg-bone/[0.03] px-4 py-3"
              style={{ borderColor: "var(--accent-1)" }}
            >
              <p className="text-[10px] tracking-[0.18em] text-mute uppercase">
                🇮🇨 Tenerife
              </p>
              <p className="mt-1 text-[13px] leading-relaxed">{f.tenerife}</p>
            </div>
            <div
              data-theme="desert"
              className="rounded-xl border-l-2 bg-bone/[0.03] px-4 py-3"
              style={{ borderColor: "var(--accent-1)" }}
            >
              <p className="text-[10px] tracking-[0.18em] text-mute uppercase">
                🇲🇦 Marrakech
              </p>
              <p className="mt-1 text-[13px] leading-relaxed">{f.marrakech}</p>
            </div>
          </div>

          {f.nuance && (
            <p className="mt-3 text-[12px] leading-relaxed text-amber-200/75">
              {f.nuance}
            </p>
          )}

          {f.sourceUrl && (
            <a
              href={f.sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 inline-flex items-center gap-1 text-[11px] text-mute underline underline-offset-4 hover:text-bone"
            >
              {f.source}
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

"use client";

import { useState } from "react";
import { ExternalLink, TrendingDown, TrendingUp, Users } from "lucide-react";
import { StatusTag } from "@/components/ui/StatusTag";
import { useTrip } from "@/lib/trip-context";
import { computeBudget, euro } from "@/lib/pricing";
import {
  PAYER_COUNT,
  PRICES_CHECKED_AT,
  PRICING_BASIS,
  TRAVELERS,
  WITHDRAWN,
} from "@/data/trip";
import type { Destination } from "@/data/types";

export function BudgetBreakdown({ destination }: { destination: Destination }) {
  const { departure, optionsFor, toggleOption, isOptionOn } = useTrip();
  const [perPayer, setPerPayer] = useState(true);
  const budget = computeBudget(destination, departure, optionsFor(destination.slug));

  const shown = budget.lines.filter((l) => l.included);
  const max = Math.max(...shown.map((l) => l.amount), 1);
  const convert = (v: number) => (perPayer ? (v * TRAVELERS) / PAYER_COUNT : v);

  return (
    <div>
      {/* Total */}
      <div className="glass rounded-3xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow mb-1.5">Budget de travail</p>
            <p className="display text-[clamp(2.6rem,12vw,4rem)]">
              ≈ {euro(perPayer ? budget.perPayer : budget.perTraveler)}
            </p>
            <p className="mt-1 text-[12px] text-mute">
              {perPayer
                ? `par payeur · ${PAYER_COUNT} payeurs · part de Vikky comprise`
                : `par voyageur · ${TRAVELERS} voyageurs`}
            </p>
          </div>
          <button
            onClick={() => setPerPayer((v) => !v)}
            className="shrink-0 rounded-full px-3 py-2 text-[11px] font-semibold ring-1 ring-bone/25 transition active:scale-95"
          >
            {perPayer ? "Voir /voyageur" : "Voir /payeur"}
          </button>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-bone/10 pt-4 text-[12px]">
          <div>
            <dt className="text-mute">Fourchette réaliste</dt>
            <dd className="mt-0.5 font-semibold">
              {euro(
                perPayer
                  ? budget.payerRange[0]
                  : (budget.payerRange[0] * PAYER_COUNT) / TRAVELERS,
              )}
              {" → "}
              {euro(
                perPayer
                  ? budget.payerRange[1]
                  : (budget.payerRange[1] * PAYER_COUNT) / TRAVELERS,
              )}
            </dd>
          </div>
          <div>
            <dt className="text-mute">Cadrage initial, même périmètre</dt>
            <dd className="mt-0.5 flex items-center gap-1.5 font-semibold">
              <span className="text-mute line-through">
                {euro(perPayer ? budget.v0PerPayer : (budget.v0PerPayer * PAYER_COUNT) / TRAVELERS)}
              </span>
              {budget.perPayer !== budget.v0PerPayer && (
                <span
                  className={
                    budget.perPayer > budget.v0PerPayer
                      ? "text-rose-300"
                      : "text-emerald-300"
                  }
                >
                  {budget.perPayer > budget.v0PerPayer ? (
                    <TrendingUp className="inline h-3.5 w-3.5" aria-hidden />
                  ) : (
                    <TrendingDown className="inline h-3.5 w-3.5" aria-hidden />
                  )}{" "}
                  {budget.perPayer > budget.v0PerPayer ? "+" : ""}
                  {euro(budget.perPayer - budget.v0PerPayer)}
                </span>
              )}
            </dd>
          </div>
        </dl>
      </div>

      {/* Lignes */}
      <ul className="mt-4 space-y-2.5">
        {budget.lines.map(({ line, amount, deltaV0, included }) => {
          const optional = Boolean(line.optional);
          const width = included ? Math.max(6, (amount / max) * 100) : 0;

          return (
            <li
              key={line.id}
              className={`rounded-2xl border p-4 transition ${
                included
                  ? "border-bone/10 bg-ink-2"
                  : "border-dashed border-bone/15 bg-transparent opacity-60"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="flex items-start gap-2 text-[14px] font-semibold">
                    <span aria-hidden>{line.icon}</span>
                    <span className="leading-snug">{line.label}</span>
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    <StatusTag
                      status={optional && !included ? "OPTIONAL" : line.price.status}
                      compact
                    />
                    {line.shared && (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium whitespace-nowrap text-sky-200 ring-1 ring-sky-400/25">
                        <Users className="h-3 w-3" aria-hidden />
                        Coût partagé
                      </span>
                    )}
                    {line.price.range && (
                      <span className="text-[11px] text-mute">
                        marché {euro(convert(line.price.range[0]))}–
                        {euro(convert(line.price.range[1]))}
                      </span>
                    )}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-[15px] font-bold tabular-nums">
                    {euro(convert(amount))}
                  </p>
                  {deltaV0 !== 0 && (
                    <p className="text-[11px] text-mute">
                      <span className="line-through">
                        {euro(convert(line.price.v0))}
                      </span>{" "}
                      <span
                        className={deltaV0 > 0 ? "text-rose-300" : "text-emerald-300"}
                      >
                        {deltaV0 > 0 ? "+" : ""}
                        {euro(convert(deltaV0))}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {included && (
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-bone/10">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${width}%`, background: "var(--accent-1)" }}
                  />
                </div>
              )}

              {line.price.note && (
                <p className="mt-3 text-[12px] leading-relaxed text-mute">
                  {line.price.note}
                </p>
              )}

              {optional && line.optionNote && (
                <p className="mt-2 text-[12px] leading-relaxed text-violet-200/70">
                  {line.optionNote}
                </p>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-3">
                {line.price.sourceUrl ? (
                  <a
                    href={line.price.sourceUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 text-[11px] text-mute underline underline-offset-4 hover:text-bone"
                  >
                    {line.price.source}
                    <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                ) : (
                  <span className="text-[11px] text-mute">{line.price.source}</span>
                )}

                {optional && (
                  <button
                    onClick={() => toggleOption(destination.slug, line.id)}
                    className={`ml-auto rounded-full px-3 py-1.5 text-[11px] font-semibold transition active:scale-95 ${
                      isOptionOn(destination.slug, line.id)
                        ? "bg-bone text-ink"
                        : "ring-1 ring-bone/25"
                    }`}
                  >
                    {isOptionOn(destination.slug, line.id)
                      ? "Retirer du budget"
                      : "Ajouter au budget"}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {WITHDRAWN.length > 0 && (
        <div className="mt-5 rounded-xl border border-amber-400/25 bg-amber-400/8 p-4">
          <p className="flex items-center gap-2 text-[13px] font-bold text-amber-200">
            <Users className="h-4 w-4 shrink-0" aria-hidden />
            Le groupe est passé de {PRICING_BASIS} à {TRAVELERS}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-amber-100/75">
            {WITHDRAWN.map((w) => w.name).join(", ")} ne vient plus. Les lignes
            marquées « coût partagé » (logement, table réservée, véhicules) ne
            baissent pas pour autant : elles se redivisent sur une personne de
            moins, donc chacun paie davantage. La part de Vikky se répartit
            elle aussi sur {PAYER_COUNT} payeurs au lieu de {PRICING_BASIS - 1}.
            Les prix par tête, eux, sont inchangés.
          </p>
        </div>
      )}

      <p className="mt-4 rounded-xl border border-bone/10 bg-ink-2 p-4 text-[12px] leading-relaxed text-mute">
        Prix relevés le{" "}
        {new Date(PRICES_CHECKED_AT).toLocaleDateString("fr-FR")} sur les sites
        des prestataires. Aucune réservation n&apos;est effectuée. Les montants
        barrés sont ceux du cadrage initial, conservés pour garder la trace des
        écarts.
      </p>
    </div>
  );
}

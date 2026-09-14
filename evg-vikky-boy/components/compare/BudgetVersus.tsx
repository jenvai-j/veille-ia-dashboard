"use client";

import { ALL_DESTINATIONS } from "@/data";
import { useTrip } from "@/lib/trip-context";
import { computeBudget, euro } from "@/lib/pricing";
import { SCENARIOS } from "@/data/trip";

export function BudgetVersus() {
  const { departure, optionsFor } = useTrip();

  const rows = ALL_DESTINATIONS.map((d) => ({
    d,
    b: computeBudget(d, departure, optionsFor(d.slug)),
  }));
  const gap = Math.abs(rows[0].b.perPayer - rows[1].b.perPayer);
  const max = Math.max(...rows.map((r) => r.b.payerRange[1]));

  return (
    <div className="rounded-2xl border border-bone/10 bg-ink-2 p-6">
      <p className="text-[14px] font-semibold">
        💰 Budget par payeur · {SCENARIOS[departure].label}
      </p>

      <div className="mt-5 space-y-5">
        {rows.map(({ d, b }) => (
          <div key={d.slug} data-theme={d.theme}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[13px] font-semibold">
                {d.flag} {d.name}
              </span>
              <span className="display text-xl">≈ {euro(b.perPayer)}</span>
            </div>
            <div className="relative mt-2 h-2.5 w-full overflow-hidden rounded-full bg-bone/10">
              <div
                className="absolute inset-y-0 rounded-full opacity-35"
                style={{
                  left: `${(b.payerRange[0] / max) * 100}%`,
                  width: `${((b.payerRange[1] - b.payerRange[0]) / max) * 100}%`,
                  background: "var(--accent-1)",
                }}
              />
              <div
                className="absolute inset-y-0 w-1 rounded-full"
                style={{
                  left: `calc(${(b.perPayer / max) * 100}% - 2px)`,
                  background: "var(--accent-1)",
                }}
              />
            </div>
            <p className="mt-1.5 text-[11px] text-mute">
              fourchette {euro(b.payerRange[0])} → {euro(b.payerRange[1])}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-5 border-t border-bone/10 pt-4 text-[13px] leading-relaxed text-mute">
        <span className="font-semibold text-bone">
          Écart actuel : {euro(gap)}.
        </span>{" "}
        C&apos;est moins que l&apos;incertitude sur le seul prix des vols à seize
        mois du départ. Le budget ne départage donc pas les deux destinations, et
        il ne faut pas voter là-dessus. Les options que tu actives sur chaque page
        pèsent bien plus lourd que l&apos;écart entre les deux.
      </p>
    </div>
  );
}

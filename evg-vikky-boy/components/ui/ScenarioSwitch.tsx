"use client";

import { useTrip } from "@/lib/trip-context";
import { SCENARIOS } from "@/data/trip";
import { computeBudget, euro } from "@/lib/pricing";
import type { Departure, Destination } from "@/data/types";

const ORDER: Departure[] = ["tue", "wed"];

export function ScenarioSwitch({
  compact = false,
  destination,
}: {
  compact?: boolean;
  /** Si fourni, affiche le coût marginal de la journée pleine supplémentaire. */
  destination?: Destination;
}) {
  const { departure, setDeparture, optionsFor } = useTrip();

  const marginal = destination
    ? computeBudget(destination, "tue", optionsFor(destination.slug)).perPayer -
      computeBudget(destination, "wed", optionsFor(destination.slug)).perPayer
    : null;

  return (
    <div className="w-full">
      <div
        className="glass grid grid-cols-2 gap-1 rounded-2xl p-1"
        role="radiogroup"
        aria-label="Date de départ"
      >
        {ORDER.map((id) => {
          const s = SCENARIOS[id];
          const on = departure === id;
          return (
            <button
              key={id}
              role="radio"
              aria-checked={on}
              onClick={() => setDeparture(id)}
              className={`rounded-xl px-3 py-2.5 text-left transition ${
                on ? "bg-bone text-ink" : "text-bone/70 hover:text-bone"
              }`}
            >
              <span className="block text-[13px] leading-tight font-bold">
                {s.label}
              </span>
              <span
                className={`block text-[11px] leading-tight ${on ? "text-ink/60" : "text-mute"}`}
              >
                {s.nights} nuits · {s.fullDays} journées pleines
              </span>
            </button>
          );
        })}
      </div>

      {!compact && (
        <p className="mt-2.5 px-1 text-[12px] leading-relaxed text-mute">
          {SCENARIOS[departure].pitch}
          {marginal !== null && marginal > 0 && (
            <>
              {" "}
              <span className="text-bone">
                La 4ᵉ journée pleine coûte {euro(marginal)} de plus par payeur.
              </span>
            </>
          )}
        </p>
      )}
    </div>
  );
}

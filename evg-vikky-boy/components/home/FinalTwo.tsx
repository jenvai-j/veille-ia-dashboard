"use client";

import { ALL_DESTINATIONS } from "@/data";
import { DestinationCard } from "./DestinationCard";
import { ScenarioSwitch } from "@/components/ui/ScenarioSwitch";
import { Reveal } from "@/components/ui/Reveal";
import { useTrip } from "@/lib/trip-context";
import { SCENARIOS, PRICES_CHECKED_AT } from "@/data/trip";

export function FinalTwo() {
  const { departure } = useTrip();
  const s = SCENARIOS[departure];

  return (
    <section id="final-two" className="px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <p className="overline mb-3">Les deux finalistes</p>
          <h2 className="display text-[clamp(2.4rem,9vw,5rem)]">The Final Two</h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-mute">
            Deux EVG très différents, chiffrés au même niveau de détail. Les prix
            affichés sont des budgets de travail vérifiés le{" "}
            {new Date(PRICES_CHECKED_AT).toLocaleDateString("fr-FR")}, pas des
            réservations.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-8 max-w-md">
          <p className="overline mb-2.5">On part quand ?</p>
          <ScenarioSwitch />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {ALL_DESTINATIONS.map((d, i) => (
            <Reveal key={d.slug} delay={0.1 + i * 0.08}>
              <DestinationCard destination={d} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <p className="mt-6 text-center text-[12px] text-mute">
            Scénario affiché : {s.label} · {s.nights} nuits · {s.fullDays}{" "}
            journées pleines
          </p>
        </Reveal>
      </div>
    </section>
  );
}

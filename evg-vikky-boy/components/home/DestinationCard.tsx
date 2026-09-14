"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Frame } from "@/components/ui/Frame";
import { useTrip } from "@/lib/trip-context";
import { computeBudget, euro } from "@/lib/pricing";
import type { Destination } from "@/data/types";

export function DestinationCard({ destination }: { destination: Destination }) {
  const { departure, optionsFor } = useTrip();
  const budget = computeBudget(destination, departure, optionsFor(destination.slug));

  return (
    <Link
      href={`/${destination.slug}`}
      data-theme={destination.theme}
      className="group relative block overflow-hidden rounded-3xl ring-1 ring-bone/10 transition active:scale-[0.99]"
    >
      <Frame
        slot={destination.heroPhoto}
        scrim="strong"
        className="h-[480px] w-full sm:h-[560px]"
      >
        <div className="flex h-full flex-col justify-end p-6 sm:p-7">
          <p className="eyebrow mb-2" style={{ color: "var(--accent-1)" }}>
            {destination.flag} {destination.flight.duration}
          </p>

          <h3 className="display text-[clamp(2.6rem,11vw,4rem)]">
            {destination.name}
          </h3>

          <p className="editorial mt-1 text-[clamp(1rem,4.2vw,1.35rem)] text-bone/85">
            {destination.baseline}
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {destination.badges.slice(0, 4).map((b) => (
              <span
                key={b.label}
                className="glass rounded-full px-2.5 py-1 text-[11px] font-medium"
              >
                {b.icon} {b.label}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-end justify-between gap-4 border-t border-bone/15 pt-4">
            <div>
              <p className="text-[11px] tracking-wide text-mute uppercase">
                Budget de travail
              </p>
              <p className="display text-[clamp(1.6rem,7vw,2.2rem)]">
                ≈ {euro(budget.perPayer)}
              </p>
              <p className="text-[11px] text-mute">
                par payeur · part de Vikky comprise
              </p>
            </div>
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition group-hover:translate-x-1"
              style={{ background: "var(--accent-1)", color: "#08090A" }}
              aria-hidden
            >
              <ArrowRight className="h-5 w-5" />
            </span>
          </div>
        </div>
      </Frame>
    </Link>
  );
}

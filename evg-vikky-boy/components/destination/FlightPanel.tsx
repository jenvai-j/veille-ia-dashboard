"use client";

import { AlertTriangle, ExternalLink, Plane } from "lucide-react";
import { useTrip } from "@/lib/trip-context";
import type { FlightInfo } from "@/data/types";

export function FlightPanel({ flight }: { flight: FlightInfo }) {
  const { departure } = useTrip();
  const tuesdayIssue = departure === "tue" ? flight.tuesdayAirport : undefined;

  return (
    <div className="rounded-2xl border border-bone/10 bg-ink-2 p-6">
      <p className="flex items-center gap-2 text-[14px] font-semibold">
        <Plane className="h-4 w-4" style={{ color: "var(--accent-1)" }} aria-hidden />
        {flight.route}
      </p>

      <dl className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <dt className="text-[11px] text-mute uppercase">Durée</dt>
          <dd className="mt-0.5 text-[14px] font-semibold">{flight.duration}</dd>
        </div>
        <div>
          <dt className="text-[11px] text-mute uppercase">Compagnies</dt>
          <dd className="mt-0.5 text-[14px] font-semibold">{flight.airlines}</dd>
        </div>
        <div>
          <dt className="text-[11px] text-mute uppercase">Fréquence</dt>
          <dd className="mt-0.5 text-[14px] font-semibold">
            {flight.weeklyFrequency}
          </dd>
        </div>
      </dl>

      {flight.constraint && (
        <p className="mt-4 text-[13px] leading-relaxed text-mute">
          {flight.constraint}
        </p>
      )}

      {tuesdayIssue && (
        <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/8 p-4">
          <p className="flex items-center gap-2 text-[13px] font-bold text-amber-200">
            <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden />
            Départ mardi soir : décollage depuis {tuesdayIssue.airport}, pas CDG
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-amber-100/70">
            {tuesdayIssue.reason}
          </p>
        </div>
      )}

      <a
        href={flight.sourceUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-4 inline-flex items-center gap-1 text-[11px] text-mute underline underline-offset-4 hover:text-bone"
      >
        {flight.source}
        <ExternalLink className="h-3 w-3" aria-hidden />
      </a>
    </div>
  );
}

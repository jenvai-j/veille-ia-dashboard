"use client";

import { AlertTriangle } from "lucide-react";
import { StatusTag } from "@/components/ui/StatusTag";
import { useTrip } from "@/lib/trip-context";
import { SCENARIOS } from "@/data/trip";
import type { Destination, Moment } from "@/data/types";

const MOMENT_LABEL: Record<Moment, string> = {
  morning: "Matin",
  afternoon: "Après-midi",
  sunset: "Coucher de soleil",
  evening: "Soirée",
  night: "Nuit",
};

export function DayTimeline({ destination }: { destination: Destination }) {
  const { departure } = useTrip();
  const scenario = SCENARIOS[departure];
  const days = destination.days.filter((d) => d.availableIn.includes(departure));

  return (
    <div>
      <p className="mb-6 text-[13px] text-mute">
        Scénario {scenario.label} · {scenario.nights} nuits ·{" "}
        <span className="font-semibold text-bone">
          {scenario.fullDays} journées pleines
        </span>{" "}
        (les jours d&apos;arrivée et de retour dépendent des horaires de vol)
      </p>

      <ol className="space-y-4">
        {days.map((day) => {
          const blocks = day.blocksByDeparture?.[departure] ?? day.blocks;

          return (
            <li
              key={day.id}
              className="overflow-hidden rounded-2xl border border-bone/10 bg-ink-2"
            >
              <div
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-bone/10 px-5 py-4"
                style={{
                  background:
                    "linear-gradient(90deg, color-mix(in srgb, var(--accent-1) 12%, transparent), transparent)",
                }}
              >
                <span className="text-[12px] font-bold tracking-widest text-mute uppercase">
                  {day.label}
                </span>
                <span className="display text-xl" style={{ color: "var(--accent-1)" }}>
                  {day.codename}
                </span>
              </div>

              {day.flightNote && (
                <p className="flex items-start gap-2 border-b border-bone/10 bg-amber-400/5 px-5 py-3 text-[12px] leading-relaxed text-amber-200/85">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                  {day.flightNote}
                </p>
              )}

              <ul className="divide-y divide-bone/5">
                {blocks.map((block, i) => {
                  const isOptionalBlock = Boolean(block.optional);

                  return (
                    <li
                      key={`${day.id}-${i}`}
                      className={`flex gap-4 px-5 py-4 ${
                        isOptionalBlock ? "opacity-70" : ""
                      }`}
                    >
                      <div className="flex w-10 shrink-0 flex-col items-center">
                        <span className="text-xl leading-none" aria-hidden>
                          {block.icon}
                        </span>
                        <span className="mt-2 w-px flex-1 bg-bone/10" aria-hidden />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] tracking-[0.18em] text-mute uppercase">
                          {MOMENT_LABEL[block.moment]}
                        </p>
                        <p className="mt-1 text-[15px] leading-snug font-semibold">
                          {block.title}
                        </p>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-mute">
                          {block.body}
                        </p>
                        {(block.status === "TO_VERIFY" ||
                          block.status === "OPTIONAL") && (
                          <div className="mt-2.5">
                            <StatusTag status={block.status} compact />
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

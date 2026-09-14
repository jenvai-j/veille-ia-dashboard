import { ExternalLink } from "lucide-react";
import type { Weather } from "@/data/types";

export function WeatherPanel({ weather }: { weather: Weather }) {
  const stats = [
    { label: "Journée", value: `${weather.dayHigh[0]}–${weather.dayHigh[1]}°C` },
    { label: "Nuit", value: `${weather.nightLow[0]}–${weather.nightLow[1]}°C` },
    weather.seaTemp
      ? { label: "Mer", value: `${weather.seaTemp}°C` }
      : { label: "Soleil", value: `${weather.sunHours ?? "—"} h/j` },
    { label: "Jours de pluie", value: `${weather.rainyDays ?? "—"}/mois` },
  ];

  return (
    <div className="glass rounded-2xl p-6">
      <dl className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="text-[11px] tracking-wide text-mute uppercase">
              {s.label}
            </dt>
            <dd className="display mt-1 text-2xl" style={{ color: "var(--accent-1)" }}>
              {s.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 border-t border-bone/10 pt-4 text-[13px] leading-relaxed text-mute">
        {weather.caveat}
      </p>

      <a
        href={weather.sourceUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-3 inline-flex items-center gap-1 text-[11px] text-mute underline underline-offset-4 hover:text-bone"
      >
        {weather.source}
        <ExternalLink className="h-3 w-3" aria-hidden />
      </a>
    </div>
  );
}

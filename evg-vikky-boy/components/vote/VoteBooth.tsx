"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, CircleAlert, CloudOff, RefreshCw } from "lucide-react";
import { ALL_DESTINATIONS } from "@/data";
import { PAYERS, PAYER_COUNT } from "@/data/trip";
import { useTrip } from "@/lib/trip-context";
import { useVotes, type Choice } from "@/lib/use-votes";
import { computeBudget, euro } from "@/lib/pricing";

export function VoteBooth() {
  const { seen } = useTrip();
  const { tally, total, myVote, error, refreshing, lastSync, submit, refresh } =
    useVotes();
  const [name, setName] = useState<string>(myVote?.name ?? "");
  const [busy, setBusy] = useState(false);

  const missing = ALL_DESTINATIONS.filter((d) => !seen.includes(d.slug));

  async function pick(choice: Choice) {
    if (!name) return;
    setBusy(true);
    await submit(name, choice);
    setBusy(false);
  }

  return (
    <div>
      {missing.length > 0 && (
        <div className="mb-6 rounded-2xl border border-amber-400/25 bg-amber-400/8 p-5">
          <p className="flex items-center gap-2 text-[13px] font-bold text-amber-200">
            <CircleAlert className="h-4 w-4 shrink-0" aria-hidden />
            Tu n&apos;as pas encore ouvert {missing.map((m) => m.name).join(" ni ")}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-amber-100/70">
            Rien ne t&apos;empêche de voter, mais ce serait dommage. Les deux plans
            se valent, et le second surprend souvent.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {missing.map((m) => (
              <Link
                key={m.slug}
                href={`/${m.slug}`}
                className="rounded-full bg-amber-200/15 px-4 py-2 text-[12px] font-semibold text-amber-100"
              >
                Voir {m.flag} {m.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Etape 1 : identite */}
      <p className="eyebrow mb-3">1 · Qui es-tu ?</p>
      <div className="flex flex-wrap gap-2">
        {PAYERS.map((p) => (
          <button
            key={p}
            onClick={() => setName(p)}
            className={`rounded-full px-4 py-2.5 text-[13px] font-semibold transition active:scale-95 ${
              name === p ? "bg-bone text-ink" : "ring-1 ring-bone/25 hover:bg-bone/5"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Etape 2 : choix */}
      <p className="eyebrow mt-10 mb-3">2 · On emmène Vikky où ?</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {ALL_DESTINATIONS.map((d) => {
          const chosen = myVote?.choice === d.slug;
          const budget = computeBudget(d, "wed", []);
          return (
            <button
              key={d.slug}
              data-theme={d.theme}
              disabled={!name || busy}
              onClick={() => pick(d.slug)}
              className={`relative overflow-hidden rounded-3xl p-6 text-left transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 ${
                chosen ? "ring-2" : "ring-1 ring-bone/15"
              }`}
              style={{
                background: chosen
                  ? "color-mix(in srgb, var(--accent-1) 16%, #101114)"
                  : "#101114",
                ...(chosen ? { borderColor: "var(--accent-1)" } : {}),
              }}
            >
              {chosen && (
                <span
                  className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full"
                  style={{ background: "var(--accent-1)", color: "#08090A" }}
                >
                  <Check className="h-4 w-4" aria-hidden />
                </span>
              )}
              <p className="text-3xl" aria-hidden>
                {d.flag}
              </p>
              <p className="display mt-2 text-[clamp(1.6rem,7vw,2.2rem)]">
                Team {d.name}
              </p>
              <p className="mt-1 text-[13px] text-mute">{d.baseline}</p>
              <p className="mt-3 text-[12px] text-mute">
                ≈ {euro(budget.perPayer)} par payeur
              </p>
            </button>
          );
        })}
      </div>

      {!name && (
        <p className="mt-3 text-[12px] text-mute">
          Choisis d&apos;abord ton prénom pour débloquer le vote.
        </p>
      )}

      {myVote && (
        <p className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-400/5 px-4 py-3 text-[13px] text-emerald-200">
          <Check className="h-4 w-4 shrink-0" aria-hidden />
          <span>
            <strong>{myVote.name}</strong>, ton vote pour{" "}
            <strong>
              {myVote.choice === "tenerife" ? "Tenerife" : "Marrakech"}
            </strong>{" "}
            est enregistré. Tu peux en changer jusqu&apos;à la clôture.
          </span>
        </p>
      )}

      {/* Resultats */}
      <div className="mt-12">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="eyebrow">
            Résultats · {total}/{PAYER_COUNT}
          </p>
          <button
            onClick={() => void refresh()}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 text-[12px] text-mute transition hover:text-bone disabled:opacity-60"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`}
              aria-hidden
            />
            {refreshing
              ? "Mise à jour…"
              : lastSync
                ? `À jour à ${lastSync.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`
                : "Actualiser"}
          </button>
        </div>

        <div className="space-y-4">
          {ALL_DESTINATIONS.map((d) => {
            const count = tally.counts[d.slug];
            const pct = total ? (count / total) * 100 : 0;
            return (
              <div key={d.slug} data-theme={d.theme}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[13px] font-semibold">
                    {d.flag} {d.name}
                  </span>
                  <span className="display text-xl tabular-nums">
                    {count} {count > 1 ? "votes" : "vote"}
                  </span>
                </div>
                <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-bone/10">
                  <div
                    className="h-full rounded-full transition-[width] duration-700 ease-out"
                    style={{ width: `${pct}%`, background: "var(--accent-1)" }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {tally.votes.length > 0 && (
          <p className="mt-5 text-[12px] leading-relaxed text-mute">
            Ont voté :{" "}
            {tally.votes.map((v) => v.name).join(", ")}
            {total < PAYER_COUNT && (
              <>
                {" "}· Manquent :{" "}
                {PAYERS.filter(
                  (p) => !tally.votes.some((v) => v.name === p),
                ).join(", ")}
              </>
            )}
          </p>
        )}

        {tally.mode === "local" && (
          <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-bone/10 bg-ink-2 p-4 text-[12px] leading-relaxed text-mute">
            <CloudOff className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
            <span>
              Les votes du groupe ne sont pas encore synchronisés. Ton choix est
              bien gardé sur cet appareil, et les totaux apparaîtront ici dès que
              la synchro sera active. Personne n&apos;aura à revoter.
            </span>
          </p>
        )}

      </div>
    </div>
  );
}

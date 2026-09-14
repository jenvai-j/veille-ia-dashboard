"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Countdown } from "@/components/vote/Countdown";
import { useVotes } from "@/lib/use-votes";
import { useTrip } from "@/lib/trip-context";
import { PAYER_COUNT } from "@/data/trip";
import { ALL_DESTINATIONS } from "@/data";

const STEPS = [
  {
    n: "1",
    title: "Ouvre les deux plans",
    body: "Tenerife et Marrakech. Programme jour par jour, budget détaillé, ce qui est confirmé et ce qui ne l'est pas.",
  },
  {
    n: "2",
    title: "Compare",
    body: "Les faits chiffrés d'un côté, ce que chaque destination apporte de l'autre. Aucune des deux ne gagne sur tout.",
  },
  {
    n: "3",
    title: "Vote",
    body: "Un vote par personne, modifiable jusqu'à la clôture. C'est ce vote qui décide, donc il faut les 7.",
  },
];

export function HowItWorks() {
  const { seen } = useTrip();
  const { total, myVote } = useVotes();

  const done = [
    seen.includes("tenerife") && seen.includes("marrakech"),
    seen.includes("tenerife") && seen.includes("marrakech"),
    Boolean(myVote),
  ];

  return (
    <section className="border-y border-bone/10 bg-ink-2 px-5 py-14 sm:px-8 md:py-20">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="md:max-w-md">
            <p className="eyebrow mb-3">Ce qu&apos;on attend de toi</p>
            <h2 className="display text-[clamp(2rem,8vw,3.4rem)]">
              3 étapes,
              <br />
              10 minutes
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-mute">
              On part à 8 fin janvier 2027 pour l&apos;EVG de Vikky. Deux
              destinations sont en lice, elles sont chiffrées au même niveau de
              détail. Il faut trancher, et c&apos;est vous qui tranchez.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-bone/10 bg-ink p-5">
            <Countdown />
            <div className="mt-5 border-t border-bone/10 pt-4">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[12px] text-mute">Votes reçus</span>
                <span className="display text-xl tabular-nums">
                  {total}/{PAYER_COUNT}
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-bone/10">
                <motion.div
                  className="h-full rounded-full bg-gold"
                  initial={{ width: 0 }}
                  animate={{ width: `${(total / PAYER_COUNT) * 100}%` }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>
        </div>

        <ol className="mt-10 grid gap-3 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              className={`relative rounded-2xl border p-5 transition ${
                done[i]
                  ? "border-emerald-400/30 bg-emerald-400/5"
                  : "border-bone/10 bg-ink"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold ${
                  done[i] ? "bg-emerald-400 text-ink" : "bg-bone/10 text-bone"
                }`}
              >
                {done[i] ? <Check className="h-4 w-4" aria-hidden /> : s.n}
              </span>
              <p className="mt-3 text-[15px] font-semibold">{s.title}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-mute">
                {s.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {ALL_DESTINATIONS.map((d) => (
            <Link
              key={d.slug}
              href={`/${d.slug}`}
              data-theme={d.theme}
              className="flex flex-1 items-center justify-between gap-3 rounded-2xl border border-bone/15 px-5 py-4 transition hover:bg-bone/5 active:scale-[0.99]"
            >
              <span className="text-[14px] font-semibold">
                {d.flag} Voir {d.name}
              </span>
              <ArrowRight
                className="h-4 w-4 shrink-0"
                style={{ color: "var(--accent-1)" }}
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

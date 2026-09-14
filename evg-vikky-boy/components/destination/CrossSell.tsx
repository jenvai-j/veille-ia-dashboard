"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Frame } from "@/components/ui/Frame";
import { useTrip } from "@/lib/trip-context";
import { computeBudget, euro } from "@/lib/pricing";
import type { Destination } from "@/data/types";

/**
 * Le composant le plus important du site : il empêche quiconque de voter
 * après n'avoir vu qu'une seule destination.
 */
export function CrossSell({ other }: { other: Destination }) {
  const { departure, optionsFor } = useTrip();
  const budget = computeBudget(other, departure, optionsFor(other.slug));

  return (
    <Link
      href={`/${other.slug}`}
      data-theme={other.theme}
      className="group block overflow-hidden rounded-3xl ring-1 ring-bone/10 transition active:scale-[0.99]"
    >
      <Frame slot={other.heroPhoto} scrim="strong" className="h-[280px] w-full">
        <div className="flex h-full flex-col justify-end p-6">
          <p className="overline mb-1.5">Avant de voter</p>
          <p className="display text-[clamp(1.8rem,7vw,2.6rem)]">
            Et {other.name} alors ? {other.flag}
          </p>
          <p className="mt-1.5 text-[13px] text-bone/75">
            {other.baseline} · ≈ {euro(budget.perPayer)} par payeur
          </p>
          <span
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-bold transition group-hover:gap-3"
            style={{ background: "var(--accent-1)", color: "#08090A" }}
          >
            Voir le plan {other.name}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </Frame>
    </Link>
  );
}

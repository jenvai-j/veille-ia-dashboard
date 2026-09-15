import type { BudgetLine, Departure, Destination } from "@/data/types";
import { PAYER_COUNT, PRICING_BASIS, TRAVELERS } from "@/data/trip";

export type LineComputation = {
  line: BudgetLine;
  /** Montant retenu pour ce scenario, par voyageur. */
  amount: number;
  /** Delta vs l'estimation initiale du cadrage. */
  deltaV0: number;
  included: boolean;
};

export type BudgetTotals = {
  lines: LineComputation[];
  /** Total par voyageur, base 8. */
  perTraveler: number;
  /** Total par payeur : la part de Vikky est repartie sur les 7 autres. */
  perPayer: number;
  /** Fourchette basse et haute par payeur, a partir des `range`. */
  payerRange: [number, number];
  /** Ce que donnait le cadrage initial, meme perimetre. */
  v0PerPayer: number;
};

/** La seule redistribution de la part du marie de toute l'application. */
export function toPerPayer(perTraveler: number): number {
  return (perTraveler * TRAVELERS) / PAYER_COUNT;
}

/**
 * Ramene un montant saisi sur la base PRICING_BASIS a l'effectif reel.
 * Un cout fixe se redivise, un prix par tete ne bouge pas.
 */
function forGroup(amount: number, shared?: boolean): number {
  return shared ? (amount * PRICING_BASIS) / TRAVELERS : amount;
}

export function computeBudget(
  destination: Destination,
  departure: Departure,
  enabledOptions: string[],
): BudgetTotals {
  const extraNight = departure === "tue";

  const lines: LineComputation[] = destination.budget.map((line) => {
    const included = !line.optional || enabledOptions.includes(line.id);
    const base = forGroup(
      line.price.current + (extraNight ? (line.extraNight ?? 0) : 0),
      line.shared,
    );
    return {
      line,
      amount: base,
      deltaV0: base - forGroup(line.price.v0, line.shared),
      included,
    };
  });

  const kept = lines.filter((l) => l.included);
  const perTraveler = kept.reduce((sum, l) => sum + l.amount, 0);

  const low = kept.reduce((sum, l) => {
    const r = l.line.price.range?.[0] ?? l.line.price.current;
    return (
      sum +
      forGroup(r + (extraNight ? (l.line.extraNight ?? 0) : 0), l.line.shared)
    );
  }, 0);
  const high = kept.reduce((sum, l) => {
    const r = l.line.price.range?.[1] ?? l.line.price.current;
    return (
      sum +
      forGroup(r + (extraNight ? (l.line.extraNight ?? 0) : 0), l.line.shared)
    );
  }, 0);

  const v0PerTraveler = kept.reduce(
    (sum, l) =>
      sum +
      forGroup(
        l.line.price.v0 + (extraNight ? (l.line.extraNight ?? 0) : 0),
        l.line.shared,
      ),
    0,
  );

  return {
    lines,
    perTraveler: Math.round(perTraveler),
    perPayer: Math.round(toPerPayer(perTraveler)),
    payerRange: [Math.round(toPerPayer(low)), Math.round(toPerPayer(high))],
    v0PerPayer: Math.round(toPerPayer(v0PerTraveler)),
  };
}

const EUR = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function euro(value: number): string {
  return EUR.format(Math.round(value));
}

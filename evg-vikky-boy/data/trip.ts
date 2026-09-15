import type { Departure } from "./types";

/** Le marie. Ne paie pas : sa part est repartie sur les payeurs. */
export const GROOM = "Vikky";

/** Les payeurs. Liste fermee : sert aussi de liste de vote. */
export const PAYERS = [
  "Athusan",
  "Mayooran",
  "Mahinthan",
  "Jehanan",
  "Lukshan",
  "Rathusan",
] as const;

/** Desistements, gardes pour expliquer l'evolution du budget. */
export const WITHDRAWN = [{ name: "Rajith", since: "2026-09-15" }] as const;

export const TRAVELERS = PAYERS.length + 1; // 7
export const PAYER_COUNT = PAYERS.length; // 6

/**
 * Taille du groupe pour laquelle les prix `current` ont ete releves.
 * Les lignes marquees `shared` sont redivisees a partir de cette base.
 * Ne pas y toucher en changeant la composition du groupe : c'est une
 * reference historique, pas l'effectif courant.
 */
export const PRICING_BASIS = 8;

/** Cloture du vote. */
export const VOTE_DEADLINE = "2026-09-28T23:59:59+02:00";

/** Date de la derniere verification des prix sur les sites marchands. */
export const PRICES_CHECKED_AT = "2026-09-14";

export const SCENARIOS: Record<
  Departure,
  {
    id: Departure;
    label: string;
    short: string;
    outbound: string;
    inbound: string;
    nights: number;
    fullDays: number;
    pitch: string;
  }
> = {
  wed: {
    id: "wed",
    label: "Mercredi 27 janvier",
    short: "MER 27",
    outbound: "Mercredi 27 janvier 2027",
    inbound: "Dimanche 31 janvier 2027",
    nights: 4,
    fullDays: 3,
    pitch: "Le format court. On arrive dans la journée, on repart dimanche.",
  },
  tue: {
    id: "tue",
    label: "Mardi 26 au soir",
    short: "MAR 26",
    outbound: "Mardi 26 janvier 2027, en soirée",
    inbound: "Dimanche 31 janvier 2027",
    nights: 5,
    fullDays: 4,
    pitch:
      "Une nuit de plus, une journée pleine de plus. Le meilleur rapport du voyage.",
  },
};

/**
 * Mercredi par défaut : c'est le seul scénario qui tient la cible des 1 000 €
 * par payeur sur les deux destinations. Mardi reste accessible d'un tap.
 */
export const DEFAULT_DEPARTURE: Departure = "wed";

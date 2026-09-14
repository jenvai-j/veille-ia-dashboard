import { marrakech } from "./marrakech";
import { tenerife } from "./tenerife";
import type { Destination, Slug } from "./types";

export const DESTINATIONS: Record<Slug, Destination> = { tenerife, marrakech };
export const ALL_DESTINATIONS: Destination[] = [tenerife, marrakech];

export function getDestination(slug: string): Destination | undefined {
  return slug === "tenerife" || slug === "marrakech"
    ? DESTINATIONS[slug]
    : undefined;
}

export function otherDestination(slug: Slug): Destination {
  return slug === "tenerife" ? marrakech : tenerife;
}

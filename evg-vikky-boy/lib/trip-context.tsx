"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Departure, Slug } from "@/data/types";
import { DEFAULT_DEPARTURE } from "@/data/trip";

const KEY = "evg-vikky:prefs:v1";

type Prefs = {
  departure: Departure;
  /** Options activees, prefixees par destination : "tenerife:chef". */
  options: string[];
  /** Destinations deja consultees, pour ne pas voter a l'aveugle. */
  seen: Slug[];
};

const EMPTY: Prefs = { departure: DEFAULT_DEPARTURE, options: [], seen: [] };

type Ctx = Prefs & {
  ready: boolean;
  setDeparture: (d: Departure) => void;
  toggleOption: (slug: Slug, id: string) => void;
  isOptionOn: (slug: Slug, id: string) => boolean;
  optionsFor: (slug: Slug) => string[];
  markSeen: (slug: Slug) => void;
};

const TripContext = createContext<Ctx | null>(null);

export function TripProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setPrefs({ ...EMPTY, ...(JSON.parse(raw) as Partial<Prefs>) });
    } catch {
      /* stockage indisponible : on reste sur les valeurs par defaut */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(prefs));
    } catch {
      /* ignore */
    }
  }, [prefs, ready]);

  const setDeparture = useCallback((departure: Departure) => {
    setPrefs((p) => ({ ...p, departure }));
  }, []);

  const toggleOption = useCallback((slug: Slug, id: string) => {
    const key = `${slug}:${id}`;
    setPrefs((p) => ({
      ...p,
      options: p.options.includes(key)
        ? p.options.filter((o) => o !== key)
        : [...p.options, key],
    }));
  }, []);

  const markSeen = useCallback((slug: Slug) => {
    setPrefs((p) => (p.seen.includes(slug) ? p : { ...p, seen: [...p.seen, slug] }));
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      ...prefs,
      ready,
      setDeparture,
      toggleOption,
      markSeen,
      isOptionOn: (slug, id) => prefs.options.includes(`${slug}:${id}`),
      optionsFor: (slug) =>
        prefs.options
          .filter((o) => o.startsWith(`${slug}:`))
          .map((o) => o.slice(slug.length + 1)),
    }),
    [prefs, ready, setDeparture, toggleOption, markSeen],
  );

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrip(): Ctx {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrip doit être utilisé dans un TripProvider");
  return ctx;
}

"use client";

import { useCallback, useEffect, useState } from "react";
import type { Choice, Tally, VoteRow } from "@/lib/votes";

const LOCAL_KEY = "evg-vikky:my-vote:v1";

function readLocal(): { name: string; choice: Choice } | null {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as { name: string; choice: Choice }) : null;
  } catch {
    return null;
  }
}

export function useVotes() {
  const [tally, setTally] = useState<Tally>({
    mode: "local",
    votes: [],
    counts: { tenerife: 0, marrakech: 0 },
  });
  const [myVote, setMyVote] = useState<{ name: string; choice: Choice } | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/votes", { cache: "no-store" });
      const data = (await res.json()) as Tally;
      setTally(data);
      setLastSync(new Date());
    } catch {
      /* hors ligne : on garde l'etat courant */
    } finally {
      setLoading(false);
      // Une actualisation instantanee ne se voit pas : on laisse l'indicateur
      // affiche assez longtemps pour que le geste soit percu comme pris en compte.
      setTimeout(() => setRefreshing(false), 450);
    }
  }, []);

  useEffect(() => {
    setMyVote(readLocal());
    void refresh();
  }, [refresh]);

  const submit = useCallback(
    async (name: string, choice: Choice) => {
      setError(null);
      const mine = { name, choice };
      setMyVote(mine);
      try {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(mine));
      } catch {
        /* ignore */
      }

      try {
        const res = await fetch("/api/votes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mine),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data?.error ?? "Enregistrement impossible.");
          return false;
        }
        setTally(data as Tally);
        return true;
      } catch {
        setError("Réseau indisponible. Ton choix est gardé sur cet appareil.");
        return false;
      }
    },
    [],
  );

  const total = tally.counts.tenerife + tally.counts.marrakech;

  return { tally, total, myVote, loading, refreshing, lastSync, error, submit, refresh };
}

export type { Choice, VoteRow };

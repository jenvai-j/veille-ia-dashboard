import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type Choice = "tenerife" | "marrakech";
export type VoteRow = { name: string; choice: Choice; updated_at?: string };

export type Tally = {
  mode: "shared" | "local";
  /** Les variables d'environnement sont-elles arrivées jusqu'au build ? */
  configured?: boolean;
  /** Erreur renvoyée par la base quand elle est configurée mais refuse. */
  reason?: string;
  votes: VoteRow[];
  counts: Record<Choice, number>;
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

/**
 * Supabase a renommé la clé publique « anon public » en « publishable key ».
 * Les deux noms de variable sont acceptés : la valeur joue le même rôle, et
 * imposer une seule orthographe n'apporte rien sinon des pannes silencieuses.
 *
 * Les deux références doivent rester écrites en toutes lettres : Next.js
 * remplace `process.env.NEXT_PUBLIC_*` par sa valeur à la compilation, et ne
 * sait pas le faire sur un accès dynamique.
 */
const key =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/** Le vote partagé n'est actif que si les deux variables sont renseignées. */
export const sharedVoteEnabled = Boolean(url && key);

let client: SupabaseClient | null = null;

export function supabase(): SupabaseClient | null {
  if (!sharedVoteEnabled) return null;
  client ??= createClient(url as string, key as string, {
    auth: { persistSession: false },
  });
  return client;
}

export function tallyOf(votes: VoteRow[]): Record<Choice, number> {
  return votes.reduce(
    (acc, v) => {
      if (v.choice === "tenerife" || v.choice === "marrakech") acc[v.choice] += 1;
      return acc;
    },
    { tenerife: 0, marrakech: 0 } as Record<Choice, number>,
  );
}

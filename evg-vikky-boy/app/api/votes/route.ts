import { NextResponse } from "next/server";
import { PAYERS } from "@/data/trip";
import {
  sharedVoteEnabled,
  supabase,
  tallyOf,
  type Choice,
  type VoteRow,
} from "@/lib/votes";

export const dynamic = "force-dynamic";

const VALID_NAMES = new Set<string>(PAYERS);
const VALID_CHOICES = new Set<string>(["tenerife", "marrakech"]);

function emptyPayload(mode: "shared" | "local") {
  return { mode, votes: [] as VoteRow[], counts: { tenerife: 0, marrakech: 0 } };
}

export async function GET() {
  const db = supabase();
  if (!db) return NextResponse.json(emptyPayload("local"));

  const { data, error } = await db
    .from("votes")
    .select("name, choice, updated_at")
    .order("updated_at", { ascending: true });

  if (error) {
    // Le site ne doit jamais tomber parce que le vote est indisponible.
    return NextResponse.json(emptyPayload("local"));
  }

  const votes = (data ?? []) as VoteRow[];
  return NextResponse.json({ mode: "shared", votes, counts: tallyOf(votes) });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête illisible." }, { status: 400 });
  }

  const { name, choice } = (body ?? {}) as { name?: string; choice?: string };

  if (!name || !VALID_NAMES.has(name)) {
    return NextResponse.json(
      { error: "Prénom inconnu. Choisis dans la liste." },
      { status: 400 },
    );
  }
  if (!choice || !VALID_CHOICES.has(choice)) {
    return NextResponse.json({ error: "Destination invalide." }, { status: 400 });
  }

  const db = supabase();
  if (!db) {
    return NextResponse.json(
      {
        mode: "local",
        error:
          "Le vote partagé n'est pas configuré. Ton choix est gardé sur cet appareil uniquement.",
      },
      { status: 503 },
    );
  }

  const { error } = await db
    .from("votes")
    .upsert(
      { name, choice: choice as Choice, updated_at: new Date().toISOString() },
      { onConflict: "name" },
    );

  if (error) {
    return NextResponse.json(
      { error: "Enregistrement impossible pour le moment." },
      { status: 500 },
    );
  }

  const { data } = await db.from("votes").select("name, choice, updated_at");
  const votes = (data ?? []) as VoteRow[];
  return NextResponse.json({ mode: "shared", votes, counts: tallyOf(votes) });
}


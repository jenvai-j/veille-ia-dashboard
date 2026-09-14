"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useVotes } from "@/lib/use-votes";
import { PAYER_COUNT } from "@/data/trip";

/** Barre fixe présente sur tout le site. Pression sociale douce. */
export function VoteBar() {
  const pathname = usePathname();
  const { total, myVote, loading } = useVotes();

  if (pathname === "/vote" || pathname === "/acces") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3">
      <div className="glass mx-auto flex max-w-2xl items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl shadow-black/60">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold">
            {myVote
              ? `Ton vote : ${myVote.choice === "tenerife" ? "🇮🇨 Tenerife" : "🇲🇦 Marrakech"}`
              : "Tu n'as pas encore voté"}
          </p>
          <p className="truncate text-[11px] text-mute">
            {loading ? "Chargement…" : `${total}/${PAYER_COUNT} ont voté`}
            {" · clôture le 28/09"}
          </p>
        </div>
        <Link
          href="/vote"
          className="shrink-0 rounded-full bg-bone px-5 py-2.5 text-[13px] font-bold text-ink transition active:scale-95"
        >
          {myVote ? "Changer" : "Voter"}
        </Link>
      </div>
    </div>
  );
}

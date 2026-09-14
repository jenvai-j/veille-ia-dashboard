import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Countdown } from "@/components/vote/Countdown";
import { VoteBooth } from "@/components/vote/VoteBooth";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Le vote — EVG Vikky Boy",
  description: "Tenerife ou Marrakech. Un vote par personne, jusqu'au 28 septembre.",
};

export default function VotePage() {
  return (
    <main className="px-5 pt-[max(1.5rem,env(safe-area-inset-top))] pb-24 sm:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/"
          className="glass inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Accueil
        </Link>

        <Reveal className="mt-10">
          <h1 className="display text-[clamp(2.6rem,11vw,5rem)]">
            So… where are we taking Vikky ?
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-mute">
            Un vote par personne. Tu peux changer d&apos;avis jusqu&apos;à la
            clôture.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-8">
          <Countdown />
        </Reveal>

        <Reveal delay={0.14} className="mt-12">
          <VoteBooth />
        </Reveal>
      </div>
    </main>
  );
}

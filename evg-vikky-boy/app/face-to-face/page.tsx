import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ScenarioSwitch } from "@/components/ui/ScenarioSwitch";
import { FactTable } from "@/components/compare/FactTable";
import { StrengthColumns } from "@/components/compare/StrengthColumns";
import { BudgetVersus } from "@/components/compare/BudgetVersus";
import { VERDICT } from "@/data/comparison";

export const metadata: Metadata = {
  title: "Face to Face — EVG Vikky Boy",
  description: "Tenerife et Marrakech, comparés sur les faits.",
};

export default function FaceToFacePage() {
  return (
    <main>
      <header className="px-5 pt-[max(1.5rem,env(safe-area-inset-top))] pb-2 sm:px-8">
        <Link
          href="/"
          className="glass inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Accueil
        </Link>
      </header>

      <Section
        overline="Face to face"
        title="Tenerife vs Marrakech"
        lede="Les critères mesurables sont tranchés. Les critères subjectifs ne le sont pas, et ne le seront pas : ambiance, nightlife, bouffe et potentiel EVG se présentent, ils ne se notent pas."
      >
        <Reveal className="max-w-md">
          <p className="eyebrow mb-2.5">Scénario comparé</p>
          <ScenarioSwitch />
        </Reveal>
        <Reveal delay={0.08} className="mt-6">
          <BudgetVersus />
        </Reveal>
      </Section>

      <Section
        overline="Bloc 1"
        title="Les faits"
        lede="Mesurables et sourcés. Ici un verdict est légitime."
      >
        <Reveal>
          <FactTable />
        </Reveal>
      </Section>

      <Section
        overline="Bloc 2"
        title="Les forces"
        lede="Subjectif. Deux colonnes, même traitement, aucun gagnant désigné."
      >
        <Reveal>
          <StrengthColumns />
        </Reveal>
      </Section>

      <Section overline="En une phrase" title="Le vrai dilemme">
        <div className="grid gap-4 sm:grid-cols-2">
          <Reveal>
            <div data-theme="ocean" className="glass h-full rounded-2xl p-6">
              <p className="display text-3xl">🇮🇨 Tenerife</p>
              <p
                className="editorial mt-1.5 text-xl"
                style={{ color: "var(--accent-1)" }}
              >
                {VERDICT.tenerife.title}
              </p>
              <p className="mt-3 text-[13px] text-mute">{VERDICT.tenerife.line}</p>
              <Link
                href="/tenerife"
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold underline underline-offset-4"
              >
                Revoir le plan
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div data-theme="desert" className="glass h-full rounded-2xl p-6">
              <p className="display text-3xl">🇲🇦 Marrakech</p>
              <p
                className="editorial mt-1.5 text-xl"
                style={{ color: "var(--accent-1)" }}
              >
                {VERDICT.marrakech.title}
              </p>
              <p className="mt-3 text-[13px] text-mute">{VERDICT.marrakech.line}</p>
              <Link
                href="/marrakech"
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold underline underline-offset-4"
              >
                Revoir le plan
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <p className="editorial mt-8 text-center text-[clamp(1.2rem,5vw,1.9rem)] text-bone/90">
            {VERDICT.closing}
          </p>
          <Link
            href="/vote"
            className="mt-8 flex items-center justify-between gap-4 rounded-2xl bg-bone px-6 py-4 text-ink transition active:scale-[0.99]"
          >
            <span className="text-[14px] font-bold">
              So… where are we taking Vikky ?
            </span>
            <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
          </Link>
        </Reveal>
      </Section>
    </main>
  );
}

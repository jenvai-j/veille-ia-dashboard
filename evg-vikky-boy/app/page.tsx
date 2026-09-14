import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { FinalTwo } from "@/components/home/FinalTwo";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Reveal } from "@/components/ui/Reveal";
import { VERDICT } from "@/data/comparison";
import { PRICES_CHECKED_AT, TRAVELERS, PAYER_COUNT } from "@/data/trip";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <FinalTwo />

      {/* Teaser comparateur */}
      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto w-full max-w-5xl">
          <Reveal>
            <p className="eyebrow mb-3">Face to face</p>
            <h2 className="display text-[clamp(2.2rem,8vw,4.2rem)]">
              Aucune des deux
              <br />
              ne gagne sur tout
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Reveal delay={0.06}>
              <div
                data-theme="ocean"
                className="glass h-full rounded-2xl p-6"
                style={{ borderColor: "color-mix(in srgb, var(--accent-1) 30%, transparent)" }}
              >
                <p className="display text-2xl">🇮🇨 Tenerife</p>
                <p className="editorial mt-1 text-lg" style={{ color: "var(--accent-1)" }}>
                  {VERDICT.tenerife.title}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-mute">
                  {VERDICT.tenerife.line}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div
                data-theme="desert"
                className="glass h-full rounded-2xl p-6"
                style={{ borderColor: "color-mix(in srgb, var(--accent-1) 30%, transparent)" }}
              >
                <p className="display text-2xl">🇲🇦 Marrakech</p>
                <p className="editorial mt-1 text-lg" style={{ color: "var(--accent-1)" }}>
                  {VERDICT.marrakech.title}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-mute">
                  {VERDICT.marrakech.line}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <Link
              href="/face-to-face"
              className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-bone px-6 py-4 text-ink transition active:scale-[0.99]"
            >
              <span className="text-[14px] font-bold">
                Voir la comparaison complète
              </span>
              <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Transparence */}
      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <Reveal>
            <div className="rounded-2xl border border-bone/10 bg-ink-2 p-6">
              <div className="flex items-start gap-3">
                <Info
                  className="mt-0.5 h-4 w-4 shrink-0 text-amber-300"
                  aria-hidden
                />
                <div>
                  <p className="text-[13px] font-semibold">
                    Rien n&apos;est réservé. Tout est vérifiable.
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-mute">
                    Les montants sont des budgets de travail établis à partir de
                    prix relevés le{" "}
                    {new Date(PRICES_CHECKED_AT).toLocaleDateString("fr-FR")} sur
                    les sites des prestataires. Chaque ligne porte son statut et
                    sa source, et garde en mémoire l&apos;estimation d&apos;origine.
                    Les vols, logements et programmations de clubs bougeront d&apos;ici
                    janvier 2027.
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-mute">
                    Répartition : {TRAVELERS} voyageurs, {PAYER_COUNT} payeurs. La
                    part de Vikky est répartie sur les {PAYER_COUNT} autres, donc
                    tous les montants « par payeur » la contiennent déjà.
                  </p>
                  <Link
                    href="/infos"
                    className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-bone underline underline-offset-4"
                  >
                    Logistique, papiers et points à confirmer
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

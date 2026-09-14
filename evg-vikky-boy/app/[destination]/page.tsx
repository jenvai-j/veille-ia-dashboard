import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import { ALL_DESTINATIONS, getDestination, otherDestination } from "@/data";
import { Frame } from "@/components/ui/Frame";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ScenarioSwitch } from "@/components/ui/ScenarioSwitch";
import { BudgetBreakdown } from "@/components/destination/BudgetBreakdown";
import { DayTimeline } from "@/components/destination/DayTimeline";
import { WeatherPanel } from "@/components/destination/WeatherPanel";
import { FlightPanel } from "@/components/destination/FlightPanel";
import { Gallery } from "@/components/destination/Gallery";
import { ProsCons } from "@/components/destination/ProsCons";
import { Venues } from "@/components/destination/Venues";
import { CrossSell } from "@/components/destination/CrossSell";
import { SeenTracker } from "@/components/destination/SeenTracker";

type Params = { destination: string };

export function generateStaticParams() {
  return ALL_DESTINATIONS.map((d) => ({ destination: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { destination } = await params;
  const d = getDestination(destination);
  return {
    title: d ? `${d.name} — EVG Vikky Boy` : "EVG Vikky Boy",
    description: d?.baseline,
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { destination } = await params;
  const d = getDestination(destination);
  if (!d) notFound();

  const other = otherDestination(d.slug);

  return (
    <main data-theme={d.theme}>
      <SeenTracker slug={d.slug} />

      {/* Hero */}
      <header className="relative h-[86svh] min-h-[520px] w-full">
        <Frame
          slot={d.heroPhoto}
          scrim="strong"
          className="absolute inset-0 h-full w-full"
        />
        <div className="relative z-10 flex h-full flex-col justify-between px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-8 sm:px-8">
          <Link
            href="/"
            className="glass inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Les 2 plans
          </Link>

          <div>
            <p className="overline mb-2" style={{ color: "var(--accent-1)" }}>
              {d.flag} {d.flight.duration} · 27 → 31 janvier 2027
            </p>
            <h1 className="display text-[clamp(3.4rem,18vw,8rem)]">{d.name}</h1>
            <p className="editorial mt-2 text-[clamp(1.1rem,5vw,1.8rem)] text-bone/85">
              {d.baseline}
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {d.badges.map((b) => (
                <span
                  key={b.label}
                  className="glass rounded-full px-3 py-1.5 text-[11px] font-medium"
                >
                  {b.icon} {b.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Concept */}
      <Section overline="Le concept">
        <Reveal>
          <p className="max-w-3xl text-[clamp(1rem,4vw,1.3rem)] leading-relaxed">
            {d.concept}
          </p>
        </Reveal>
        <Reveal delay={0.08} className="mt-8 max-w-md">
          <p className="overline mb-2.5">On part quand ?</p>
          <ScenarioSwitch destination={d} />
        </Reveal>
        <Reveal delay={0.14} className="mt-6">
          <FlightPanel flight={d.flight} />
        </Reveal>
      </Section>

      {/* Galerie */}
      <Section overline="En images" title="L'ambiance">
        <Reveal>
          <Gallery slots={d.gallery} />
        </Reveal>
      </Section>

      {/* Programme */}
      <Section
        id="programme"
        overline="Jour par jour"
        title="Le programme"
        lede="Chaque bloc porte son statut. Ce qui n'est pas confirmé est marqué comme tel."
      >
        <Reveal>
          <DayTimeline destination={d} />
        </Reveal>
      </Section>

      {/* Budget */}
      <Section
        id="budget"
        overline="Où part l'argent"
        title="Le budget"
        lede="Chaque ligne garde en mémoire l'estimation du cadrage initial, pour voir ce que la vérification a changé."
      >
        <Reveal>
          <BudgetBreakdown destination={d} />
        </Reveal>
      </Section>

      {/* Météo */}
      <Section overline="Ce qu'il faut savoir" title="La météo">
        <Reveal>
          <WeatherPanel weather={d.weather} />
        </Reveal>
      </Section>

      {/* Lieux */}
      <Section overline="Les lieux" title="Où on va">
        <Reveal>
          <Venues venues={d.venues} />
        </Reveal>
      </Section>

      {/* Forces / vigilance */}
      <Section overline="Sans filtre" title="Le vrai bilan">
        <Reveal>
          <ProsCons strengths={d.strengths} watchouts={d.watchouts} />
        </Reveal>
      </Section>

      {/* Cross-sell */}
      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <Reveal>
            <CrossSell other={other} />
          </Reveal>
          <Reveal delay={0.08}>
            <Link
              href="/face-to-face"
              className="mt-4 block rounded-2xl border border-bone/15 px-6 py-4 text-center text-[14px] font-semibold transition hover:bg-bone/5"
            >
              Ou comparer les deux côte à côte
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { STATUS_LABELS, StatusTag } from "@/components/ui/StatusTag";
import { PHOTOS } from "@/data/photos";
import { PAYERS, PAYER_COUNT, PRICES_CHECKED_AT, TRAVELERS } from "@/data/trip";
import type { PriceStatus } from "@/data/types";

export const metadata: Metadata = {
  title: "Infos & logistique — EVG Vikky Boy",
  description: "Papiers, points à confirmer et méthode de chiffrage.",
};

const CHECKLIST = [
  {
    title: "Passeport valide, pour Marrakech",
    body: "L'admission au Maroc n'est plus possible avec la seule carte d'identité. Il faut un passeport couvrant toute la durée du séjour. Pour Tenerife, la carte d'identité suffit. À vérifier pour les 7 dès maintenant : un renouvellement peut dépasser deux mois.",
    urgency: "Bloquant",
    link: "https://www.diplomatie.gouv.fr/fr/information-par-pays/maroc/conseils-aux-voyageurs-entree-sejour",
    linkLabel: "France Diplomatie",
  },
  {
    title: "Permis B depuis plus d'un an",
    body: "Exigé pour conduire un buggy à Tenerife, et selon les opérateurs pour le quad à Agafay. À confirmer au moment de la réservation.",
    urgency: "À vérifier",
  },
  {
    title: "Horaires réels des vols de janvier 2027",
    body: "Tous les horaires ne sont pas encore publiés. Le point à trancher : un départ mardi soir depuis CDG vers Tenerife n'existe pas, il imposerait Orly. Vers Marrakech, CDG offre beaucoup plus de latitude.",
    urgency: "Bloquant pour le scénario mardi",
  },
  {
    title: "Piscine réellement chauffée",
    body: "En janvier, une piscine non chauffée est décorative, aux Canaries comme à Marrakech. C'est un critère de filtrage au moment de choisir le logement, pas un argument de vente.",
    urgency: "À vérifier",
  },
  {
    title: "Programmation des clubs du samedi 30 janvier",
    body: "Ni le Papagayo ni le Theatro ne publient leur affiche seize mois à l'avance. Elle sort en général quatre à six semaines avant. Le format de la dernière soirée reste donc ouvert.",
    urgency: "Trop tôt",
  },
  {
    title: "Disponibilité de la Boat Party le vendredi 29",
    body: "L'opérateur tourne toute l'année les mercredi, vendredi, samedi et dimanche, et le 29 janvier 2027 est un vendredi. La date précise reste à confirmer à l'ouverture des réservations.",
    urgency: "À confirmer",
  },
];

const STATUSES: PriceStatus[] = [
  "CONFIRMED",
  "OBSERVED",
  "ESTIMATED",
  "TO_VERIFY",
  "OPTIONAL",
];

const STATUS_HELP: Record<PriceStatus, string> = {
  CONFIRMED: "Réservé et payé, ou règle administrative stable. Aucun à ce jour côté prix.",
  OBSERVED: "Prix réellement relevé sur le site du prestataire à la date indiquée.",
  ESTIMATED: "Budget de travail raisonné, sans relevé direct sur un produit précis.",
  TO_VERIFY: "Hypothèse. Ne doit pas être traitée comme un prix.",
  OPTIONAL: "Hors du total de base. S'active sur la page de la destination.",
};

export default function InfosPage() {
  const photoSlots = Object.values(PHOTOS);
  const filled = photoSlots.filter((p) => p.src).length;

  return (
    <main>
      <header className="px-5 pt-[max(1.5rem,env(safe-area-inset-top))] sm:px-8">
        <Link
          href="/"
          className="glass inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Accueil
        </Link>
      </header>

      <Section
        overline="Avant de voter"
        title="Ce qu'il faut régler"
        lede="Certains points conditionnent la faisabilité même d'une destination. Autant les traiter maintenant."
      >
        <ul className="space-y-3">
          {CHECKLIST.map((c) => (
            <Reveal key={c.title}>
              <li className="rounded-2xl border border-bone/10 bg-ink-2 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[14px] font-semibold">{c.title}</p>
                  <span className="rounded-full bg-bone/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-mute uppercase">
                    {c.urgency}
                  </span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-mute">
                  {c.body}
                </p>
                {c.link && (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold underline underline-offset-4"
                  >
                    {c.linkLabel}
                    <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                )}
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section
        overline="Méthode"
        title="Comment lire les prix"
        lede={`Tous les montants ont été revus le ${new Date(PRICES_CHECKED_AT).toLocaleDateString("fr-FR")} à partir des sites des prestataires. Chaque ligne garde en mémoire l'estimation du cadrage initial.`}
      >
        <ul className="space-y-2.5">
          {STATUSES.map((s) => (
            <li
              key={s}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-bone/10 bg-ink-2 px-4 py-3"
            >
              <StatusTag status={s} />
              <span className="flex-1 text-[13px] leading-relaxed text-mute">
                {STATUS_HELP[s]}
              </span>
            </li>
          ))}
        </ul>

        <Reveal>
          <div className="mt-6 rounded-2xl border border-bone/10 bg-ink-2 p-6">
            <p className="text-[14px] font-semibold">La règle de répartition</p>
            <p className="mt-2 text-[13px] leading-relaxed text-mute">
              {TRAVELERS} voyageurs, {PAYER_COUNT} payeurs. Vikky ne paie pas : sa
              part est répartie sur les {PAYER_COUNT} autres. Tous les montants
              affichés « par payeur » contiennent donc déjà sa part, multipliés par{" "}
              {TRAVELERS}/{PAYER_COUNT}.
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-mute">
              Payeurs : {PAYERS.join(", ")}.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-4 rounded-2xl border border-bone/10 bg-ink-2 p-6">
            <p className="text-[14px] font-semibold">
              Mettre les prix à jour plus tard
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-mute">
              Les prix vivent dans deux fichiers,{" "}
              <code className="rounded bg-bone/10 px-1.5 py-0.5 text-[12px]">
                data/tenerife.ts
              </code>{" "}
              et{" "}
              <code className="rounded bg-bone/10 px-1.5 py-0.5 text-[12px]">
                data/marrakech.ts
              </code>
              . Il suffit de changer le champ{" "}
              <code className="rounded bg-bone/10 px-1.5 py-0.5 text-[12px]">
                current
              </code>{" "}
              et la date{" "}
              <code className="rounded bg-bone/10 px-1.5 py-0.5 text-[12px]">
                checkedAt
              </code>
              . Le champ{" "}
              <code className="rounded bg-bone/10 px-1.5 py-0.5 text-[12px]">
                v0
              </code>{" "}
              ne se touche jamais : c&apos;est lui qui garde la trace de
              l&apos;estimation d&apos;origine. Les totaux, fourchettes et écarts
              se recalculent tout seuls.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section
        overline="Images"
        title="Crédits photo"
        lede={`${filled} emplacement${filled > 1 ? "s" : ""} sur ${photoSlots.length} contient une photo. Les autres affichent un rendu graphique généré, en attendant.`}
      >
        <ul className="space-y-2">
          {photoSlots.map((p) => (
            <li
              key={p.id}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-bone/10 bg-ink-2 px-4 py-3 text-[12px]"
            >
              <span
                className="h-4 w-4 shrink-0 rounded"
                style={{
                  background: `linear-gradient(135deg, ${p.duotone[0]}, ${p.duotone[1]})`,
                }}
                aria-hidden
              />
              <span className="flex-1 text-mute">{p.subject}</span>
              <span className={p.src ? "text-emerald-300" : "text-mute"}>
                {p.src
                  ? `${p.credit ?? "photo fournie"}${p.license ? ` · ${p.license}` : ""}`
                  : "rendu généré"}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[12px] leading-relaxed text-mute">
          Les photos des établissements cités (Papagayo, Tramps, Theatro, Comptoir
          Darna) ne sont pas reproduites ici. Les pages destination renvoient vers
          leurs comptes officiels.
        </p>
      </Section>
    </main>
  );
}

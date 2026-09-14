import type { FactRow, StrengthRow } from "./types";

/**
 * BLOC 1 : les faits.
 * Mesurables, sourçables, non discutables. Un verdict est donc légitime.
 */
export const FACTS: FactRow[] = [
  {
    criterion: "Température en journée",
    icon: "☀️",
    tenerife: "21-22°C de maximale moyenne",
    marrakech: "18-19°C de maximale moyenne",
    winner: "tenerife",
    source: "Weather2Travel / Weather Spark",
    sourceUrl: "https://www.weather2travel.com/tenerife/costa-adeje/january/",
  },
  {
    criterion: "Température la nuit",
    icon: "🌙",
    tenerife: "13-15°C, on tient en manches longues",
    marrakech: "5-8°C, et moins dans le désert",
    winner: "tenerife",
    source: "Weather Spark",
    sourceUrl: "https://weatherspark.com/m/32742/1/Average-Weather-in-January-in-Marrakesh-Morocco",
  },
  {
    criterion: "Papiers à prévoir",
    icon: "🪪",
    tenerife: "Carte d'identité suffisante",
    marrakech: "Passeport valide obligatoire",
    winner: "tenerife",
    nuance:
      "L'admission au Maroc n'est plus possible avec la seule carte d'identité. À vérifier pour les 7 dès maintenant, les délais peuvent dépasser deux mois.",
    source: "France Diplomatie",
    sourceUrl:
      "https://www.diplomatie.gouv.fr/fr/information-par-pays/maroc/conseils-aux-voyageurs-entree-sejour",
  },
  {
    criterion: "Durée de vol depuis Paris",
    icon: "✈️",
    tenerife: "4h25 en direct",
    marrakech: "3h25 en direct",
    winner: "marrakech",
    source: "FlightConnections",
    sourceUrl: "https://www.flightconnections.com/flights-from-cdg-to-tfs",
  },
  {
    criterion: "Vols directs depuis CDG",
    icon: "🛫",
    tenerife: "4 par semaine, départs 07h20-14h20 seulement",
    marrakech: "19+ par semaine, horaires souples",
    winner: "marrakech",
    nuance:
      "Un départ le mardi soir est impossible depuis CDG vers Tenerife. Il imposerait Orly, où Transavia opère 10 vols par semaine.",
    source: "FlightConnections / FlightsFrom",
    sourceUrl: "https://www.flightsfrom.com/CDG-RAK",
  },
  {
    criterion: "Transferts sur place",
    icon: "🚕",
    tenerife: "30 à 50 € par personne sur le séjour",
    marrakech: "9 à 19 € la course de taxi, par voiture",
    winner: "marrakech",
    source: "Allo Taxi Marrakech",
    sourceUrl: "https://allo-taxi-marrakech.com/prix-des-taxis-a-laeroport-de-marrakech/",
  },
  {
    criterion: "Alcool en magasin",
    icon: "🛒",
    tenerife: "Supermarché classique, prix espagnols très bas",
    marrakech: "Rayon licencié (Carrefour Guéliz), bière 2,50 à 4 €",
    winner: "tenerife",
    source: "The Marrakech Society",
    sourceUrl: "https://themarrakechsociety.ma/blog/en/alcohol-in-morocco-guide",
  },
  {
    criterion: "Le verre en sortie",
    icon: "🍸",
    tenerife: "13,50 € la vodka coca, 20 € la vodka Red Bull au Papagayo",
    marrakech: "4 à 7 € la bière en bar, ou table VIP au forfait",
    winner: "none",
    nuance:
      "Ce n'est pas un match. Tenerife gagne l'apéro villa, Marrakech gagne la sortie. À Tenerife on subit le prix au verre, à Marrakech on choisit son format.",
    source: "Tripadvisor Papagayo / The Marrakech Society",
    sourceUrl:
      "https://www.tripadvisor.com/Restaurant_Review-g562820-d3499139-Reviews-Papagayo_Beach_Club-Playa_de_las_Americas_Arona_Tenerife_Canary_Islands.html",
  },
  {
    criterion: "Baignade",
    icon: "🌊",
    tenerife: "Océan à 20°C, frais mais faisable",
    marrakech: "Aucune, hors piscine chauffée du riad",
    winner: "tenerife",
  },
];

/**
 * BLOC 2 : les forces.
 * Subjectif. Deux colonnes, même traitement, aucun gagnant.
 */
export const STRENGTHS: StrengthRow[] = [
  {
    theme: "L'ambiance générale",
    icon: "🎭",
    tenerife:
      "Des vacances entre potes, sans friction. La villa est le QG, on y revient entre chaque activité, la piscine tourne toute la journée.",
    marrakech:
      "Un voyage. Chaque journée change de décor : médina, désert, rooftop, club. On rentre avec des images que personne d'autre n'a.",
  },
  {
    theme: "L'activité signature",
    icon: "⚡",
    tenerife:
      "La boat party. Open bar, DJ, arrêt baignade au large, de 12h30 à 17h. Trois heures de bordel organisé en pleine mer.",
    marrakech:
      "Agafay. Quad dans un désert minéral, coucher de soleil sur l'Atlas enneigé, puis dîner sous les étoiles au camp. C'est le moment que personne n'oublie.",
  },
  {
    theme: "La nightlife",
    icon: "🔥",
    tenerife:
      "Le Papagayo, seul club des Canaries au DJ Mag Top 100. Une rue entière de bars à Verónicas, on marche d'un lieu à l'autre, ça ferme à 6h.",
    marrakech:
      "Le Theatro, un ancien théâtre reconverti, avec show et mise en scène. Table VIP pour le groupe, on ne fait jamais la queue au bar.",
  },
  {
    theme: "La bouffe",
    icon: "🍽️",
    tenerife:
      "Correcte et pratique. Poisson frais, tapas, et surtout la possibilité de faire venir un chef privé cuisiner à la villa.",
    marrakech:
      "Le point fort incontestable du séjour. Tajines, street food, dîner-spectacle au Comptoir Darna, brunchs sur les rooftops.",
  },
  {
    theme: "Le potentiel EVG",
    icon: "🎯",
    tenerife:
      "L'alcool est partout et il est bon marché. Villa privée, piscine, aucune contrainte horaire, aucun regard extérieur. La machine tourne toute seule.",
    marrakech:
      "Le riad privatisé est un terrain de jeu fermé pour nous huit. Les défis prennent une autre dimension entre le désert, la médina et une table VIP.",
  },
  {
    theme: "Le souvenir dans dix ans",
    icon: "📸",
    tenerife:
      "La boat party, les buggys sur le Teide, et la nuit où personne ne s'est couché avant 6h.",
    marrakech:
      "Le silence du désert au coucher du soleil, juste avant que le groupe ne réalise où il est.",
  },
];

export const VERDICT = {
  tenerife: {
    title: "Le choix vacances entre potes",
    line: "Villa • Soleil • Buggy • Boat Party • Open Bar • Fiesta",
  },
  marrakech: {
    title: "Le choix expérience",
    line: "Riad • Désert • Quad • Sunset • Food • Nightlife",
  },
  closing:
    "Les deux tiennent la route. Il n'y a pas de mauvais choix, seulement deux EVG très différents.",
};

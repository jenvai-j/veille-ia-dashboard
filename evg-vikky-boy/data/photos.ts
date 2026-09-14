/**
 * Emplacements photo du site.
 *
 * Chaque emplacement a une identité visuelle de repli (dégradé bi-ton + grain)
 * qui s'affiche tant qu'aucune photo n'est fournie, et qui reprend la main
 * automatiquement si une image casse.
 *
 * POUR AJOUTER UNE VRAIE PHOTO :
 *   1. déposer le fichier dans public/images/custom/<id>.jpg
 *   2. renseigner `src: "/images/custom/<id>.jpg"` ci-dessous
 *   3. renseigner `credit` et `license`
 * Aucun composant n'est à modifier.
 */

export type PhotoSlot = {
  id: string;
  /** Ce que la photo doit montrer. Sert aussi de texte alternatif. */
  subject: string;
  /** Mots-clés pour retrouver une photo pertinente sous licence libre. */
  searchTerms: string;
  /** Chemin de l'image si elle existe. Vide = rendu de repli. */
  src?: string;
  credit?: string;
  license?: string;
  /** Couleurs du rendu de repli, du plus sombre au plus clair. */
  duotone: [string, string];
  /** Oriente la composition du rendu de repli. */
  seed: number;
};

export const PHOTOS: Record<string, PhotoSlot> = {
  "home-hero": {
    id: "home-hero",
    subject: "Ambiance de départ entre potes, lumière de fin de journée",
    searchTerms: "friends group travel night city lights",
    duotone: ["#08090A", "#E7C873"],
    seed: 5,
  },
  "tfs-hero": {
    id: "tfs-hero",
    subject: "Côte de Costa Adeje au coucher du soleil, océan et falaises volcaniques",
    searchTerms: "costa adeje tenerife coastline sunset ocean",
    duotone: ["#041521", "#00D4C8"],
    seed: 11,
  },
  "tfs-villa": {
    id: "tfs-villa",
    subject: "Villa avec piscine privée éclairée à la nuit tombée",
    searchTerms: "villa private pool night lights spain",
    duotone: ["#04141F", "#2DE2E6"],
    seed: 23,
  },
  "tfs-teide": {
    id: "tfs-teide",
    subject: "Paysage volcanique du parc national du Teide",
    searchTerms: "teide national park volcanic landscape tenerife",
    duotone: ["#1A0A06", "#FF5A1F"],
    seed: 37,
  },
  "tfs-buggy": {
    id: "tfs-buggy",
    subject: "Buggy tout-terrain sur piste volcanique, poussière",
    searchTerms: "off road buggy dust volcanic track",
    duotone: ["#160B05", "#FF7A3C"],
    seed: 41,
  },
  "tfs-boat": {
    id: "tfs-boat",
    subject: "Catamaran en mer, groupe en fête sur le pont",
    searchTerms: "catamaran boat party ocean deck",
    duotone: ["#031A2A", "#00D4C8"],
    seed: 53,
  },
  "tfs-beach": {
    id: "tfs-beach",
    subject: "Plage de Playa de las Américas, sable et océan atlantique",
    searchTerms: "playa de las americas beach tenerife",
    duotone: ["#05202E", "#5FE0D0"],
    seed: 67,
  },
  "tfs-night": {
    id: "tfs-night",
    subject: "Ambiance de club, lumières et foule",
    searchTerms: "nightclub crowd lights dj",
    duotone: ["#0A0413", "#FF4D1C"],
    seed: 71,
  },
  "rak-hero": {
    id: "rak-hero",
    subject: "Désert d'Agafay au coucher du soleil avec l'Atlas en arrière-plan",
    searchTerms: "agafay desert sunset atlas mountains morocco",
    duotone: ["#1A0F08", "#F2B233"],
    seed: 13,
  },
  "rak-riad": {
    id: "rak-riad",
    subject: "Patio de riad marocain, zellige et bassin",
    searchTerms: "moroccan riad courtyard patio zellige",
    duotone: ["#150D07", "#D4622F"],
    seed: 29,
  },
  "rak-agafay": {
    id: "rak-agafay",
    subject: "Désert de pierre d'Agafay, relief minéral à perte de vue",
    searchTerms: "agafay rocky desert morocco landscape",
    duotone: ["#1C1208", "#E0A64A"],
    seed: 31,
  },
  "rak-quad": {
    id: "rak-quad",
    subject: "Quad dans le désert, trace de poussière",
    searchTerms: "quad bike desert dust morocco",
    duotone: ["#180E06", "#D4622F"],
    seed: 43,
  },
  "rak-sunset": {
    id: "rak-sunset",
    subject: "Coucher de soleil sur les montagnes de l'Atlas enneigées",
    searchTerms: "atlas mountains snow sunset morocco",
    duotone: ["#12090F", "#F2B233"],
    seed: 59,
  },
  "rak-camp": {
    id: "rak-camp",
    subject: "Camp de luxe dans le désert la nuit, tentes éclairées et feu",
    searchTerms: "luxury desert camp night tents fire morocco",
    duotone: ["#0E0805", "#FFC46B"],
    seed: 61,
  },
  "rak-rooftop": {
    id: "rak-rooftop",
    subject: "Rooftop à Marrakech au crépuscule, lanternes",
    searchTerms: "marrakech rooftop terrace dusk lanterns",
    duotone: ["#160B0A", "#E8874A"],
    seed: 73,
  },
};

export function photo(id: string): PhotoSlot {
  const found = PHOTOS[id];
  if (found) return found;
  return {
    id,
    subject: "Visuel à définir",
    searchTerms: "",
    duotone: ["#0B0B0C", "#E7C873"],
    seed: 7,
  };
}

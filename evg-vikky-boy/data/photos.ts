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
  /** Troisième teinte optionnelle, pour un rendu moins plat. */
  accent?: string;
  /** Oriente la composition du rendu de repli. */
  seed: number;
};

export const PHOTOS: Record<string, PhotoSlot> = {
  "home-hero": {
    id: "home-hero",
    subject: "Ambiance de départ entre potes, lumière de fin de journée",
    searchTerms: "friends group travel night city lights",
    duotone: ["#08090A", "#00D4C8"],
    accent: "#D4622F",
    seed: 5,
  },
  "tfs-hero": {
    id: "tfs-hero",
    subject: "Vue aérienne de la plage de Torviscas, Costa Adeje",
    searchTerms: "costa adeje tenerife coastline aerial",
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Aerial_view_of_Playa_de_Torviscas_beach_in_Costa_Adeje_on_Tenerife%2C_Spain_%2848225530037%29.jpg?width=1600",
    credit: "Wikimedia Commons · Aerial view of Playa de Torviscas beach in Costa Adeje on Tenerife, Spain (48225530037)",
    license: "CC BY 2.0",
    duotone: ["#041521", "#00D4C8"],
    seed: 11,
  },
  "tfs-villa": {
    id: "tfs-villa",
    subject: "Villa avec piscine privée à Costa Adeje",
    searchTerms: "villa private pool night lights spain",
    src: "/images/custom/tfs-villa.jpg",
    credit: "Photo fournie par le groupe",
    license: "Usage privé",
    duotone: ["#04141F", "#2DE2E6"],
    seed: 23,
  },
  "tfs-teide": {
    id: "tfs-teide",
    subject: "Paysage volcanique du parc national du Teide",
    searchTerms: "teide national park volcanic landscape tenerife",
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Mount_Teide_Tenerife_IMGP2085.jpg?width=1600",
    credit: "Wikimedia Commons · Mount Teide Tenerife IMGP2085",
    license: "CC BY-SA 3.0",
    duotone: ["#1A0A06", "#FF5A1F"],
    seed: 37,
  },
  "tfs-buggy": {
    id: "tfs-buggy",
    subject: "Groupe en buggys devant le volcan",
    searchTerms: "off road buggy dust volcanic track",
    src: "/images/custom/tfs-buggy.jpg",
    credit: "Photo fournie par le groupe",
    license: "Usage privé",
    duotone: ["#160B05", "#FF7A3C"],
    seed: 41,
  },
  "tfs-boat": {
    id: "tfs-boat",
    subject: "Boat party au large de Tenerife, pont bondé",
    searchTerms: "catamaran boat party ocean deck",
    src: "/images/custom/tfs-boat.jpg",
    credit: "Photo fournie par le groupe",
    license: "Usage privé",
    duotone: ["#031A2A", "#00D4C8"],
    seed: 53,
  },
  "tfs-beach": {
    id: "tfs-beach",
    subject: "Playa El Duque, Costa Adeje",
    searchTerms: "playa el duque costa adeje tenerife beach",
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Tenerife_Playa_El_Duque_R01.jpg?width=1600",
    credit: "Wikimedia Commons · Tenerife Playa El Duque R01",
    license: "CC BY-SA 4.0",
    duotone: ["#05202E", "#5FE0D0"],
    seed: 67,
  },
  "tfs-night": {
    id: "tfs-night",
    subject: "Coucher de soleil sur Playa de las Américas",
    searchTerms: "sunset playa de las americas tenerife",
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Sunset_las_americas_tenerife.JPG?width=1600",
    credit: "Wikimedia Commons · Sunset las americas tenerife",
    license: "CC BY-SA 3.0",
    duotone: ["#0A0413", "#FF4D1C"],
    seed: 71,
  },
  "rak-hero": {
    id: "rak-hero",
    subject: "Le désert d'Agafay au coucher du soleil",
    searchTerms: "agafay desert sunset atlas mountains morocco",
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Agafay_Desert%2C_Morocco%2C_20250125_1802_7284.jpg?width=1600",
    credit: "Wikimedia Commons · Agafay Desert, Morocco, 20250125 1802 7284",
    license: "CC BY 4.0",
    duotone: ["#1A0F08", "#F2B233"],
    seed: 13,
  },
  "rak-riad": {
    id: "rak-riad",
    subject: "Patio de riad marocain, zellige et bassin",
    searchTerms: "moroccan riad courtyard patio zellige",
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Riad_du_Figuier_courtyard_-_Essaouira_188.jpg?width=1600",
    credit: "Wikimedia Commons · Riad du Figuier courtyard - Essaouira 188",
    license: "CC BY-SA 3.0",
    duotone: ["#150D07", "#D4622F"],
    seed: 29,
  },
  "rak-agafay": {
    id: "rak-agafay",
    subject: "Désert de pierre d'Agafay, relief minéral à perte de vue",
    searchTerms: "agafay rocky desert morocco landscape",
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Agafay_desert.jpg?width=1600",
    credit: "Wikimedia Commons · Agafay desert",
    license: "CC BY-SA 4.0",
    duotone: ["#1C1208", "#E0A64A"],
    seed: 31,
  },
  "rak-quad": {
    id: "rak-quad",
    subject: "Quad dans le désert d'Agafay",
    searchTerms: "quad bike desert dust morocco",
    src: "/images/custom/rak-quad.jpg",
    credit: "Photo fournie par le groupe",
    license: "Usage privé",
    duotone: ["#180E06", "#D4622F"],
    seed: 43,
  },
  "rak-sunset": {
    id: "rak-sunset",
    subject: "Les montagnes du Haut Atlas",
    searchTerms: "high atlas mountains morocco range",
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Atlas_mountains%2C_High_Atlas_range.jpg?width=1600",
    credit: "Wikimedia Commons · Atlas mountains, High Atlas range",
    license: "CC BY-SA 4.0",
    duotone: ["#12090F", "#F2B233"],
    seed: 59,
  },
  "rak-camp": {
    id: "rak-camp",
    subject: "Tente berbère dans le désert marocain",
    searchTerms: "berber tent desert camp morocco",
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Berber_tent%2C_Erg_Chebbi%2C_Sahara_Desert%2C_Morocco.jpg?width=1600",
    credit: "Wikimedia Commons · Berber tent, Erg Chebbi, Sahara Desert, Morocco",
    license: "CC BY 2.0",
    duotone: ["#0E0805", "#FFC46B"],
    seed: 61,
  },
  "rak-rooftop": {
    id: "rak-rooftop",
    subject: "La Koutoubia de Marrakech au coucher du soleil",
    searchTerms: "marrakech koutoubia sunset",
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Koutoubia_Mosque_at_the_sunset_%281%29.jpg?width=1600",
    credit: "Wikimedia Commons · Koutoubia Mosque at the sunset (1)",
    license: "CC BY-SA 4.0",
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

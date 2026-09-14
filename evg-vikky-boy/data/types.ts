/**
 * Schema central du site EVG Vikky Boy.
 *
 * REGLE ABSOLUE : aucun montant ne circule dans l'application sans son statut
 * de fiabilite et sa source. Le typage rend l'oubli impossible.
 */

export type PriceStatus =
  | "CONFIRMED" // reserve / paye
  | "OBSERVED" // prix reellement releve sur un site marchand
  | "ESTIMATED" // budget de travail, fourchette raisonnee
  | "TO_VERIFY" // hypothese non verifiee
  | "OPTIONAL"; // hors total de base

export type Departure = "tue" | "wed";

export type Slug = "tenerife" | "marrakech";

/**
 * Un prix qui garde la memoire de son estimation d'origine.
 * `v0` n'est JAMAIS ecrase : c'est le chiffre du cadrage initial.
 */
export type TrackedPrice = {
  /** Estimation du cadrage initial, par voyageur. Immuable. */
  v0: number;
  /** Valeur de reference actuelle, par voyageur. */
  current: number;
  /** Fourchette constatee sur le marche. */
  range?: [number, number];
  status: PriceStatus;
  /** D'ou vient `current`. Affiche a l'utilisateur. */
  source: string;
  sourceUrl?: string;
  /** Date de derniere verification, format ISO court. */
  checkedAt: string;
  note?: string;
};

export type BudgetLine = {
  id: string;
  label: string;
  icon: string;
  price: TrackedPrice;
  /** Supplement par voyageur si on part le mardi soir (1 nuit de plus). */
  extraNight?: number;
  /** Hors total de base, activable par l'utilisateur. */
  optional?: boolean;
  /** Pourquoi c'est une option, affiche sous la ligne. */
  optionNote?: string;
};

export type Moment = "morning" | "afternoon" | "sunset" | "evening" | "night";

export type DayBlock = {
  moment: Moment;
  icon: string;
  title: string;
  body: string;
  status: PriceStatus;
  /** Marque le bloc comme optionnel dans le programme. */
  optional?: boolean;
};

export type Day = {
  id: string;
  label: string;
  codename: string;
  /** Scenarios de depart dans lesquels cette journee existe. */
  availableIn: Departure[];
  /** Avertissement horaire de vol, affiche en tete de journee. */
  flightNote?: string;
  blocks: DayBlock[];
  /** Programme different selon le scenario de depart. */
  blocksByDeparture?: Partial<Record<Departure, DayBlock[]>>;
};

export type Weather = {
  dayHigh: [number, number];
  nightLow: [number, number];
  seaTemp?: number;
  rainyDays?: number;
  sunHours?: number;
  /** La nuance honnete. Toujours affichee sous les chiffres. */
  caveat: string;
  source: string;
  sourceUrl: string;
};

export type FlightInfo = {
  route: string;
  duration: string;
  airlines: string;
  weeklyFrequency: string;
  /** Contrainte horaire connue, ex. pas de depart le soir depuis CDG. */
  constraint?: string;
  /** Si le scenario mardi soir impose un autre aeroport. */
  tuesdayAirport?: { airport: string; reason: string };
  source: string;
  sourceUrl: string;
};

export type Venue = {
  name: string;
  kind: string;
  blurb: string;
  /** Lien officiel. On ne reproduit pas leurs photos, on renvoie a la source. */
  link?: string;
};

export type Destination = {
  slug: Slug;
  name: string;
  flag: string;
  baseline: string;
  concept: string;
  theme: "ocean" | "desert";
  badges: { icon: string; label: string; status: PriceStatus }[];
  flight: FlightInfo;
  weather: Weather;
  days: Day[];
  budget: BudgetLine[];
  strengths: string[];
  watchouts: string[];
  venues: Venue[];
  /** Ids d'emplacements photo, definis dans data/photos.ts */
  heroPhoto: string;
  gallery: string[];
};

/** Critere factuel et mesurable : un verdict est legitime. */
export type FactRow = {
  criterion: string;
  icon: string;
  tenerife: string;
  marrakech: string;
  winner: Slug | "tie" | "none";
  /** Pourquoi il n'y a pas de gagnant, quand winner vaut "none". */
  nuance?: string;
  source?: string;
  sourceUrl?: string;
};

/** Critere subjectif : deux colonnes, aucun gagnant. */
export type StrengthRow = {
  theme: string;
  icon: string;
  tenerife: string;
  marrakech: string;
};

/**
 * Le site est secret pour Vikky. Un code partagé suffit : il ne s'agit pas de
 * résister à une attaque, mais d'empêcher qu'un lien transféré s'ouvre tout
 * seul. Le contenu n'est jamais servi tant que le cookie n'est pas posé.
 */
export const ACCESS_COOKIE = "evg-access";

export function accessCode(): string {
  return normalize(process.env.SITE_ACCESS_CODE ?? "vikkyboy2027");
}

export function normalize(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, "");
}

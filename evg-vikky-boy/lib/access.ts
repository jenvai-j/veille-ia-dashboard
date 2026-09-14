/**
 * Verrou d'accès optionnel.
 *
 * Il n'est actif QUE si la variable d'environnement SITE_ACCESS_CODE est
 * renseignée. Sans elle, le site s'ouvre directement : c'est le comportement
 * voulu quand le lien circule dans un groupe fermé où le marié n'est pas.
 *
 * Pour l'activer : poser SITE_ACCESS_CODE dans Vercel, puis redéployer.
 */
export const ACCESS_COOKIE = "evg-access";

export function accessCode(): string | null {
  const raw = process.env.SITE_ACCESS_CODE;
  if (!raw || !raw.trim()) return null;
  return normalize(raw);
}

export function gateEnabled(): boolean {
  return accessCode() !== null;
}

export function normalize(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, "");
}

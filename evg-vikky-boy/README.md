# EVG Vikky Boy — 27 au 31 janvier 2027

Microsite privé pour choisir entre Tenerife et Marrakech, à partager dans le
groupe WhatsApp. Mobile first, sombre, un vote par personne.

## Lancer en local

```bash
npm install
npm run dev
```

## Déployer sur Vercel

1. Importer le dépôt sur Vercel.
2. **Root Directory** : `evg-vikky-boy` (le reste du dépôt est un autre projet).
3. Déployer. Le site fonctionne immédiatement, sans base de données.

Le site est en `noindex` : il ne sera pas référencé par Google. Il reste
accessible à quiconque a le lien.

## Accès : le site est secret pour Vikky

Toutes les pages sont derrière un code. Sans cookie valide, chaque URL redirige
vers `/acces` et **aucun contenu n'est servi** : ce n'est pas un masque côté
navigateur, le HTML ne part jamais.

- Code par défaut : `vikkyboy2027` (casse et espaces ignorés)
- Pour le changer : variable d'environnement `SITE_ACCESS_CODE` dans Vercel
- Le cookie dure 180 jours, personne ne retape le code

L'aperçu affiché par WhatsApp est volontairement muet (« Opération Janvier
2027 · Accès réservé »). Si le lien est transféré à Vikky par erreur, la
vignette ne révèle rien et la page se referme sur le code.

Ce verrou empêche une ouverture accidentelle, pas un curieux déterminé qui
aurait le code. C'est le niveau proportionné à l'enjeu.

## Activer le vote partagé (5 minutes)

Sans base de données, chacun voit son propre vote mais les totaux restent à zéro.
Pour que les votes de tout le monde remontent :

1. Créer un projet gratuit sur [supabase.com](https://supabase.com).
2. SQL Editor → coller le contenu de `supabase/schema.sql` → Run.
3. Settings → API → copier `Project URL` et la clé `anon public`.
4. Dans Vercel, Settings → Environment Variables :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Redéployer.

## Les deux scénarios de départ

Le site bascule entre un départ mercredi 27 (4 nuits, 3 journées pleines) et
mardi 26 au soir (5 nuits, 4 journées pleines). Tout se recalcule : budgets,
programme, fourchettes.

Mercredi est le défaut : c'est le seul scénario qui tient la cible des 1 000 €
par payeur sur les deux destinations. Pour changer ce défaut, modifier
`DEFAULT_DEPARTURE` dans `data/trip.ts`.

Côté Tenerife, le scénario mardi affiche un avertissement : aucun vol du soir
ne dessert Tenerife depuis CDG, le départ se ferait donc depuis Orly.

## Modifier les prix

Tout est dans `data/tenerife.ts` et `data/marrakech.ts`. Aucun composant à
toucher.

```ts
{
  id: "flight",
  label: "Vol A/R Paris → Tenerife Sud",
  price: {
    v0: 200,          // ← NE JAMAIS MODIFIER : estimation du cadrage initial
    current: 180,     // ← la valeur à jour
    range: [150, 220],
    status: "OBSERVED",
    source: "KAYAK / Expedia",
    sourceUrl: "https://…",
    checkedAt: "2026-09-14",   // ← la date du relevé
    note: "…",
  },
}
```

Les totaux, les fourchettes, les écarts avec le cadrage initial et les deux
scénarios de départ se recalculent automatiquement. La division 8 voyageurs /
7 payeurs vit dans un seul endroit : `lib/pricing.ts`.

Pour changer la composition du groupe ou la date de clôture du vote :
`data/trip.ts`.

## Ce que le site ne prétend pas être

Aucun prix n'est une réservation. Chaque montant porte un statut visible
(`CONFIRMED`, `OBSERVED`, `ESTIMATED`, `TO_VERIFY`, `OPTIONAL`) et sa source.
La page `/infos` explique la méthode et liste ce qui reste à confirmer.

## Photos

Voir `public/images/custom/README.md`. Les emplacements sans photo affichent un
rendu graphique généré, pas une image cassée.

## Structure

```
data/          contenu et prix, séparés de l'interface
lib/pricing.ts moteur de calcul, seule source de la règle 8/7
lib/votes.ts   accès Supabase, dégradation propre si absent
components/    UI, groupée par zone du site
app/           5 routes : /, /tenerife, /marrakech, /face-to-face, /vote, /infos
```

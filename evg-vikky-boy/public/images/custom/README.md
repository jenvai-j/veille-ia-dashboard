# Déposer de vraies photos

Le site affiche un rendu graphique généré tant qu'un emplacement n'a pas de photo.
Pour remplacer un rendu par une vraie photo :

1. Déposer le fichier ici, nommé par l'identifiant de l'emplacement.
   Exemple : `rak-agafay.jpg`
2. Ouvrir `data/photos.ts` et renseigner sur l'emplacement correspondant :
   ```ts
   src: "/images/custom/rak-agafay.jpg",
   credit: "Photo : prénom du photographe",
   license: "Unsplash License",
   ```
3. C'est tout. Aucun composant n'est à modifier, et si une image casse le rendu
   généré reprend la main automatiquement.

## Emplacements attendus

| id | Sujet |
|---|---|
| `home-hero` | Ambiance de départ entre potes, fin de journée |
| `tfs-hero` | Côte de Costa Adeje au coucher du soleil |
| `tfs-villa` | Villa avec piscine privée éclairée, la nuit |
| `tfs-teide` | Paysage volcanique du parc national du Teide |
| `tfs-buggy` | Buggy tout-terrain sur piste volcanique |
| `tfs-boat` | Catamaran en mer, groupe sur le pont |
| `tfs-beach` | Plage de Playa de las Américas |
| `tfs-night` | Ambiance de club, lumières et foule |
| `rak-hero` | Désert d'Agafay au coucher du soleil, Atlas au fond |
| `rak-riad` | Patio de riad marocain, zellige et bassin |
| `rak-agafay` | Désert de pierre d'Agafay |
| `rak-quad` | Quad dans le désert |
| `rak-sunset` | Coucher de soleil sur l'Atlas enneigé |
| `rak-camp` | Camp de luxe dans le désert la nuit |
| `rak-rooftop` | Rooftop à Marrakech au crépuscule |

## Recommandations

- Format paysage, 1600 px de large minimum, JPEG ou WebP.
- Viser moins de 300 Ko par fichier.
- Ne pas déposer de photos d'intérieur des établissements cités
  (Papagayo, Tramps, Theatro, Comptoir Darna) : le site renvoie vers leurs
  comptes officiels, ce qui évite tout problème de droits.

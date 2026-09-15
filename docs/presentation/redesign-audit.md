# Audit visuel du deck existant

## Constats vérifiés

- La majorité des slides suivent la même séquence : mini-plan, titre,
  sous-titre, cartes arrondies et footer. Le repère de progression est utile,
  mais la composition ne change presque pas.
- Les slides 3 à 5 expliquent correctement le contexte, mais l'histoire du
  client aérien, l'horizon cloud 2027 et la tension opérationnelle n'ont pas de
  focal point assez fort.
- Les architectures 6 à 8 ressemblent à des boîtes reliées par des flèches,
  sans frontière visuelle nette entre agents, orchestration, outils et preuve.
- Les slides agents, résultats et limites portent une information crédible,
  mais leurs cartes de taille égale donnent une impression de dashboard
  générique et affaiblissent la hiérarchie.
- La démo est le visuel le plus concret du deck, mais elle doit devenir une
  preuve de décision : inspecter, valider, puis revalider.
- Les résultats doivent ressembler à un mur de preuves bornées, pas à une
  promesse marketing : les chiffres restent des observations ponctuelles.

## Décisions de reconstruction

| Faiblesse | Reconstruction |
|---|---|
| Répétition des cartes | Une composition dédiée par intention : hero, route, rails, architecture, boucle, preuve |
| Storytelling faible | Slide 3 centrée sur 2027, slide 4 sur les deux rails Run/Migrate |
| Diagrammes génériques | Rail de migration, couches fonctionnelles et pipelines Java/Angular séparés |
| Agents présentés comme une liste | Constellation bornée autour de l'orchestrateur et des gates humaines |
| Résultats assimilés à des KPI | Evidence wall clair avec périmètre et caveat visible |
| Peu de contraste | Fond graphite pour la narration, fond ivoire pour trois slides de preuve |
| Décoration sans sens | Motif unique : état → gate → preuve, utilisé comme structure de lecture |

## Éléments à supprimer ou simplifier

- Paragraphes longs et sous-titres qui répètent le titre.
- Grilles de trois cartes quand une ligne, un schéma ou une comparaison suffit.
- Badges décoratifs et icônes sans rôle explicite.
- Détails de chemins, hashes, prompts et commandes dans le contenu projeté.
- Toute formulation suggérant une autonomie totale des agents ou une migration
  Angular 11 → 21 réalisée.

## Critère de sortie

Chaque slide doit avoir un point d'entrée visuel identifiable en deux secondes,
une seule idée principale et une composition distincte de la slide voisine,
tout en restant dans la même grammaire de rail, checkpoint et preuve.

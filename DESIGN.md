# Design system — Agentic Migration Platform

## Direction

Le deck adopte la direction **Migration Control Plane** : une présentation
technique premium qui représente la migration comme une route contrôlée, avec
des états, des gates et des preuves. Le fond graphite porte l'histoire et les
architectures ; un fond ivoire est réservé aux preuves et aux limites afin de
créer un contraste éditorial.

La démo reste fictive, locale et anonymisée. Aucun nom de client, code ou
information interne CGI ne doit apparaître.

## Palette

| Rôle | Nom | Hex | Usage |
|---|---|---|---|
| Fond principal | Graphite | `#0B1117` | Story, architecture, conclusion |
| Fond secondaire | Slate | `#131D26` | Zones techniques et surfaces ponctuelles |
| Fond preuve | Warm Ivory | `#F3F1EA` | Slides 14–16, contraste de lecture |
| Texte clair | Snow | `#F5F7F8` | Titres et messages principaux sur fond sombre |
| Texte sombre | Ink | `#101820` | Titres sur fond clair |
| Texte secondaire | Mist | `#9EADB8` | Labels, contexte et notes courtes |
| Ligne neutre | Steel | `#344653` | Rails, séparateurs, éléments inactifs |
| Agents / raisonnement | Cyan | `#68D6E8` | Proposition, analyse, focus actif |
| Services déterministes | Electric Blue | `#4E9DFF` | Toolchain, orchestration, build et test |
| Gate humaine | Amber | `#F4B84A` | Review, décision, autorisation |
| Preuve validée | Mint | `#41D3AE` | Artefact scellé, test passé, revalidation |
| Blocage | Coral | `#FF6F72` | Échec réel ou correction requise uniquement |

Règles : un accent dominant et un accent secondaire maximum par slide ; jamais
de signal par la couleur seule ; pas de glow, texture, 3D ou dégradé nécessaire.

## Typographie

- Titres et chiffres : `Aptos Display Semibold`, repli `Aptos Display`, puis
  `Arial`.
- Texte : `Aptos`, repli `Arial`.
- Identifiants techniques : `Aptos Mono`, repli `Consolas`.

| Élément | Taille de référence |
|---|---:|
| Titre de couverture | 44–52 pt |
| Titre de slide | 32–40 pt |
| Kicker / section | 11–14 pt |
| Corps | 17–21 pt |
| Annotation de diagramme | 13–16 pt |
| Footer / source courte | 10–12 pt |
| Mini-plan supérieur | 9–11 pt |

Les titres sont directs et courts. Une slide ne doit pas dépendre d'un
paragraphe projeté pour être comprise.

## Grille et espacement

- Canvas : 1600 × 900, format 16:9.
- Marge latérale : 72–88 px ; marge basse : 54 px.
- Bande de navigation : 54–72 px en haut sur les slides 3–18.
- Unité de rythme : 8 px ; espacements privilégiés : 16, 24, 32, 48 px.
- Rayon : 0–16 px selon le rôle ; les architectures privilégient les angles
  nets et les lignes plutôt que des cartes arrondies.
- Une slide utilise une grande composition et une hiérarchie claire, pas une
  collection de composants de même poids.

## Navigation

La slide 2 présente les sept chapitres sur une route horizontale. Les slides 3–
18 affichent en haut :

`Contexte → Solution → Architecture → Réalisation → Démo → Résultats → Conclusion`

Le chapitre actif reçoit la couleur de son rôle et un trait fin. Les chapitres
passés sont atténués ou marqués d'un point mint ; les chapitres futurs utilisent
Steel. La navigation reste secondaire et occupe moins de 8 % de la hauteur.

## Diagrammes

- Lire de gauche à droite ou de haut en bas.
- Maximum 6–7 nœuds primaires par diagramme.
- Connecteurs 2 px, sans croisements ; les gates sont des checkpoints visibles.
- Cyan = agent/proposition ; bleu = service déterministe ; amber = humain ;
  mint = preuve ; coral = blocage ; steel = état neutre.
- Chaque nœud porte un nom et une action courte. L'architecture doit se lire en
  moins de dix secondes.
- Les agents restent bornés : ils produisent un artefact ou une proposition ;
  les services exécutent les commandes ; l'humain garde l'autorité.

## Icônes

Utiliser un style linéaire unique, inspiré de Lucide, avec une épaisseur
constante. Les pictogrammes servent à clarifier un rôle (agent, humain,
terminal, test, preuve, historique), jamais à remplir un espace vide. Aucun
emoji ni mélange de bibliothèques.

## Captures d'écran

- Utiliser une capture du projet démo uniquement lorsqu'elle prouve une action.
- Faire de la capture le visuel dominant, la recadrer sur la zone utile et
  l'encadrer d'une ligne cyan discrète.
- Deux annotations maximum, avec numéros ou callouts courts.
- Ajouter : **Démo locale — scénario anonymisé, états préparés**.
- Ne pas inventer de logs, badges ou métriques dans une capture.

## Slides techniques

- Une idée dominante et un diagramme principal par slide.
- Préférer une timeline, un pipeline, une boucle ou une matrice à des listes.
- Distinguer visuellement `Réalisé`, `Partiel` et `Prévu`, avec texte + forme +
  couleur.
- Garder les hashes, chemins et détails d'environnement dans les notes, sauf
  nécessité de preuve.
- Afficher les limites lorsque le statut peut être mal interprété.

## Preuves et confidentialité

Les chiffres visibles restent bornés : 607 tests backend réussis et 4 ignorés,
contrôles frontend validés, baseline frontend 12 → 11 échecs après intégration.
Ils sont étiquetés **preuves ponctuelles — non benchmarkées**. Les limites
(authentification/roles non livrés, benchmark manuel absent, CI commune et
coûts/durées non consolidés) restent explicites.

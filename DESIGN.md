# Design system — Agentic Migration Platform

## 1. Direction générale

Le deck adopte une esthétique **enterprise software / cloud / AI engineering** : sombre, précise, calme et orientée preuve. Le fond sombre sert à faire ressortir les workflows et les décisions ; les captures d'écran et les preuves peuvent utiliser des panneaux clairs seulement lorsqu'un contraste de lecture le justifie.

Le design ne doit pas représenter un produit CGI réel. Aucun logo, nom de client, donnée, code ou écran confidentiel ne doit être ajouté sans validation explicite. La démo est identifiée comme un scénario anonymisé avec des états préparés.

## 2. Palette

| Rôle | Nom | Hex | Usage |
|---|---|---|---|
| Fond | Ink | `#07131E` | Fond principal des slides. |
| Surface | Deep Surface | `#0F2433` | Panneaux, zones de contenu, cartes principales. |
| Surface secondaire | Blue Surface | `#153447` | Cartes secondaires et étapes inactives. |
| Texte principal | Snow | `#F5F8FA` | Titres et informations prioritaires. |
| Texte secondaire | Mist | `#A7BBC7` | Labels, explications courtes et notes. |
| Ligne | Steel | `#2B485A` | Séparateurs, contours et connecteurs neutres. |
| Agents IA | Cyan | `#6CD7F2` | Agents, raisonnement, propositions et focus actif. |
| Services déterministes | Blue | `#4FA3FF` | Commandes, build, tests, catalogues et orchestration technique. |
| Validation humaine | Amber | `#F7B955` | Gates, décisions, approbations et action requise. |
| Preuve validée | Teal | `#39D7B5` | Tests réussis, artefacts scellés et revalidation. |
| Échec | Coral | `#FF6B70` | Échec de validation, blocage ou correction demandée. |

Règles :

- Utiliser au maximum un accent dominant et un accent secondaire par slide.
- Ne jamais communiquer un état par la couleur seule : associer couleur, libellé et/ou icône.
- Réserver le corail aux éléments réellement bloquants ; ne pas dramatiser les limites.
- Éviter les dégradés, effets néon, ombres fortes, textures et effets 3D.

## 3. Typographie

- Titres : **Aptos Display Semibold**, repli **Aptos Display** puis **Arial**.
- Corps : **Aptos**, repli **Arial**.
- Ne pas dépendre d'une police non installée pour une information essentielle.

Tailles PowerPoint de référence :

| Élément | Taille | Règle |
|---|---:|---|
| Titre de couverture | 44–48 pt | Deux lignes maximum. |
| Titre de slide | 32–36 pt | Formulation directe, sans slogan générique. |
| Sous-titre / kicker | 12–14 pt | Capitales limitées, couleur Mist ou Cyan. |
| Texte courant | 17–20 pt | 40–55 mots maximum par slide hors labels. |
| Légende / source courte | 11–13 pt | Jamais utilisée pour porter un message essentiel. |
| Mini-plan supérieur | 9–11 pt | Lisible, compact et constant. |

Les titres utilisent des phrases courtes et affirmatives. Éviter les accumulations de trois slogans, les longs paragraphes, les points-virgules et les formulations vagues de type « révolutionner la migration ».

## 4. Grille et espacement

- Format : 16:9, résolution de conception 13,333 × 7,5 pouces.
- Marge de sécurité : 0,55–0,65 pouce sur les côtés ; 0,45 pouce en bas.
- Réserver la bande supérieure au mini-plan ; le contenu commence sous cette bande.
- Utiliser une unité d'espacement de 8 pt : espacements usuels 8, 16, 24 et 32 pt.
- Cartes : padding interne 16–20 pt ; gouttière entre cartes 16–24 pt.
- Aligner les titres, diagrammes et captures sur une même colonne de départ.
- Ne jamais réduire la taille du texte pour faire entrer un élément : supprimer, regrouper ou déplacer vers les notes.

## 5. Mini-plan de progression

À partir de la slide 3, afficher en haut de chaque slide :

`Contexte → Solution → Architecture → Réalisation → Démo → Résultats → Conclusion`

Comportement :

- chapitre courant : texte Snow, accent Cyan, trait inférieur ou capsule discrète ;
- chapitre parcouru : Mist, éventuellement coche Teal ;
- chapitre restant : Steel/Mist, sans concurrence avec le contenu ;
- slide 18 : Conclusion reste actif pour la discussion Q&A.

Le mini-plan est un repère narratif, pas une seconde zone de contenu. Il doit rester lisible sur fond sombre et ne pas dépasser environ 8 % de la hauteur de la slide.

## 6. Diagrammes et workflows

Les diagrammes doivent être créés avec des formes et connecteurs éditables dans PowerPoint lorsque leur contenu est structurel.

Grammaire visuelle :

- Cyan : agent ou production de raisonnement/proposition.
- Bleu : service déterministe, commande, build, test ou orchestration.
- Amber : gate, décision ou intervention humaine.
- Teal : artefact validé, preuve ou scellement.
- Coral : échec, blocage ou correction requise.
- Steel : contexte, état neutre ou étape non active.

Règles de composition :

- lecture principale de gauche à droite ou de haut en bas ;
- maximum 6–7 nœuds visibles dans un schéma principal ;
- connecteurs de 1,5–2 pt, sans croisement si possible ;
- un verbe ou une action par étape ;
- labels de nœuds sur une à trois lignes ;
- aucun diagramme ne doit nécessiter plus de dix secondes pour être compris.

Les flèches servent au flux, pas à décorer. Les boucles de réparation doivent montrer distinctement la proposition, la review, la décision, l'application isolée et la revalidation.

## 7. Icônes

- Utiliser un seul style d'icônes linéaires, proche de Lucide, avec épaisseur constante de 1,5–2 pt.
- Préférer les pictogrammes simples : agent, humain, terminal, code, build, test, bouclier, preuve, historique.
- Éviter les emojis, les mix de bibliothèques, les illustrations 3D et les icônes trop détaillées.
- Une icône accompagne un label ; elle ne remplace pas le label.

## 8. Captures d'écran

- Utiliser des captures réelles du projet démo ou du rapport lorsqu'elles servent une démonstration.
- Recadrer sur la zone utile ; supprimer les barres ou informations sans valeur narrative.
- Ajouter un cadre fin Cyan, un rayon discret et une ombre très légère.
- Ajouter au maximum deux annotations par capture, avec repères numérotés ou callouts courts.
- Toute capture de démo porte la mention : **Démo locale — scénario anonymisé, états préparés**.
- Ne pas inventer de badges, métriques, logs ou résultats visuels.
- Éviter les captures d'écrans confidentiels CGI ; les remplacer par le frontend démo ou un schéma éditable.

## 9. Règles pour les slides techniques

- Une idée dominante par slide, même lorsqu'un contenu est regroupé en deux zones.
- Un diagramme principal ou une comparaison principale ; jamais plusieurs schémas concurrents.
- Un extrait de code est limité à trois lignes et n'est utilisé que s'il prouve une transformation précise.
- Les hashes, chemins de fichiers, noms de commits et détails d'environnement vont dans les notes du présentateur, sauf s'ils sont indispensables à la preuve affichée.
- Distinguer visuellement `Réalisé`, `Partiel` et `Prévu`.
- Présenter les agents comme des composants spécialisés et bornés, jamais comme des opérateurs disposant d'un terminal ou d'un accès libre au système de fichiers.
- Montrer que la base de données porte l'état métier, que les services déterministes exécutent les commandes et que les agents produisent des artefacts ou propositions.
- Toute décision sensible doit être reliée à un artefact, un checksum, une décision humaine et une preuve de revalidation.

## 10. Règles de contenu et de preuve

- Chaque chiffre affiché doit être traçable au rapport et formulé avec son périmètre.
- Les résultats Java (607 tests réussis, 4 ignorés ; contrôles frontend ; baseline 12 → 11 échecs) sont présentés comme des preuves ponctuelles, jamais comme un benchmark.
- Les transitions Angular 18 → 19 et 19 → 20 sont présentées comme scellées ; 20 → 21 comme préparée/non démarrée.
- Ne pas annoncer de gain de temps global, de couverture complète Angular ou d'authentification fonctionnelle.
- Les sources détaillées sont conservées dans les notes du présentateur : pages du rapport, documentation de démo et matrice de références du dépôt GitHub.
- Le deck doit rester compréhensible par un jury non spécialiste sans retirer les garde-fous nécessaires à un jury technique.

## 11. Motifs de layout à privilégier

- Cover : titre à gauche, flux abstrait à droite.
- Timeline : une ligne de progression et trois à cinq jalons.
- Architecture : couches empilées ou deux pipelines parallèles.
- Workflow : étapes horizontales avec gates visibles.
- Réparation : boucle fermée centrée sur la décision humaine.
- Preuves : trois cartes maximum avec chiffres ou statuts vérifiables.
- Difficultés : matrice compacte `problème → correction`.
- Limites/perspectives : deux colonnes `maintenant → ensuite`.

Les grilles de cartes ne doivent pas devenir le langage dominant du deck. Elles sont réservées aux preuves, aux rôles d'agents et aux comparaisons courtes.


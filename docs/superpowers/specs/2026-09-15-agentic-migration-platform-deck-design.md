# Spécification de conception — deck Agentic Migration Platform

**Date :** 2026-09-15  
**Statut :** conception approuvée en conversation ; production du deck non commencée  
**Livrable cible :** PowerPoint éditable `.pptx`, maximum 18 slides

## 1. Objectif

Créer une présentation de soutenance universitaire professionnelle qui explique la logique générale d'une plateforme agentique de migration logicielle, sans exposer le projet CGI confidentiel ni inventer des résultats.

Le récit doit être compréhensible par un jury mixte. Il commence par le déclencheur métier et opérationnel d'une migration cloud à grande échelle, transforme cette histoire en problématique de coordination d'une migration legacy, présente les frontières entre agents IA, services déterministes et humain, puis montre les deux chaînes techniques Java/Spring Boot et Angular, une réparation gouvernée et les preuves disponibles.

L'ouverture doit commencer par une histoire de besoin avant de nommer la problématique : un grand client aérien de CGI vise une migration cloud à grande échelle ; les équipes migrent progressivement un portefeuille legacy tout en maintenant la production ; les prompts et pratiques individuelles ne suffisent plus ; la demande s'élargit ; la réflexion aboutit à une Migration Factory multi-agents.

## 2. Décisions de design

### 2.1 Structure de 18 slides

Le nombre maximal demandé remplace la structure initiale de 22 slides par quatre regroupements cohérents :

- contexte et limites de la migration manuelle ;
- vision et architecture fonctionnelle ;
- difficultés et apports techniques ;
- limites et perspectives.

Les deux axes techniques, la gouvernance, les agents IA, la réparation, la démo, les résultats, la conclusion et le Q&A restent des sections identifiables.

| # | Slide | Chapitre actif |
|---:|---|---|
| 1 | Agentic Migration Platform | — |
| 2 | Plan de présentation | — |
| 3 | Le déclencheur : une migration cloud à grande échelle | Contexte |
| 4 | La réalité opérationnelle : maintenir et migrer en parallèle | Contexte |
| 5 | Du besoin à la Migration Factory : objectifs et vision | Solution |
| 6 | Architecture fonctionnelle | Architecture |
| 7 | Architecture technique | Architecture |
| 8 | Workflow complet de migration | Architecture |
| 9 | Axe 1 — Java / Spring Boot | Réalisation |
| 10 | Axe 2 — Angular | Réalisation |
| 11 | Gouvernance et rôles des agents IA | Réalisation |
| 12 | Réparation gouvernée | Réalisation |
| 13 | Démo : scénario utilisateur | Démo |
| 14 | Résultats et preuves | Résultats |
| 15 | Difficultés rencontrées et apports techniques | Résultats |
| 16 | Limites et perspectives | Résultats |
| 17 | Conclusion | Conclusion |
| 18 | Questions / Discussion | Conclusion |

Les slides 3 à 18 affichent le mini-plan fixe :

`Contexte → Solution → Architecture → Réalisation → Démo → Résultats → Conclusion`

Le chapitre actif est accentué en Cyan ; les chapitres parcourus et restants restent visibles mais désaturés. La slide 18 conserve `Conclusion` comme chapitre actif.

### 2.2 Direction visuelle retenue

La direction recommandée est un thème sombre enterprise software : fond bleu nuit, surfaces légèrement plus claires, Cyan pour les agents, Blue pour les services déterministes, Amber pour les gates humaines, Teal pour les preuves et Coral pour les échecs.

Cette direction a été préférée à :

1. un style académique blanc copié du rapport, trop statique pour expliquer un workflow ;
2. un style « AI futuriste », trop générique et peu crédible pour une soutenance d'ingénieur ;
3. un deck très clair de type documentation, lisible mais moins efficace pour les états, gates et boucles de réparation.

La palette, les tailles, la grille, les règles de diagrammes, d'icônes et de captures sont définies dans [`DESIGN.md`](../../../DESIGN.md). Toute production du deck doit suivre ce fichier plutôt que réinventer un style slide par slide.

## 3. Architecture narrative

### 3.1 Dépendances entre les idées

```text
Déclencheur : migration cloud à grande échelle
        ↓
Maintenir la production et migrer en parallèle
        ↓
Problème de coordination, de contexte et de preuves
        ↓
Objectifs, vision et frontières de responsabilité
        ↓
Architecture fonctionnelle et technique
        ↓
Workflow gouverné sur Java et Angular
        ↓
Réparation avec décision humaine
        ↓
Démo et preuves disponibles
        ↓
Limites, perspectives et principe final
```

La présentation ne doit pas introduire l'IA comme point de départ. La nécessité des agents devient évidente seulement après avoir montré le portefeuille legacy, la continuité de service exigée, la fragmentation de la migration manuelle et l'échec du passage à l'échelle des prompts individuels.

### 3.2 Scénario d'ouverture

La slide 3 doit faire comprendre en quelques secondes :

1. un grand client aérien de CGI veut progresser vers le cloud à horizon 2027 ;
2. le portefeuille legacy doit être traité progressivement, application ou microservice par application ;
3. les équipes doivent en même temps optimiser, maintenir et dépanner les applications en production ;
4. la migration doit rester invisible pour le client : disponibilité et fonctionnalité ne doivent pas se dégrader ;
5. les pratiques et prompts générés pour aider les développeurs ne suffisent plus lorsque la demande augmente.

Le visuel suit la chaîne :

`Objectif Cloud → Applications legacy → Équipes sous tension → Migration manuelle → Besoin d'industrialisation`

La slide 4 transforme cette histoire en problématique d'ingénierie. La slide 5 montre la réponse conceptuelle :

`Prompts individuels → Standardisation → Factory multi-agents`

La slide 5 doit séparer clairement le périmètre démontré — Java/Spring Boot et Angular — de la vision cible — .NET, PHP, Python, React, on-premise → cloud, cloud → cloud et refactoring.

### 3.3 Principe central à répéter

> Les agents proposent et raisonnent ; les services déterministes exécutent et vérifient ; l'humain autorise les changements sensibles.

Ce principe doit apparaître implicitement dans les slides 5, 6, 10, 11, 12 et explicitement dans la conclusion.

## 4. Matrice de vérité et de preuve

| Sujet | Formulation autorisée | Formulation interdite |
|---|---|---|
| Java | Parcours de référence le plus mature, avec Spring Boot 2.1→2.7→3.5→4.0 et Java 11/17/21. | « Toute migration Java est entièrement automatisée et industrialisée. » |
| Angular | Transitions 18→19 et 19→20 prouvées/scellées ; 20→21 préparée mais non démarrée. | « Migration Angular complète 11→21 réalisée. » |
| Tests Java | Campagne ponctuelle : 607 tests backend réussis, 4 ignorés. | « Taux de qualité de 99 % » ou benchmark généralisé. |
| Frontend | Type, conformité et build validés ; baseline passée de 12 à 11 échecs après intégration. | « Tous les tests frontend sont verts. » |
| Réparation | Propositions reviewables, checksum, application isolée et revalidation. | « L'agent répare seul jusqu'à réussite. » |
| Démo | Interface locale, déterministe, scénario anonymisé et états préparés. | « Démonstration du backend CGI réel. » |
| Sécurité | Source externe protégée, chemins bornés et décisions contrôlées dans le prototype. | Authentification, rôles, Entra ID ou Key Vault présentés comme livrés. |
| Performance | Potentiel d'efficacité identifié qualitativement. | Pourcentage de gain sans benchmark contrôlé. |

Chaque chiffre ou statut affiché doit être relié à une page du rapport ou à un document de démo dans les notes du présentateur.

## 5. Sources et utilisation

### 5.1 Rapport PFE

- Problématique et objectifs : pp. 14–22.
- Architecture hybride, responsabilités et gates : pp. 41–51.
- Implémentation Java/Angular, persistance, réparation et limites : pp. 52–69.
- Protocole, résultats, comparaison, limites et conclusion : pp. 70–85.

Le rapport est une source de contenu et de preuves, pas un modèle graphique à recopier. Les pages denses sont résumées en schémas ou matrices courtes.

### 5.2 Contexte narratif fourni pour la soutenance

Le contexte opérationnel de l'ouverture est fourni par le porteur du projet et doit être traité comme une information de cadrage à présenter avec prudence. Sur les slides, utiliser par défaut les formulations **« un grand client aérien »** et **« d'autres grands comptes »**. Les noms de clients, la date précise de la cible cloud et tout détail permettant d'identifier le programme restent dans les notes uniquement après autorisation explicite.

### 5.3 Dépôt démo

Les notes du présentateur peuvent référencer :

- `docs/DEMO-RECORDING.md` pour le caractère local, déterministe et anonymisé ;
- `docs/architecture/source-reference-matrix.md` pour les références Angular/Java et les règles de workflow ;
- les routes `/angular/migrations/run-angular-action?mode=recording` et `/java/migrations/java-repair-service?mode=recording` pour les captures de démo.

La capture principale recommandée est l'écran Angular G10 de réparation : action requise, diff source-grounded, review indépendante et décision humaine. Une vignette Java peut rappeler le parcours `repair_review`, sans créer un deuxième scénario complet.

## 6. Construction du deck

### 6.1 Matériaux

Le travail de production utilisera :

- le rapport PDF comme source documentaire ;
- les captures vérifiées du projet démo comme preuves d'interface ;
- des diagrammes natifs PowerPoint pour architecture, workflow, gates et boucle de réparation ;
- des notes du présentateur pour les pages, liens et précisions non nécessaires à l'écran.

### 6.2 Éditabilité

- Les titres, textes, labels, formes, connecteurs, tables et indicateurs de progression doivent rester éditables.
- Les captures sont les seuls éléments bitmap principaux, avec un recadrage contrôlé.
- Les diagrammes ne doivent pas être exportés en images aplaties si une construction native est possible.
- Les statuts `Réalisé`, `Partiel` et `Prévu` sont des libellés explicites, pas seulement des couleurs.

### 6.3 Densité

- Une idée dominante par slide.
- Maximum trois groupes visuels principaux.
- Maximum six ou sept nœuds dans un diagramme central.
- Corps de texte à 17 pt minimum.
- Les détails de code, hashes, chemins et variables d'environnement restent dans les notes sauf s'ils sont indispensables à la preuve.

## 7. Gestion des cas incertains

- Si une preuve n'est pas disponible, afficher `Non mesuré`, `Partiel` ou `Préparé`, jamais une valeur estimée.
- Si une capture n'est pas assez nette, la remplacer par un schéma natif et une courte légende.
- Si une fonctionnalité est décrite dans le rapport comme prévue ou en cours, elle reçoit le statut `Prévu` ou `Partiel`.
- Si une interface démo semble réelle mais utilise des états préparés, afficher la mention de démo sur la slide et dans les notes.
- Si un rendu provoque une surcharge, préserver le message clé et supprimer les détails avant de réduire la typographie.

## 8. Vérification avant livraison

### 8.1 Contrôles structurels

- Le fichier final contient exactement 18 slides, sauf demande explicite d'une annexe.
- La slide 1 est le titre et la slide 2 est immédiatement le plan.
- Les slides 3 à 18 contiennent le mini-plan supérieur avec le chapitre actif correct.
- Les deux axes Java/Spring Boot et Angular sont présents et clairement différenciés.
- La démo et le Q&A sont présents.
- Aucune slide obligatoire n'a été supprimée sans être couverte par une fusion documentée.

### 8.2 Contrôles de contenu

- Chaque slide possède un message clé vérifiable.
- Les affirmations Angular, Java, tests et limites respectent la matrice de vérité.
- Aucun résultat inventé, aucune promesse de gain global et aucune information CGI confidentielle ne figure dans le deck.
- Les notes du présentateur contiennent les sources pertinentes.

### 8.3 Contrôles visuels

- Aucun débordement de texte, chevauchement ou connecteur cassé.
- Marges et alignements cohérents entre slides.
- Diagrammes compréhensibles en moins de dix secondes.
- Captures lisibles à l'échelle de projection et annotations limitées.
- Contraste suffisant ; les statuts ne reposent pas uniquement sur la couleur.
- La progression visuelle reste discrète et ne concurrence pas le contenu.

### 8.4 Vérification dans Codex Slides

La production et la revue suivront une séquence Browser-first : créer le projet Slides, importer les sources autorisées, fournir storyboard et design system, générer le deck, inspecter les slides dans le Browser, corriger, puis exporter le `.pptx` après validation visuelle. La vérification finale doit confirmer à la fois l'état durable du projet et le rendu visible de la version exportée.

## 9. Découpage des commits

Chaque changement de contenu ou de design est isolé :

1. `docs: add 18-slide presentation storyboard` — storyboard et contraintes de vérité.
2. `docs: add presentation design system` — `DESIGN.md`.
3. `docs: specify presentation production design` — cette spécification.
4. `feat: add editable Agentic Migration Platform deck` — première version du PPTX.
5. Corrections ultérieures : un commit par correction identifiable, par exemple indicateur de progression, hiérarchie d'une slide, preuve ou capture.

Les fichiers temporaires d'audit et de rendu ne doivent jamais être inclus dans ces commits.

## 10. Hors périmètre

- Modifier le code du projet démo ou le rapport PDF.
- Exposer des données, secrets ou détails protégés CGI.
- Présenter comme livrée une fonctionnalité seulement planifiée.
- Publier le deck ou l'envoyer à un tiers sans instruction distincte.
- Ajouter des annexes au-delà de 18 slides sans accord explicite.

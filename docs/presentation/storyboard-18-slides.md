# Agentic Migration Platform — storyboard de soutenance

## Intent

Cette présentation explique comment une plateforme agentique transforme une migration logicielle complexe en parcours contrôlé, traçable et revalidable. Elle s'adresse à un jury mixte : ingénieurs capables de challenger l'architecture et membres du jury qui doivent comprendre rapidement la valeur du projet.

Le titre public retenu est **Agentic Migration Platform**. Le rapport emploie aussi le nom **Migration Factory** ; ce lien peut être expliqué oralement ou dans le sous-titre : *A governed migration factory for Java/Spring Boot and Angular*.

## Contraintes de vérité

- La démonstration et les supports représentent une version anonymisée et fictive de la logique générale du projet réalisé chez CGI.
- Le projet démo GitHub est une interface Next.js locale et déterministe. Elle ne doit pas être présentée comme une connexion au backend CGI, à Azure, à Maven ou à npm protégés.
- L'axe Java/Spring Boot est le parcours de référence le plus mature : Spring Boot 2.1 → 2.7 → 3.5 → 4.0 avec Java 11/17/21.
- L'axe Angular prouve les transitions 18 → 19 et 19 → 20. La transition 20 → 21 est préparée mais non démarrée ; une migration complète 11 → 21 ne doit pas être annoncée comme réalisée.
- Les preuves disponibles incluent une campagne backend Java de 607 tests réussis et 4 ignorés, les validations frontend de type/conformité/build, ainsi qu'un passage de 12 à 11 échecs dans la baseline frontend après intégration. Ces chiffres sont des preuves ponctuelles, pas un benchmark ni une mesure de gain global.
- L'authentification, les rôles, le benchmark manuel contrôlé, la mesure consolidée du coût/débit LLM et une chaîne CI commune restent des limites ou perspectives.

## Indicateur de progression

À partir de la slide 3, chaque slide de contenu affiche le même mini-plan en haut :

`Contexte → Solution → Architecture → Réalisation → Démo → Résultats → Conclusion`

Le chapitre courant est accentué en cyan, les chapitres déjà parcourus sont atténués ou marqués d'une coche, et les chapitres restants restent visibles mais désaturés. La slide de titre ne porte pas cet indicateur ; la slide de plan le présente en grand.

## Storyboard

| # | Titre | Chapitre actif | Message clé | Visuel recommandé | Risque et simplification |
|---:|---|---|---|---|---|
| 1 | **Agentic Migration Platform** | — | Une migration legacy devient un parcours gouverné et vérifiable. | Cover sombre premium : `Legacy → Agents → Evidence → Modern`. | Éviter le robot IA décoratif ; privilégier un flux abstrait et logiciel. |
| 2 | **Plan de présentation** | — | La soutenance suit le chemin problème → solution → réalisation → preuves. | Timeline des sept chapitres. | Ne pas afficher les 18 titres ; garder une carte narrative simple. |
| 3 | **Contexte et limites de la migration manuelle** | Contexte | La difficulté est de coordonner versions, commandes, décisions, reprises et preuves. | Processus fragmenté : terminal, notes, tickets, Git, tests. | Deux thèmes fusionnés : construire une seule histoire autour de la perte de contexte et du rework. |
| 4 | **Objectifs du projet** | Contexte | Encadrer le raisonnement des agents tout en conservant l'autorité du développeur. | Quatre piliers : analyser, planifier, exécuter, prouver. | Ne pas reproduire la liste BF-01 à BF-14 ; sélectionner les objectifs structurants. |
| 5 | **Vision et architecture fonctionnelle** | Solution | Agents, services déterministes, humain et preuves travaillent dans une boucle unique. | Architecture en couches : intention, orchestration, agents/services, gates, evidence. | Limiter le schéma à six ou sept blocs et à un flux principal. |
| 6 | **Architecture technique** | Architecture | Java et Angular ont des toolchains différentes mais partagent des contrats de gouvernance. | Deux pipelines parallèles : Maven/OpenRewrite d'un côté, npm/Angular CLI de l'autre, reliés par un noyau commun. | Ne pas masquer les différences de maturité ni fusionner les chaînes techniques. |
| 7 | **Workflow complet de migration** | Architecture | Chaque étape progresse par état, gate, validation et revalidation. | Workflow horizontal : qualification → analyse → plan → transformation → validation → réparation → scellement. | Ne pas afficher la machine à états complète du rapport ; montrer seulement les décisions structurantes. |
| 8 | **Axe 1 — Java / Spring Boot** | Réalisation | Java constitue le parcours de référence le plus avancé. | Timeline Spring Boot 2.1 → 2.7 → 3.5 → 4.0, avec Java 11/17/21, Maven et OpenRewrite. | Distinguer explicitement les fonctionnalités démontrées, en cours et planifiées. |
| 9 | **Axe 2 — Angular** | Réalisation | Le modèle de gouvernance est transférable, mais la couverture Angular est encore partielle. | Ligne de preuve : 18→19 scellée, 19→20 scellée, 20→21 préparée. | Ne jamais afficher 11→21 comme résultat obtenu ; mentionner la maturité différente. |
| 10 | **Gouvernance : gates, validation humaine et traçabilité** | Réalisation | Aucun changement sensible n'est appliqué sans artefact, décision et preuve associés. | Gate centrée sur une proposition, son checksum, la décision humaine et l'historique. | Éviter la matrice complète des droits ; montrer le principe de contrôle. |
| 11 | **Agents IA : rôles et limites** | Réalisation | Les agents sont spécialisés et proposent ; ils n'ont pas l'autorité finale. | Carte des agents : analyse, reviewer d'analyse, planification, reviewer de plan, transformation, réparation, reviewer de réparation, assistant. | Une ligne par rôle ; ne pas afficher les prompts ou une constellation illisible. |
| 12 | **Réparation gouvernée** | Réalisation | Un échec est gelé, expliqué, corrigé sous contrôle puis revalidé. | Boucle `Échec → Contexte → Proposition → Review → Décision → Application isolée → Build/Test`. | Séparer visuellement proposition, approbation et application ; ne pas suggérer un retry autonome illimité. |
| 13 | **Démo : scénario utilisateur** | Démo | L'utilisateur part d'une action requise, inspecte la preuve, décide et suit la revalidation. | Capture annotée du scénario Angular G10, avec une courte mention du parcours Java de réparation. | Afficher clairement : scénario anonymisé, états préparés, interface locale ; une seule capture principale. |
| 14 | **Résultats et preuves** | Résultats | La valeur démontrée est le contrôle et la traçabilité, pas un pourcentage de gain inventé. | Trois cartes de preuves : campagne Java, validations frontend, transitions Angular scellées. | Ajouter la mention « preuves ponctuelles, non benchmarkées » et ne pas extrapoler. |
| 15 | **Difficultés rencontrées et apports techniques** | Résultats | Les difficultés ont conduit à renforcer les contrats, checksums, catalogues et contrôles. | Matrice en deux colonnes : problème → correction architecturale ; bandeau de compétences mobilisées. | Garder quatre difficultés représentatives : patch non applicable, autorité de commande, mismatch Angular, cohérence SQLite. |
| 16 | **Limites et perspectives** | Résultats | Le prototype est gouverné, mais son industrialisation reste à compléter. | Deux horizons : limites actuelles / prochaines étapes. | Ne pas transformer les perspectives en fonctionnalités déjà livrées. |
| 17 | **Conclusion** | Conclusion | Les agents proposent et raisonnent ; les services déterministes et l'humain contrôlent. | Phrase finale et triptyque `Reasoning · Control · Evidence`. | Ne pas répéter les 16 slides précédentes ; terminer sur le principe architectural. |
| 18 | **Questions / Discussion** | Conclusion | Ouvrir l'échange sur les choix, les preuves et les limites. | Slide très épurée, rappel discret du triptyque final. | Aucun nouveau résultat ni détail technique ; garder l'espace pour le dialogue. |

## Règles de narration

1. Partir d'un problème concret de migration, pas de l'IA.
2. Introduire l'IA uniquement après avoir posé les frontières déterministes et la responsabilité humaine.
3. Présenter Java comme le parcours de référence et Angular comme une validation de transférabilité encore partielle.
4. Utiliser la démo pour montrer une décision et sa preuve, pas seulement une interface.
5. Finir par une conclusion honnête : le projet organise et gouverne l'automatisation ; il ne promet pas une autonomie totale.

## Sources à conserver dans les notes du présentateur

- Rapport PFE : problématique et objectifs, pp. 14–22 ; architecture, pp. 41–51 ; implémentation, pp. 52–69 ; évaluation, pp. 70–85.
- Démo GitHub : `docs/DEMO-RECORDING.md`, `docs/architecture/source-reference-matrix.md`, routes Angular et Java de présentation.
- Les références techniques du rapport restent dans les notes, notamment OpenRewrite, Spring Boot, Angular, LangGraph, NIST AI RMF et ISO/IEC 25010.

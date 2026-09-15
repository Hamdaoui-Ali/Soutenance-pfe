# Agentic Migration Platform — storyboard de soutenance

## Intent

Cette présentation explique comment une plateforme agentique transforme une migration logicielle complexe en parcours contrôlé, traçable et revalidable. Elle s'adresse à un jury mixte : ingénieurs capables de challenger l'architecture et membres du jury qui doivent comprendre rapidement la valeur du projet.

Le titre public retenu est **Agentic Migration Platform**. Le rapport emploie aussi le nom **Migration Factory** ; ce lien peut être expliqué oralement ou dans le sous-titre : *A governed migration factory for Java/Spring Boot and Angular*.

L'ouverture suit une histoire de besoin : un grand client aérien de CGI vise une migration cloud à grande échelle ; les équipes doivent maintenir les applications en production tout en migrant progressivement un portefeuille legacy ; les pratiques et prompts individuels ne suffisent plus ; la réflexion aboutit à une Migration Factory multi-agents.

## Contraintes de vérité

- La démonstration et les supports représentent une version anonymisée et fictive de la logique générale du projet réalisé chez CGI.
- Le contexte d'ouverture peut mentionner un grand client aérien, une cible cloud à horizon 2027, la migration vers Azure et l'augmentation de la demande auprès d'autres grands comptes. Les noms de clients et les informations calendaires précises restent hors slide par défaut et ne sont utilisés qu'après autorisation explicite.
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
| 3 | **Le déclencheur : une migration cloud à grande échelle** | Contexte | Un portefeuille legacy doit évoluer vers le cloud sans interrompre les services de production. | Histoire en cinq étapes : `Objectif Cloud → Applications legacy → Équipes sous tension → Migration manuelle → Besoin d'industrialisation`. | Anonymiser le client et éviter une slide corporate ; garder le contexte CGI en un bloc discret. |
| 4 | **La réalité opérationnelle : maintenir et migrer en parallèle** | Contexte | Maintenance, incidents, optimisation et migration se disputent le même temps développeur. | Écran partagé : production à maintenir / migration progressive / exigence de disponibilité. | Relier cette tension à la perte de contexte, au rework et aux preuves dispersées ; ne pas détailler tous les outils. |
| 5 | **Du besoin à la Migration Factory : objectifs et vision** | Solution | Les prompts et pratiques individuelles ne passent plus à l'échelle ; une plateforme multi-agents devient nécessaire. | Évolution `Prompts individuels → Standardisation → Factory multi-agents`, puis bandeau `actuel / vision cible`. | Marquer Java/Angular comme périmètre démontré et .NET/PHP/Python/React, cloud-to-cloud et refactoring comme vision cible. |
| 6 | **Architecture fonctionnelle** | Architecture | Agents, services déterministes, humain et preuves travaillent dans une boucle unique. | Architecture en couches : intention, orchestration, agents/services, gates, evidence. | Limiter le schéma à six ou sept blocs et à un flux principal. |
| 7 | **Architecture technique** | Architecture | Java et Angular ont des toolchains différentes mais partagent des contrats de gouvernance. | Deux pipelines parallèles : Maven/OpenRewrite d'un côté, npm/Angular CLI de l'autre, reliés par un noyau commun. | Ne pas masquer les différences de maturité ni fusionner les chaînes techniques. |
| 8 | **Workflow complet de migration** | Architecture | Chaque étape progresse par état, gate, validation et revalidation. | Workflow horizontal : qualification → analyse → plan → transformation → validation → réparation → scellement. | Ne pas afficher la machine à états complète du rapport ; montrer seulement les décisions structurantes. |
| 9 | **Axe 1 — Java / Spring Boot** | Réalisation | Java constitue le parcours de référence le plus avancé. | Timeline Spring Boot 2.1 → 2.7 → 3.5 → 4.0, avec Java 11/17/21, Maven et OpenRewrite. | Distinguer explicitement les fonctionnalités démontrées, en cours et planifiées. |
| 10 | **Axe 2 — Angular** | Réalisation | Le modèle de gouvernance est transférable, mais la couverture Angular est encore partielle. | Ligne de preuve : 18→19 scellée, 19→20 scellée, 20→21 préparée. | Ne jamais afficher 11→21 comme résultat obtenu ; mentionner la maturité différente. |
| 11 | **Gouvernance et rôles des agents IA** | Réalisation | Les agents sont spécialisés et proposent ; les gates et l'humain gardent l'autorité finale. | Composition en deux zones : gate avec checksum/décision/historique + carte courte des agents. | Huit rôles maximum, une ligne par rôle ; ne pas afficher les prompts ni la matrice complète. |
| 12 | **Réparation gouvernée** | Réalisation | Un échec est gelé, expliqué, corrigé sous contrôle puis revalidé. | Boucle `Échec → Contexte → Proposition → Review → Décision → Application isolée → Build/Test`. | Séparer visuellement proposition, approbation et application ; ne pas suggérer un retry autonome illimité. |
| 13 | **Démo : scénario utilisateur** | Démo | L'utilisateur part d'une action requise, inspecte la preuve, décide et suit la revalidation. | Capture annotée du scénario Angular G10, avec une courte mention du parcours Java de réparation. | Afficher clairement : scénario anonymisé, états préparés, interface locale ; une seule capture principale. |
| 14 | **Résultats et preuves** | Résultats | La valeur démontrée est le contrôle et la traçabilité, pas un pourcentage de gain inventé. | Trois cartes de preuves : campagne Java, validations frontend, transitions Angular scellées. | Ajouter la mention « preuves ponctuelles, non benchmarkées » et ne pas extrapoler. |
| 15 | **Difficultés rencontrées et apports techniques** | Résultats | Les difficultés ont conduit à renforcer les contrats, checksums, catalogues et contrôles. | Matrice en deux colonnes : problème → correction architecturale ; bandeau de compétences mobilisées. | Garder quatre difficultés représentatives : patch non applicable, autorité de commande, mismatch Angular, cohérence SQLite. |
| 16 | **Limites et perspectives** | Résultats | Le prototype est gouverné, mais son industrialisation reste à compléter. | Deux horizons : limites actuelles / prochaines étapes. | Ne pas transformer les perspectives en fonctionnalités déjà livrées. |
| 17 | **Conclusion** | Conclusion | Les agents proposent et raisonnent ; les services déterministes et l'humain contrôlent. | Phrase finale et triptyque `Reasoning · Control · Evidence`. | Ne pas répéter les 16 slides précédentes ; terminer sur le principe architectural. |
| 18 | **Questions / Discussion** | Conclusion | Ouvrir l'échange sur les choix, les preuves et les limites. | Slide très épurée, rappel discret du triptyque final. | Aucun nouveau résultat ni détail technique ; garder l'espace pour le dialogue. |

## Règles de narration

1. Commencer par l'histoire cloud et la contrainte de continuité de service, pas par l'IA.
2. Montrer la tension entre production et migration avant de formuler la problématique.
3. Présenter les prompts comme une première capitalisation qui révèle le besoin d'industrialisation.
4. Introduire l'IA uniquement après avoir posé les frontières déterministes et la responsabilité humaine.
5. Présenter Java comme le parcours de référence et Angular comme une validation de transférabilité encore partielle.
6. Utiliser la démo pour montrer une décision et sa preuve, pas seulement une interface.
7. Finir par une conclusion honnête : le projet organise et gouverne l'automatisation ; il ne promet pas une autonomie totale.

## Sources à conserver dans les notes du présentateur

- Rapport PFE : problématique et objectifs, pp. 14–22 ; architecture, pp. 41–51 ; implémentation, pp. 52–69 ; évaluation, pp. 70–85.
- Démo GitHub : `docs/DEMO-RECORDING.md`, `docs/architecture/source-reference-matrix.md`, routes Angular et Java de présentation.
- Les références techniques du rapport restent dans les notes, notamment OpenRewrite, Spring Boot, Angular, LangGraph, NIST AI RMF et ISO/IEC 25010.

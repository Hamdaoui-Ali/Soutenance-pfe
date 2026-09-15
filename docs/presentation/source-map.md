# Agentic Migration Platform — source map

Cette matrice est la référence de contenu pour la génération du PPTX. Les chiffres, statuts et limites doivent respecter les formulations ci-dessous. Les détails complets restent dans les notes du présentateur ; le contenu visible doit rester court.

## Règles de confidentialité

- Afficher par défaut **un grand client aérien** et **d'autres grands comptes**.
- Ne pas afficher les noms de clients, de programmes ou d'équipes CGI sans autorisation distincte.
- Présenter le contexte comme le point de départ du raisonnement, pas comme une description exhaustive d'un contrat client.
- La démo est locale, déterministe, anonymisée et basée sur des états préparés. Elle ne constitue pas une exécution du backend CGI protégé.

## Matrice slide par slide

| Slide | Message visible | Source principale | Statut | Note / disclosure obligatoire |
|---:|---|---|---|---|
| 1 | Agentic Migration Platform : migration legacy gouvernée et vérifiable. | Rapport, page de garde ; storyboard approuvé. | Narratif | Aucun chiffre ; le titre public peut être accompagné de « governed migration factory ». |
| 2 | La présentation suit Contexte → Solution → Architecture → Réalisation → Démo → Résultats → Conclusion. | Storyboard approuvé ; DESIGN.md. | Narratif | Aucun détail de projet. |
| 3 | Un portefeuille legacy doit évoluer vers le cloud à grande échelle sans interrompre la production. | Rapport pp. 14–22 et p. 17 ; contexte opérationnel fourni par le porteur du projet. | Narratif / cadrage | Dire « un grand client aérien » ; ne pas afficher de nom client ni de détail contractuel. Azure et l'horizon 2027 sont des éléments de contexte à afficher seulement sous réserve d'autorisation. |
| 4 | Maintenance, incidents, optimisation et migration manuelle sollicitent les mêmes développeurs. | Rapport pp. 20–22 ; contexte opérationnel fourni par le porteur du projet. | Cadrage | Pour le client, la disponibilité et la fonctionnalité restent prioritaires ; ne pas promettre une réduction de durée. |
| 5 | Les prompts individuels ne passent plus à l'échelle ; ils conduisent à une Factory multi-agents. | Rapport p. 22, pp. 41–51 et pp. 84–85 ; storyboard approuvé. | Réalisé / vision cible | Java/Spring Boot et Angular = périmètre démontré ; .NET, PHP, Python, React, on-premise→cloud, cloud→cloud et refactoring = vision cible. |
| 6 | Les responsabilités sont séparées entre agents, services déterministes, gates humaines et preuves. | Rapport pp. 41–51. | Réalisé conceptuel | La base de données porte l'état métier ; LangGraph orchestre les étapes ; les agents ne sont pas l'autorité métier. |
| 7 | Java et Angular ont des toolchains spécifiques mais des contrats de gouvernance communs. | Rapport pp. 41–51 et pp. 52–65. | Réalisé / partiel selon axe | Java : JDK/Maven/OpenRewrite ; Angular : Node/npm/Angular CLI/TypeScript/RxJS. Ne pas présenter une chaîne unique qui efface les différences. |
| 8 | Le parcours va de la qualification au scellement, avec validation et revalidation. | Rapport pp. 41–51, pp. 52–65 ; matrice de références du dépôt démo. | Réalisé conceptuel | Montrer les états et gates structurants, pas la machine à états exhaustive. |
| 9 | Java/Spring Boot est le parcours de référence le plus mature. | Rapport pp. 52–64 et pp. 70–79. | Réalisé / partiel selon scénario | Spring Boot 2.1→2.7→3.5→4.0 et Java 11/17/21 ; distinguer les éléments démontrés des éléments en cours ou prévus. |
| 10 | Angular applique le même modèle avec des preuves progressives. | Rapport pp. 53–55, pp. 65–66 et pp. 70–79 ; `docs/architecture/source-reference-matrix.md`. | Partiel | 18→19 et 19→20 sont scellées ; 20→21 est préparée mais non démarrée ; 11→21 n'est pas démontrée. |
| 11 | Les agents sont spécialisés ; la décision finale reste gouvernée par les gates et l'humain. | Rapport pp. 43–51 et pp. 61–64. | Réalisé conceptuel / partiel selon agent | Montrer analyse, reviewers, planning, transformation, réparation et assistant. Aucun agent ne reçoit un accès libre au terminal ou au système de fichiers. |
| 12 | Une réparation suit la boucle échec → proposition → review → décision → application isolée → revalidation. | Rapport pp. 50–51, pp. 63–65 et pp. 78–79 ; matrice de références du dépôt démo. | Réalisé qualitativement | Les propositions sont reviewables ; les checksums évitent les décisions sur artefact obsolète ; les tentatives sont bornées et persistées. |
| 13 | L'utilisateur inspecte une correction Angular G10 et prend une décision. | `docs/DEMO-RECORDING.md`, routes de démo et `docs/architecture/source-reference-matrix.md`. | Démo locale / états préparés | Afficher : **Démo locale — scénario anonymisé, états préparés**. Ne pas appeler cette capture un backend CGI réel. |
| 14 | Les preuves montrent contrôle, validation et traçabilité. | Rapport p. 66 et pp. 70–81. | Preuves ponctuelles | 607 tests backend réussis, 4 ignorés ; type/conformité/build frontend validés ; baseline frontend 12→11 échecs après intégration ; aucun benchmark global. |
| 15 | Les difficultés ont renforcé les contrats, checksums, catalogues et contrôles. | Rapport p. 65 et pp. 81–84. | Réalisé / apprentissage | Exemples : patch non applicable, autorité de commande ambiguë, profil Angular incompatible, incohérence SQLite. |
| 16 | Le prototype est gouverné mais pas encore industrialisé. | Rapport pp. 82–85. | Limites / perspectives | Pas d'authentification/roles livrés, pas de benchmark manuel contrôlé, pas de CI commune, couverture Angular incomplète, coûts/durées non consolidés. |
| 17 | Les agents proposent et raisonnent ; les services déterministes et l'humain contrôlent. | Rapport pp. 84–85. | Conclusion | Ne pas ajouter de nouveau résultat. |
| 18 | Questions / Discussion. | Storyboard approuvé. | Narratif | Aucun nouveau chiffre ni engagement produit. |

## Formulations interdites

- « La plateforme migre automatiquement toute application de bout en bout sans intervention. »
- « La migration Angular 11→21 a été réalisée. »
- « La solution réduit le temps de migration de X %. » sans benchmark contrôlé.
- « Tous les tests frontend sont verts. »
- « La démo exécute le backend CGI, Maven, npm ou Azure. »
- « L'authentification, les rôles, Entra ID ou Key Vault sont livrés. »

## Vérification rapide

```powershell
rg -n "607|4 ignor|12.*11|18.*19|19.*20|20.*21|Prévu|Partiel|Non mesuré|anonym" docs/presentation/source-map.md
```

La commande doit retrouver les chiffres, les frontières Angular, les statuts et les mentions d'anonymisation.

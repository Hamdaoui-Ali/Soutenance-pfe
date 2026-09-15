# Revue intermédiaire — architecture et réalisation

## Slides reconstruites

- **6 — Architecture fonctionnelle** : couches intention/gate, orchestrateur,
  agents, services et registre de preuves. La base porte l'état métier ; les
  services portent l'exécution déterministe.
- **7 — Architecture technique** : deux rails distincts pour Java/Spring Boot
  et Angular, reliés par le contrat de gouvernance commun.
- **8 — Workflow** : un parcours horizontal qualification → scellement, avec
  gates verticaux et trois définitions courtes : état, gate, preuve.
- **9 — Java** : ligne Spring Boot 2.1 → 2.7 → 3.5 → 4.0, runtime Java 11/17/21,
  Maven et OpenRewrite.
- **10 — Angular** : 18 → 19 et 19 → 20 scellées ; 20 → 21 préparée et non
  démarrée ; garde-fou 11 → 21 non démontrée.
- **11 — Agents** : constellation de rôles autour de l'orchestrateur, avec la
  frontière humaine visible sur le même canvas.
- **12 — Réparation** : proposition, review, décision humaine, application
  isolée, build/test et revalidation ; checksum, bornage et historique en
  repères secondaires.

## Contrôles visuels effectués

- Les slides 6–12 ont été rendues via PowerPoint à partir du draft local.
- La lecture principale reste horizontale ou verticale, sans connecteur croisé
  dans les diagrammes principaux.
- Les statuts sont écrits (`Réalisé`, `PARTIEL`, `scellée`, `préparée`, `non
  démarrée`) et ne reposent pas sur la couleur seule.
- Les compositions changent d'une slide à l'autre : couches, double pipeline,
  rail, timeline, constellation, puis boucle de contrôle.
- Aucun client réel, résultat inventé ou accès autonome des agents n'est ajouté.

## Ajustements réservés à la QA finale

La branche finale devra vérifier à taille de projection les labels secondaires
des slides 6, 8, 11 et 12, ainsi que le contraste des lignes fines sur fond
graphite. Les textes structurants restent volontairement courts ; les sources
et explications détaillées sont dans les notes du présentateur.

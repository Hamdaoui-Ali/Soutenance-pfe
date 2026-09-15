export const W = 13.333;
export const H = 7.5;

export const COLORS = {
  graphite: "0B1117",
  slate: "131D26",
  slate2: "1B2A35",
  ivory: "F3F1EA",
  snow: "F5F7F8",
  ink: "101820",
  mist: "9EADB8",
  steel: "344653",
  steelLight: "6C7F89",
  cyan: "68D6E8",
  blue: "4E9DFF",
  amber: "F4B84A",
  mint: "41D3AE",
  coral: "FF6F72",
  white: "FFFFFF",
};

export const FONTS = {
  head: "Aptos Display",
  body: "Aptos",
  mono: "Aptos Mono",
};

export const CHAPTERS = [
  "Contexte",
  "Solution",
  "Architecture",
  "Réalisation",
  "Démo",
  "Résultats",
  "Conclusion",
];

export const CHAPTER_INDEX = Object.fromEntries(CHAPTERS.map((label, index) => [label, index]));

export const SLIDE_TITLES = [
  "Agentic Migration Platform",
  "Plan de présentation",
  "Le déclencheur : le cloud crée l'urgence",
  "Run et migration partagent la même capacité",
  "Du prompt individuel à la Migration Factory",
  "Architecture fonctionnelle",
  "Deux toolchains, un même contrat",
  "Le parcours de migration",
  "Java / Spring Boot : le parcours de référence",
  "Angular : une couverture progressive",
  "Les agents produisent, l'humain autorise",
  "Réparer sous contrôle",
  "Démo : décider à partir d'une preuve",
  "Les preuves disponibles",
  "Les difficultés ont renforcé l'architecture",
  "Industrialiser reste le prochain chantier",
  "Le principe d'architecture",
  "Questions / Discussion",
];

export const DARK_SLIDES = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 17, 18]);

export const px = (value) => value / 120;

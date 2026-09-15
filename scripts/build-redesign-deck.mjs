import { createRequire } from "node:module";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { CHAPTERS, COLORS as C, FONTS, H, SLIDE_TITLES, W } from "./redesign/theme.mjs";
import { routeMark, svgDataUri } from "./redesign/svg.mjs";
import { speakerNotes } from "./redesign/notes.mjs";

function loadPptxGenJS() {
  const roots = [
    process.env.PPTXGENJS_HOME,
    process.env.CODEX_SLIDES_HOME ? `${process.env.CODEX_SLIDES_HOME}/node_modules` : "",
    "C:/Users/aliha/.codex/plugins/cache/codex-slides/codex-slides/0.1.0+codex.20260713/node_modules",
  ].filter(Boolean);
  for (const root of roots) {
    const pkg = resolve(root, "pptxgenjs", "package.json");
    if (!existsSync(pkg)) continue;
    const mod = createRequire(pkg)("pptxgenjs");
    return mod.default ?? mod;
  }
  throw new Error("PptxGenJS not found. Set PPTXGENJS_HOME to its node_modules directory.");
}

const PptxGenJS = loadPptxGenJS();
const pptx = new PptxGenJS();
const Shape = pptx.ShapeType ?? PptxGenJS.ShapeType ?? {};
const shape = (name) => Shape[name] ?? name;

pptx.layout = "LAYOUT_WIDE";
pptx.author = "Agentic Migration Platform";
pptx.company = "CGI";
pptx.subject = "Soutenance PFE — plateforme agentique de migration";
pptx.title = "Agentic Migration Platform — Soutenance PFE";
pptx.lang = "fr-FR";
pptx.theme = {
  headFontFace: FONTS.head,
  bodyFontFace: FONTS.body,
  lang: "fr-FR",
};

function tx(slide, value, x, y, w, h, fontSize, color = C.snow, opts = {}) {
  slide.addText(value, {
    x, y, w, h,
    fontFace: opts.fontFace ?? FONTS.body,
    fontSize,
    color,
    bold: opts.bold ?? false,
    italic: opts.italic ?? false,
    margin: opts.margin ?? 0,
    breakLine: false,
    fit: opts.fit ?? "shrink",
    valign: opts.valign ?? "mid",
    align: opts.align ?? "left",
    paraSpaceAfterPt: 0,
    charSpacing: opts.charSpacing,
    transparency: opts.transparency,
  });
}

function rect(slide, x, y, w, h, fill, opts = {}) {
  const kind = opts.radius ? "roundRect" : "rect";
  slide.addShape(shape(kind), {
    x, y, w, h,
    fill: { color: fill, transparency: opts.transparency ?? 0 },
    line: opts.line === false
      ? { color: fill, transparency: 100 }
      : { color: opts.lineColor ?? fill, transparency: opts.lineTransparency ?? 100, width: opts.lineWidth ?? 0.7 },
    radius: opts.radius,
  });
}

function rule(slide, x, y, w, h, color = C.steel, width = 1.1, opts = {}) {
  slide.addShape(shape("line"), {
    x, y, w, h,
    line: {
      color,
      width,
      transparency: opts.transparency ?? 0,
      dash: opts.dash,
      beginArrowType: opts.beginArrowType,
      endArrowType: opts.endArrowType,
    },
  });
}

function dot(slide, x, y, d, fill, opts = {}) {
  slide.addShape(shape("ellipse"), {
    x, y, w: d, h: d,
    fill: { color: fill, transparency: opts.transparency ?? 0 },
    line: opts.line === false
      ? { color: fill, transparency: 100 }
      : { color: opts.lineColor ?? fill, transparency: opts.lineTransparency ?? 100, width: opts.lineWidth ?? 0.6 },
  });
}

function arrow(slide, x1, y1, x2, y2, color = C.blue, width = 1.2, opts = {}) {
  rule(slide, x1, y1, x2 - x1, y2 - y1, color, width, { endArrowType: "triangle", dash: opts.dash, transparency: opts.transparency });
}

function mono(slide, value, x, y, w, h, fontSize = 8.5, color = C.mist, opts = {}) {
  tx(slide, value.toUpperCase(), x, y, w, h, fontSize, color, { ...opts, fontFace: FONTS.mono, bold: opts.bold ?? true, charSpacing: opts.charSpacing ?? 1.0 });
}

function chapterNav(slide, current, light = false) {
  const textColor = light ? C.steelLight : C.mist;
  const activeColor = light ? C.ink : C.snow;
  const baseline = light ? C.steelLight : C.steel;
  const activeAccent = current === 5 ? C.mint : current === 6 ? C.cyan : C.cyan;
  const starts = [0.72, 2.33, 3.82, 5.47, 7.20, 9.00, 10.70];
  rule(slide, 0.74, 0.45, 11.74, 0, baseline, 0.8, { transparency: light ? 15 : 15 });
  CHAPTERS.forEach((label, index) => {
    const x = starts[index];
    const active = index === current;
    const completed = index < current;
    const color = active ? activeAccent : completed ? (light ? C.mint : C.mist) : textColor;
    dot(slide, x, 0.39, active ? 0.12 : 0.08, active ? activeAccent : completed ? C.mint : baseline, { line: false, transparency: active ? 0 : completed ? 0 : 20 });
    tx(slide, label, x + 0.18, 0.22, index === 3 ? 1.2 : 1.32, 0.18, active ? 8.1 : 7.6, color, { fontFace: FONTS.body, bold: active || completed });
    if (active) rule(slide, x + 0.16, 0.57, index === 3 ? 0.98 : 0.80, 0, activeAccent, 1.8);
  });
}

function footer(slide, number, light = false) {
  const color = light ? C.steelLight : C.steelLight;
  rule(slide, 0.72, 7.03, 11.88, 0, light ? C.steelLight : C.steel, 0.7, { transparency: 20 });
  mono(slide, "AGENTIC MIGRATION PLATFORM", 0.72, 7.12, 3.2, 0.16, 7.2, color, { charSpacing: 1.2 });
  mono(slide, `${String(number).padStart(2, "0")} / 18`, 11.55, 7.11, 1.04, 0.17, 7.7, color, { align: "right", charSpacing: 0.8 });
}

function base(slide, number, current = null, opts = {}) {
  const light = opts.light ?? false;
  slide.background = { color: light ? C.ivory : C.graphite };
  if (current !== null) chapterNav(slide, current, light);
  footer(slide, number, light);
}

function heading(slide, number, current, kicker, title, subtitle = "", opts = {}) {
  base(slide, number, current, opts);
  mono(slide, kicker, 0.72, 0.83, 3.5, 0.18, 9.0, opts.light ? C.ink : C.cyan, { charSpacing: 1.35 });
  tx(slide, title, 0.72, 1.06, opts.titleW ?? 11.60, opts.titleH ?? 0.54, opts.titleSize ?? 29, opts.light ? C.ink : C.snow, { fontFace: FONTS.head, bold: true, valign: "top" });
  if (subtitle) tx(slide, subtitle, 0.72, opts.subtitleY ?? 1.64, opts.subtitleW ?? 10.90, opts.subtitleH ?? 0.28, opts.subtitleSize ?? 12.0, opts.light ? C.steelLight : C.mist, { valign: "top" });
}

function statusLine(slide, label, value, x, y, w, color, opts = {}) {
  mono(slide, label, x, y, opts.labelW ?? 1.0, 0.17, 7.7, color, { charSpacing: 1.0 });
  tx(slide, value, x + (opts.labelW ?? 1.0) + 0.10, y - 0.01, w - (opts.labelW ?? 1.0) - 0.10, 0.20, opts.fontSize ?? 10.5, opts.textColor ?? C.snow, { fontFace: opts.fontFace ?? FONTS.head, bold: opts.bold ?? true });
}

function note(slide, number) {
  slide.addNotes(speakerNotes(number));
}

function slide1() {
  const slide = pptx.addSlide();
  slide.background = { color: C.graphite };
  rule(slide, 0.72, 0.68, 0.60, 0, C.cyan, 2.2);
  mono(slide, "PFE / 2026", 1.48, 0.56, 1.8, 0.20, 9.0, C.cyan, { charSpacing: 1.2 });
  mono(slide, "VERSION DÉMO · PROJET CONFIDENTIEL", 0.72, 1.20, 4.4, 0.18, 8.0, C.mist, { charSpacing: 1.15 });
  tx(slide, "Agentic\nMigration Platform", 0.72, 1.56, 6.35, 1.45, 44, C.snow, { fontFace: FONTS.head, bold: true, valign: "top" });
  tx(slide, "Migration legacy gouvernée,\ntraçable et vérifiable.", 0.76, 3.38, 5.25, 0.66, 18, C.cyan, { fontFace: FONTS.head, bold: true, valign: "top" });
  tx(slide, "Une Migration Factory gouvernée pour Java / Spring Boot et Angular", 0.76, 4.34, 5.65, 0.28, 12.2, C.mist, { valign: "top" });
  mono(slide, "DECK DE SOUTENANCE · VERSION ANONYMISÉE", 0.76, 6.56, 4.85, 0.18, 8.0, C.steelLight, { charSpacing: 1.0 });

  const mark = routeMark({ colors: { line: C.steel, one: C.cyan, two: C.blue, three: C.amber, four: C.mint } });
  slide.addImage({ data: mark, x: 7.18, y: 1.10, w: 5.38, h: 3.66 });
  const stages = [
    ["LEGACY", "état source", 7.48, 1.26, C.cyan],
    ["CONTROL PLANE", "agents + gates", 8.68, 2.23, C.blue],
    ["EVIDENCE", "preuve", 9.86, 3.21, C.amber],
    ["MODERN", "état cible", 11.04, 4.22, C.mint],
  ];
  stages.forEach(([label, sub, x, y, color]) => {
    mono(slide, label, x, y, 1.62, 0.17, 8.0, color, { charSpacing: 0.85 });
    tx(slide, sub, x, y + 0.22, 1.62, 0.18, 9.5, C.mist, { valign: "top" });
  });
  rule(slide, 7.42, 5.62, 4.48, 0, C.steel, 0.9, { transparency: 15 });
  mono(slide, "REASONING", 7.42, 5.84, 1.52, 0.18, 8.0, C.cyan, { charSpacing: 1.0 });
  mono(slide, "CONTROL", 9.05, 5.84, 1.24, 0.18, 8.0, C.amber, { charSpacing: 1.0 });
  mono(slide, "EVIDENCE", 10.46, 5.84, 1.42, 0.18, 8.0, C.mint, { charSpacing: 1.0 });
  note(slide, 1);
}

function slide2() {
  const slide = pptx.addSlide();
  slide.background = { color: C.graphite };
  rule(slide, 0.72, 0.68, 0.60, 0, C.cyan, 2.2);
  mono(slide, "LE FIL DE LA SOUTENANCE", 1.48, 0.56, 3.6, 0.20, 9.0, C.cyan, { charSpacing: 1.3 });
  tx(slide, "Plan de présentation", 0.72, 1.12, 7.4, 0.54, 36, C.snow, { fontFace: FONTS.head, bold: true });
  tx(slide, "Une trajectoire unique : du besoin métier aux preuves de contrôle.", 0.76, 1.82, 8.5, 0.26, 13.0, C.mist, { valign: "top" });

  const routeX = [1.02, 2.70, 4.39, 6.08, 7.77, 9.46, 11.15];
  rule(slide, 1.16, 3.72, 10.10, 0, C.steel, 2.2);
  CHAPTERS.forEach((label, i) => {
    const x = routeX[i];
    const above = i % 2 === 0;
    dot(slide, x, 3.52, 0.40, i === 0 ? C.cyan : C.slate, { lineColor: i === 0 ? C.cyan : C.steelLight, lineTransparency: 0, lineWidth: 1.5 });
    mono(slide, String(i + 1).padStart(2, "0"), x + 0.095, 3.66, 0.21, 0.12, 6.7, i === 0 ? C.ink : C.mist, { align: "center", charSpacing: 0.2 });
    const y = above ? 2.74 : 4.10;
    rule(slide, x + 0.20, above ? 3.50 : 3.96, 0, above ? -0.40 : 0.40, C.steelLight, 0.9);
    tx(slide, label, x - 0.38, y, 1.20, 0.22, 12.4, i === 0 ? C.cyan : C.snow, { fontFace: FONTS.head, bold: true, align: "center" });
    tx(slide, ["Le déclencheur", "La réponse", "Les frontières", "Les axes", "Une décision", "Les preuves", "Le principe"][i], x - 0.45, y + (above ? 0.33 : 0.36), 1.34, 0.26, 8.5, C.mist, { align: "center", valign: "top" });
  });

  rule(slide, 0.76, 6.12, 11.82, 0, C.steel, 0.8, { transparency: 15 });
  tx(slide, "18 slides", 0.76, 6.38, 1.10, 0.26, 18, C.snow, { fontFace: FONTS.head, bold: true });
  tx(slide, "7 chapitres", 2.26, 6.42, 1.50, 0.22, 11.2, C.cyan, { fontFace: FONTS.mono, bold: true });
  tx(slide, "1 message principal par slide", 4.24, 6.42, 3.20, 0.22, 11.2, C.mist, { fontFace: FONTS.mono, bold: true });
  tx(slide, "La carte reste visible ; le détail se raconte.", 8.50, 6.42, 3.62, 0.22, 10.4, C.mist, { align: "right", italic: true });
  note(slide, 2);
}

function slide3() {
  const slide = pptx.addSlide();
  heading(slide, 3, 0, "Contexte", "Le déclencheur : le cloud crée l'urgence", "Un portefeuille legacy doit évoluer sans interrompre les services qui tournent déjà.");
  mono(slide, "UN GRAND CLIENT AÉRIEN", 0.78, 2.28, 3.25, 0.18, 8.5, C.cyan, { charSpacing: 1.2 });
  const events = [
    ["OBJECTIF CLOUD", "Horizon fin 2027", C.cyan],
    ["PORTFOLIO LEGACY", "Des applications à faire évoluer", C.amber],
    ["CIBLE AZURE", "Un nouvel environnement d'hébergement", C.blue],
    ["CONTINUITÉ", "Les applications restent disponibles", C.mint],
  ];
  const ys = [2.88, 3.70, 4.52, 5.34];
  rule(slide, 1.00, 3.02, 0, 2.46, C.steel, 1.2);
  events.forEach(([label, body, color], i) => {
    dot(slide, 0.88, ys[i], 0.24, color, { line: false });
    mono(slide, String(i + 1).padStart(2, "0"), 0.90, ys[i] + 0.07, 0.20, 0.10, 6.4, C.ink, { align: "center", charSpacing: 0.0 });
    mono(slide, label, 1.36, ys[i] - 0.02, 2.70, 0.18, 8.0, color, { charSpacing: 0.85 });
    tx(slide, body, 1.36, ys[i] + 0.23, 3.96, 0.22, 11.0, C.snow, { fontFace: FONTS.head, bold: true, valign: "top" });
  });

  rule(slide, 7.02, 2.28, 0, 3.76, C.steel, 0.8, { transparency: 20 });
  mono(slide, "LE POINT DE BASCULE", 7.42, 2.30, 3.2, 0.18, 8.5, C.mist, { charSpacing: 1.2 });
  tx(slide, "2027", 7.35, 2.68, 4.68, 1.12, 78, C.cyan, { fontFace: FONTS.head, bold: true, valign: "top" });
  tx(slide, "La trajectoire cloud devient une contrainte de portefeuille.", 7.44, 4.08, 4.26, 0.54, 19, C.snow, { fontFace: FONTS.head, bold: true, valign: "top" });
  rule(slide, 7.44, 4.98, 3.98, 0, C.cyan, 2.1);
  tx(slide, "Les équipes migrent en arrière-plan ; le service reste visible.", 7.44, 5.24, 4.30, 0.42, 11.0, C.mist, { valign: "top" });
  note(slide, 3);
}

function slide4() {
  const slide = pptx.addSlide();
  heading(slide, 4, 0, "Contexte", "Run et migration partagent la même capacité", "La migration s'ajoute au run : elle ne remplace ni les incidents ni la disponibilité attendue.");
  mono(slide, "LA TENSION OPÉRATIONNELLE", 0.78, 2.34, 3.3, 0.18, 8.5, C.cyan, { charSpacing: 1.2 });

  mono(slide, "RUN", 0.82, 2.78, 1.0, 0.20, 10, C.mint, { charSpacing: 1.25 });
  tx(slide, "maintenir la production", 0.82, 3.04, 2.30, 0.22, 12.3, C.snow, { fontFace: FONTS.head, bold: true });
  rule(slide, 2.24, 3.32, 9.54, 0, C.mint, 1.6);
  const runItems = [["incidents", 2.78], ["optimisation", 4.08], ["disponibilité", 5.36]];
  runItems.forEach(([label, x]) => {
    dot(slide, x, 3.18, 0.26, C.graphite, { lineColor: C.mint, lineTransparency: 0, lineWidth: 1.5 });
    tx(slide, label, x - 0.22, 3.66, 1.18, 0.18, 9.3, C.mist, { align: "center" });
  });

  mono(slide, "MIGRATE", 0.82, 4.18, 1.35, 0.20, 10, C.blue, { charSpacing: 1.15 });
  tx(slide, "transformer le portefeuille", 0.82, 4.44, 2.60, 0.22, 12.3, C.snow, { fontFace: FONTS.head, bold: true });
  rule(slide, 2.24, 4.72, 9.54, 0, C.blue, 1.6);
  const migrateItems = [["versions", 2.78], ["patches", 4.08], ["tests", 5.36], ["revalidation", 6.64]];
  migrateItems.forEach(([label, x]) => {
    dot(slide, x, 4.58, 0.26, C.graphite, { lineColor: C.blue, lineTransparency: 0, lineWidth: 1.5 });
    tx(slide, label, x - 0.24, 5.06, 1.20, 0.18, 9.3, C.mist, { align: "center" });
  });

  rule(slide, 6.16, 2.40, 0, 2.42, C.amber, 1.1, { dash: "dash" });
  dot(slide, 5.86, 3.86, 0.60, C.amber, { line: false });
  mono(slide, "TEAM", 5.98, 4.04, 0.36, 0.11, 6.3, C.ink, { align: "center", charSpacing: 0.1 });
  tx(slide, "même équipe", 5.45, 4.58, 1.42, 0.20, 10.3, C.amber, { fontFace: FONTS.head, bold: true, align: "center" });

  rule(slide, 0.82, 5.82, 11.55, 0, C.steel, 0.8);
  const costs = [["CONTEXTE PERDU", "Pourquoi ce changement ?"], ["REWORK", "Patch, retour manuel"], ["PREUVES DISPERSÉES", "Décision difficile à relier"]];
  costs.forEach(([label, body], i) => {
    const x = 0.82 + i * 3.86;
    mono(slide, label, x, 6.04, 2.60, 0.18, 7.8, i === 0 ? C.amber : C.coral, { charSpacing: 0.75 });
    tx(slide, body, x, 6.32, 3.10, 0.20, 9.2, C.mist, { valign: "top" });
  });
  note(slide, 4);
}

function slide5() {
  const slide = pptx.addSlide();
  heading(slide, 5, 1, "Solution", "Du prompt individuel à la Migration Factory", "Capitaliser les pratiques ne suffit plus : le parcours doit devenir réutilisable et gouverné.");
  mono(slide, "LA BASCULE", 0.78, 2.34, 1.55, 0.18, 8.5, C.cyan, { charSpacing: 1.2 });

  rect(slide, 0.82, 4.82, 2.30, 0.82, C.slate, { lineColor: C.amber, lineTransparency: 0, lineWidth: 1.0 });
  mono(slide, "01", 1.08, 5.05, 0.30, 0.18, 8.0, C.amber, { charSpacing: 0.2 });
  tx(slide, "Prompts\nindividuels", 1.54, 4.96, 1.26, 0.42, 14.2, C.snow, { fontFace: FONTS.head, bold: true, valign: "top" });
  tx(slide, "aider ponctuellement", 1.06, 5.52, 1.80, 0.18, 8.8, C.mist, { align: "center" });

  rect(slide, 3.28, 4.06, 2.52, 1.58, C.slate2, { lineColor: C.blue, lineTransparency: 0, lineWidth: 1.0 });
  mono(slide, "02", 3.58, 4.32, 0.30, 0.18, 8.0, C.blue, { charSpacing: 0.2 });
  tx(slide, "Pratiques\nstandardisées", 4.04, 4.22, 1.40, 0.46, 14.2, C.snow, { fontFace: FONTS.head, bold: true, valign: "top" });
  tx(slide, "réduire la variabilité", 3.58, 5.06, 1.92, 0.18, 8.8, C.mist, { align: "center" });

  rect(slide, 5.98, 3.22, 2.58, 2.42, C.slate2, { lineColor: C.cyan, lineTransparency: 0, lineWidth: 1.0 });
  mono(slide, "03", 6.30, 3.50, 0.30, 0.18, 8.0, C.cyan, { charSpacing: 0.2 });
  tx(slide, "Parcours\nréutilisable", 6.76, 3.40, 1.42, 0.46, 14.2, C.snow, { fontFace: FONTS.head, bold: true, valign: "top" });
  tx(slide, "état · gate · preuve", 6.30, 4.42, 1.92, 0.18, 8.8, C.mist, { align: "center" });

  arrow(slide, 3.16, 5.20, 3.24, 5.20, C.steelLight, 1.1);
  arrow(slide, 5.82, 4.62, 5.92, 4.62, C.steelLight, 1.1);
  rect(slide, 8.86, 2.78, 3.52, 2.88, C.slate, { lineColor: C.cyan, lineTransparency: 0, lineWidth: 1.2 });
  mono(slide, "MIGRATION FACTORY", 9.20, 3.12, 2.64, 0.18, 8.5, C.cyan, { charSpacing: 1.0 });
  tx(slide, "industrialiser\nsous contrôle", 9.20, 3.52, 2.46, 0.60, 23, C.snow, { fontFace: FONTS.head, bold: true, valign: "top" });
  rule(slide, 9.20, 4.46, 2.35, 0, C.cyan, 1.8);
  tx(slide, "agents proposent\nservices vérifient\nhumain décide", 9.20, 4.70, 2.62, 0.64, 11.0, C.mist, { fontFace: FONTS.mono, bold: true, valign: "top" });

  rule(slide, 0.82, 6.12, 11.54, 0, C.steel, 0.8);
  mono(slide, "DÉMONTRÉ", 0.82, 6.36, 1.28, 0.18, 7.8, C.mint, { charSpacing: 0.9 });
  tx(slide, "Java / Spring Boot   ·   Angular", 2.28, 6.32, 3.42, 0.22, 10.4, C.snow, { fontFace: FONTS.head, bold: true });
  mono(slide, "VISION CIBLE", 6.56, 6.36, 1.38, 0.18, 7.8, C.steelLight, { charSpacing: 0.9 });
  tx(slide, ".NET · PHP · Python · React · cloud · refactoring", 8.12, 6.32, 4.22, 0.22, 9.2, C.mist, { fontFace: FONTS.mono, align: "right" });
  note(slide, 5);
}

function placeholderSlide(number, current, title) {
  const slide = pptx.addSlide();
  heading(slide, number, current, CHAPTERS[current] ?? "", title, "Composition réservée à la branche de reconstruction suivante.");
  mono(slide, "DRAFT BOUNDARY", 0.82, 2.72, 2.20, 0.18, 8.4, C.amber, { charSpacing: 1.0 });
  rule(slide, 0.82, 3.18, 11.50, 0, C.steel, 1.4, { dash: "dash" });
  tx(slide, "Cette slide sera remplacée par un diagramme dédié.", 0.82, 3.52, 8.20, 0.34, 22, C.snow, { fontFace: FONTS.head, bold: true });
  tx(slide, "La structure finale est définie dans le visual redesign spec.", 0.84, 4.10, 7.20, 0.26, 12.0, C.mist, { valign: "top" });
  note(slide, number);
}

slide1();
slide2();
slide3();
slide4();
slide5();
for (let number = 6; number <= 18; number += 1) {
  const current = number <= 8 ? 2 : number <= 12 ? 3 : number === 13 ? 4 : number <= 16 ? 5 : 6;
  placeholderSlide(number, current, SLIDE_TITLES[number - 1]);
}

const output = resolve(process.env.DECK_OUTPUT ?? "dist/Agentic-Migration-Platform-Soutenance-Redesigned.pptx");
mkdirSync(dirname(output), { recursive: true });
await pptx.writeFile({ fileName: output });
console.log(`Wrote ${output}`);

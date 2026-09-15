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

function nodeRail(slide, { x, y, w = 1.12, title, subtitle = "", color = C.blue, light = false, dashed = false }) {
  dot(slide, x + w / 2 - 0.18, y, 0.36, light ? C.ivory : C.graphite, { lineColor: color, lineTransparency: 0, lineWidth: 1.5 });
  dot(slide, x + w / 2 - 0.065, y + 0.115, 0.13, color, { line: false });
  tx(slide, title, x, y + 0.52, w, 0.22, 12.2, light ? C.ink : C.snow, { fontFace: FONTS.head, bold: true, align: "center" });
  if (subtitle) tx(slide, subtitle, x - 0.16, y + 0.84, w + 0.32, 0.20, 8.2, color, { align: "center", valign: "top" });
  return dashed;
}

function slide6() {
  const slide = pptx.addSlide();
  heading(slide, 6, 2, "Architecture", "Architecture fonctionnelle", "La plateforme sépare le raisonnement, l'exécution, l'autorisation et la preuve.");
  mono(slide, "RESPONSIBILITY MAP", 0.80, 2.24, 2.60, 0.18, 8.4, C.cyan, { charSpacing: 1.2 });

  rect(slide, 0.82, 2.62, 7.58, 0.72, C.slate, { lineColor: C.amber, lineTransparency: 0, lineWidth: 1.0 });
  mono(slide, "01 · GATE HUMAINE", 1.08, 2.86, 1.70, 0.16, 7.7, C.amber, { charSpacing: 0.75 });
  tx(slide, "intention · validation · décision sensible", 3.02, 2.82, 4.78, 0.20, 12.4, C.snow, { fontFace: FONTS.head, bold: true });

  rect(slide, 0.82, 3.58, 7.58, 0.72, C.slate, { lineColor: C.blue, lineTransparency: 0, lineWidth: 1.0 });
  mono(slide, "02 · ORCHESTRATEUR", 1.08, 3.82, 1.90, 0.16, 7.7, C.blue, { charSpacing: 0.75 });
  tx(slide, "état métier · transitions · contexte", 3.02, 3.78, 4.78, 0.20, 12.4, C.snow, { fontFace: FONTS.head, bold: true });

  rect(slide, 0.82, 4.54, 7.58, 0.96, C.slate2, { lineColor: C.cyan, lineTransparency: 0, lineWidth: 1.0 });
  mono(slide, "03 · AGENTS SPÉCIALISÉS", 1.08, 4.76, 2.10, 0.16, 7.7, C.cyan, { charSpacing: 0.75 });
  const agents = [["analyse", 3.52], ["plan", 4.62], ["transform", 5.72], ["répare", 6.82]];
  agents.forEach(([label, x]) => {
    dot(slide, x, 4.79, 0.18, C.cyan, { line: false });
    mono(slide, label, x + 0.27, 4.78, 0.82, 0.17, 7.2, C.mist, { charSpacing: 0.35 });
  });

  rect(slide, 0.82, 5.70, 7.58, 0.72, C.slate, { lineColor: C.blue, lineTransparency: 0, lineWidth: 1.0 });
  mono(slide, "04 · SERVICES", 1.08, 5.94, 1.34, 0.16, 7.7, C.blue, { charSpacing: 0.75 });
  tx(slide, "patch · build · tests · checks", 3.02, 5.90, 4.78, 0.20, 12.4, C.snow, { fontFace: FONTS.head, bold: true });

  rect(slide, 8.92, 2.62, 3.42, 3.80, C.slate2, { lineColor: C.mint, lineTransparency: 0, lineWidth: 1.0 });
  mono(slide, "05 · EVIDENCE REGISTRY", 9.24, 2.92, 2.62, 0.18, 8.0, C.mint, { charSpacing: 0.75 });
  tx(slide, "Une décision\nreste attachée\nà son état.", 9.24, 3.42, 2.36, 0.96, 22, C.snow, { fontFace: FONTS.head, bold: true, valign: "top" });
  rule(slide, 9.24, 4.72, 2.30, 0, C.mint, 1.6);
  mono(slide, "ARTIFACT", 9.24, 4.94, 1.0, 0.16, 7.6, C.mint, { charSpacing: 0.75 });
  tx(slide, "checksum · trace · preuve", 9.24, 5.24, 2.52, 0.22, 10.3, C.mist, { fontFace: FONTS.mono, bold: true });
  rule(slide, 8.40, 3.94, 0.48, 0, C.mint, 1.3, { endArrowType: "triangle" });
  rule(slide, 8.40, 5.98, 0.48, 0, C.mint, 1.3, { endArrowType: "triangle" });
  mono(slide, "L'ÉTAT EST MÉTIER · LA COMMANDE EST DÉTERMINISTE", 0.82, 6.64, 6.80, 0.18, 7.8, C.mist, { charSpacing: 0.78 });
  note(slide, 6);
}

function slide7() {
  const slide = pptx.addSlide();
  heading(slide, 7, 2, "Architecture", "Deux toolchains, un même contrat", "Java et Angular gardent leurs outils ; les gates et les preuves restent communs.");
  mono(slide, "PIPELINES SPÉCIFIQUES", 0.80, 2.24, 2.40, 0.18, 8.4, C.cyan, { charSpacing: 1.2 });
  rule(slide, 6.66, 2.58, 0, 3.62, C.steel, 0.8, { dash: "dash" });

  mono(slide, "JAVA / SPRING BOOT", 0.92, 2.72, 3.10, 0.18, 10.0, C.blue, { charSpacing: 1.0 });
  tx(slide, "JDK · Maven · OpenRewrite", 0.92, 3.02, 3.30, 0.22, 12.0, C.snow, { fontFace: FONTS.head, bold: true });
  rule(slide, 1.34, 3.86, 4.72, 0, C.blue, 1.7);
  const java = [["JDK", 1.10], ["Maven", 2.36], ["Rewrite", 3.62], ["Tests", 4.88]];
  java.forEach(([label, x], i) => {
    nodeRail(slide, { x, y: 3.68, w: 0.86, title: label, subtitle: i === 3 ? "preuve" : "outil", color: i === 3 ? C.mint : C.blue });
  });

  mono(slide, "ANGULAR", 7.08, 2.72, 2.10, 0.18, 10.0, C.cyan, { charSpacing: 1.0 });
  tx(slide, "Node.js · npm · CLI · TypeScript", 7.08, 3.02, 4.45, 0.22, 12.0, C.snow, { fontFace: FONTS.head, bold: true });
  rule(slide, 7.50, 3.86, 4.72, 0, C.cyan, 1.7);
  const angular = [["Node", 7.24], ["npm", 8.50], ["CLI", 9.76], ["Build", 11.02]];
  angular.forEach(([label, x], i) => {
    nodeRail(slide, { x, y: 3.68, w: 0.86, title: label, subtitle: i === 3 ? "preuve" : "outil", color: i === 3 ? C.mint : C.cyan });
  });

  rect(slide, 0.92, 5.58, 11.42, 0.66, C.slate2, { lineColor: C.amber, lineTransparency: 0, lineWidth: 1.0 });
  mono(slide, "CONTRAT COMMUN", 1.20, 5.82, 1.70, 0.16, 7.7, C.amber, { charSpacing: 0.85 });
  tx(slide, "state", 3.52, 5.78, 0.86, 0.22, 10.4, C.snow, { fontFace: FONTS.mono, bold: true, align: "center" });
  tx(slide, "checksum", 4.72, 5.78, 1.14, 0.22, 10.4, C.snow, { fontFace: FONTS.mono, bold: true, align: "center" });
  tx(slide, "gate", 6.24, 5.78, 0.72, 0.22, 10.4, C.snow, { fontFace: FONTS.mono, bold: true, align: "center" });
  tx(slide, "validation", 7.44, 5.78, 1.30, 0.22, 10.4, C.snow, { fontFace: FONTS.mono, bold: true, align: "center" });
  tx(slide, "historique", 9.24, 5.78, 1.18, 0.22, 10.4, C.snow, { fontFace: FONTS.mono, bold: true, align: "center" });
  note(slide, 7);
}

function slide8() {
  const slide = pptx.addSlide();
  heading(slide, 8, 2, "Architecture", "Le parcours de migration", "Chaque transition critique associe un état, un gate, une preuve et une revalidation.");
  mono(slide, "STATE → GATE → PROOF", 0.80, 2.24, 2.70, 0.18, 8.4, C.cyan, { charSpacing: 1.2 });
  const stages = [
    ["qualifier", C.blue], ["analyser", C.cyan], ["planifier", C.cyan], ["transformer", C.blue], ["valider", C.mint], ["réparer", C.coral], ["sceller", C.mint],
  ];
  const xs = [0.96, 2.62, 4.28, 5.94, 7.60, 9.26, 10.92];
  rule(slide, 1.15, 3.88, 10.90, 0, C.steelLight, 1.5);
  stages.forEach(([label, color], i) => {
    nodeRail(slide, { x: xs[i], y: 3.68, w: 0.92, title: label, subtitle: i === 0 ? "entrée" : i === 6 ? "preuve" : "état", color });
    if (i < stages.length - 1) {
      const nextColor = stages[i + 1][1];
      rule(slide, xs[i] + 1.02, 3.88, xs[i + 1] - xs[i] - 1.08, 0, nextColor, 1.3, { endArrowType: "triangle" });
    }
  });
  rule(slide, 5.06, 2.82, 0, 2.12, C.amber, 1.0, { dash: "dash" });
  rule(slide, 8.38, 2.82, 0, 2.12, C.amber, 1.0, { dash: "dash" });
  mono(slide, "GATE", 4.70, 2.62, 0.72, 0.16, 7.5, C.amber, { align: "center", charSpacing: 0.6 });
  mono(slide, "GATE", 8.02, 2.62, 0.72, 0.16, 7.5, C.amber, { align: "center", charSpacing: 0.6 });
  rect(slide, 0.96, 5.24, 3.26, 0.78, C.slate, { lineColor: C.blue, lineTransparency: 0, lineWidth: 0.9 });
  mono(slide, "ÉTAT", 1.22, 5.48, 0.70, 0.16, 7.8, C.blue, { charSpacing: 0.8 });
  tx(slide, "ce que le système sait", 2.18, 5.44, 1.72, 0.20, 10.2, C.snow, { fontFace: FONTS.head, bold: true });
  rect(slide, 4.56, 5.24, 3.26, 0.78, C.slate, { lineColor: C.amber, lineTransparency: 0, lineWidth: 0.9 });
  mono(slide, "GATE", 4.82, 5.48, 0.70, 0.16, 7.8, C.amber, { charSpacing: 0.8 });
  tx(slide, "ce que l'humain autorise", 5.76, 5.44, 1.76, 0.20, 10.2, C.snow, { fontFace: FONTS.head, bold: true });
  rect(slide, 8.16, 5.24, 3.68, 0.78, C.slate, { lineColor: C.mint, lineTransparency: 0, lineWidth: 0.9 });
  mono(slide, "PREUVE", 8.42, 5.48, 0.92, 0.16, 7.8, C.mint, { charSpacing: 0.8 });
  tx(slide, "ce qui permet de revalider", 9.56, 5.44, 1.92, 0.20, 10.2, C.snow, { fontFace: FONTS.head, bold: true });
  note(slide, 8);
}

function slide9() {
  const slide = pptx.addSlide();
  heading(slide, 9, 3, "Réalisation", "Java / Spring Boot : le parcours de référence", "La trajectoire Java porte le parcours de modernisation le plus mature du prototype.");
  mono(slide, "REFERENCE PATH", 0.80, 2.24, 2.10, 0.18, 8.4, C.blue, { charSpacing: 1.2 });
  tx(slide, "Spring Boot", 0.82, 2.74, 2.30, 0.30, 18, C.snow, { fontFace: FONTS.head, bold: true });
  tx(slide, "Maven · OpenRewrite", 0.84, 3.18, 2.42, 0.22, 10.6, C.mist, { fontFace: FONTS.mono, bold: true });
  rule(slide, 3.18, 3.70, 7.54, 0, C.blue, 1.8);
  const versions = [["2.1", "legacy", C.amber], ["2.7", "stabiliser", C.blue], ["3.5", "moderniser", C.cyan], ["4.0", "cible", C.mint]];
  const xs = [3.24, 5.22, 7.20, 9.18];
  versions.forEach(([version, label, color], i) => {
    nodeRail(slide, { x: xs[i], y: 3.50, w: 1.20, title: version, subtitle: label, color });
  });
  mono(slide, "RUNTIME", 3.24, 4.92, 1.08, 0.18, 7.7, C.mist, { charSpacing: 0.9 });
  rule(slide, 4.62, 5.02, 5.40, 0, C.steelLight, 1.0);
  tx(slide, "Java 11", 4.40, 5.24, 0.92, 0.20, 10.2, C.snow, { fontFace: FONTS.mono, bold: true, align: "center" });
  tx(slide, "Java 17", 6.42, 5.24, 0.92, 0.20, 10.2, C.snow, { fontFace: FONTS.mono, bold: true, align: "center" });
  tx(slide, "Java 21", 8.46, 5.24, 0.92, 0.20, 10.2, C.snow, { fontFace: FONTS.mono, bold: true, align: "center" });
  rect(slide, 10.48, 2.72, 1.86, 2.78, C.slate2, { lineColor: C.mint, lineTransparency: 0, lineWidth: 1.0 });
  mono(slide, "STATUT", 10.76, 3.04, 1.20, 0.16, 7.8, C.mint, { charSpacing: 0.9 });
  tx(slide, "Réalisé", 10.76, 3.48, 1.36, 0.28, 19, C.snow, { fontFace: FONTS.head, bold: true });
  tx(slide, "parcours de\nréférence", 10.76, 4.00, 1.28, 0.48, 11.2, C.mist, { fontFace: FONTS.head, bold: true, valign: "top" });
  rule(slide, 10.76, 4.92, 1.18, 0, C.mint, 1.6);
  note(slide, 9);
}

function slide10() {
  const slide = pptx.addSlide();
  heading(slide, 10, 3, "Réalisation", "Angular : une couverture progressive", "Le même modèle de gouvernance est transférable, avec une couverture encore partielle.");
  mono(slide, "EVIDENCE LINE", 0.80, 2.24, 1.95, 0.18, 8.4, C.cyan, { charSpacing: 1.2 });
  tx(slide, "PARTIEL", 0.82, 2.92, 2.04, 0.46, 28, C.amber, { fontFace: FONTS.head, bold: true });
  tx(slide, "preuve par transition", 0.84, 3.52, 2.18, 0.22, 10.6, C.mist, { fontFace: FONTS.mono, bold: true });
  rule(slide, 3.36, 3.88, 7.52, 0, C.mint, 1.8);
  const versions = [["18", "source", C.mint], ["19", "scellée", C.mint], ["20", "scellée", C.mint], ["21", "préparée", C.amber]];
  const xs = [3.38, 5.34, 7.30, 9.26];
  versions.forEach(([version, label, color], i) => {
    nodeRail(slide, { x: xs[i], y: 3.68, w: 1.10, title: version, subtitle: label, color });
  });
  rule(slide, 4.64, 3.88, 0.58, 0, C.mint, 1.8, { endArrowType: "triangle" });
  rule(slide, 6.60, 3.88, 0.58, 0, C.mint, 1.8, { endArrowType: "triangle" });
  rule(slide, 8.56, 3.88, 0.58, 0, C.amber, 1.4, { endArrowType: "triangle", dash: "dash" });
  mono(slide, "18 → 19  SCELLÉE", 3.64, 5.18, 1.72, 0.18, 7.4, C.mint, { charSpacing: 0.55, align: "center" });
  mono(slide, "19 → 20  SCELLÉE", 5.60, 5.18, 1.72, 0.18, 7.4, C.mint, { charSpacing: 0.55, align: "center" });
  mono(slide, "20 → 21  NON DÉMARRÉE", 7.86, 5.18, 2.20, 0.18, 7.4, C.amber, { charSpacing: 0.45, align: "center" });
  rule(slide, 0.84, 6.02, 11.44, 0, C.steel, 0.8);
  mono(slide, "GARDE-FOU", 0.84, 6.28, 1.12, 0.18, 7.8, C.coral, { charSpacing: 0.75 });
  tx(slide, "11 → 21 : migration non démontrée", 2.22, 6.24, 3.72, 0.22, 11.0, C.snow, { fontFace: FONTS.head, bold: true });
  tx(slide, "Une extension visée, pas une preuve obtenue.", 7.20, 6.26, 4.20, 0.20, 9.6, C.mist, { align: "right", italic: true });
  note(slide, 10);
}

function slide11() {
  const slide = pptx.addSlide();
  heading(slide, 11, 3, "Réalisation", "Les agents produisent, l'humain autorise", "Les agents sont spécialisés et bornés ; les gates gardent l'autorité finale.");
  mono(slide, "AGENT CONSTELLATION", 0.80, 2.24, 2.55, 0.18, 8.4, C.cyan, { charSpacing: 1.2 });
  const center = { x: 6.02, y: 3.72 };
  dot(slide, center.x, center.y, 1.02, C.slate2, { lineColor: C.blue, lineTransparency: 0, lineWidth: 1.6 });
  mono(slide, "ORCHESTRATEUR", center.x + 0.10, center.y + 0.29, 0.82, 0.16, 7.2, C.blue, { align: "center", charSpacing: 0.35 });
  tx(slide, "état", center.x + 0.10, center.y + 0.56, 0.82, 0.18, 9.5, C.snow, { fontFace: FONTS.head, bold: true, align: "center" });
  const agentNodes = [
    ["Analyste", "diagnostiquer", 2.02, 2.84, C.blue],
    ["Reviewer", "relire", 4.26, 2.14, C.cyan],
    ["Planificateur", "ordonner", 7.84, 2.14, C.cyan],
    ["Transformateur", "proposer", 10.06, 2.84, C.amber],
    ["Réparateur", "corriger", 3.56, 5.08, C.coral],
    ["Assistant", "éclairer", 8.44, 5.08, C.mint],
  ];
  agentNodes.forEach(([label, verb, x, y, color]) => {
    const sourceX = x + 0.42;
    const sourceY = y + 0.42;
    const targetX = center.x + 0.51;
    const targetY = center.y + 0.51;
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const distance = Math.hypot(dx, dy);
    const startX = sourceX + (dx / distance) * 0.44;
    const startY = sourceY + (dy / distance) * 0.44;
    const endX = targetX - (dx / distance) * 0.58;
    const endY = targetY - (dy / distance) * 0.58;
    rule(slide, startX, startY, endX - startX, endY - startY, C.steelLight, 1.0);
    dot(slide, x, y, 0.84, C.graphite, { lineColor: color, lineTransparency: 0, lineWidth: 1.4 });
    dot(slide, x + 0.30, y + 0.30, 0.24, color, { line: false });
    tx(slide, label, x - 0.34, y + 0.98, 1.52, 0.20, 10.6, C.snow, { fontFace: FONTS.head, bold: true, align: "center" });
    mono(slide, verb, x - 0.26, y + 1.26, 1.36, 0.16, 7.3, color, { align: "center", charSpacing: 0.45 });
  });
  rect(slide, 11.36, 2.76, 0.92, 2.48, C.slate2, { lineColor: C.amber, lineTransparency: 0, lineWidth: 1.0 });
  mono(slide, "HUMAIN", 11.50, 3.04, 0.64, 0.16, 7.3, C.amber, { align: "center", charSpacing: 0.55 });
  tx(slide, "gate", 11.50, 3.52, 0.64, 0.22, 15, C.snow, { fontFace: FONTS.head, bold: true, align: "center" });
  tx(slide, "autorise\nles décisions\nsensibles", 11.50, 4.00, 0.64, 0.58, 8.6, C.mist, { align: "center", valign: "top" });
  rule(slide, 11.36, 3.30, -0.52, 0.0, C.amber, 1.1, { endArrowType: "triangle" });
  rule(slide, 0.84, 6.10, 11.50, 0, C.steel, 0.8);
  mono(slide, "AGENTS", 0.84, 6.34, 0.92, 0.16, 7.8, C.cyan, { charSpacing: 0.8 });
  tx(slide, "artefacts", 2.04, 6.30, 1.12, 0.20, 10.2, C.snow, { fontFace: FONTS.head, bold: true });
  mono(slide, "FRONTIÈRE", 5.12, 6.34, 1.10, 0.16, 7.8, C.amber, { charSpacing: 0.8 });
  tx(slide, "terminal borné", 6.54, 6.30, 1.42, 0.20, 10.2, C.snow, { fontFace: FONTS.head, bold: true });
  mono(slide, "HUMAIN", 9.98, 6.34, 0.92, 0.16, 7.8, C.mint, { charSpacing: 0.8 });
  tx(slide, "décision finale", 11.10, 6.30, 1.24, 0.20, 9.8, C.snow, { fontFace: FONTS.head, bold: true, align: "right" });
  note(slide, 11);
}

function slide12() {
  const slide = pptx.addSlide();
  heading(slide, 12, 3, "Réalisation", "Réparer sous contrôle", "Un échec est gelé, contextualisé, décidé sous contrôle puis revalidé.");
  mono(slide, "GOVERNED REPAIR", 0.80, 2.24, 2.20, 0.18, 8.4, C.cyan, { charSpacing: 1.2 });
  const top = [["01", "Échec\ngelé", 1.04, C.coral], ["02", "Contexte\nrassemblé", 3.16, C.blue], ["03", "Proposition\nagent", 5.28, C.cyan], ["04", "Review", 7.40, C.amber]];
  top.forEach(([n, label, x, color], i) => {
    rect(slide, x, 3.02, 1.50, 0.92, C.slate, { lineColor: color, lineTransparency: 0, lineWidth: 1.0 });
    mono(slide, n, x + 0.16, 3.20, 0.26, 0.16, 7.4, color, { charSpacing: 0.2 });
    tx(slide, label, x + 0.48, 3.18, 0.82, 0.42, 11.0, C.snow, { fontFace: FONTS.head, bold: true, valign: "top" });
    if (i < top.length - 1) arrow(slide, x + 1.54, 3.48, x + 2.02, 3.48, C.steelLight, 1.1);
  });
  rect(slide, 5.30, 4.46, 2.72, 0.96, C.amber, { line: false });
  mono(slide, "GATE", 5.58, 4.70, 0.70, 0.16, 7.8, C.ink, { charSpacing: 0.8 });
  tx(slide, "DÉCISION HUMAINE", 6.48, 4.64, 1.20, 0.22, 11.4, C.ink, { fontFace: FONTS.head, bold: true, align: "center" });
  arrow(slide, 8.94, 3.48, 9.20, 3.48, C.amber, 1.3);
  rect(slide, 9.24, 3.02, 1.52, 0.92, C.slate, { lineColor: C.blue, lineTransparency: 0, lineWidth: 1.0 });
  mono(slide, "05", 9.42, 3.20, 0.26, 0.16, 7.4, C.blue, { charSpacing: 0.2 });
  tx(slide, "Apply\nisolé", 9.78, 3.18, 0.72, 0.42, 11.0, C.snow, { fontFace: FONTS.head, bold: true, valign: "top" });
  arrow(slide, 10.80, 3.48, 11.34, 3.48, C.mint, 1.2);
  rect(slide, 11.38, 3.02, 1.00, 0.92, C.slate, { lineColor: C.mint, lineTransparency: 0, lineWidth: 1.0 });
  mono(slide, "06", 11.52, 3.20, 0.26, 0.16, 7.4, C.mint, { charSpacing: 0.2 });
  tx(slide, "Build\nTest", 11.84, 3.18, 0.40, 0.42, 10.0, C.snow, { fontFace: FONTS.head, bold: true, valign: "top" });
  rule(slide, 11.88, 4.02, 0, 1.24, C.mint, 1.1, { endArrowType: "triangle" });
  rule(slide, 11.88, 5.42, -3.20, 0.0, C.mint, 1.1, { endArrowType: "triangle" });
  mono(slide, "REVALIDATION", 8.94, 5.12, 1.40, 0.18, 7.8, C.mint, { charSpacing: 0.7 });
  rule(slide, 5.28, 5.58, 2.76, 0, C.steel, 0.8, { dash: "dash" });
  mono(slide, "CHECKSUM", 1.04, 5.92, 1.10, 0.17, 7.7, C.cyan, { charSpacing: 0.8 });
  tx(slide, "décider sur le bon artefact", 2.36, 5.88, 2.28, 0.20, 9.6, C.mist, { fontFace: FONTS.head, bold: true });
  mono(slide, "BORNAGE", 5.08, 5.92, 0.96, 0.17, 7.7, C.amber, { charSpacing: 0.8 });
  tx(slide, "limiter les tentatives", 6.28, 5.88, 1.72, 0.20, 9.6, C.mist, { fontFace: FONTS.head, bold: true });
  mono(slide, "HISTORIQUE", 8.56, 5.92, 1.14, 0.17, 7.7, C.mint, { charSpacing: 0.8 });
  tx(slide, "conserver la décision", 9.94, 5.88, 2.24, 0.20, 9.6, C.mist, { fontFace: FONTS.head, bold: true });
  note(slide, 12);
}

function slide13() {
  const slide = pptx.addSlide();
  heading(slide, 13, 4, "Démo", "Démo : décider à partir d'une preuve", "Interface locale — scénario anonymisé, états préparés. Une décision, trois gestes.", { titleW: 10.40 });
  const screenshot = resolve(process.env.DECK_ANGULAR_SCREENSHOT ?? "assets/presentation/angular-g10-repair.png");
  rect(slide, 0.76, 2.28, 7.18, 4.64, C.slate2, { lineColor: C.cyan, lineTransparency: 0, lineWidth: 1.0 });
  if (existsSync(screenshot)) {
    slide.addImage({ path: screenshot, x: 0.84, y: 2.42, w: 7.02, h: 4.39 });
  } else {
    rect(slide, 0.84, 2.42, 7.02, 4.39, C.slate, { lineColor: C.coral, lineTransparency: 0, lineWidth: 1.0 });
    tx(slide, "Capture de démonstration introuvable", 1.20, 4.42, 6.30, 0.28, 15, C.coral, { align: "center", bold: true });
  }
  const actions = [
    ["01", "INSPECTER", "Lire la correction et son contexte.", C.blue],
    ["02", "VÉRIFIER", "Relier la proposition à la preuve.", C.cyan],
    ["03", "DÉCIDER", "Approuver, modifier ou rejeter.", C.amber],
  ];
  actions.forEach(([number, label, body, color], i) => {
    const y = 2.74 + i * 1.12;
    dot(slide, 8.56, y + 0.03, 0.34, color, { line: false });
    mono(slide, number, 8.64, y + 0.14, 0.18, 0.10, 6.6, C.ink, { charSpacing: 0.0, align: "center" });
    mono(slide, label, 9.12, y, 2.20, 0.18, 8.3, color, { charSpacing: 0.85 });
    tx(slide, body, 9.12, y + 0.28, 2.86, 0.38, 11.0, C.snow, { fontFace: FONTS.head, bold: true, valign: "top" });
    rule(slide, 9.12, y + 0.84, 2.86, 0, C.steel, 0.8, { transparency: 20 });
  });
  mono(slide, "ANGULAR G10 · ÉTAT PRÉPARÉ", 8.54, 6.26, 3.34, 0.18, 7.8, C.mist, { charSpacing: 0.78 });
  note(slide, 13);
}

function slide14() {
  const slide = pptx.addSlide();
  heading(slide, 14, 5, "Résultats", "Les preuves disponibles", "Des observations ponctuelles de contrôle et de revalidation — pas un benchmark global.", { light: true });
  mono(slide, "POINT-IN-TIME EVIDENCE", 0.80, 2.24, 2.62, 0.18, 8.2, C.ink, { charSpacing: 1.15 });
  rule(slide, 0.82, 2.62, 11.52, 0, C.steelLight, 0.8, { transparency: 20 });

  tx(slide, "607", 0.86, 2.98, 2.30, 0.82, 62, C.ink, { fontFace: FONTS.head, bold: true, valign: "top" });
  mono(slide, "BACKEND", 0.90, 3.94, 1.20, 0.18, 8.0, C.blue, { charSpacing: 1.0 });
  tx(slide, "tests réussis", 2.26, 3.92, 2.10, 0.22, 12.2, C.ink, { fontFace: FONTS.head, bold: true });
  tx(slide, "+ 4 ignorés", 0.90, 4.38, 2.20, 0.22, 10.4, C.steelLight, { fontFace: FONTS.mono, bold: true });

  rule(slide, 4.74, 2.94, 0, 2.30, C.steelLight, 0.8, { transparency: 25 });
  tx(slide, "12 → 11", 5.16, 2.98, 3.16, 0.82, 52, C.ink, { fontFace: FONTS.head, bold: true, valign: "top" });
  mono(slide, "FRONTEND BASELINE", 5.20, 3.94, 2.10, 0.18, 8.0, C.cyan, { charSpacing: 0.95 });
  tx(slide, "échecs après intégration", 5.20, 4.36, 2.72, 0.22, 11.3, C.ink, { fontFace: FONTS.head, bold: true });
  tx(slide, "observation ponctuelle", 5.20, 4.78, 2.36, 0.20, 9.4, C.steelLight, { italic: true });

  rule(slide, 9.04, 2.94, 0, 2.30, C.steelLight, 0.8, { transparency: 25 });
  mono(slide, "FRONTEND", 9.42, 3.06, 1.42, 0.18, 8.0, C.mint, { charSpacing: 1.0 });
  tx(slide, "type", 9.42, 3.54, 1.32, 0.24, 14, C.ink, { fontFace: FONTS.mono, bold: true });
  tx(slide, "conformité", 9.42, 3.94, 1.62, 0.24, 14, C.ink, { fontFace: FONTS.mono, bold: true });
  tx(slide, "build", 9.42, 4.34, 1.32, 0.24, 14, C.ink, { fontFace: FONTS.mono, bold: true });
  [3.12, 3.52, 3.92].forEach((y) => dot(slide, 11.60, y, 0.14, C.mint, { line: false }));
  mono(slide, "VALIDÉS", 9.42, 4.78, 1.16, 0.18, 7.8, C.mint, { charSpacing: 0.85 });

  rule(slide, 0.84, 5.80, 11.48, 0, C.steelLight, 0.8, { transparency: 15 });
  mono(slide, "ANGULAR", 0.86, 6.12, 1.02, 0.18, 7.8, C.ink, { charSpacing: 0.85 });
  tx(slide, "18 → 19", 2.20, 6.08, 1.10, 0.22, 11.0, C.ink, { fontFace: FONTS.mono, bold: true });
  mono(slide, "SCELLÉE", 3.52, 6.12, 0.84, 0.18, 7.8, C.mint, { charSpacing: 0.72 });
  tx(slide, "19 → 20", 5.06, 6.08, 1.10, 0.22, 11.0, C.ink, { fontFace: FONTS.mono, bold: true });
  mono(slide, "SCELLÉE", 6.38, 6.12, 0.84, 0.18, 7.8, C.mint, { charSpacing: 0.72 });
  tx(slide, "20 → 21", 7.92, 6.08, 1.10, 0.22, 11.0, C.ink, { fontFace: FONTS.mono, bold: true });
  mono(slide, "PRÉPARÉE", 9.24, 6.12, 0.96, 0.18, 7.8, C.amber, { charSpacing: 0.72 });
  tx(slide, "non démarrée", 10.58, 6.08, 1.42, 0.22, 9.8, C.steelLight, { fontFace: FONTS.head, bold: true, align: "right" });
  note(slide, 14);
}

function slide15() {
  const slide = pptx.addSlide();
  heading(slide, 15, 5, "Résultats", "Les difficultés ont renforcé l'architecture", "Chaque friction a produit un contrat plus explicite pour transformer, exécuter ou persister.", { light: true });
  mono(slide, "FRICTION OBSERVÉE", 0.84, 2.30, 2.26, 0.18, 8.2, C.coral, { charSpacing: 1.0 });
  mono(slide, "INVARIANT AJOUTÉ", 6.08, 2.30, 2.18, 0.18, 8.2, C.blue, { charSpacing: 1.0 });
  rule(slide, 0.84, 2.68, 11.50, 0, C.steelLight, 0.8, { transparency: 20 });
  const rows = [
    ["Patch non applicable", "Diff structuré + validation", C.coral, C.blue],
    ["Autorité de commande ambiguë", "Manifeste backend", C.amber, C.cyan],
    ["Profil Angular incompatible", "Catalogue versionné", C.amber, C.blue],
    ["Cohérence SQLite", "Base autoritaire réconciliée", C.coral, C.mint],
  ];
  rows.forEach(([problem, response, leftColor, rightColor], i) => {
    const y = 2.98 + i * 0.72;
    rect(slide, 0.84, y, 4.48, 0.52, i % 2 === 0 ? "E9E7E1" : "E2E0DA", { line: false });
    dot(slide, 1.08, y + 0.19, 0.14, leftColor, { line: false });
    tx(slide, problem, 1.46, y + 0.13, 3.48, 0.20, 10.8, C.ink, { fontFace: FONTS.head, bold: true });
    rule(slide, 5.54, y + 0.26, 0.34, 0, C.steelLight, 1.0, { endArrowType: "triangle" });
    rect(slide, 6.08, y, 5.70, 0.52, i % 2 === 0 ? "E2F0EC" : "E5EDF1", { line: false });
    dot(slide, 6.34, y + 0.19, 0.14, rightColor, { line: false });
    tx(slide, response, 6.72, y + 0.13, 4.60, 0.20, 10.8, C.ink, { fontFace: FONTS.head, bold: true });
  });
  rule(slide, 0.84, 6.10, 11.50, 0, C.steelLight, 0.8, { transparency: 18 });
  mono(slide, "ARCHITECTURE", 0.84, 6.38, 1.38, 0.18, 7.8, C.ink, { charSpacing: 0.8 });
  tx(slide, "contrats", 2.52, 6.34, 1.08, 0.22, 11.0, C.ink, { fontFace: FONTS.mono, bold: true });
  tx(slide, "orchestration", 4.24, 6.34, 1.56, 0.22, 11.0, C.ink, { fontFace: FONTS.mono, bold: true });
  tx(slide, "testing", 6.42, 6.34, 0.92, 0.22, 11.0, C.ink, { fontFace: FONTS.mono, bold: true });
  tx(slide, "persistance", 8.08, 6.34, 1.28, 0.22, 11.0, C.ink, { fontFace: FONTS.mono, bold: true });
  tx(slide, "compétences mobilisées", 10.14, 6.34, 2.20, 0.22, 10.0, C.steelLight, { fontFace: FONTS.head, bold: true, align: "right" });
  note(slide, 15);
}

function slide16() {
  const slide = pptx.addSlide();
  heading(slide, 16, 5, "Résultats", "Industrialiser reste le prochain chantier", "Le prototype est gouverné ; il ne se présente pas encore comme une plateforme production complète.", { light: true });
  mono(slide, "NOW → NEXT", 0.82, 2.26, 1.32, 0.18, 8.2, C.ink, { charSpacing: 1.0 });
  rule(slide, 0.84, 3.42, 10.98, -0.72, C.steelLight, 1.0, { endArrowType: "triangle" });
  dot(slide, 1.04, 3.25, 0.34, C.amber, { line: false });
  dot(slide, 11.48, 2.54, 0.34, C.blue, { line: false });
  mono(slide, "AUJOURD'HUI", 0.84, 2.74, 1.72, 0.18, 8.0, C.amber, { charSpacing: 0.9 });
  tx(slide, "Prototype gouverné", 0.84, 3.76, 3.44, 0.30, 20, C.ink, { fontFace: FONTS.head, bold: true });
  const limits = ["authentification / rôles non livrés", "pas de benchmark manuel contrôlé", "pas de CI commune", "couverture Angular incomplète", "coûts / durées LLM non consolidés"];
  limits.forEach((item, i) => {
    const y = 4.34 + i * 0.32;
    dot(slide, 0.88, y + 0.06, 0.10, C.amber, { line: false });
    tx(slide, item, 1.14, y, 4.22, 0.18, 9.6, C.ink, { fontFace: FONTS.head, bold: i === 0 });
  });
  mono(slide, "ENSUITE", 8.58, 2.08, 1.10, 0.18, 8.0, C.blue, { charSpacing: 0.9 });
  tx(slide, "Industrialiser", 8.58, 2.46, 3.46, 0.30, 20, C.ink, { fontFace: FONTS.head, bold: true });
  const next = ["sécurité et rôles", "corpus de benchmark", "instrumentation coût / durée", "nouveaux écosystèmes et modes de migration"];
  next.forEach((item, i) => {
    const y = 3.06 + i * 0.44;
    dot(slide, 8.62, y + 0.06, 0.10, C.blue, { line: false });
    tx(slide, item, 8.88, y, 3.44, 0.20, 10.2, C.ink, { fontFace: FONTS.head, bold: i === 0 });
  });
  rule(slide, 8.58, 4.96, 3.70, 0, C.blue, 1.4, { dash: "dash" });
  mono(slide, "VISION CIBLE", 8.58, 5.22, 1.42, 0.18, 7.8, C.blue, { charSpacing: 0.8 });
  tx(slide, ".NET · PHP · Python · React · cloud · refactoring", 8.58, 5.56, 3.64, 0.38, 9.6, C.steelLight, { fontFace: FONTS.mono, bold: true, valign: "top" });
  note(slide, 16);
}

function slide17() {
  const slide = pptx.addSlide();
  heading(slide, 17, 6, "Conclusion", "Le principe d'architecture", "La contribution est une automatisation gouvernée, traçable et revalidable.");
  tx(slide, "La migration devient gouvernable\nquand la décision laisse une preuve.", 0.84, 2.50, 7.60, 0.94, 28, C.snow, { fontFace: FONTS.head, bold: true, valign: "top" });
  rule(slide, 0.86, 3.82, 6.92, 0, C.cyan, 2.0);
  tx(slide, "Les agents accélèrent le raisonnement ; ils ne remplacent pas l'autorité.", 0.86, 4.10, 6.90, 0.32, 12.2, C.mist, { fontFace: FONTS.head, bold: true, valign: "top" });

  const pillars = [["01", "RAISONNER", "agents\nproposent", C.cyan], ["02", "CONTRÔLER", "services\nexécutent", C.blue], ["03", "PROUVER", "humain\ndécide", C.amber]];
  const xs = [8.42, 9.88, 11.34];
  rule(slide, 8.72, 3.52, 2.88, 0, C.steelLight, 1.0);
  pillars.forEach(([number, label, sub, color], i) => {
    const x = xs[i];
    dot(slide, x, 3.22, 0.62, C.slate2, { lineColor: color, lineTransparency: 0, lineWidth: 1.5 });
    mono(slide, number, x + 0.18, 3.45, 0.26, 0.10, 6.8, color, { align: "center", charSpacing: 0.0 });
    mono(slide, label, x - 0.34, 4.12, 1.28, 0.18, 7.6, color, { align: "center", charSpacing: 0.65 });
    tx(slide, sub, x - 0.34, 4.48, 1.28, 0.42, 10.5, C.snow, { fontFace: FONTS.head, bold: true, align: "center", valign: "top" });
  });
  mono(slide, "AGENTIC MIGRATION PLATFORM", 0.86, 6.38, 3.40, 0.18, 7.8, C.steelLight, { charSpacing: 1.0 });
  mono(slide, "REASONING · CONTROL · EVIDENCE", 8.34, 6.38, 3.92, 0.18, 7.8, C.cyan, { align: "right", charSpacing: 0.85 });
  note(slide, 17);
}

function slide18() {
  const slide = pptx.addSlide();
  base(slide, 18, 6);
  rule(slide, 0.72, 0.68, 0.60, 0, C.cyan, 2.2);
  mono(slide, "ÉCHANGE", 1.48, 0.56, 1.80, 0.20, 9.0, C.cyan, { charSpacing: 1.25 });
  tx(slide, "Questions / Discussion", 0.72, 1.44, 8.80, 0.64, 38, C.snow, { fontFace: FONTS.head, bold: true });
  tx(slide, "Choix d'architecture · preuves disponibles · limites assumées", 0.76, 2.34, 7.92, 0.26, 14, C.mist, { fontFace: FONTS.head, valign: "top" });
  rule(slide, 0.78, 3.28, 5.82, 0, C.steel, 1.0, { transparency: 15 });
  mono(slide, "LE SYSTÈME", 0.78, 3.58, 1.30, 0.18, 8.0, C.mist, { charSpacing: 0.9 });
  tx(slide, "raisonne", 0.78, 4.02, 1.56, 0.26, 18, C.cyan, { fontFace: FONTS.head, bold: true });
  tx(slide, "contrôle", 2.70, 4.02, 1.56, 0.26, 18, C.amber, { fontFace: FONTS.head, bold: true });
  tx(slide, "prouve", 4.62, 4.02, 1.56, 0.26, 18, C.mint, { fontFace: FONTS.head, bold: true });
  const mark = routeMark({ colors: { line: C.steel, one: C.cyan, two: C.blue, three: C.amber, four: C.mint } });
  slide.addImage({ data: mark, x: 8.04, y: 1.64, w: 3.72, h: 2.56 });
  rule(slide, 8.22, 5.36, 3.54, 0, C.steel, 0.9, { dash: "dash" });
  mono(slide, "PFE 2026 · VERSION ANONYMISÉE", 8.22, 5.66, 3.54, 0.18, 8.0, C.steelLight, { align: "right", charSpacing: 0.8 });
  note(slide, 18);
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
slide6();
slide7();
slide8();
slide9();
slide10();
slide11();
slide12();
slide13();
slide14();
slide15();
slide16();
slide17();
slide18();

const output = resolve(process.env.DECK_OUTPUT ?? "dist/Agentic-Migration-Platform-Soutenance-Redesigned.pptx");
mkdirSync(dirname(output), { recursive: true });
await pptx.writeFile({ fileName: output });
console.log(`Wrote ${output}`);

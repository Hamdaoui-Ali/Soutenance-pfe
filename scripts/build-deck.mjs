import { createRequire } from "node:module";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

function loadPptxGenJS() {
  const roots = [
    process.env.PPTXGENJS_HOME,
    process.env.CODEX_SLIDES_HOME ? join(process.env.CODEX_SLIDES_HOME, "node_modules") : "",
    "C:/Users/aliha/.codex/plugins/cache/codex-slides/codex-slides/0.1.0+codex.20260713/node_modules",
  ].filter(Boolean);
  for (const root of roots) {
    const pkg = join(root, "pptxgenjs", "package.json");
    if (!existsSync(pkg)) continue;
    const mod = createRequire(pkg)("pptxgenjs");
    return mod.default ?? mod;
  }
  throw new Error("PptxGenJS not found. Set PPTXGENJS_HOME to its node_modules directory.");
}

const PptxGenJS = loadPptxGenJS();
const pptx = new PptxGenJS();
const Shape = pptx.ShapeType ?? PptxGenJS.ShapeType ?? {};
const sh = (name) => Shape[name] ?? name;

const W = 13.333;
const H = 7.5;
const C = {
  bg: "07131E",
  surface: "0F2433",
  surface2: "153346",
  surface3: "1D4057",
  ink: "F3F7FA",
  muted: "A9C0D0",
  subtle: "6F8999",
  blue: "4FA3FF",
  cyan: "6CD7F2",
  green: "5DE2A4",
  amber: "F2C46D",
  red: "FF8A8A",
  purple: "9F8CFF",
  navyText: "07131E",
};
const FONT_HEAD = "Aptos Display";
const FONT_BODY = "Aptos";
const FONT_MONO = "Aptos Mono";
const CHAPTERS = ["Contexte", "Solution", "Architecture", "Réalisation", "Démo", "Résultats", "Conclusion"];

pptx.layout = "LAYOUT_WIDE";
pptx.author = "Agentic Migration Platform";
pptx.company = "CGI";
pptx.subject = "Soutenance PFE — plateforme agentique de migration";
pptx.title = "Agentic Migration Platform — Soutenance PFE";
pptx.lang = "fr-FR";
pptx.theme = {
  headFontFace: FONT_HEAD,
  bodyFontFace: FONT_BODY,
  lang: "fr-FR",
};

function tx(slide, text, x, y, w, h, fontSize, color = C.ink, opts = {}) {
  slide.addText(text, {
    x, y, w, h,
    fontFace: opts.fontFace ?? FONT_BODY,
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
    isTextBox: true,
    transparency: opts.transparency,
  });
}

function box(slide, x, y, w, h, fill, opts = {}) {
  slide.addShape(sh(opts.round ? "roundRect" : "rect"), {
    x, y, w, h,
    rectRadius: opts.radius,
    fill: { color: fill, transparency: opts.transparency ?? 0 },
    line: opts.line === false ? { color: fill, transparency: 100 } : { color: opts.lineColor ?? fill, transparency: opts.lineTransparency ?? 100, width: opts.lineWidth ?? 0.5 },
    radius: opts.radius,
  });
}

function line(slide, x, y, w, h, color = C.surface3, width = 1.2, opts = {}) {
  slide.addShape(sh("line"), {
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
  slide.addShape(sh("ellipse"), {
    x, y, w: d, h: d,
    fill: { color: fill, transparency: opts.transparency ?? 0 },
    line: opts.line === false ? { color: fill, transparency: 100 } : { color: opts.lineColor ?? fill, transparency: opts.lineTransparency ?? 100, width: opts.lineWidth ?? 0.5 },
  });
}

function pill(slide, label, x, y, w, fill = C.surface2, color = C.ink, opts = {}) {
  box(slide, x, y, w, opts.h ?? 0.28, fill, { round: true, line: false, transparency: opts.transparency });
  tx(slide, label, x + 0.08, y + 0.01, w - 0.16, (opts.h ?? 0.28) - 0.02, opts.fontSize ?? 9, color, { bold: opts.bold ?? true, align: "center" });
}

function status(slide, label, x, y, kind = "blue", w = 0.92) {
  const map = { done: [C.green, C.navyText], partial: [C.amber, C.navyText], vision: [C.purple, C.ink], prepared: [C.amber, C.navyText], blue: [C.blue, C.navyText], muted: [C.surface3, C.muted] };
  const [fill, color] = map[kind] ?? map.blue;
  pill(slide, label, x, y, w, fill, color, { fontSize: 8.5, h: 0.25 });
}

function progress(slide, current) {
  const x0 = 0.66;
  const gap = 1.78;
  const width = 1.52;
  line(slide, x0, 0.255, gap * 6 + width - 0.05, 0, C.surface3, 1.2);
  CHAPTERS.forEach((label, i) => {
    const x = x0 + i * gap;
    const active = i === current;
    const completed = i < current;
    if (active) {
      box(slide, x - 0.04, 0.10, width + 0.08, 0.34, C.cyan, { round: true, line: false });
      dot(slide, x + 0.08, 0.19, 0.12, C.navyText, { line: false });
      tx(slide, label, x + 0.25, 0.12, width - 0.28, 0.28, 8.6, C.navyText, { bold: true });
    } else {
      dot(slide, x + 0.08, 0.20, 0.10, completed ? C.green : C.subtle, { transparency: completed ? 0 : 15, line: false });
      tx(slide, label, x + 0.25, 0.13, width - 0.28, 0.25, 8.2, completed ? C.muted : C.subtle, { bold: completed });
    }
  });
}

function base(slide, num, chapter = null) {
  slide.background = { color: C.bg };
  line(slide, 0.42, 0.76, 0, 6.20, C.surface2, 0.7, { transparency: 35 });
  if (chapter !== null) progress(slide, chapter);
  line(slide, 0.66, 7.05, 12.02, 0, C.surface2, 0.8);
  tx(slide, "AGENTIC MIGRATION PLATFORM", 0.66, 7.13, 3.2, 0.18, 7.5, C.subtle, { fontFace: FONT_MONO, bold: true, charSpacing: 1.1 });
  tx(slide, `${String(num).padStart(2, "0")} / 18`, 11.55, 7.10, 1.12, 0.22, 8, C.subtle, { fontFace: FONT_MONO, align: "right" });
}

function heading(slide, num, chapter, kicker, title, sub = "") {
  base(slide, num, chapter);
  tx(slide, kicker.toUpperCase(), 0.66, 0.90, 4.6, 0.18, 8.5, C.cyan, { fontFace: FONT_MONO, bold: true, charSpacing: 1.4 });
  tx(slide, title, 0.66, 1.12, 11.7, 0.52, 26, C.ink, { fontFace: FONT_HEAD, bold: true });
  if (sub) tx(slide, sub, 0.66, 1.70, 11.3, 0.30, 11.5, C.muted, { valign: "top" });
}

function sectionLabel(slide, text, x, y, w = 2.0, color = C.muted) {
  tx(slide, text.toUpperCase(), x, y, w, 0.20, 8, color, { fontFace: FONT_MONO, bold: true, charSpacing: 1.1 });
}

function card(slide, x, y, w, h, title, body = "", opts = {}) {
  box(slide, x, y, w, h, opts.fill ?? C.surface, { round: true, line: false, transparency: opts.transparency });
  if (opts.accent) box(slide, x, y, 0.06, h, opts.accent, { round: true, line: false });
  tx(slide, title, x + 0.18, y + 0.14, w - 0.32, 0.26, opts.titleSize ?? 12, opts.titleColor ?? C.ink, { fontFace: opts.titleFont ?? FONT_HEAD, bold: true });
  if (body) tx(slide, body, x + 0.18, y + 0.48, w - 0.32, h - 0.60, opts.bodySize ?? 9.8, opts.bodyColor ?? C.muted, { valign: "top" });
}

function arrow(slide, x1, y1, x2, y2, color = C.blue, width = 1.5, opts = {}) {
  line(slide, x1, y1, x2 - x1, y2 - y1, color, width, { endArrowType: "triangle", dash: opts.dash, transparency: opts.transparency });
}

function note(slide, text) {
  slide.addNotes(text);
}

function slide1() {
  const slide = pptx.addSlide();
  slide.background = { color: C.bg };
  line(slide, 0.66, 0.62, 0.56, 0, C.cyan, 2.2);
  tx(slide, "PFE / 2026", 1.35, 0.50, 1.8, 0.22, 9, C.cyan, { fontFace: FONT_MONO, bold: true, charSpacing: 1.2 });
  tx(slide, "Agentic\nMigration Platform", 0.66, 1.52, 6.8, 1.45, 42, C.ink, { fontFace: FONT_HEAD, bold: true, valign: "top" });
  tx(slide, "Une Migration Factory gouvernée pour moderniser le legacy.", 0.70, 3.32, 5.9, 0.34, 16, C.cyan, { fontFace: FONT_HEAD, bold: true });
  tx(slide, "Java / Spring Boot  •  Angular", 0.70, 3.78, 4.8, 0.26, 12, C.muted, { fontFace: FONT_MONO });
  tx(slide, "Version démo fictive et anonymisée — le projet réel réalisé chez CGI est confidentiel.", 0.70, 6.38, 6.5, 0.22, 8.5, C.subtle, { valign: "bottom" });
  tx(slide, "SOUTENANCE DE PROJET DE FIN D'ÉTUDES", 0.70, 6.78, 4.4, 0.20, 8, C.subtle, { fontFace: FONT_MONO, bold: true, charSpacing: 1.0 });

  const nodes = [
    { x: 8.03, y: 1.52, label: "LEGACY", color: C.amber },
    { x: 9.18, y: 2.57, label: "AGENTS", color: C.cyan },
    { x: 10.38, y: 3.62, label: "EVIDENCE", color: C.green },
    { x: 11.43, y: 4.68, label: "MODERN", color: C.blue },
  ];
  line(slide, 7.64, 1.38, 4.30, 3.80, C.surface3, 1.5, { dash: "dash" });
  for (let i = 0; i < nodes.length - 1; i++) arrow(slide, nodes[i].x + 0.33, nodes[i].y + 0.30, nodes[i + 1].x + 0.18, nodes[i + 1].y + 0.12, nodes[i + 1].color, 1.3);
  nodes.forEach((n, i) => {
    dot(slide, n.x, n.y, 0.62, C.surface, { lineColor: n.color, lineTransparency: 0, lineWidth: 1.6 });
    dot(slide, n.x + 0.21, n.y + 0.21, 0.20, n.color, { line: false });
    tx(slide, n.label, n.x - 0.20, n.y + 0.78, 1.05, 0.20, 8.5, n.color, { fontFace: FONT_MONO, bold: true, align: "center", charSpacing: 0.8 });
    if (i < nodes.length - 1) {
      box(slide, n.x + 0.75, n.y + 0.04, 0.78, 0.08, C.surface2, { round: true, line: false });
    }
  });
  box(slide, 7.55, 5.68, 4.95, 0.64, C.surface, { round: true, line: false });
  tx(slide, "Reasoning  ·  Control  ·  Evidence", 7.85, 5.88, 4.35, 0.23, 12, C.ink, { fontFace: FONT_MONO, align: "center", bold: true });
  note(slide, "Ouverture : présenter la migration comme un problème d'industrialisation et de continuité de service. Préciser que le projet réel chez CGI est confidentiel et que la démonstration est fictive/anonymisée.");
}

function slide2() {
  const slide = pptx.addSlide();
  slide.background = { color: C.bg };
  tx(slide, "LE FIL DE LA SOUTENANCE", 0.66, 0.66, 4.4, 0.20, 8.5, C.cyan, { fontFace: FONT_MONO, bold: true, charSpacing: 1.4 });
  tx(slide, "Plan de présentation", 0.66, 1.02, 7.2, 0.58, 30, C.ink, { fontFace: FONT_HEAD, bold: true });
  tx(slide, "Partir du besoin. Rendre la solution lisible. Finir par les preuves et les limites.", 0.66, 1.70, 8.8, 0.30, 12.5, C.muted);
  line(slide, 1.05, 3.25, 11.15, 0, C.surface3, 1.8);
  const captions = [
    ["01", "Contexte", "Le déclencheur"],
    ["02", "Solution", "La Migration Factory"],
    ["03", "Architecture", "Les contrats et les gates"],
    ["04", "Réalisation", "Java, Angular, agents"],
    ["05", "Démo", "Une décision prouvée"],
    ["06", "Résultats", "Ce qui est démontré"],
    ["07", "Conclusion", "Ce que l'on retient"],
  ];
  captions.forEach(([n, title, sub], i) => {
    const x = 0.70 + i * 1.78;
    dot(slide, x + 0.58, 2.93, 0.62, i === 0 ? C.cyan : C.surface, { lineColor: i === 0 ? C.cyan : C.subtle, lineTransparency: 0, lineWidth: 1.4 });
    tx(slide, n, x + 0.58, 3.10, 0.62, 0.16, 8.5, i === 0 ? C.navyText : C.muted, { fontFace: FONT_MONO, bold: true, align: "center" });
    tx(slide, title, x, 3.82, 1.75, 0.22, 11.5, i === 0 ? C.cyan : C.ink, { fontFace: FONT_HEAD, bold: true, align: "center" });
    tx(slide, sub, x - 0.08, 4.18, 1.90, 0.48, 8.5, C.muted, { align: "center", valign: "top" });
  });
  box(slide, 0.70, 5.55, 11.90, 0.76, C.surface, { round: true, line: false });
  tx(slide, "Une histoire  →  une plateforme  →  une architecture  →  des preuves", 1.08, 5.81, 11.10, 0.24, 14, C.ink, { fontFace: FONT_HEAD, bold: true, align: "center" });
  tx(slide, "18 slides  ·  7 chapitres  ·  1 message principal par slide", 0.70, 6.72, 5.2, 0.20, 8.5, C.subtle, { fontFace: FONT_MONO });
  tx(slide, "02 / 18", 11.55, 6.72, 1.12, 0.20, 8, C.subtle, { fontFace: FONT_MONO, align: "right" });
  note(slide, "Annoncer une soutenance en sept chapitres. La slide ne liste pas les 18 titres : elle donne au jury la carte narrative.");
}

function slide3() {
  const slide = pptx.addSlide();
  heading(slide, 3, 0, "Contexte", "Le déclencheur : une migration cloud à grande échelle", "Le défi est de moderniser un portefeuille legacy sans interrompre les services qui tournent déjà.");
  sectionLabel(slide, "Le point de départ", 0.72, 2.24, 2.2, C.cyan);
  const events = [
    ["01", "Objectif cloud", "Horizon client : fin 2027", C.cyan],
    ["02", "Portefeuille legacy", "Des applications à faire évoluer", C.amber],
    ["03", "Cible Azure", "Un nouveau terrain d'hébergement", C.blue],
    ["04", "Continuité", "Les applications restent disponibles", C.green],
  ];
  events.forEach(([n, title, body, color], i) => {
    const y = 2.62 + i * 0.72;
    dot(slide, 0.78, y + 0.09, 0.28, color, { line: false });
    tx(slide, n, 0.78, y + 0.14, 0.28, 0.12, 7, C.navyText, { fontFace: FONT_MONO, bold: true, align: "center" });
    tx(slide, title, 1.24, y, 2.15, 0.22, 12, C.ink, { fontFace: FONT_HEAD, bold: true });
    tx(slide, body, 3.26, y + 0.02, 2.70, 0.18, 9.2, C.muted);
    if (i < events.length - 1) line(slide, 0.92, y + 0.40, 0, 0.38, C.surface3, 1.2);
  });
  box(slide, 7.10, 2.22, 5.32, 3.52, C.surface, { round: true, line: false });
  sectionLabel(slide, "Cadre industriel · CGI", 7.42, 2.55, 3.0, C.cyan);
  tx(slide, "Le projet réel est confidentiel.", 7.42, 2.95, 4.48, 0.32, 18, C.ink, { fontFace: FONT_HEAD, bold: true });
  tx(slide, "Cette soutenance s'appuie sur une version démo fictive et anonymisée de la logique générale.", 7.42, 3.48, 4.48, 0.66, 12, C.muted, { valign: "top" });
  box(slide, 7.42, 4.48, 4.32, 0.74, C.surface2, { round: true, line: false });
  tx(slide, "MODERNISER EN CONTINU", 7.70, 4.70, 3.76, 0.20, 10, C.cyan, { fontFace: FONT_MONO, bold: true, align: "center", charSpacing: 0.9 });
  tx(slide, "La contrainte visible : migrer sans arrêter.", 7.42, 5.38, 4.48, 0.22, 10.5, C.ink, { bold: true });
  note(slide, "Raconter le déclencheur : un grand client aérien de CGI vise le cloud à horizon fin 2027. Garder le client anonymisé. Insister sur le fait que l'arrière-plan technique doit rester invisible pour l'utilisateur final : l'application doit rester fonctionnelle.");
}

function slide4() {
  const slide = pptx.addSlide();
  heading(slide, 4, 0, "Contexte", "La réalité opérationnelle : maintenir et migrer en parallèle", "La migration ne remplace pas le run : elle doit cohabiter avec la production, les incidents et les demandes d'évolution.");
  const left = 0.72;
  const mid = 6.44;
  card(slide, left, 2.30, 5.00, 2.55, "RUN / MAINTENIR", "Incidents\nOptimisation\nDisponibilité de service", { accent: C.green, fill: C.surface });
  pill(slide, "PRODUCTION", left + 0.20, 4.18, 1.20, C.green, C.navyText, { fontSize: 8.5 });
  card(slide, mid, 2.30, 5.78, 2.55, "MIGRATE / TRANSFORMER", "Analyse du legacy\nPatches et compatibilité\nBuilds, tests, revalidation", { accent: C.blue, fill: C.surface });
  pill(slide, "PORTFOLIO", mid + 0.20, 4.18, 1.05, C.blue, C.navyText, { fontSize: 8.5 });
  line(slide, 5.82, 3.02, 0.46, 0, C.amber, 2.2, { dash: "dash" });
  line(slide, 5.82, 3.88, 0.46, 0, C.amber, 2.2, { dash: "dash" });
  dot(slide, 5.67, 3.32, 0.30, C.amber, { line: false });
  tx(slide, "même\ntemps", 5.44, 3.66, 0.78, 0.48, 9, C.amber, { fontFace: FONT_MONO, bold: true, align: "center" });
  sectionLabel(slide, "Ce qui se dégrade à l'échelle", 0.74, 5.36, 3.4, C.cyan);
  const risks = [
    ["01", "Contexte perdu", "Pourquoi cette modification ?"],
    ["02", "Rework", "Patch non applicable, retour manuel"],
    ["03", "Preuves dispersées", "Décision difficile à relier au résultat"],
  ];
  risks.forEach(([n, t, b], i) => {
    const x = 0.72 + i * 3.96;
    box(slide, x, 5.67, 3.52, 0.82, C.surface2, { round: true, line: false });
    tx(slide, n, x + 0.18, 5.88, 0.30, 0.18, 8, C.cyan, { fontFace: FONT_MONO, bold: true });
    tx(slide, t, x + 0.62, 5.78, 2.68, 0.22, 11, C.ink, { fontFace: FONT_HEAD, bold: true });
    tx(slide, b, x + 0.62, 6.10, 2.68, 0.18, 8.5, C.muted);
  });
  note(slide, "Faire ressentir la tension : les mêmes développeurs maintiennent les applications et migrent progressivement. Les prompts individuels peuvent aider localement, mais ils ne transportent pas à eux seuls le contexte, la décision et la preuve.");
}

function slide5() {
  const slide = pptx.addSlide();
  heading(slide, 5, 1, "Solution", "Du besoin à la Migration Factory : objectifs et vision", "Capitaliser les pratiques individuelles ne suffit plus : il faut un parcours multi-agents, contrôlé et réutilisable.");
  sectionLabel(slide, "La bascule", 0.72, 2.24, 1.6, C.cyan);
  const steps = [
    ["Prompts\nindividuels", C.amber, "aider ponctuellement"],
    ["Pratiques\nstandardisées", C.blue, "réduire la variabilité"],
    ["Factory\nmulti-agents", C.cyan, "industrialiser sous contrôle"],
  ];
  steps.forEach(([label, color, body], i) => {
    const x = 0.74 + i * 2.34;
    box(slide, x, 2.62, 1.82, 1.10, i === 2 ? C.surface3 : C.surface, { round: true, lineColor: color, lineTransparency: 0, lineWidth: 1.0 });
    dot(slide, x + 0.15, 2.80, 0.16, color, { line: false });
    tx(slide, label, x + 0.40, 2.76, 1.22, 0.46, 12, C.ink, { fontFace: FONT_HEAD, bold: true, valign: "top" });
    tx(slide, body, x + 0.18, 3.40, 1.46, 0.18, 8.2, C.muted, { align: "center" });
    if (i < steps.length - 1) arrow(slide, x + 1.90, 3.16, x + 2.23, 3.16, C.surface3, 1.4);
  });
  box(slide, 8.04, 2.52, 4.34, 1.28, C.surface2, { round: true, line: false });
  tx(slide, "PRINCIPE", 8.34, 2.78, 1.2, 0.18, 8, C.cyan, { fontFace: FONT_MONO, bold: true, charSpacing: 1.0 });
  tx(slide, "Agents proposent.\nServices vérifient.\nHumain décide.", 8.34, 3.04, 3.64, 0.56, 14, C.ink, { fontFace: FONT_HEAD, bold: true, valign: "top" });
  sectionLabel(slide, "Périmètre démontré vs vision cible", 0.72, 4.36, 4.0, C.cyan);
  const rows = [
    ["Java / Spring Boot", "Parcours de référence", "Réalisé", "done"],
    ["Angular", "18→19 et 19→20 scellées", "Partiel", "partial"],
    [".NET · PHP · Python · React", "Extensions de l'écosystème", "Vision cible", "vision"],
    ["On-premise→cloud · cloud→cloud · refactoring", "Élargissement de la factory", "Vision cible", "vision"],
  ];
  rows.forEach(([name, detail, badge, kind], i) => {
    const y = 4.70 + i * 0.46;
    box(slide, 0.72, y, 11.66, 0.34, i % 2 === 0 ? C.surface : C.surface2, { round: true, line: false });
    tx(slide, name, 0.94, y + 0.06, 3.32, 0.18, 9.2, C.ink, { bold: true });
    tx(slide, detail, 4.40, y + 0.06, 5.65, 0.18, 8.8, C.muted);
    status(slide, badge, 10.72, y + 0.045, kind, 1.34);
  });
  note(slide, "Expliquer la naissance de la Migration Factory : après une année de pratiques manuelles et de prompts, la demande augmente et il devient nécessaire de rendre le parcours réutilisable. Distinguer strictement le périmètre démontré de la vision cible.");
}

function placeholders() {
  // Replaced by the architecture, realization, demo, evidence and conclusion parts.
  for (let i = 6; i <= 18; i++) {
    const slide = pptx.addSlide();
    heading(slide, i, Math.min(6, Math.floor((i - 3) / 3)), "À compléter", `Slide ${i}`, "Contenu éditable ajouté dans les commits suivants.");
    card(slide, 0.72, 2.45, 11.6, 2.0, "Placeholder", "Cette page est volontairement remplacée dans la suite de la production.", { accent: C.cyan });
  }
}

slide1();
slide2();
slide3();
slide4();
slide5();
placeholders();

const out = resolve(process.env.DECK_OUTPUT ?? "dist/Agentic-Migration-Platform-Soutenance.pptx");
mkdirSync(dirname(out), { recursive: true });
await pptx.writeFile({ fileName: out });
console.log(`Wrote ${out}`);

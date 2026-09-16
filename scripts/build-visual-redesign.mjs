import fs from "node:fs";
import path from "node:path";

const W = 1600;
const H = 900;
const OUT = path.resolve("tmp/visual-redesign");
const ASSET = path.resolve("assets/presentation/angular-g10-repair.png");

fs.mkdirSync(OUT, { recursive: true });

const C = {
  bg: "#0B1117",
  bg2: "#0E1821",
  panel: "#111C25",
  panel2: "#162733",
  ink: "#F6F4EF",
  muted: "#A6B5BF",
  steel: "#3A5567",
  line: "#294150",
  cyan: "#68D6E8",
  blue: "#4E9DFF",
  amber: "#F2B84B",
  mint: "#3FD5B1",
  coral: "#FF6B70",
  ivory: "#F3F1EA",
  darkInk: "#101820",
  ivoryMuted: "#59656D",
  ivoryLine: "#C8C9C0",
};

const esc = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const n = (value) => Number(value.toFixed(2));

function svgStart(bg) {
  return "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + W + "\" height=\"" + H + "\" viewBox=\"0 0 " + W + " " + H + "\">" +
    "<rect width=\"" + W + "\" height=\"" + H + "\" fill=\"" + (bg || C.bg) + "\"/>" +
    "<style>.sans{font-family:'Segoe UI',Arial,sans-serif}.mono{font-family:'Cascadia Mono','Consolas',monospace}</style>";
}

function endSvg(parts) {
  return parts.join("") + "</svg>";
}

function rect(x, y, w, h, fill, stroke, sw, r, opacity) {
  return "<rect x=\"" + n(x) + "\" y=\"" + n(y) + "\" width=\"" + n(w) + "\" height=\"" + n(h) +
    "\" rx=\"" + n(r || 0) + "\" fill=\"" + (fill || "none") + "\" stroke=\"" + (stroke || "none") +
    "\" stroke-width=\"" + (sw || 1) + "\" opacity=\"" + (opacity == null ? 1 : opacity) + "\"/>";
}

function line(x1, y1, x2, y2, stroke, sw, dash, opacity) {
  return "<line x1=\"" + n(x1) + "\" y1=\"" + n(y1) + "\" x2=\"" + n(x2) + "\" y2=\"" + n(y2) +
    "\" stroke=\"" + stroke + "\" stroke-width=\"" + (sw || 1) + "\"" +
    (dash ? " stroke-dasharray=\"" + dash + "\"" : "") +
    " opacity=\"" + (opacity == null ? 1 : opacity) + "\"/>";
}

function pathEl(d, stroke, sw, fill, dash, opacity) {
  return "<path d=\"" + d + "\" stroke=\"" + stroke + "\" stroke-width=\"" + (sw || 1) +
    "\" fill=\"" + (fill || "none") + "\"" + (dash ? " stroke-dasharray=\"" + dash + "\"" : "") +
    " opacity=\"" + (opacity == null ? 1 : opacity) + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>";
}

function circle(cx, cy, r, fill, stroke, sw, opacity) {
  return "<circle cx=\"" + n(cx) + "\" cy=\"" + n(cy) + "\" r=\"" + n(r) + "\" fill=\"" + (fill || "none") +
    "\" stroke=\"" + (stroke || "none") + "\" stroke-width=\"" + (sw || 1) +
    "\" opacity=\"" + (opacity == null ? 1 : opacity) + "\"/>";
}

function polygon(points, fill, stroke, sw, opacity) {
  return "<polygon points=\"" + points.map(function (p) { return n(p[0]) + "," + n(p[1]); }).join(" ") +
    "\" fill=\"" + fill + "\" stroke=\"" + (stroke || "none") + "\" stroke-width=\"" + (sw || 1) +
    "\" opacity=\"" + (opacity == null ? 1 : opacity) + "\"/>";
}

function text(x, y, value, size, fill, weight, opts) {
  opts = opts || {};
  const cls = opts.mono ? "mono" : "sans";
  const anchor = opts.anchor || "start";
  const ls = opts.letterSpacing == null ? 0 : opts.letterSpacing;
  const opacity = opts.opacity == null ? 1 : opts.opacity;
  const italic = opts.italic ? "font-style:italic;" : "";
  return "<text x=\"" + n(x) + "\" y=\"" + n(y) + "\" class=\"" + cls + "\" font-size=\"" + size +
    "px\" font-weight=\"" + (weight || 400) + "\" fill=\"" + (fill || C.ink) + "\" text-anchor=\"" + anchor +
    "\" letter-spacing=\"" + ls + "px\" opacity=\"" + opacity + "\" style=\"" + italic + "\">" +
    esc(value) + "</text>";
}

function multiline(x, y, values, size, fill, weight, leading, opts) {
  opts = opts || {};
  const arr = Array.isArray(values) ? values : String(values).split("\n");
  const cls = opts.mono ? "mono" : "sans";
  const anchor = opts.anchor || "start";
  const ls = opts.letterSpacing == null ? 0 : opts.letterSpacing;
  const opacity = opts.opacity == null ? 1 : opts.opacity;
  const italic = opts.italic ? "font-style:italic;" : "";
  let out = "<text x=\"" + n(x) + "\" y=\"" + n(y) + "\" class=\"" + cls + "\" font-size=\"" + size +
    "px\" font-weight=\"" + (weight || 400) + "\" fill=\"" + (fill || C.ink) + "\" text-anchor=\"" + anchor +
    "\" letter-spacing=\"" + ls + "px\" opacity=\"" + opacity + "\" style=\"" + italic + "\">";
  arr.forEach(function (lineText, i) {
    out += "<tspan x=\"" + n(x) + "\" dy=\"" + (i === 0 ? 0 : size * (leading || 1.2)) + "\">" + esc(lineText) + "</tspan>";
  });
  return out + "</text>";
}

function smallCaps(x, y, value, fill, opts) {
  opts = opts || {};
  return text(x, y, String(value).toUpperCase(), opts.size || 14, fill || C.cyan, 600, {
    mono: true,
    anchor: opts.anchor,
    letterSpacing: opts.letterSpacing == null ? 2.3 : opts.letterSpacing,
    opacity: opts.opacity,
  });
}

function pill(x, y, w, label, color, bg, opts) {
  opts = opts || {};
  const h = opts.h || 34;
  return rect(x, y, w, h, bg || "transparent", opts.stroke || color, opts.sw || 1.4, h / 2, opts.opacity) +
    text(x + w / 2, y + h * 0.68, label, opts.size || 14, opts.text || color, opts.weight || 600, {
      mono: opts.mono !== false,
      anchor: "middle",
      letterSpacing: opts.letterSpacing == null ? 1.2 : opts.letterSpacing,
    });
}

function arrow(x1, y1, x2, y2, color, sw, opts) {
  opts = opts || {};
  const head = opts.head || 10;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const p1 = [x2 - head * Math.cos(angle - Math.PI / 6), y2 - head * Math.sin(angle - Math.PI / 6)];
  const p2 = [x2 - head * Math.cos(angle + Math.PI / 6), y2 - head * Math.sin(angle + Math.PI / 6)];
  return line(x1, y1, x2, y2, color, sw || 2, opts.dash, opts.opacity) +
    polygon([[x2, y2], p1, p2], color, "none", 0, opts.opacity);
}

function dotGrid(x, y, cols, rows, gap, color, opacity) {
  let out = "";
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) out += circle(x + c * gap, y + r * gap, 1.8, color, "none", 0, opacity == null ? 0.25 : opacity);
  }
  return out;
}

const chapters = ["Contexte", "Solution", "Architecture", "Réalisation", "Démo", "Résultats", "Conclusion"];

function topRail(page, active, bg) {
  const light = bg === C.ivory;
  const muted = light ? C.ivoryMuted : C.muted;
  const steel = light ? C.ivoryLine : C.steel;
  const x0 = 78;
  const usable = 1320;
  const step = usable / (chapters.length - 1);
  let out = line(x0, 70, x0 + usable, 70, steel, 1, "", 0.7);
  chapters.forEach(function (chapter, i) {
    const x = x0 + i * step;
    const current = i === active;
    const done = i < active;
    const color = current ? C.cyan : done ? (light ? C.mint : C.muted) : muted;
    out += circle(x, 70, current ? 5 : 3, color, "none", 0, current ? 1 : 0.85);
    out += text(x, 43, chapter, 14, color, current ? 650 : 500, { mono: true, anchor: "middle", letterSpacing: 0.4, opacity: current || done ? 1 : 0.75 });
    if (current) out += line(x - 42, 82, x + 42, 82, C.cyan, 3);
  });
  out += text(1530, 43, String(page).padStart(2, "0") + " / 18", 15, light ? C.darkInk : C.ink, 600, { mono: true, anchor: "end", letterSpacing: 1.2 });
  return out;
}

function footer(label, bg) {
  const light = bg === C.ivory;
  const color = light ? C.ivoryMuted : C.muted;
  const lineColor = light ? C.ivoryLine : C.steel;
  return line(78, 846, 1522, 846, lineColor, 1, "", 0.8) +
    text(78, 878, "AGENTIC MIGRATION PLATFORM  ·  PFE 2026", 13, color, 500, { mono: true, letterSpacing: 1.1 }) +
    text(1522, 878, label, 13, color, 500, { mono: true, anchor: "end", letterSpacing: 0.7 });
}

function titleBlock(parts, kicker, titleLines, subtitle, active, page, bg) {
  const useBg = bg || C.bg;
  parts.push(topRail(page, active, useBg));
  parts.push(smallCaps(80, 128, kicker, useBg === C.ivory ? C.blue : C.cyan));
  parts.push(multiline(80, 188, titleLines, 54, useBg === C.ivory ? C.darkInk : C.ink, 700, 1.08));
  if (subtitle) parts.push(multiline(80, 300, subtitle, 22, useBg === C.ivory ? C.ivoryMuted : C.muted, 400, 1.25));
}

function writeSlide(index, parts) {
  fs.writeFileSync(path.join(OUT, String(index).padStart(2, "0") + ".svg"), endSvg(parts), "utf8");
}

function slide1() {
  const p = [svgStart()];
  p.push(dotGrid(50, 60, 10, 4, 22, C.cyan, 0.16));
  p.push(dotGrid(1510, 44, 5, 8, 22, C.blue, 0.14));
  p.push(pill(82, 60, 260, "MIGRATION CONTROL PLANE", C.cyan, "transparent", { h: 38, size: 14, letterSpacing: 1.6 }));
  p.push(text(1510, 82, "GOVERNED · TRACEABLE · VERIFIABLE", 13, C.muted, 600, { mono: true, anchor: "end", letterSpacing: 1.7 }));
  p.push(multiline(82, 260, ["Agentic Migration", "Platform"], 70, C.ink, 700, 0.98));
  p.push(multiline(86, 440, ["Une Migration Factory gouvernée", "pour Java/Spring Boot et Angular"], 31, C.ink, 500, 1.28));
  p.push(text(86, 548, "Migration legacy gouvernée, traçable et vérifiable", 24, C.cyan, 650));
  p.push(text(86, 592, "Une route contrôlée de l’état legacy à l’état modernisé.", 18, C.muted, 400));
  const x0 = 580;
  const y0 = 710;
  p.push(pathEl("M " + (x0 - 40) + " " + y0 + " H 1450", C.steel, 2));
  p.push(arrow(x0 + 28, y0, x0 + 150, y0, C.cyan, 2.5));
  p.push(arrow(x0 + 308, y0, x0 + 430, y0, C.cyan, 2.5));
  p.push(arrow(x0 + 588, y0, x0 + 710, y0, C.cyan, 2.5));
  [["LEGACY", "source", C.blue], ["AGENTS", "reason", C.cyan], ["EVIDENCE", "proof", C.mint], ["MODERN", "target", C.amber]].forEach(function (item, i) {
    const x = x0 + i * 280;
    p.push(circle(x, y0, 37, C.bg2, item[2], 2.4));
    p.push(circle(x, y0, 7, item[2]));
    p.push(text(x, y0 + 78, item[0], 15, C.ink, 650, { mono: true, anchor: "middle", letterSpacing: 1.8 }));
    p.push(text(x, y0 + 102, item[1], 13, C.muted, 400, { mono: true, anchor: "middle", letterSpacing: 1.2 }));
  });
  p.push(rect(760, 150, 700, 420, C.panel, C.steel, 1.4, 18));
  p.push(line(808, 205, 808, 514, C.steel, 1));
  p.push(smallCaps(848, 208, "ONE CONTROLLED ROUTE", C.cyan));
  p.push(text(848, 258, "Reasoning → control → evidence", 26, C.ink, 650));
  p.push(text(848, 300, "Les agents proposent. Les services exécutent.", 17, C.muted, 400));
  p.push(text(848, 330, "L’humain autorise les décisions sensibles.", 17, C.muted, 400));
  [["01", "Proposer", "agents spécialisés", C.cyan], ["02", "Exécuter", "services déterministes", C.blue], ["03", "Sceller", "preuves revalidées", C.mint]].forEach(function (row, i) {
    const y = 382 + i * 52;
    p.push(circle(870, y, 13, row[3]));
    p.push(text(870, y + 5, row[0], 10, C.bg, 700, { mono: true, anchor: "middle" }));
    p.push(text(906, y + 5, row[1], 18, C.ink, 650));
    p.push(text(1085, y + 5, row[2], 15, C.muted, 400));
    if (i < 2) p.push(line(870, y + 16, 870, y + 40, C.steel, 1.5));
  });
  p.push(footer("SYNTHÈSE", C.bg));
  writeSlide(1, p);
}

function slide2() {
  const p = [svgStart()];
  p.push(dotGrid(78, 118, 12, 3, 22, C.blue, 0.12));
  p.push(smallCaps(80, 126, "PLAN DE PRÉSENTATION", C.cyan));
  p.push(text(80, 194, "Le chemin de la soutenance", 62, C.ink, 700));
  p.push(text(82, 242, "Du problème de migration aux preuves d’une automatisation gouvernée.", 24, C.muted, 400));
  const y = 470;
  p.push(pathEl("M 118 " + y + " H 1480", C.steel, 3));
  p.push(pathEl("M 118 " + (y - 2) + " H 1480", C.cyan, 1.1, "none", "", 0.45));
  [["01", "Contexte", "poser le besoin", C.cyan], ["02", "Solution", "formuler la réponse", C.blue], ["03", "Architecture", "séparer les rôles", C.amber], ["04", "Réalisation", "construire les axes", C.mint], ["05", "Démo", "voir une décision", C.cyan], ["06", "Résultats", "relier les preuves", C.blue], ["07", "Conclusion", "assumer les limites", C.amber]].forEach(function (stop, i) {
    const x = 128 + i * 226;
    const above = i % 2 === 0;
    p.push(circle(x, y, 24, C.bg2, stop[3], 2.3));
    p.push(circle(x, y, 6, stop[3]));
    p.push(text(x, y + 5, stop[0], 11, C.ink, 700, { mono: true, anchor: "middle" }));
    p.push(line(x, y + (above ? -24 : 24), x, y + (above ? -96 : 96), stop[3], 1.4));
    p.push(text(x, y + (above ? -116 : 132), stop[1], 22, C.ink, 650, { anchor: "middle" }));
    p.push(text(x, y + (above ? -86 : 160), stop[2], 13, C.muted, 500, { mono: true, anchor: "middle" }));
  });
  p.push(rect(80, 660, 1440, 92, C.panel, C.steel, 1, 14));
  p.push(text(112, 712, "FIL DIRECTEUR", 14, C.cyan, 650, { mono: true, letterSpacing: 2 }));
  p.push(text(368, 712, "une migration legacy devient un parcours contrôlé, traçable et revalidable", 25, C.ink, 600));
  p.push(footer("ROUTE", C.bg));
  writeSlide(2, p);
}

function slide3() {
  const p = [svgStart()];
  titleBlock(p, "CONTEXTE · LE DÉCLENCHEUR", ["Le déclencheur :", "une migration cloud"], "Un portefeuille legacy doit évoluer sans interrompre les services qui tournent déjà.", 0, 3);
  p.push(text(82, 500, "À L’HORIZON", 14, C.muted, 600, { mono: true, letterSpacing: 2.4 }));
  p.push(text(78, 648, "2027", 190, C.cyan, 700, { mono: true, letterSpacing: -8 }));
  p.push(text(90, 690, "cible cloud", 20, C.ink, 500));
  p.push(line(485, 372, 1470, 372, C.steel, 2));
  p.push(line(485, 372, 1470, 372, C.cyan, 1, "10 14", 0.75));
  [["01", "Objectif cloud", "faire évoluer le SI", C.cyan], ["02", "Portefeuille legacy", "des applications à reprendre", C.blue], ["03", "Continuité", "ne pas interrompre la production", C.amber], ["04", "Industrialiser", "réduire le rework et relier les preuves", C.mint]].forEach(function (step, i) {
    const x = 520 + i * 300;
    p.push(circle(x, 372, 26, C.bg2, step[3], 2.2));
    p.push(circle(x, 372, 6, step[3]));
    p.push(text(x, 377, step[0], 11, C.ink, 700, { mono: true, anchor: "middle" }));
    p.push(text(x - 58, 448, step[1], 22, C.ink, 650));
    p.push(multiline(x - 58, 482, step[2].split(" · "), 15, C.muted, 400, 1.35));
  });
  p.push(rect(510, 600, 950, 116, C.panel, C.steel, 1.2, 14));
  p.push(smallCaps(546, 636, "QUESTION DE DÉPART", C.cyan));
  p.push(text(546, 682, "Comment migrer à l’échelle sans perdre le contrôle ?", 30, C.ink, 650));
  p.push(footer("CONTEXTE", C.bg));
  writeSlide(3, p);
}

function slide4() {
  const p = [svgStart()];
  titleBlock(p, "CONTEXTE · LA TENSION", ["Maintenir", "et migrer en parallèle"], "La même équipe porte deux exigences : garder la production fiable et faire avancer la modernisation.", 0, 4);
  p.push(rect(80, 374, 642, 314, C.panel, C.blue, 1.4, 18));
  p.push(rect(878, 374, 642, 314, C.panel, C.cyan, 1.4, 18));
  p.push(smallCaps(116, 422, "RUN · MAINTENIR", C.blue));
  p.push(smallCaps(914, 422, "CHANGE · MIGRER", C.cyan));
  p.push(text(116, 470, "Production", 36, C.ink, 700));
  p.push(text(914, 470, "Portefeuille legacy", 36, C.ink, 700));
  ["maintenance", "incidents", "optimisation", "disponibilité"].forEach(function (label, i) {
    const x = 124 + i * 142;
    p.push(circle(x, 560, 22, C.bg2, C.blue, 2));
    p.push(circle(x, 560, 6, C.blue));
    p.push(text(x, 615, label, 14, C.muted, 500, { anchor: "middle" }));
    if (i < 3) p.push(arrow(x + 26, 560, x + 116, 560, C.steel, 1.4, { head: 8 }));
  });
  ["versions", "dépendances", "transformations", "validations"].forEach(function (label, i) {
    const x = 922 + i * 142;
    p.push(circle(x, 560, 22, C.bg2, C.cyan, 2));
    p.push(circle(x, 560, 6, C.cyan));
    p.push(text(x, 615, label, 14, C.muted, 500, { anchor: "middle" }));
    if (i < 3) p.push(arrow(x + 26, 560, x + 116, 560, C.steel, 1.4, { head: 8 }));
  });
  p.push(rect(700, 458, 200, 150, C.bg2, C.amber, 2, 100));
  p.push(circle(800, 504, 20, C.amber));
  p.push(circle(800, 504, 8, C.bg2));
  p.push(text(800, 558, "même équipe", 18, C.ink, 650, { anchor: "middle" }));
  p.push(text(800, 585, "capacité sous tension", 14, C.amber, 600, { anchor: "middle", mono: true }));
  p.push(pathEl("M 722 532 C 670 700, 934 700, 878 532", C.amber, 2.5, "none", "8 10", 0.85));
  p.push(pill(530, 742, 540, "CONTEXTE PERDU  ·  REWORK  ·  PREUVES DISPERSÉES", C.coral, "transparent", { h: 38, size: 13, text: C.coral }));
  p.push(footer("CONTEXTE", C.bg));
  writeSlide(4, p);
}

function slide5() {
  const p = [svgStart()];
  titleBlock(p, "SOLUTION · DE L’IDÉE À L’INDUSTRIALISATION", ["Du besoin à la", "Migration Factory"], "Les prompts individuels aident localement. La factory rend le parcours réutilisable et gouvernable.", 1, 5);
  const baseY = 680;
  [["Prompts individuels", ["aider une tâche", "décision isolée"], 120, 340, 180, C.steel], ["Pratiques partagées", ["capitaliser les", "transformations"], 500, 340, 260, C.blue], ["Migration Factory", ["orchestrer", "raisonner", "vérifier", "revalider"], 880, 460, 360, C.cyan]].forEach(function (step, i) {
    const y = baseY - step[4];
    p.push(rect(step[2], y, step[3], step[4], i === 2 ? C.panel2 : C.panel, step[5], 1.8, 16));
    p.push(rect(step[2], y, 8, step[4], step[5], "none", 0, 4));
    p.push(smallCaps(step[2] + 28, y + 42, "ÉTAPE 0" + (i + 1), step[5]));
    p.push(text(step[2] + 28, y + 92, step[0], 25, C.ink, 650));
    step[1].forEach(function (lineText, j) {
      p.push(text(step[2] + 28, y + 140 + j * 28, lineText, 17, C.muted, 400));
      if (i === 2) p.push(circle(step[2] + 305, y + 134 + j * 28, 4, step[5]));
    });
  });
  p.push(arrow(460, 586, 490, 586, C.steel, 2));
  p.push(arrow(840, 486, 870, 486, C.cyan, 2));
  p.push(rect(1385, 312, 135, 364, C.panel, C.steel, 1, 14));
  p.push(smallCaps(1452, 356, "PÉRIMÈTRE", C.muted, { anchor: "middle", size: 12, letterSpacing: 1.4 }));
  p.push(pill(1405, 398, 95, "RÉALISÉ", C.mint, "transparent", { h: 32, size: 11, text: C.mint }));
  p.push(multiline(1452, 460, ["Java /", "Spring Boot"], 17, C.ink, 600, 1.25, { anchor: "middle" }));
  p.push(pill(1405, 522, 95, "PARTIEL", C.amber, "transparent", { h: 32, size: 11, text: C.amber }));
  p.push(text(1452, 580, "Angular", 17, C.ink, 600, { anchor: "middle" }));
  p.push(pill(1405, 616, 95, "VISION", C.blue, "transparent", { h: 32, size: 11, text: C.blue }));
  p.push(multiline(1452, 658, [".NET · PHP", "Python · React"], 14, C.muted, 500, 1.25, { anchor: "middle" }));
  p.push(footer("SOLUTION", C.bg));
  writeSlide(5, p);
}

function slide6() {
  const p = [svgStart()];
  titleBlock(p, "ARCHITECTURE · RESPONSABILITÉS", ["Architecture", "fonctionnelle"], "Une boucle de responsabilité : proposer, exécuter, vérifier, autoriser.", 2, 6);
  p.push(rect(80, 382, 1440, 330, C.panel, C.steel, 1.3, 18));
  p.push(rect(112, 416, 1376, 62, C.panel2, C.cyan, 1, 10));
  p.push(smallCaps(142, 455, "INTENTION & PLAN", C.cyan));
  p.push(text(440, 456, "objectif de migration · contexte · contraintes", 18, C.ink, 500));
  p.push(rect(112, 508, 418, 142, C.bg2, C.cyan, 1.5, 14));
  p.push(smallCaps(142, 544, "AGENTS SPÉCIALISÉS", C.cyan));
  p.push(multiline(142, 586, ["analyser · planifier", "transformer · réparer"], 22, C.ink, 650, 1.3));
  p.push(rect(576, 508, 418, 142, C.bg2, C.blue, 1.5, 14));
  p.push(smallCaps(606, 544, "SERVICES DÉTERMINISTES", C.blue));
  p.push(multiline(606, 586, ["exécuter · construire", "tester · persister"], 22, C.ink, 650, 1.3));
  p.push(rect(1040, 508, 448, 142, C.bg2, C.mint, 1.5, 14));
  p.push(smallCaps(1070, 544, "ÉTAT & PREUVES", C.mint));
  p.push(multiline(1070, 586, ["artefacts · checksums", "historique · revalidation"], 22, C.ink, 650, 1.3));
  p.push(arrow(530, 579, 566, 579, C.steel, 2));
  p.push(arrow(994, 579, 1030, 579, C.steel, 2));
  p.push(rect(615, 690, 370, 66, C.bg2, C.amber, 2, 33));
  p.push(circle(657, 723, 12, C.amber));
  p.push(text(690, 730, "GATE HUMAIN", 18, C.amber, 700, { mono: true, letterSpacing: 1.2 }));
  p.push(text(1010, 731, "autoriser · modifier · rejeter", 16, C.muted, 400));
  p.push(pathEl("M 792 650 V 681", C.amber, 2));
  p.push(arrow(792, 681, 792, 690, C.amber, 2));
  p.push(pathEl("M 1100 650 C 1100 674, 1000 674, 960 700", C.mint, 1.5, "none", "5 8"));
  p.push(footer("ARCHITECTURE", C.bg));
  writeSlide(6, p);
}

function slide7() {
  const p = [svgStart()];
  titleBlock(p, "ARCHITECTURE · TOOLCHAINS", ["Architecture", "technique"], "Java et Angular gardent leurs toolchains ; la gouvernance reste commune.", 2, 7);
  p.push(rect(80, 380, 1440, 330, C.panel, C.steel, 1.3, 18));
  p.push(rect(610, 416, 380, 258, C.bg2, C.amber, 1.6, 18));
  p.push(smallCaps(800, 455, "NOYAU COMMUN", C.amber, { anchor: "middle" }));
  p.push(multiline(800, 510, ["Contrats de", "gouvernance"], 32, C.ink, 700, 1.14, { anchor: "middle" }));
  ["états", "gates", "checksum", "evidence"].forEach(function (label, i) {
    p.push(pill(680 + (i % 2) * 150, 596 + Math.floor(i / 2) * 42, 130, label, C.amber, "transparent", { h: 28, size: 11, text: C.amber }));
  });
  p.push(smallCaps(118, 432, "JAVA / SPRING BOOT", C.blue));
  p.push(text(118, 478, "JDK", 21, C.ink, 650));
  p.push(arrow(180, 470, 240, 470, C.blue, 2));
  p.push(text(252, 478, "Maven", 21, C.ink, 650));
  p.push(arrow(348, 470, 408, 470, C.blue, 2));
  p.push(text(420, 478, "OpenRewrite", 21, C.ink, 650));
  p.push(text(118, 550, "analyse → plan → transformation → build / test", 15, C.muted, 400, { mono: true }));
  p.push(arrow(560, 470, 604, 470, C.blue, 2));
  p.push(smallCaps(1038, 432, "ANGULAR", C.cyan));
  p.push(text(1038, 478, "Node.js", 21, C.ink, 650));
  p.push(arrow(1127, 470, 1180, 470, C.cyan, 2));
  p.push(text(1194, 478, "npm", 21, C.ink, 650));
  p.push(arrow(1248, 470, 1300, 470, C.cyan, 2));
  p.push(text(1314, 478, "Angular CLI", 21, C.ink, 650));
  p.push(text(1038, 550, "versions → migration → validation → repair", 15, C.muted, 400, { mono: true }));
  p.push(arrow(1000, 470, 1030, 470, C.cyan, 2));
  p.push(line(80, 744, 1520, 744, C.steel, 1));
  p.push(text(80, 785, "Deux chemins d’exécution", 20, C.ink, 650));
  p.push(text(420, 785, "un même langage de contrôle", 20, C.amber, 650));
  p.push(text(820, 785, "des preuves reliées au bon artefact", 20, C.mint, 650));
  p.push(footer("ARCHITECTURE", C.bg));
  writeSlide(7, p);
}

function slide8() {
  const p = [svgStart()];
  titleBlock(p, "ARCHITECTURE · ÉTATS & GATES", ["Workflow complet", "de migration"], "Chaque transition critique produit un état lisible, un gate et une preuve revalidable.", 2, 8);
  const y = 494;
  p.push(line(110, y, 1490, y, C.steel, 3));
  p.push(line(110, y, 1490, y, C.cyan, 1, "4 18", 0.85));
  [["01", "Qualifier", C.blue], ["02", "Analyser", C.cyan], ["03", "Planifier", C.cyan], ["04", "Transformer", C.blue], ["05", "Valider", C.amber], ["06", "Réparer", C.coral], ["07", "Sceller", C.mint]].forEach(function (stage, i) {
    const x = 128 + i * 228;
    p.push(circle(x, y, 34, C.bg2, stage[2], 2.5));
    p.push(circle(x, y, 7, stage[2]));
    p.push(text(x, y + 5, stage[0], 11, C.ink, 700, { mono: true, anchor: "middle" }));
    p.push(text(x, y + 82, stage[1], 21, C.ink, 650, { anchor: "middle" }));
    p.push(text(x, y + 110, i === 4 ? "gate humain" : i === 5 ? "boucle contrôlée" : "état persisté", 13, stage[2], 500, { mono: true, anchor: "middle" }));
    if (i < 6) p.push(arrow(x + 38, y, x + 185, y, C.steel, 1.7, { head: 9 }));
  });
  p.push(pathEl("M 1040 535 C 1038 676, 1250 690, 1270 534", C.coral, 2, "none", "8 12", 0.95));
  p.push(pill(960, 644, 160, "REVALIDER", C.coral, "transparent", { h: 34, size: 12, text: C.coral }));
  [["ÉTAT", "ce qui est vrai maintenant", C.blue], ["GATE", "ce qui doit être autorisé", C.amber], ["PREUVE", "ce qui permet de revenir vérifier", C.mint]].forEach(function (note, i) {
    const x = 160 + i * 450;
    p.push(circle(x, 760, 6, note[2]));
    p.push(smallCaps(x + 24, 766, note[0], note[2], { size: 13, letterSpacing: 1.4 }));
    p.push(text(x + 108, 766, note[1], 15, C.muted, 400));
  });
  p.push(footer("ARCHITECTURE", C.bg));
  writeSlide(8, p);
}

function slide9() {
  const p = [svgStart()];
  titleBlock(p, "RÉALISATION · PARCOURS DE RÉFÉRENCE", ["Axe 1 — Java", "Spring Boot"], "Java constitue le parcours de référence le plus mature de la plateforme.", 3, 9);
  p.push(pill(1160, 134, 278, "RÉALISATION · RÉFÉRENCE", C.mint, "transparent", { h: 36, size: 12, text: C.mint }));
  p.push(line(150, 500, 1370, 500, C.steel, 3));
  p.push(line(150, 500, 1220, 500, C.blue, 2.4));
  [["2.1", "legacy", C.steel], ["2.7", "stabilisation", C.blue], ["3.5", "modernisation", C.cyan], ["4.0", "cible du parcours", C.mint]].forEach(function (version, i) {
    const x = 180 + i * 350;
    p.push(circle(x, 500, 40, C.bg2, version[2], 2.8));
    p.push(text(x, 510, version[0], 24, C.ink, 700, { mono: true, anchor: "middle" }));
    p.push(text(x, 590, "Spring Boot", 20, C.ink, 650, { anchor: "middle" }));
    p.push(text(x, 620, version[1], 14, version[2], 500, { mono: true, anchor: "middle" }));
  });
  p.push(rect(150, 690, 1050, 74, C.panel, C.steel, 1.1, 12));
  p.push(smallCaps(180, 734, "RUNTIMES COMPATIBLES", C.blue));
  p.push(text(510, 735, "Java 11", 20, C.ink, 650, { mono: true }));
  p.push(text(700, 735, "Java 17", 20, C.ink, 650, { mono: true }));
  p.push(text(890, 735, "Java 21", 20, C.ink, 650, { mono: true }));
  p.push(rect(1260, 380, 260, 384, C.panel2, C.blue, 1.4, 16));
  p.push(smallCaps(1290, 428, "OUTILLAGE", C.blue));
  p.push(text(1290, 490, "Maven", 26, C.ink, 650));
  p.push(text(1290, 548, "OpenRewrite", 26, C.ink, 650));
  p.push(line(1290, 584, 1480, 584, C.steel, 1));
  p.push(multiline(1290, 634, ["transformer", "déterministe", "et revalidable"], 18, C.muted, 400, 1.35));
  p.push(footer("RÉALISATION", C.bg));
  writeSlide(9, p);
}

function slide10() {
  const bg = C.ivory;
  const p = [svgStart(bg)];
  titleBlock(p, "RÉALISATION · COUVERTURE PARTIELLE", ["Axe 2 — Angular"], "Le modèle de gouvernance se transfère ; la couverture reste volontairement présentée comme partielle.", 3, 10, bg);
  p.push(pill(1210, 134, 220, "PARTIEL · ASSUMÉ", C.amber, "transparent", { h: 36, size: 12, text: C.amber }));
  p.push(line(160, 500, 1300, 500, C.ivoryLine, 4));
  p.push(line(160, 500, 885, 500, C.mint, 4));
  p.push(line(885, 500, 1280, 500, C.amber, 3, "12 12"));
  [["18", "base", C.blue], ["19", "scellée", C.mint], ["20", "scellée", C.mint], ["21", "préparée", C.amber]].forEach(function (version, i) {
    const x = 190 + i * 365;
    p.push(circle(x, 500, 40, bg, version[2], 3));
    p.push(text(x, 510, version[0], 25, C.darkInk, 700, { mono: true, anchor: "middle" }));
    p.push(text(x, 585, version[1], 17, version[2], 700, { mono: true, anchor: "middle" }));
    if (i < 3) p.push(text(x + 182, 489, "→", 30, version[2], 600, { anchor: "middle" }));
  });
  p.push(rect(160, 670, 930, 74, "#E8E7DF", C.ivoryLine, 1, 12));
  p.push(smallCaps(190, 715, "STATUT", C.blue, { size: 13, letterSpacing: 1.8 }));
  p.push(text(350, 716, "18 → 19 et 19 → 20 scellées", 20, C.darkInk, 650));
  p.push(text(820, 716, "20 → 21 préparée · non démarrée", 18, C.ivoryMuted, 500));
  p.push(rect(1150, 360, 300, 390, C.darkInk, C.darkInk, 1, 18));
  p.push(smallCaps(1190, 412, "À RETENIR", C.cyan));
  p.push(text(1190, 490, "Pas de", 38, C.ink, 700));
  p.push(text(1190, 540, "11 → 21", 48, C.cyan, 700, { mono: true }));
  p.push(text(1190, 590, "réalisé.", 38, C.ink, 700));
  p.push(multiline(1190, 666, ["Une extension visée,", "pas une preuve obtenue."], 18, C.muted, 400, 1.35));
  p.push(footer("RÉALISATION", bg));
  writeSlide(10, p);
}

function slide11() {
  const p = [svgStart()];
  titleBlock(p, "RÉALISATION · AUTORITÉ BORNÉE", ["Gouvernance", "des agents IA"], "Les agents sont spécialisés et bornés ; les gates et l’humain gardent l’autorité finale.", 3, 11);
  const cx = 700;
  const cy = 520;
  p.push(circle(cx, cy, 90, C.panel2, C.cyan, 2));
  p.push(circle(cx, cy, 55, C.bg2, C.cyan, 1.3));
  p.push(smallCaps(cx, cy - 9, "ORCHESTRATEUR", C.cyan, { anchor: "middle", size: 12, letterSpacing: 1.3 }));
  p.push(text(cx, cy + 24, "état + route", 16, C.ink, 600, { anchor: "middle", mono: true }));
  [[410, 372, "Analyste", "diagnostiquer", C.blue], [560, 300, "Reviewer", "relire", C.cyan], [840, 300, "Planificateur", "ordonner", C.cyan], [990, 372, "Transformateur", "proposer", C.blue], [930, 680, "Réparateur", "corriger", C.coral], [470, 680, "Assistant", "éclairer", C.mint]].forEach(function (agent) {
    p.push(pathEl("M " + cx + " " + cy + " L " + agent[0] + " " + agent[1], C.steel, 1.3, "none", "4 8"));
    p.push(circle(agent[0], agent[1], 52, C.bg2, agent[4], 1.8));
    p.push(circle(agent[0], agent[1], 7, agent[4]));
    p.push(text(agent[0], agent[1] + 82, agent[2], 18, C.ink, 650, { anchor: "middle" }));
    p.push(text(agent[0], agent[1] + 106, agent[3], 13, agent[4], 500, { mono: true, anchor: "middle" }));
  });
  p.push(rect(1180, 330, 300, 380, C.panel, C.amber, 1.8, 18));
  p.push(smallCaps(1330, 382, "AUTORITÉ", C.amber, { anchor: "middle" }));
  p.push(text(1330, 450, "Humain", 38, C.ink, 700, { anchor: "middle" }));
  p.push(text(1330, 486, "décide", 22, C.amber, 650, { anchor: "middle", mono: true }));
  ["approuver", "modifier", "rejeter"].forEach(function (item, i) {
    const y = 552 + i * 48;
    p.push(circle(1232, y - 5, 5, C.amber));
    p.push(text(1260, y, item, 19, C.ink, 600));
  });
  p.push(pathEl("M 790 520 H 1160", C.amber, 2, "none", "8 10"));
  p.push(arrow(1135, 520, 1168, 520, C.amber, 2));
  p.push(pill(430, 770, 740, "AGENTS : PROPOSITIONS   ·   SERVICES : EXÉCUTION   ·   HUMAIN : DÉCISION", C.cyan, "transparent", { h: 38, size: 12, text: C.cyan }));
  p.push(footer("RÉALISATION", C.bg));
  writeSlide(11, p);
}

function slide12() {
  const p = [svgStart()];
  titleBlock(p, "RÉALISATION · CHANGEMENT SOUS CONTRÔLE", ["Réparation", "gouvernée"], "Un échec est gelé, expliqué, proposé, décidé sous contrôle puis revalidé.", 3, 12);
  const cx = 550;
  const cy = 528;
  p.push(circle(cx, cy, 188, "none", C.steel, 1.5));
  p.push(pathEl("M " + (cx - 136) + " " + (cy - 92) + " A 164 164 0 1 1 " + (cx + 130) + " " + (cy + 110), C.cyan, 3));
  p.push(arrow(cx + 127, cy + 110, cx + 142, cy + 118, C.cyan, 2));
  [[550, 305, "ÉCHEC GELÉ", C.coral], [760, 395, "CONTEXTE", C.blue], [758, 628, "PROPOSITION", C.cyan], [550, 750, "REVALIDATION", C.mint], [340, 628, "APPLICATION", C.blue], [340, 395, "DÉCISION HUMAINE", C.amber]].forEach(function (item) {
    p.push(circle(item[0], item[1], 44, C.bg2, item[3], 2.3));
    p.push(circle(item[0], item[1], 7, item[3]));
    p.push(text(item[0], item[1] + 75, item[2], 14, item[3], 650, { mono: true, anchor: "middle", letterSpacing: 0.7 }));
  });
  p.push(circle(cx, cy, 84, C.panel2, C.amber, 2));
  p.push(smallCaps(cx, cy - 10, "REVIEW", C.amber, { anchor: "middle", size: 14 }));
  p.push(text(cx, cy + 28, "gate humain", 24, C.ink, 700, { anchor: "middle" }));
  p.push(pathEl("M 842 366 H 1515", C.steel, 1.5));
  p.push(smallCaps(920, 366, "PREUVES ATTACHÉES À LA DÉCISION", C.mint));
  [["CHECKSUM", "décider sur le bon artefact", C.cyan], ["BORNAGE", "limiter les tentatives", C.amber], ["HISTORIQUE", "conserver chaque décision", C.mint]].forEach(function (proof, i) {
    const y = 440 + i * 100;
    p.push(line(920, y, 1460, y, C.steel, 1));
    p.push(circle(930, y + 32, 7, proof[2]));
    p.push(smallCaps(960, y + 28, proof[0], proof[2], { size: 13, letterSpacing: 1.3 }));
    p.push(text(960, y + 60, proof[1], 18, C.ink, 500));
  });
  p.push(pill(920, 720, 410, "PAS DE RETRY AVEUGLE", C.coral, "transparent", { h: 38, size: 13, text: C.coral }));
  p.push(footer("RÉALISATION", C.bg));
  writeSlide(12, p);
}

function slide13() {
  const p = [svgStart()];
  titleBlock(p, "DÉMO · DÉCIDER À PARTIR D’UNE PREUVE", ["Démo :", "scénario utilisateur"], "Une interface locale et préparée pour inspecter, vérifier puis décider.", 4, 13);
  p.push(rect(80, 376, 930, 360, C.panel, C.cyan, 1.4, 16));
  p.push(pill(112, 404, 424, "DÉMO LOCALE  ·  ANGULAR G10", C.cyan, "transparent", { h: 34, size: 12, text: C.cyan }));
  const data = fs.readFileSync(ASSET).toString("base64");
  p.push("<image href=\"data:image/png;base64," + data + "\" x=\"112\" y=\"456\" width=\"866\" height=\"246\" preserveAspectRatio=\"xMidYMid slice\"/>");
  p.push(text(112, 719, "Scénario anonymisé · états préparés · pas d’accès CGI / Azure", 13, C.muted, 500, { mono: true }));
  p.push(line(1080, 394, 1080, 736, C.steel, 1));
  p.push(smallCaps(1140, 430, "UNE DÉCISION EN TROIS GESTES", C.cyan));
  [["01", "Inspecter", "Lire la correction et son contexte.", C.blue], ["02", "Vérifier", "Relier la proposition à la preuve.", C.cyan], ["03", "Décider", "Approuver, modifier ou rejeter.", C.amber]].forEach(function (action, i) {
    const y = 500 + i * 82;
    p.push(circle(1150, y, 18, action[3]));
    p.push(text(1150, y + 5, action[0], 10, C.bg, 700, { mono: true, anchor: "middle" }));
    p.push(text(1190, y + 2, action[1], 22, C.ink, 650));
    p.push(text(1190, y + 30, action[2], 15, C.muted, 400));
    if (i < 2) p.push(line(1150, y + 22, 1150, y + 60, C.steel, 1.4));
  });
  p.push(footer("DÉMO", C.bg));
  writeSlide(13, p);
}

function slide14() {
  const bg = C.ivory;
  const p = [svgStart(bg)];
  titleBlock(p, "RÉSULTATS · PREUVES PONCTUELLES", ["Résultats", "et preuves"], "La valeur observable est le contrôle, la traçabilité et la revalidation — pas un gain extrapolé.", 5, 14, bg);
  p.push(pill(1120, 134, 320, "NON BENCHMARKÉ · POINT D’OBSERVATION", C.ivoryMuted, "transparent", { h: 36, size: 11, text: C.ivoryMuted }));
  [["607", "tests backend réussis", "4 ignorés · campagne Java", C.blue], ["✓", "contrôles frontend validés", "type · statique · conformité · build", C.mint], ["2", "transitions Angular scellées", "18 → 19 · 19 → 20", C.cyan]].forEach(function (row, i) {
    const y = 382 + i * 126;
    p.push(line(120, y - 38, 1480, y - 38, C.ivoryLine, 1.4));
    p.push(text(120, y + 44, row[0], 66, row[3], 700, { mono: true }));
    p.push(text(360, y + 24, row[1], 28, C.darkInk, 700));
    p.push(text(360, y + 56, row[2], 18, C.ivoryMuted, 400));
    p.push(text(1438, y + 35, i === 0 ? "JAVA" : i === 1 ? "FRONTEND" : "ANGULAR", 13, row[3], 700, { mono: true, anchor: "end", letterSpacing: 1.8 }));
  });
  p.push(line(120, 724, 1480, 724, C.ivoryLine, 1.4));
  p.push(smallCaps(120, 780, "CONTRÔLE DE PORTÉE", C.amber));
  p.push(text(420, 780, "baseline frontend : 12 → 11 échecs après intégration", 19, C.darkInk, 600));
  p.push(text(1240, 780, "preuve ponctuelle", 15, C.ivoryMuted, 500, { mono: true, anchor: "end" }));
  p.push(footer("RÉSULTATS", bg));
  writeSlide(14, p);
}

function slide15() {
  const p = [svgStart()];
  titleBlock(p, "RÉSULTATS · APPRENDRE DES ÉCHECS", ["Difficultés", "→ apports techniques"], "Les contraintes rencontrées deviennent des contrats, des garde-fous et des invariants.", 5, 15);
  p.push(smallCaps(120, 392, "PROBLÈME", C.coral));
  p.push(smallCaps(940, 392, "RÉPONSE ARCHITECTURALE", C.mint));
  p.push(line(120, 414, 1480, 414, C.steel, 1.2));
  [["Patch non applicable", "diff structuré + validation", C.coral], ["Autorité de commande ambiguë", "manifeste backend", C.amber], ["Profil Angular incompatible", "catalogue versionné", C.blue], ["Cohérence SQLite", "base autoritaire réconciliée", C.mint]].forEach(function (row, i) {
    const y = 480 + i * 76;
    p.push(circle(138, y - 7, 7, row[2]));
    p.push(text(170, y, row[0], 22, C.ink, 600));
    p.push(arrow(690, y - 8, 858, y - 8, row[2], 2, { head: 10 }));
    p.push(text(940, y, row[1], 22, C.ink, 650));
    p.push(line(120, y + 30, 1480, y + 30, C.line, 1));
  });
  p.push(rect(120, 764, 1360, 48, C.panel2, C.cyan, 1, 10));
  p.push(text(800, 796, "Architecture · orchestration · checksums · testing · prompt design", 16, C.cyan, 600, { mono: true, anchor: "middle", letterSpacing: 0.8 }));
  p.push(footer("RÉSULTATS", C.bg));
  writeSlide(15, p);
}

function slide16() {
  const p = [svgStart()];
  titleBlock(p, "RÉSULTATS · PÉRIMÈTRE ASSUMÉ", ["Limites", "→ perspectives"], "Le prototype est gouverné ; son industrialisation reste à compléter.", 5, 16);
  p.push(line(800, 378, 800, 738, C.steel, 1.4));
  p.push(circle(800, 486, 14, C.amber));
  p.push(line(800, 486, 1450, 486, C.amber, 2.3, "9 13"));
  p.push(smallCaps(120, 400, "AUJOURD’HUI", C.amber));
  p.push(text(120, 462, "Limites actuelles", 32, C.ink, 700));
  p.push(smallCaps(840, 400, "DEMAIN", C.blue));
  p.push(text(840, 462, "Vision cible", 32, C.ink, 700));
  ["authentification et rôles non livrés", "pas de benchmark manuel contrôlé", "pas de CI commune", "couverture Angular incomplète", "coût / durée LLM non consolidés"].forEach(function (item, i) {
    const y = 540 + i * 46;
    p.push(circle(130, y - 6, 5, C.amber));
    p.push(text(156, y, item, 18, C.ink, 500));
  });
  ["sécurité et rôles industrialisés", "corpus de benchmark", "instrumentation coût / durée", "nouveaux écosystèmes", "on-premise → cloud · cloud → cloud"].forEach(function (item, i) {
    const y = 540 + i * 46;
    p.push(circle(850, y - 6, 5, C.blue));
    p.push(text(876, y, item, 18, C.ink, 500));
  });
  p.push(pill(586, 784, 430, "VISÉ ≠ LIVRÉ", C.amber, "transparent", { h: 36, size: 13, text: C.amber }));
  p.push(footer("RÉSULTATS", C.bg));
  writeSlide(16, p);
}

function slide17() {
  const p = [svgStart()];
  p.push(topRail(17, 6, C.bg));
  p.push(smallCaps(82, 142, "CONCLUSION · LE PRINCIPE", C.cyan));
  p.push(multiline(82, 230, ["Une migration agentique", "n’est pas une autonomie totale."], 63, C.ink, 700, 1.06));
  p.push(text(86, 390, "C’est un chemin automatisé dont les décisions restent gouvernées.", 25, C.muted, 400));
  [[230, "REASONING", "agents", "raisonnent & proposent", C.cyan], [790, "CONTROL", "services", "exécutent & vérifient", C.blue], [1350, "EVIDENCE", "humain", "décide & assume", C.amber]].forEach(function (pillar, i) {
    p.push(circle(pillar[0], 610, 82, C.bg2, pillar[4], 2.6));
    p.push(circle(pillar[0], 610, 12, pillar[4]));
    p.push(text(pillar[0], 746, pillar[1], 16, pillar[4], 700, { mono: true, anchor: "middle", letterSpacing: 1.9 }));
    p.push(text(pillar[0], 786, pillar[2], 22, C.ink, 650, { anchor: "middle" }));
    p.push(text(pillar[0], 814, pillar[3], 15, C.muted, 400, { anchor: "middle" }));
    if (i < 2) p.push(arrow(pillar[0] + 100, 610, pillar[0] + 460, 610, C.steel, 2, { head: 10 }));
  });
  p.push(footer("CONCLUSION", C.bg));
  writeSlide(17, p);
}

function slide18() {
  const p = [svgStart()];
  p.push(dotGrid(80, 140, 16, 4, 26, C.cyan, 0.12));
  p.push(smallCaps(82, 142, "ÉCHANGE · OUVRIR LA DISCUSSION", C.cyan));
  p.push(text(82, 272, "Questions / Discussion", 76, C.ink, 700));
  p.push(text(86, 340, "Choix d’architecture · preuves disponibles · limites assumées", 24, C.muted, 400));
  p.push(pathEl("M 110 560 C 360 460, 520 690, 780 560 S 1220 430, 1500 560", C.steel, 2.2));
  p.push(pathEl("M 110 560 C 360 460, 520 690, 780 560 S 1220 430, 1500 560", C.cyan, 1, "none", "3 18", 0.85));
  [[410, 545, "REASONING", C.cyan], [800, 560, "CONTROL", C.blue], [1190, 505, "EVIDENCE", C.mint]].forEach(function (word) {
    p.push(circle(word[0], word[1], 34, C.bg2, word[3], 2));
    p.push(circle(word[0], word[1], 7, word[3]));
    p.push(text(word[0], word[1] + 78, word[2], 15, word[3], 700, { mono: true, anchor: "middle", letterSpacing: 1.8 }));
  });
  p.push(pill(82, 728, 180, "MERCI", C.cyan, "transparent", { h: 38, size: 14, text: C.cyan }));
  p.push(text(1518, 766, "AGENTIC MIGRATION PLATFORM  ·  PFE 2026", 13, C.muted, 500, { mono: true, anchor: "end", letterSpacing: 1 }));
  p.push(line(82, 846, 1518, 846, C.steel, 1));
  writeSlide(18, p);
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

console.log("Generated 18 SVG slides in " + OUT);

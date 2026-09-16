import fs from "node:fs";
import path from "node:path";

const W = 1600;
const H = 900;
const OUT = path.resolve("tmp/apm-redesign");
const ASSET_DIR = path.resolve("assets/presentation");
const HERO = path.join(ASSET_DIR, "migration-atlas-hero.png");
const JOURNEY = path.join(ASSET_DIR, "migration-journey.png");
const DEMO = path.join(ASSET_DIR, "angular-g10-repair.png");

fs.mkdirSync(OUT, { recursive: true });

const C = {
  paper: "#F8FAFF",
  white: "#FFFFFF",
  navy: "#0F1F46",
  navy2: "#162B5D",
  blue: "#1E5BEA",
  cyan: "#16B8E6",
  paleBlue: "#EDF4FF",
  line: "#B9D2FA",
  mid: "#6F819F",
  orange: "#F59E0B",
  paleOrange: "#FFF5DF",
  mint: "#2CC7A5",
  paleMint: "#E7FAF4",
  coral: "#E65A5A",
  paleCoral: "#FFF0EF",
  grey: "#E7EDF7",
  graphite: "#283650",
};

const esc = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const n = (value) => Number(value.toFixed(2));

function svgStart(bg = C.paper) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="softBlue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#EAF3FF"/></linearGradient>
    <linearGradient id="heroFade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F8FAFF" stop-opacity="1"/><stop offset="0.36" stop-color="#F8FAFF" stop-opacity="0.84"/><stop offset="0.74" stop-color="#F8FAFF" stop-opacity="0"/></linearGradient>
    <linearGradient id="navyBlue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0F1F46"/><stop offset="1" stop-color="#1E5BEA"/></linearGradient>
    <linearGradient id="orangeBlue" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1E5BEA"/><stop offset="0.72" stop-color="#16B8E6"/><stop offset="1" stop-color="#F59E0B"/></linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#0F1F46" flood-opacity="0.10"/></filter>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#0F1F46" flood-opacity="0.10"/></filter>
    <style>
      .sans{font-family:'Aptos Display','Segoe UI',Arial,sans-serif}
      .body{font-family:'Aptos','Segoe UI',Arial,sans-serif}
      .mono{font-family:'Cascadia Mono','Consolas',monospace}
    </style>
  </defs>
  <rect width="${W}" height="${H}" fill="${bg}"/>`;
}

function endSvg(parts) { return `${parts.join("")}</svg>`; }

function t(x, y, value, size, fill = C.navy, weight = 400, anchor = "start", family = "sans", letter = 0, opacity = 1) {
  return `<text x="${n(x)}" y="${n(y)}" class="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" letter-spacing="${letter}" opacity="${opacity}">${esc(value)}</text>`;
}

function lines(x, y, values, size, fill = C.navy, weight = 400, gap = 30, family = "body", anchor = "start") {
  return values.map((v, i) => t(x, y + i * gap, v, size, fill, weight, anchor, family)).join("");
}

function rect(x, y, w, h, fill = "none", stroke = "none", sw = 1, r = 0, opacity = 1, filter = "") {
  return `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${n(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" opacity="${opacity}"${filter ? ` filter="url(#${filter})"` : ""}/>`;
}

function line(x1, y1, x2, y2, stroke = C.line, sw = 2, dash = "", opacity = 1) {
  return `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ""} opacity="${opacity}"/>`;
}

function pathEl(d, stroke = "none", sw = 1, fill = "none", dash = "", opacity = 1) {
  return `<path d="${d}" stroke="${stroke}" stroke-width="${sw}" fill="${fill}"${dash ? ` stroke-dasharray="${dash}"` : ""} opacity="${opacity}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function circle(cx, cy, r, fill = "none", stroke = "none", sw = 1, opacity = 1) {
  return `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" opacity="${opacity}"/>`;
}

function polygon(points, fill = "none", stroke = "none", sw = 1, opacity = 1) {
  return `<polygon points="${points.map(([x, y]) => `${n(x)},${n(y)}`).join(" ")}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" opacity="${opacity}"/>`;
}

function polyline(points, stroke = C.blue, sw = 3, fill = "none", dash = "") {
  return `<polyline points="${points.map(([x, y]) => `${n(x)},${n(y)}`).join(" ")}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ""} stroke-linecap="round" stroke-linejoin="round"/>`;
}

function image(file, x, y, w, h, preserve = "xMidYMid slice", opacity = 1) {
  const data = fs.readFileSync(file).toString("base64");
  return `<image href="data:image/png;base64,${data}" x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" preserveAspectRatio="${preserve}" opacity="${opacity}"/>`;
}

function dotGrid(x, y, cols, rows, gap = 18, color = C.line, opacity = 0.7, r = 2.5) {
  const p = [];
  for (let i = 0; i < cols; i += 1) for (let j = 0; j < rows; j += 1) p.push(circle(x + i * gap, y + j * gap, r, color, "none", 1, opacity));
  return p.join("");
}

function circuit(x, y, scale = 1, color = C.line, opacity = 0.8) {
  return `<g opacity="${opacity}" fill="none" stroke="${color}" stroke-width="${2 * scale}">
    <path d="M${n(x)} ${n(y)}h${n(52 * scale)}v${n(32 * scale)}h${n(42 * scale)}"/>
    <circle cx="${n(x + 52 * scale)}" cy="${n(y)}" r="${n(5 * scale)}" fill="${C.white}"/>
    <circle cx="${n(x + 94 * scale)}" cy="${n(y + 32 * scale)}" r="${n(6 * scale)}" fill="${C.white}"/>
    <path d="M${n(x + 94 * scale)} ${n(y + 32 * scale)}v${n(24 * scale)}h${n(38 * scale)}"/>
  </g>`;
}

function arrowH(x1, y, x2, color = C.blue, sw = 4, dash = "") {
  return `${line(x1, y, x2 - 15, y, color, sw, dash)}${polygon([[x2 - 15, y - 8], [x2, y], [x2 - 15, y + 8]], color)}`;
}

function arrowDiag(x1, y1, x2, y2, color = C.blue, sw = 4, dash = "") {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const bx = x2 - 14 * Math.cos(ang);
  const by = y2 - 14 * Math.sin(ang);
  const p1 = [bx + 8 * Math.cos(ang + Math.PI / 2), by + 8 * Math.sin(ang + Math.PI / 2)];
  const p2 = [bx + 8 * Math.cos(ang - Math.PI / 2), by + 8 * Math.sin(ang - Math.PI / 2)];
  return `${line(x1, y1, bx, by, color, sw, dash)}${polygon([[x2, y2], p1, p2], color)}`;
}

function sectionHeader(parts, section, title, index, dark = false, subtitle = "") {
  const ink = dark ? C.white : C.navy;
  const muted = dark ? "#B9C7E5" : C.mid;
  const rule = dark ? "#45608F" : C.line;
  parts.push(t(72, 50, `AGENTIC MIGRATION PLATFORM  ·  ${section.toUpperCase()}`, 15, muted, 700, "start", "body", 1.4));
  parts.push(t(1525, 50, `${String(index).padStart(2, "0")} / 18`, 16, dark ? C.white : C.blue, 700, "end", "body", 1));
  parts.push(line(72, 72, 1528, 72, rule, 2));
  parts.push(t(72, 140, title, 52, ink, 700, "start", "sans", -1.2));
  if (subtitle) parts.push(t(74, 177, subtitle, 21, muted, 400, "start", "body"));
  parts.push(line(72, 200, 242, 200, dark ? C.cyan : C.blue, 5));
  parts.push(circle(258, 200, 7, dark ? C.orange : C.orange));
}

function footer(parts, dark = false, note = "Soutenance PFE  ·  migration gouvernée") {
  const ink = dark ? "#B9C7E5" : C.mid;
  const rule = dark ? "#45608F" : C.line;
  parts.push(line(72, 842, 1528, 842, rule, 1.5));
  parts.push(t(72, 872, note, 13, ink, 500, "start", "body", 0.2));
  parts.push(t(1528, 872, "Reasoning  ·  Control  ·  Evidence", 13, dark ? C.cyan : C.blue, 700, "end", "body", 0.4));
}

function label(parts, x, y, value, color = C.blue, fill = C.paleBlue, w = null) {
  const width = w || Math.max(92, value.length * 8.2 + 28);
  parts.push(rect(x, y - 22, width, 30, fill, "none", 1, 15));
  parts.push(t(x + width / 2, y - 2, value.toUpperCase(), 12, color, 700, "middle", "body", 1.1));
  return width;
}

function numBadge(parts, x, y, value, fill = C.blue, textColor = C.white, r = 23) {
  parts.push(circle(x, y, r, fill));
  parts.push(t(x, y + 7, value, 18, textColor, 700, "middle", "body"));
}

function lock(parts, x, y, color = C.mint, size = 28) {
  parts.push(rect(x, y + 8, size, size * 0.75, color, "none", 1, 5));
  parts.push(pathEl(`M${x + 6} ${y + 10}v-4a${size * 0.28} ${size * 0.28} 0 0 1 ${size * 0.56} 0v4`, color, 4, "none"));
  parts.push(circle(x + size / 2, y + size * 0.42, 3, C.white));
}

function check(parts, x, y, color = C.mint, size = 22) {
  parts.push(circle(x, y, size, color));
  parts.push(pathEl(`M${x - 9} ${y}l6 7 13-16`, C.white, 4, "none"));
}

function warn(parts, x, y, color = C.orange, size = 24) {
  parts.push(polygon([[x, y - size], [x + size, y + size], [x - size, y + size]], color));
  parts.push(t(x, y + 17, "!", 22, C.white, 700, "middle", "sans"));
}

function node(parts, x, y, r = 11, color = C.blue, fill = C.white) {
  parts.push(circle(x, y, r, fill, color, 3));
  parts.push(circle(x, y, 4, color));
}

function stage(parts, x, y, w, h, index, title, body, color = C.blue, bg = C.white) {
  parts.push(rect(x, y, w, h, bg, color, 2, 16, 1, "softShadow"));
  parts.push(rect(x, y, w, 44, color, "none", 1, 16));
  parts.push(rect(x, y + 28, w, 16, color, "none", 1, 0));
  parts.push(t(x + 20, y + 30, `${index}. ${title}`, 17, C.white, 700, "start", "sans"));
  if (Array.isArray(body)) parts.push(lines(x + 20, y + 78, body, 15, C.graphite, 400, 25, "body"));
  else parts.push(t(x + 20, y + 78, body, 15, C.graphite, 400, "start", "body"));
}

function emit(index, parts) {
  const file = path.join(OUT, `${String(index).padStart(2, "0")}.svg`);
  fs.writeFileSync(file, endSvg(parts), "utf8");
}

function slide01() {
  const p = [svgStart(C.paper)];
  p.push(image(HERO, 640, 0, 960, 900, "xMidYMid slice", 0.98));
  p.push(rect(0, 0, 920, 900, "url(#heroFade)", "none"));
  p.push(circuit(68, 86, 1.2, C.line, 0.7));
  p.push(t(78, 58, "AGENTIC MIGRATION PLATFORM  ·  SOUTENANCE PFE", 15, C.blue, 700, "start", "body", 1.6));
  p.push(t(1525, 58, "01 / 18", 16, C.blue, 700, "end", "body", 1));
  p.push(t(78, 230, "AGENTIC", 76, C.navy, 700, "start", "sans", -3));
  p.push(t(78, 308, "MIGRATION", 76, C.navy, 700, "start", "sans", -3));
  p.push(t(78, 386, "PLATFORM", 76, C.navy, 700, "start", "sans", -3));
  p.push(line(82, 432, 310, 432, C.blue, 6));
  p.push(circle(327, 432, 8, C.orange));
  p.push(t(82, 490, "Migration legacy gouvernée,", 28, C.navy2, 500, "start", "body"));
  p.push(t(82, 530, "traçable et vérifiable.", 28, C.navy2, 500, "start", "body"));
  p.push(t(82, 604, "Une Migration Factory gouvernée pour", 18, C.mid, 400, "start", "body"));
  p.push(t(82, 632, "Java / Spring Boot et Angular", 18, C.blue, 700, "start", "body"));
  p.push(rect(82, 706, 390, 54, C.white, C.line, 1.5, 27, 1, "softShadow"));
  p.push(circle(113, 733, 8, C.orange));
  p.push(t(136, 739, "PROPOSER  →  EXÉCUTER  →  PROUVER", 14, C.navy, 700, "start", "body", 1));
  p.push(polyline([[70, 823], [250, 823], [340, 760], [530, 760], [620, 704], [800, 704]], C.blue, 5));
  p.push(circle(70, 823, 9, C.white, C.blue, 4));
  p.push(circle(340, 760, 9, C.white, C.orange, 4));
  p.push(circle(620, 704, 9, C.white, C.mint, 4));
  p.push(t(78, 864, "Système de migration  ·  humains, agents, services déterministes, preuves", 13, C.mid, 500, "start", "body"));
  emit(1, p);
}

function slide02() {
  const p = [svgStart(C.paper)];
  sectionHeader(p, "roadmap", "Le chemin de la soutenance", 2, false, "Du problème opérationnel à la preuve d'une automatisation gouvernée");
  p.push(dotGrid(1320, 120, 10, 7, 20, C.line, 0.5, 2));
  const pts = [[140, 380], [360, 260], [585, 420], [815, 260], [1040, 420], [1270, 260], [1460, 380]];
  p.push(polyline(pts, C.blue, 8));
  pts.forEach(([x, y], i) => {
    const colors = [C.blue, C.cyan, C.blue, C.orange, C.blue, C.mint, C.orange];
    p.push(circle(x, y, 25, C.white, colors[i], 5));
    p.push(circle(x, y, 8, colors[i]));
    p.push(t(x, y + (i % 2 === 0 ? 72 : -52), String(i + 1).padStart(2, "0"), 16, colors[i], 700, "middle", "body"));
  });
  const names = ["Contexte", "Solution", "Architecture", "Réalisation", "Démo", "Résultats", "Conclusion"];
  pts.forEach(([x, y], i) => {
    const yy = y + (i % 2 === 0 ? 105 : -20);
    p.push(t(x, yy, names[i], 20, C.navy, 700, "middle", "sans"));
    p.push(t(x, yy + 25, ["Le déclencheur", "La Factory", "Le contrôle", "Les parcours", "La décision", "Les preuves", "Le principe"][i], 13, C.mid, 400, "middle", "body"));
  });
  p.push(rect(340, 650, 920, 72, C.navy, "none", 1, 36, 1, "shadow"));
  p.push(t(800, 695, "Un parcours qui relie intention  →  action  →  validation  →  preuve", 22, C.white, 600, "middle", "sans"));
  footer(p, false, "Plan de présentation  ·  7 chapitres  ·  18 slides");
  emit(2, p);
}

function slide03() {
  const p = [svgStart(C.paper)];
  sectionHeader(p, "contexte", "Le déclencheur : migrer sans interrompre", 3, false, "Un portefeuille legacy doit évoluer vers le cloud à grande échelle");
  p.push(image(JOURNEY, 720, 205, 880, 585, "xMidYMid slice", 0.90));
  p.push(rect(640, 205, 380, 585, "url(#heroFade)", "none"));
  p.push(t(80, 338, "2027", 132, C.blue, 700, "start", "sans", -5));
  p.push(t(86, 380, "cible cloud", 18, C.orange, 700, "start", "body", 1.2));
  p.push(t(82, 462, "Un grand client aérien", 24, C.navy, 700, "start", "sans"));
  p.push(t(82, 498, "doit faire évoluer un parc legacy", 22, C.navy2, 400, "start", "body"));
  p.push(t(82, 530, "vers le cloud — sans perdre la continuité.", 22, C.navy2, 400, "start", "body"));
  p.push(line(84, 600, 560, 600, C.blue, 4));
  p.push(t(84, 644, "LA QUESTION", 13, C.orange, 700, "start", "body", 1.4));
  p.push(t(84, 684, "Comment migrer à l'échelle", 25, C.navy, 700, "start", "sans"));
  p.push(t(84, 719, "sans perdre le contrôle ?", 25, C.navy, 700, "start", "sans"));
  p.push(rect(1130, 250, 330, 60, C.white, C.line, 1.5, 30, 0.92, "softShadow"));
  p.push(circle(1164, 280, 8, C.orange));
  p.push(t(1188, 286, "CONTINUITÉ DE SERVICE", 14, C.navy, 700, "start", "body", 1));
  footer(p, false, "Contexte  ·  point de départ du raisonnement");
  emit(3, p);
}

function slide04() {
  const p = [svgStart(C.paper)];
  sectionHeader(p, "contexte", "Une équipe. Deux horloges.", 4, false, "Maintenir la production et avancer la migration en parallèle");
  p.push(circle(800, 455, 240, C.white, C.line, 2, 1));
  p.push(circle(800, 455, 166, C.paleBlue, C.blue, 3, 1));
  p.push(circle(800, 455, 86, C.white, C.orange, 5, 1));
  p.push(t(800, 443, "UNE", 18, C.orange, 700, "middle", "body", 1.4));
  p.push(t(800, 472, "ÉQUIPE", 22, C.navy, 700, "middle", "sans", 0.3));
  p.push(pathEl("M800 455 L800 300", C.blue, 5));
  p.push(pathEl("M800 455 L924 525", C.orange, 5));
  p.push(circle(800, 300, 8, C.blue));
  p.push(circle(924, 525, 8, C.orange));
  p.push(t(800, 266, "RUN", 20, C.blue, 700, "middle", "sans", 1));
  p.push(t(800, 292, "incidents · optimisation · maintenance", 14, C.mid, 500, "middle", "body"));
  p.push(t(1030, 572, "MIGRATE", 20, C.orange, 700, "middle", "sans", 1));
  p.push(t(1030, 598, "analyse · transformer · prouver", 14, C.mid, 500, "middle", "body"));
  p.push(rect(92, 280, 300, 120, C.paleBlue, C.line, 2, 16));
  p.push(t(118, 321, "PRODUCTION", 16, C.blue, 700, "start", "body", 1.2));
  p.push(lines(118, 354, ["Disponibilité", "Fonctionnalités", "Incidents à traiter"], 16, C.navy, 500, 24, "body"));
  p.push(rect(1208, 280, 300, 120, C.paleOrange, C.orange, 2, 16));
  p.push(t(1234, 321, "MIGRATION", 16, C.orange, 700, "start", "body", 1.2));
  p.push(lines(1234, 354, ["Legacy à qualifier", "Décisions à tracer", "Preuves à relier"], 16, C.navy, 500, 24, "body"));
  p.push(arrowDiag(392, 342, 612, 418, C.blue, 3));
  p.push(arrowDiag(1208, 342, 988, 418, C.orange, 3));
  p.push(rect(285, 705, 1030, 70, C.navy, "none", 1, 35, 1, "shadow"));
  p.push(t(800, 748, "Quand le contexte est dispersé, le rework devient la troisième horloge.", 22, C.white, 600, "middle", "sans"));
  p.push(t(800, 818, "perte de contexte", 14, C.coral, 700, "middle", "body", 1));
  p.push(t(1020, 818, "décisions dispersées", 14, C.orange, 700, "middle", "body", 1));
  p.push(t(1240, 818, "preuves difficiles à relier", 14, C.blue, 700, "middle", "body", 1));
  footer(p, false, "Contexte  ·  la tension précède la solution");
  emit(4, p);
}

function slide05() {
  const p = [svgStart(C.paper)];
  sectionHeader(p, "solution", "Du prompt isolé à la Migration Factory", 5, false, "Capitaliser l'expertise ne suffit pas : il faut gouverner le parcours");
  p.push(dotGrid(70, 250, 7, 8, 18, C.line, 0.45, 2));
  const xs = [110, 470, 830];
  const widths = [280, 280, 510];
  const colors = [C.mid, C.blue, C.navy];
  const titles = ["Prompt individuel", "Pratique partagée", "Migration Factory"];
  const bodies = [["Un cas", "Une personne", "Une mémoire"], ["Règles", "Exemples", "Critères"], ["Agents bornés", "Services déterministes", "Gates humaines", "Preuves reliées"]];
  xs.forEach((x, i) => {
    const y = i === 0 ? 330 : i === 1 ? 290 : 230;
    p.push(rect(x, y, widths[i], 250 + (i === 2 ? 60 : 0), i === 2 ? C.navy : C.white, colors[i], i === 2 ? 3 : 2, 20, 1, "softShadow"));
    p.push(rect(x, y, widths[i], 60, colors[i], "none", 1, 20));
    p.push(t(x + 28, y + 39, titles[i], 21, C.white, 700, "start", "sans"));
    bodies[i].forEach((v, j) => {
      const yy = y + 100 + j * 38;
      p.push(circle(x + 32, yy - 6, 6, i === 2 ? C.orange : colors[i]));
      p.push(t(x + 54, yy, v, 17, i === 2 ? C.white : C.navy, 500, "start", "body"));
    });
  });
  p.push(arrowDiag(390, 445, 452, 420, C.blue, 5));
  p.push(arrowDiag(752, 420, 812, 380, C.blue, 5));
  p.push(rect(1060, 300, 350, 112, C.paleOrange, C.orange, 2, 18));
  p.push(t(1090, 338, "LE DÉPLACEMENT", 14, C.orange, 700, "start", "body", 1.2));
  p.push(lines(1090, 370, ["de produire des réponses", "à produire des décisions", "traçables"], 19, C.navy, 700, 25, "sans"));
  p.push(rect(110, 710, 1300, 76, C.white, C.line, 1.5, 38));
  p.push(t(146, 756, "PÉRIMÈTRE", 13, C.blue, 700, "start", "body", 1.2));
  p.push(label(p, 290, 750, "Réalisé", C.mint, C.paleMint, 112));
  p.push(t(430, 755, "Java / Spring Boot", 16, C.navy, 600, "start", "body"));
  p.push(label(p, 680, 750, "Partiel", C.orange, C.paleOrange, 98));
  p.push(t(802, 755, "Angular", 16, C.navy, 600, "start", "body"));
  p.push(label(p, 950, 750, "Vision cible", C.blue, C.paleBlue, 126));
  p.push(t(1102, 755, ".NET · PHP · Python · React · cloud", 16, C.navy, 600, "start", "body"));
  footer(p, false, "Solution  ·  la Factory organise l'automatisation");
  emit(5, p);
}

function slide06() {
  const p = [svgStart(C.paper)];
  sectionHeader(p, "architecture", "Une architecture qui sépare les responsabilités", 6, false, "Les agents proposent. Les services exécutent. L'humain autorise.");
  p.push(rect(100, 235, 1400, 500, C.white, C.line, 2, 22, 1, "shadow"));
  p.push(rect(140, 275, 1320, 82, C.paleBlue, C.blue, 2, 18));
  p.push(t(172, 306, "INTENTION", 13, C.blue, 700, "start", "body", 1.2));
  p.push(t(172, 339, "objectif · contexte · contraintes", 22, C.navy, 700, "start", "sans"));
  p.push(rect(140, 390, 1320, 120, C.white, C.line, 1.5, 18));
  p.push(t(172, 420, "ORCHESTRATION", 13, C.blue, 700, "start", "body", 1.2));
  p.push(t(172, 458, "LangGraph  ·  état métier", 20, C.navy, 600, "start", "body"));
  p.push(t(172, 482, "transitions bornées", 15, C.muted, 600, "start", "mono"));
  const ax = [470, 720, 970, 1220];
  ["Analyser", "Planifier", "Transformer", "Réparer"].forEach((v, i) => {
    p.push(rect(ax[i], 405, 190, 70, C.paleBlue, C.blue, 2, 14));
    p.push(circle(ax[i] + 30, 440, 9, C.blue));
    p.push(t(ax[i] + 55, 447, v, 18, C.navy, 700, "start", "sans"));
  });
  p.push(rect(140, 542, 470, 132, C.white, C.blue, 2, 18));
  p.push(t(170, 575, "SERVICES DÉTERMINISTES", 13, C.blue, 700, "start", "body", 1.2));
  p.push(lines(170, 618, ["diff · catalogue · build", "tests · checksum · preuve"], 19, C.navy, 600, 32, "body"));
  p.push(rect(660, 542, 430, 132, C.paleOrange, C.orange, 3, 18));
  p.push(t(690, 575, "GATE HUMAINE", 13, C.orange, 700, "start", "body", 1.2));
  p.push(t(690, 618, "approuver · modifier · rejeter", 20, C.navy, 700, "start", "sans"));
  p.push(t(690, 650, "aucune décision sensible sans contexte", 15, C.graphite, 500, "start", "body"));
  p.push(rect(1140, 542, 320, 132, C.paleMint, C.mint, 2, 18));
  p.push(t(1170, 575, "ÉTAT + PREUVE", 13, C.mint, 700, "start", "body", 1.2));
  p.push(lines(1170, 618, ["artefact · historique", "revalidation · scellement"], 18, C.navy, 600, 32, "body"));
  p.push(arrowDiag(800, 510, 800, 538, C.orange, 4));
  p.push(arrowDiag(610, 608, 655, 608, C.blue, 4));
  p.push(arrowDiag(1095, 608, 1135, 608, C.mint, 4));
  p.push(rect(470, 770, 660, 52, C.navy, "none", 1, 26));
  p.push(t(800, 803, "Le système garde l'autorité là où le risque existe.", 19, C.white, 600, "middle", "sans"));
  footer(p, false, "Architecture  ·  une boucle de responsabilité, pas une boîte noire");
  emit(6, p);
}

function slide07() {
  const p = [svgStart(C.paper)];
  sectionHeader(p, "architecture", "Deux toolchains. Un contrat de gouvernance.", 7, false, "Java et Angular restent distincts, mais parlent le même langage de contrôle");
  p.push(rect(90, 245, 580, 500, C.paleBlue, C.blue, 2, 22));
  p.push(rect(930, 245, 580, 500, C.paleMint, C.mint, 2, 22));
  p.push(t(132, 302, "JAVA / SPRING BOOT", 25, C.blue, 700, "start", "sans", 0.7));
  p.push(t(972, 302, "ANGULAR", 25, C.mint, 700, "start", "sans", 0.7));
  p.push(t(132, 334, "Référence la plus mature", 16, C.mid, 500, "start", "body"));
  p.push(t(972, 334, "Transférabilité progressive", 16, C.mid, 500, "start", "body"));
  const java = [[170, 440, "JDK", "11 · 17 · 21"], [340, 440, "Maven", "build · test"], [510, 440, "OpenRewrite", "diff structuré"]];
  const ang = [[1010, 440, "Node.js", "versions"], [1180, 440, "npm / CLI", "install · build"], [1350, 440, "TypeScript", "RxJS · checks"]];
  java.forEach(([x, y, title, body], i) => {
    p.push(rect(x - 65, y - 42, 130, 100, C.white, C.blue, 2, 16));
    p.push(circle(x, y - 16, 14, C.blue));
    p.push(t(x, y - 10, String(i + 1), 14, C.white, 700, "middle", "body"));
    p.push(t(x, y + 26, title, 17, C.navy, 700, "middle", "sans"));
    p.push(t(x, y + 49, body, 12, C.mid, 600, "middle", "body"));
  });
  ang.forEach(([x, y, title, body], i) => {
    p.push(rect(x - 65, y - 42, 130, 100, C.white, C.mint, 2, 16));
    p.push(circle(x, y - 16, 14, C.mint));
    p.push(t(x, y - 10, String(i + 1), 14, C.white, 700, "middle", "body"));
    p.push(t(x, y + 26, title, 17, C.navy, 700, "middle", "sans"));
    p.push(t(x, y + 49, body, 12, C.mid, 600, "middle", "body"));
  });
  p.push(arrowH(236, 424, 274, C.blue, 4)); p.push(arrowH(406, 424, 444, C.blue, 4));
  p.push(arrowH(1076, 424, 1114, C.mint, 4)); p.push(arrowH(1246, 424, 1284, C.mint, 4));
  p.push(rect(545, 570, 510, 105, C.navy, "none", 1, 18, 1, "shadow"));
  p.push(t(800, 610, "CONTRATS DE GOUVERNANCE", 16, C.white, 700, "middle", "body", 1.4));
  p.push(t(800, 649, "état · gate · preuve · checksum", 22, C.white, 600, "middle", "sans"));
  p.push(arrowDiag(380, 498, 600, 570, C.blue, 4)); p.push(arrowDiag(1220, 498, 1000, 570, C.mint, 4));
  p.push(t(800, 726, "même contrôle  ·  exécution spécifique", 14, C.orange, 700, "middle", "body", 1.2));
  footer(p, false, "Architecture  ·  la gouvernance reste commune, la technique reste honnête");
  emit(7, p);
}

function slide08() {
  const p = [svgStart(C.paper)];
  sectionHeader(p, "architecture", "Le workflow complet : avancer par preuves", 8, false, "Chaque transition critique laisse un état, un gate et une trace");
  p.push(rect(80, 280, 1440, 300, C.white, C.line, 2, 24, 1, "shadow"));
  const xs = [135, 340, 545, 750, 955, 1160, 1365];
  const names = ["Qualifier", "Analyser", "Planifier", "Transformer", "Valider", "Réparer", "Sceller"];
  const verbs = ["profil", "constat", "plan", "diff", "checks", "contexte", "preuve"];
  const colors = [C.blue, C.blue, C.blue, C.blue, C.orange, C.coral, C.mint];
  p.push(polyline(xs.map((x) => [x, 425]), C.line, 10));
  xs.forEach((x, i) => {
    p.push(circle(x, 425, 34, C.white, colors[i], 5));
    p.push(circle(x, 425, 11, colors[i]));
    p.push(t(x, 502, names[i], 18, C.navy, 700, "middle", "sans"));
    p.push(t(x, 528, verbs[i], 13, C.mid, 500, "middle", "body", 0.2));
    if ([4, 5, 6].includes(i)) {
      const ic = i === 4 ? "GATE" : i === 5 ? "BOUNDED" : "SEALED";
      const fill = i === 4 ? C.paleOrange : i === 5 ? C.paleCoral : C.paleMint;
      const cc = i === 4 ? C.orange : i === 5 ? C.coral : C.mint;
      p.push(rect(x - 42, 318, 84, 28, fill, "none", 1, 14));
      p.push(t(x, 338, ic, 11, cc, 700, "middle", "body", 1));
    }
  });
  p.push(t(118, 330, "ÉTAT", 12, C.mid, 700, "start", "body", 1.3));
  p.push(t(118, 357, "→", 28, C.blue, 700, "start", "sans"));
  p.push(t(1330, 330, "PREUVE", 12, C.mint, 700, "start", "body", 1.3));
  p.push(check(p, 1440, 354, C.mint, 14));
  p.push(rect(192, 650, 1215, 82, C.paleBlue, C.blue, 1.5, 41));
  p.push(t(800, 682, "Aucune étape ne saute directement de l'intention à la production.", 21, C.navy, 700, "middle", "sans"));
  p.push(t(800, 711, "La progression se fait par artefacts, décisions et revalidation.", 16, C.mid, 500, "middle", "body"));
  footer(p, false, "Architecture  ·  un parcours visible en moins de dix secondes");
  emit(8, p);
}

function slide09() {
  const p = [svgStart(C.paper)];
  sectionHeader(p, "réalisation", "Axe 1 — Java / Spring Boot", 9, false, "Le parcours de référence le plus mature");
  p.push(rect(1070, 245, 410, 455, C.navy, "none", 1, 22, 1, "shadow"));
  p.push(t(1110, 302, "RÉFÉRENCE", 14, C.orange, 700, "start", "body", 1.4));
  p.push(t(1110, 352, "Java / Spring Boot", 30, C.white, 700, "start", "sans"));
  p.push(lines(1110, 405, ["trajectoire structurée", "toolchain explicite", "preuves revalidables"], 20, "#D8E5FF", 500, 34, "body"));
  p.push(line(1110, 542, 1430, 542, "#45608F", 1.5));
  p.push(t(1110, 585, "Maven", 17, C.cyan, 700, "start", "body", 1));
  p.push(t(1230, 585, "OpenRewrite", 17, C.cyan, 700, "start", "body", 1));
  p.push(t(1110, 640, "Java 11  ·  17  ·  21", 18, C.white, 600, "start", "sans"));
  p.push(t(1110, 675, "Réalisation / partiel selon scénario", 13, "#B9C7E5", 500, "start", "body"));
  p.push(t(120, 290, "UPGRADE RUNWAY", 13, C.blue, 700, "start", "body", 1.4));
  p.push(polyline([[140, 625], [320, 590], [500, 548], [680, 492], [860, 420]], C.blue, 12));
  p.push(polyline([[140, 655], [320, 620], [500, 578], [680, 522], [860, 450]], C.line, 3, "none", "8 12"));
  const milestones = [[180, 618, "2.1", "Java 11", C.blue], [390, 576, "2.7", "Java 17", C.blue], [600, 516, "3.5", "Java 17/21", C.cyan], [815, 442, "4.0", "Java 21", C.orange]];
  milestones.forEach(([x, y, v, j, color], i) => {
    p.push(circle(x, y, 30, C.white, color, 5));
    p.push(circle(x, y, 9, color));
    p.push(t(x, y - 62, `0${i + 1}`, 12, color, 700, "middle", "body", 1));
    p.push(t(x, y + 72, `Spring Boot ${v}`, 18, C.navy, 700, "middle", "sans"));
    p.push(t(x, y + 98, j, 14, C.mid, 500, "middle", "body"));
  });
  p.push(rect(150, 720, 800, 48, C.paleBlue, C.line, 1.5, 24));
  p.push(t(550, 751, "Réaliser le changement sans perdre l'état ni la preuve", 17, C.navy, 700, "middle", "body"));
  footer(p, false, "Réalisation  ·  Java comme chemin de référence");
  emit(9, p);
}

function slide10() {
  const p = [svgStart(C.paper)];
  sectionHeader(p, "réalisation", "Axe 2 — Angular", 10, false, "Le modèle est transférable, la couverture reste progressive");
  p.push(rect(1090, 245, 390, 440, C.paleOrange, C.orange, 2, 22));
  p.push(t(1130, 300, "FRONTIÈRE HONNÊTE", 13, C.orange, 700, "start", "body", 1.4));
  p.push(t(1130, 350, "Pas de 11 → 21", 31, C.navy, 700, "start", "sans"));
  p.push(t(1130, 386, "réalisé.", 31, C.navy, 700, "start", "sans"));
  p.push(line(1130, 430, 1435, 430, C.orange, 3));
  p.push(lines(1130, 480, ["18 → 19  scellée", "19 → 20  scellée", "20 → 21  préparée", "                  non démarrée"], 18, C.navy, 600, 34, "body"));
  p.push(t(1130, 625, "Couverture partielle", 16, C.orange, 700, "start", "body", 0.8));
  p.push(t(1130, 655, "présentée comme telle", 16, C.navy, 500, "start", "body"));
  p.push(t(120, 292, "PROOF STAIRCASE", 13, C.mint, 700, "start", "body", 1.4));
  const steps = [
    {x:170, y:580, w:230, h:120, v:"18 → 19", s:"SCELLÉE", c:C.mint, bg:C.paleMint, lock:true},
    {x:445, y:505, w:230, h:195, v:"19 → 20", s:"SCELLÉE", c:C.mint, bg:C.paleMint, lock:true},
    {x:720, y:430, w:230, h:270, v:"20 → 21", s:"PRÉPARÉE", c:C.orange, bg:C.paleOrange, lock:false},
  ];
  steps.forEach((s) => {
    p.push(rect(s.x, s.y, s.w, s.h, s.bg, s.c, 2.5, 18, 1, "softShadow"));
    p.push(t(s.x + 28, s.y + 46, s.v, 25, C.navy, 700, "start", "sans"));
    p.push(t(s.x + 28, s.y + 78, s.s, 13, s.c, 700, "start", "body", 1.2));
    if (s.lock) lock(p, s.x + s.w - 62, s.y + 28, s.c, 28); else warn(p, s.x + s.w - 46, s.y + 46, s.c, 16);
    p.push(line(s.x + 28, s.y + 98, s.x + s.w - 28, s.y + 98, s.c, 1.5, s.lock ? "" : "8 8"));
    p.push(t(s.x + 28, s.y + s.h - 24, s.lock ? "preuve disponible" : "non démarrée", 14, C.mid, 500, "start", "body"));
  });
  p.push(arrowH(402, 625, 438, C.mint, 4)); p.push(arrowH(677, 548, 713, C.mint, 4));
  footer(p, false, "Réalisation  ·  transférer le modèle sans surpromettre la couverture");
  emit(10, p);
}

function slide11() {
  const p = [svgStart(C.paper)];
  sectionHeader(p, "réalisation", "Les agents proposent. Le système garde la frontière.", 11, false, "Spécialisation autour d'un orchestrateur, autorité finale côté humain");
  p.push(circle(690, 490, 220, "none", C.orange, 3, 0.8));
  p.push(circle(690, 490, 166, C.white, C.blue, 2, 1));
  p.push(circle(690, 490, 86, C.navy));
  p.push(t(690, 482, "ORCHESTRATEUR", 15, C.white, 700, "middle", "body", 1));
  p.push(t(690, 510, "état · route · gate", 14, "#B9C7E5", 500, "middle", "body"));
  const orbit = [[690, 236, "Analyser", C.blue], [942, 330, "Reviewer", C.cyan], [972, 575, "Planifier", C.blue], [690, 742, "Transformer", C.blue], [405, 575, "Réparer", C.coral], [438, 330, "Assistant", C.mint]];
  orbit.forEach(([x, y, name, color]) => {
    p.push(line(690, 490, x, y, C.line, 2, "6 8"));
    p.push(circle(x, y, 46, C.white, color, 4, 1, "softShadow"));
    p.push(circle(x, y, 10, color));
    p.push(t(x, y + 78, name, 17, C.navy, 700, "middle", "sans"));
    p.push(t(x, y + 101, "rôle borné", 12, C.mid, 500, "middle", "body"));
  });
  p.push(rect(1125, 330, 330, 300, C.paleOrange, C.orange, 2.5, 22));
  p.push(t(1160, 383, "AUTORITÉ HUMAINE", 14, C.orange, 700, "start", "body", 1.3));
  p.push(t(1160, 435, "Décider", 34, C.navy, 700, "start", "sans"));
  p.push(lines(1160, 490, ["approuver", "modifier", "rejeter", "expliquer"], 21, C.navy2, 600, 34, "body"));
  p.push(line(1160, 620, 1418, 620, C.orange, 2));
  p.push(t(1160, 655, "pas de terminal libre", 15, C.orange, 700, "start", "body"));
  p.push(t(1160, 680, "pas d'accès fichier implicite", 15, C.navy, 600, "start", "body"));
  p.push(rect(240, 814, 920, 42, C.navy, "none", 1, 21));
  p.push(t(700, 842, "Agents spécialisés  ·  services déterministes  ·  humain responsable", 15, C.white, 600, "middle", "body", 0.2));
  footer(p, false, "Réalisation  ·  la spécialisation accélère, la frontière protège");
  emit(11, p);
}

function slide12() {
  const p = [svgStart(C.paper)];
  sectionHeader(p, "réalisation", "Réparer sans perdre la preuve", 12, false, "Un échec est gelé, contextualisé, revu, puis revalidé");
  p.push(circle(725, 480, 225, "none", C.line, 12));
  p.push(pathEl("M725 255 A225 225 0 0 1 945 480", C.blue, 12));
  p.push(pathEl("M945 480 A225 225 0 0 1 725 705", C.orange, 12));
  p.push(pathEl("M725 705 A225 225 0 0 1 500 480", C.mint, 12));
  p.push(pathEl("M500 480 A225 225 0 0 1 725 255", C.coral, 12));
  const pts = [[725, 255, "ÉCHEC", C.coral], [945, 480, "CONTEXTE", C.blue], [725, 705, "REVALIDER", C.mint], [500, 480, "PROPOSITION", C.orange]];
  pts.forEach(([x, y, name, color]) => {
    p.push(circle(x, y, 31, C.white, color, 5));
    p.push(circle(x, y, 9, color));
    p.push(t(x, y + (y === 705 ? 64 : y === 255 ? -56 : y === 480 && x < 600 ? 8 : 8), name, 14, color, 700, "middle", "body", 1));
  });
  p.push(circle(725, 480, 92, C.navy));
  p.push(t(725, 466, "GATE", 16, C.orange, 700, "middle", "body", 1.5));
  p.push(t(725, 501, "HUMAIN", 28, C.white, 700, "middle", "sans"));
  p.push(t(725, 533, "approve · modify · reject", 13, "#B9C7E5", 500, "middle", "body"));
  p.push(rect(1110, 300, 350, 100, C.paleBlue, C.blue, 2, 18));
  p.push(t(1142, 340, "CHECKSUM", 13, C.blue, 700, "start", "body", 1.2));
  p.push(t(1142, 375, "même artefact · même état", 18, C.navy, 700, "start", "sans"));
  p.push(rect(1110, 450, 350, 100, C.paleMint, C.mint, 2, 18));
  p.push(t(1142, 490, "PREUVE", 13, C.mint, 700, "start", "body", 1.2));
  p.push(t(1142, 525, "build · test · trace", 18, C.navy, 700, "start", "sans"));
  p.push(rect(1110, 600, 350, 100, C.paleOrange, C.orange, 2, 18));
  p.push(t(1142, 640, "TENTATIVE BORNÉE", 13, C.orange, 700, "start", "body", 1.2));
  p.push(t(1142, 675, "pas de retry aveugle", 18, C.navy, 700, "start", "sans"));
  footer(p, false, "Réalisation  ·  le contrôle de la réparation est le produit");
  emit(12, p);
}

function slide13() {
  const p = [svgStart(C.navy)];
  sectionHeader(p, "démo", "Démo — scénario utilisateur", 13, true, "Inspecter la proposition, vérifier la preuve, décider");
  p.push(rect(84, 230, 450, 520, "#162B5D", "#45608F", 1.5, 22));
  p.push(t(120, 286, "SCÉNARIO LOCAL", 14, C.cyan, 700, "start", "body", 1.4));
  p.push(t(120, 345, "G10", 86, C.white, 700, "start", "sans", -4));
  p.push(t(120, 390, "réparation Angular", 24, C.white, 600, "start", "sans"));
  const steps = [[1, "Inspecter", "le contexte", C.blue], [2, "Vérifier", "la proposition", C.mint], [3, "Décider", "la suite", C.orange]];
  steps.forEach(([i, a, b, color], j) => {
    const y = 482 + j * 78;
    numBadge(p, 138, y, i, color, C.white, 20);
    p.push(t(180, y - 4, a, 20, C.white, 700, "start", "sans"));
    p.push(t(180, y + 22, b, 15, "#B9C7E5", 500, "start", "body"));
    if (j < 2) p.push(line(138, y + 28, 138, y + 60, "#45608F", 2));
  });
  p.push(t(120, 704, "Démo locale — scénario anonymisé, états préparés", 13, C.orange, 700, "start", "body"));
  p.push(rect(600, 235, 880, 515, C.white, C.cyan, 3, 20, 1, "shadow"));
  p.push(image(DEMO, 622, 257, 836, 470, "xMidYMid contain", 1));
  p.push(circle(1078, 278, 16, C.orange));
  p.push(t(1078, 284, "1", 13, C.white, 700, "middle", "body"));
  p.push(line(1094, 278, 1235, 250, C.orange, 3));
  p.push(rect(1235, 232, 205, 38, C.paleOrange, C.orange, 1, 19));
  p.push(t(1337, 257, "contexte", 13, C.navy, 700, "middle", "body"));
  p.push(circle(1292, 691, 16, C.mint));
  p.push(t(1292, 697, "2", 13, C.white, 700, "middle", "body"));
  p.push(line(1307, 691, 1435, 714, C.mint, 3));
  p.push(rect(1150, 714, 290, 38, C.paleMint, C.mint, 1, 19));
  p.push(t(1295, 739, "preuve préparée", 13, C.navy, 700, "middle", "body"));
  footer(p, true, "Démo  ·  l'utilisateur reste dans la boucle");
  emit(13, p);
}

function slide14() {
  const p = [svgStart(C.paper)];
  sectionHeader(p, "résultats", "Les preuves montrent le contrôle", 14, false, "Traçabilité, validation et revalidation — pas un benchmark global");
  p.push(rect(90, 250, 1420, 470, C.white, C.line, 2, 24, 1, "shadow"));
  const cols = [160, 620, 1080];
  const big = ["607", "4", "12 → 11"];
  const colors = [C.blue, C.orange, C.mint];
  const fills = [C.paleBlue, C.paleOrange, C.paleMint];
  const titles = ["tests backend réussis", "tests ignorés", "échecs frontend après intégration"];
  const subs = ["campagne Java", "même campagne", "baseline 12 → 11"];
  cols.forEach((x, i) => {
    p.push(rect(x, 305, 350, 320, fills[i], colors[i], 2, 18));
    p.push(t(x + 32, 405, big[i], 76, colors[i], 700, "start", "sans", -2));
    p.push(t(x + 34, 461, titles[i], 18, C.navy, 700, "start", "sans"));
    p.push(t(x + 34, 496, subs[i], 15, C.mid, 500, "start", "body"));
    p.push(line(x + 34, 540, x + 316, 540, colors[i], 2));
    if (i === 0) { check(p, x + 52, 580, colors[i], 15); p.push(t(x + 82, 586, "preuve ponctuelle", 15, C.navy2, 600, "start", "body")); }
    if (i === 1) { warn(p, x + 52, 580, colors[i], 15); p.push(t(x + 82, 586, "périmètre explicite", 15, C.navy2, 600, "start", "body")); }
    if (i === 2) { check(p, x + 52, 580, colors[i], 15); p.push(t(x + 82, 586, "après intégration", 15, C.navy2, 600, "start", "body")); }
  });
  p.push(rect(300, 758, 1000, 52, C.navy, "none", 1, 26));
  p.push(t(800, 791, "18 → 19  scellée     ·     19 → 20  scellée     ·     20 → 21  préparée", 16, C.white, 600, "middle", "body"));
  footer(p, false, "Résultats  ·  preuves ponctuelles  ·  non benchmarkées");
  emit(14, p);
}

function slide15() {
  const p = [svgStart(C.paper)];
  sectionHeader(p, "résultats", "Des difficultés aux invariants", 15, false, "Chaque incident a renforcé un contrat d'architecture");
  p.push(t(130, 260, "CONTRAINTE", 14, C.coral, 700, "start", "body", 1.5));
  p.push(t(1230, 260, "INVARIANT", 14, C.mint, 700, "start", "body", 1.5));
  p.push(line(130, 280, 1470, 280, C.line, 2));
  const rows = [
    ["Patch non applicable", "diff structuré + validation", C.coral, C.blue],
    ["Autorité de commande ambiguë", "manifeste backend", C.orange, C.blue],
    ["Profil Angular incompatible", "catalogue versionné", C.orange, C.mint],
    ["Incohérence SQLite", "base autoritaire réconciliée", C.coral, C.mint],
  ];
  rows.forEach(([a, b, ca, cb], i) => {
    const y = 345 + i * 104;
    p.push(circle(160, y, 16, ca));
    p.push(t(160, y + 6, "!", 15, C.white, 700, "middle", "sans"));
    p.push(t(205, y + 6, a, 22, C.navy, 700, "start", "sans"));
    p.push(line(610, y, 950, y, C.line, 3));
    p.push(polygon([[945, y - 9], [968, y], [945, y + 9]], C.line));
    p.push(circle(1010, y, 16, cb));
    p.push(pathEl(`M1002 ${y}l6 7 12-15`, C.white, 3, "none"));
    p.push(t(1055, y + 6, b, 22, C.navy, 700, "start", "sans"));
    p.push(line(130, y + 54, 1470, y + 54, C.grey, 1));
  });
  p.push(rect(330, 785, 940, 48, C.paleBlue, C.blue, 1.5, 24));
  p.push(t(800, 816, "La robustesse vient des frontières explicites, pas d'une promesse d'autonomie.", 16, C.navy, 700, "middle", "body"));
  footer(p, false, "Résultats  ·  apprendre du problème pour durcir le système");
  emit(15, p);
}

function slide16() {
  const p = [svgStart(C.paper)];
  sectionHeader(p, "résultats", "Le prototype est gouverné. L'industrialisation reste à construire.", 16, false, "Séparer ce qui est livré de ce qui doit encore être mesuré ou sécurisé");
  p.push(line(170, 640, 1430, 360, C.line, 8));
  p.push(polyline([[170, 640], [420, 584], [690, 520], [930, 450], [1180, 392], [1430, 360]], C.orange, 5, "none", "10 12"));
  const points = [[210, 632, "MAINTENANT", C.blue], [720, 512, "PROCHAIN", C.orange], [1400, 366, "VISION", C.mint]];
  points.forEach(([x, y, name, color]) => { p.push(circle(x, y, 24, C.white, color, 5)); p.push(circle(x, y, 8, color)); p.push(t(x, y + 60, name, 14, color, 700, "middle", "body", 1.2)); });
  p.push(rect(90, 280, 440, 330, C.white, C.blue, 2, 20, 1, "softShadow"));
  p.push(t(126, 330, "LIMITES ACTUELLES", 14, C.blue, 700, "start", "body", 1.4));
  const lim = ["authentification / rôles", "benchmark manuel contrôlé", "CI commune", "couverture Angular", "coûts / durées LLM"];
  lim.forEach((v, i) => { warn(p, 144, 382 + i * 42, C.blue, 10); p.push(t(175, 389 + i * 42, v, 17, C.navy, 600, "start", "body")); });
  p.push(rect(1115, 210, 380, 330, C.paleOrange, C.orange, 2, 20, 1, "softShadow"));
  p.push(t(1150, 260, "ÉTAPES SUIVANTES", 14, C.orange, 700, "start", "body", 1.4));
  const nxt = ["sécurité industrialisée", "corpus de benchmark", "instrumentation coût / durée", "extension Angular", "nouveaux écosystèmes"];
  nxt.forEach((v, i) => { p.push(circle(1170, 312 + i * 42, 9, C.orange)); p.push(t(1200, 318 + i * 42, v, 17, C.navy, 600, "start", "body")); });
  p.push(t(800, 735, "Les limites ne sont pas un échec : elles rendent la prochaine décision lisible.", 22, C.navy, 700, "middle", "sans"));
  footer(p, false, "Résultats  ·  transparence sur la frontière actuelle");
  emit(16, p);
}

function slide17() {
  const p = [svgStart(C.navy)];
  p.push(dotGrid(1300, 115, 12, 10, 22, "#45608F", 0.55, 2.4));
  p.push(circuit(70, 100, 1.4, "#45608F", 0.8));
  p.push(t(78, 58, "AGENTIC MIGRATION PLATFORM  ·  CONCLUSION", 15, "#B9C7E5", 700, "start", "body", 1.6));
  p.push(t(1525, 58, "17 / 18", 16, C.white, 700, "end", "body", 1));
  p.push(t(78, 230, "Une migration agentique", 54, C.white, 700, "start", "sans", -1.5));
  p.push(t(78, 292, "n'est pas une autonomie totale.", 54, C.white, 700, "start", "sans", -1.5));
  p.push(line(84, 350, 365, 350, C.cyan, 6)); p.push(circle(382, 350, 8, C.orange));
  p.push(t(84, 410, "C'est un chemin où chaque décision", 25, "#D8E5FF", 500, "start", "body"));
  p.push(t(84, 448, "reste gouvernée, traçable et revalidable.", 25, "#D8E5FF", 500, "start", "body"));
  const xs = [250, 800, 1350];
  const cols = [C.cyan, C.blue, C.orange];
  const heads = ["AGENTS", "SERVICES", "HUMAIN"];
  const sub = ["raisonnent · proposent", "exécutent · vérifient", "décide · assume"];
  p.push(polyline([[250, 650], [800, 650], [1350, 650]], "#45608F", 4));
  xs.forEach((x, i) => { p.push(circle(x, 650, 52, C.navy, cols[i], 4)); p.push(circle(x, 650, 12, cols[i])); p.push(t(x, 746, heads[i], 18, cols[i], 700, "middle", "body", 1.4)); p.push(t(x, 777, sub[i], 16, "#B9C7E5", 500, "middle", "body")); });
  p.push(arrowH(315, 650, 735, cols[0], 3)); p.push(arrowH(865, 650, 1285, cols[1], 3));
  p.push(rect(445, 830, 710, 40, "#162B5D", "#45608F", 1, 20));
  p.push(t(800, 856, "Gouverner l'automatisation, pas promettre la magie.", 16, C.white, 700, "middle", "body"));
  footer(p, true, "Conclusion  ·  Agentic Migration Platform");
  emit(17, p);
}

function slide18() {
  const p = [svgStart(C.paper)];
  p.push(circuit(70, 100, 1.4, C.line, 0.65));
  p.push(dotGrid(1300, 145, 11, 7, 22, C.line, 0.48, 2.3));
  p.push(t(78, 58, "AGENTIC MIGRATION PLATFORM  ·  DISCUSSION", 15, C.blue, 700, "start", "body", 1.6));
  p.push(t(1525, 58, "18 / 18", 16, C.blue, 700, "end", "body", 1));
  p.push(t(78, 260, "Questions", 80, C.navy, 700, "start", "sans", -3));
  p.push(t(78, 340, "/ Discussion", 80, C.navy, 700, "start", "sans", -3));
  p.push(line(84, 392, 330, 392, C.orange, 6)); p.push(circle(348, 392, 8, C.blue));
  p.push(t(84, 470, "Architecture · preuves · limites assumées", 24, C.navy2, 500, "start", "body"));
  p.push(pathEl("M720 600 C890 490 1040 680 1205 555 C1305 480 1375 520 1500 430", C.blue, 5, "none"));
  p.push(circle(720, 600, 12, C.white, C.blue, 4));
  p.push(circle(1205, 555, 12, C.white, C.orange, 4));
  p.push(circle(1500, 430, 12, C.white, C.mint, 4));
  p.push(t(720, 650, "REASONING", 14, C.blue, 700, "middle", "body", 1.2));
  p.push(t(1205, 605, "CONTROL", 14, C.orange, 700, "middle", "body", 1.2));
  p.push(t(1500, 480, "EVIDENCE", 14, C.mint, 700, "middle", "body", 1.2));
  p.push(rect(84, 735, 230, 48, C.navy, "none", 1, 24));
  p.push(t(199, 766, "Merci", 19, C.white, 700, "middle", "sans"));
  footer(p, false, "Échange  ·  Agentic Migration Platform");
  emit(18, p);
}

slide01();
slide02();
slide03();
slide04();
slide05();
slide06();
slide07();
slide08();
slide09();
slide10();
slide11();
slide12();
slide13();
slide14();
slide15();
slide16();
slide17();
slide18();

console.log(`Generated 18 APM-inspired SVG slides in ${OUT}`);

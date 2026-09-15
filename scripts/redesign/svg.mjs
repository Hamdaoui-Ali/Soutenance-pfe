import { Buffer } from "node:buffer";

export function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function svgDocument(content, width = 640, height = 360) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${content}</svg>`;
}

export function svgLine(x1, y1, x2, y2, stroke, width = 2, dash = "") {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#${stroke}" stroke-width="${width}"${dash ? ` stroke-dasharray="${dash}"` : ""} />`;
}

export function svgCircle(cx, cy, r, fill = "none", stroke = "FFFFFF", width = 2) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill === "none" ? "none" : `#${fill}`}" stroke="#${stroke}" stroke-width="${width}" />`;
}

export function svgDataUri(svg) {
  return `data:image/svg+xml;base64,${Buffer.from(svg, "utf8").toString("base64")}`;
}

// Small identity mark used on the cover and close. It encodes the same
// state → gate → evidence route shown by the native diagrams.
export function routeMark({ width = 640, height = 360, colors } = {}) {
  const c = colors ?? { line: "344653", one: "68D6E8", two: "4E9DFF", three: "41D3AE", four: "F4B84A" };
  const points = [
    [92, 76, c.one],
    [226, 152, c.two],
    [360, 228, c.four],
    [494, 304, c.three],
  ];
  let content = "";
  content += svgLine(60, 58, 526, 322, c.line, 2, "7 9");
  for (let index = 0; index < points.length - 1; index += 1) {
    const [x1, y1] = points[index];
    const [x2, y2] = points[index + 1];
    content += svgLine(x1 + 20, y1 + 20, x2 - 20, y2 - 20, points[index + 1][2], 3);
  }
  for (const [x, y, color] of points) {
    content += svgCircle(x, y, 28, "0B1117", color, 3);
    content += svgCircle(x, y, 8, color, color, 1);
  }
  return svgDataUri(svgDocument(content, width, height));
}

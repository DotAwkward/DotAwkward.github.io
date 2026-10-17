// Turns the "d●t awkward" wordmark into plain SVG shapes, so the logo needs no font.
const opentype = require("opentype.js");
const fs = require("fs");
const path = require("path");
const font = opentype.loadSync(path.join(__dirname, "bricolage-800.ttf"));
const out = process.argv[2];
const CORAL = "#FF5D3A";
const SIZE = 100;            // font size in SVG units
const TRACK = -0.03 * SIZE;  // letter spacing
const DOT = 0.52 * SIZE;     // dot diameter, same as the guide
const DROP = 0.04 * SIZE;    // how far the dot sits below the baseline
const GAP = 0.03 * SIZE;     // space either side of the dot
const scale = SIZE / font.unitsPerEm;

function layout(text, startX, baseline) {
  // Returns path data for a run of letters and where the run ends.
  let x = startX, d = "", box = null;
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    const p = g.getPath(x, baseline, SIZE);
    d += p.toPathData(2);
    const b = p.getBoundingBox();
    if (isFinite(b.x1)) box = box ? { x1: Math.min(box.x1, b.x1), y1: Math.min(box.y1, b.y1), x2: Math.max(box.x2, b.x2), y2: Math.max(box.y2, b.y2) } : b;
    x += g.advanceWidth * scale + TRACK;
  }
  return { d, end: x, box };
}

function wordmark() {
  const base = 0;
  const left = layout("d", 0, base);
  const cx = left.end + GAP + DOT / 2;
  const cy = base + DROP - DOT / 2;
  const right = layout("t awkward", cx + DOT / 2 + GAP, base);
  const x1 = Math.min(left.box.x1, right.box.x1), x2 = right.box.x2;
  const y1 = Math.min(left.box.y1, right.box.y1, cy - DOT / 2), y2 = Math.max(left.box.y2, right.box.y2, cy + DOT / 2);
  const pad = 2;
  const vb = [x1 - pad, y1 - pad, x2 - x1 + 2 * pad, y2 - y1 + 2 * pad].map(n => +n.toFixed(2));
  return { letters: left.d + right.d, cx, cy, vb };
}

function mark() {
  // The small mark: just "d" and its dot.
  const left = layout("d", 0, 0);
  const cx = left.end + GAP + DOT / 2, cy = DROP - DOT / 2;
  const x1 = left.box.x1, x2 = cx + DOT / 2, y1 = left.box.y1, y2 = Math.max(left.box.y2, cy + DOT / 2);
  const pad = 2;
  return { letters: left.d, cx, cy, vb: [x1 - pad, y1 - pad, x2 - x1 + 2 * pad, y2 - y1 + 2 * pad].map(n => +n.toFixed(2)) };
}

const svg = (m, ink, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${m.vb.join(" ")}" role="img" aria-label="${title}">` +
  `<title>${title}</title><path fill="${ink}" d="${m.letters}"/>` +
  `<circle cx="${m.cx.toFixed(2)}" cy="${m.cy.toFixed(2)}" r="${(DOT / 2).toFixed(2)}" fill="${CORAL}"/></svg>\n`;

const w = wordmark(), mk = mark();
fs.writeFileSync(path.join(out, "logo.svg"), svg(w, "currentColor", "Dot Awkward"));
fs.writeFileSync(path.join(out, "logo-dark-ink.svg"), svg(w, "#1C1A27", "Dot Awkward"));
fs.writeFileSync(path.join(out, "logo-light-ink.svg"), svg(w, "#F6F5F9", "Dot Awkward"));
fs.writeFileSync(path.join(out, "mark.svg"), svg(mk, "currentColor", "Dot Awkward"));

// Studio app icon: the mark on night, following the icon recipe (dot bottom-right of the d).
const s = 120, inner = 70;
const scaleM = inner / Math.max(mk.vb[2], mk.vb[3]);
const tx = (s - mk.vb[2] * scaleM) / 2 - mk.vb[0] * scaleM, ty = (s - mk.vb[3] * scaleM) / 2 - mk.vb[1] * scaleM + 4;
fs.writeFileSync(path.join(out, "studio-icon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${s}" role="img" aria-label="Dot Awkward"><title>Dot Awkward</title>` +
  `<rect width="${s}" height="${s}" rx="26" fill="#1C1A27"/><circle cx="60" cy="58" r="44" fill="#262335"/>` +
  `<g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${scaleM.toFixed(4)})"><path fill="#F6F5F9" d="${mk.letters}"/>` +
  `<circle cx="${mk.cx.toFixed(2)}" cy="${mk.cy.toFixed(2)}" r="${(DOT / 2).toFixed(2)}" fill="${CORAL}"/></g></svg>\n`);
console.log("wordmark viewBox", w.vb.join(" "), "| mark viewBox", mk.vb.join(" "));

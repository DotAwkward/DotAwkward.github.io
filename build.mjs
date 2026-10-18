// Builds the studio site: wraps each page in src/pages with the shared header and footer.
// Run `node build.mjs` after editing anything in src/, then commit the generated pages.
//
// Each page starts with a JSON comment saying where it goes and how it's titled:
// <!--{"out": "about/index.html", "title": "About", "description": "...", "nav": "about"}-->
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Change this one line when the site moves to dotawkward.com.
const SITE = "https://dotawkward.github.io";

const here = dirname(fileURLToPath(import.meta.url));
const logo = readFileSync(join(here, "src/logo.svg"), "utf8").trim();
const year = 2026;

const NAV = [
  ["games", "/#games", "Games"],
  ["about", "/about/", "About"],
  ["support", "/support/", "Help"],
  ["press", "/press/", "Press"],
];

const escape = s => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function page(meta, body) {
  const fullTitle = meta.title ? `${meta.title} · Dot Awkward` : "Dot Awkward";
  const path = "/" + meta.out.replace(/index\.html$/, "");
  const image = SITE + (meta.image || "/press/files/dot-awkward-icon-1024.png");
  const nav = NAV.map(([key, href, label]) =>
    `<a href="${href}"${key === meta.nav ? ' aria-current="page"' : ""}>${label}</a>`).join("");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${escape(fullTitle)}</title>
<meta name="description" content="${escape(meta.description)}">
<meta property="og:title" content="${escape(meta.ogTitle || fullTitle)}">
<meta property="og:description" content="${escape(meta.description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}${path}">
<meta property="og:image" content="${image}">
<meta name="twitter:card" content="${meta.image ? "summary_large_image" : "summary"}">
<link rel="canonical" href="${SITE}${path}">
<meta name="theme-color" content="#f2f1f6" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#121119" media="(prefers-color-scheme: dark)">
<link rel="icon" type="image/svg+xml" href="/kit/studio-icon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Figtree:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/site.css">
</head>
<body${meta.accent ? ` class="${meta.accent}"` : ""}>
<a class="skip" href="#main">Skip to content</a>
<div class="wrap">
  <header class="top">
    <a class="mark" href="/" aria-label="Dot Awkward home">${logo}</a>
    <nav aria-label="Site">${nav}</nav>
  </header>

  <main id="main">
${body.trim()}
  </main>

  <footer>
    <nav aria-label="Footer">
      <a href="/games/small-plates/">Small Plates</a>
      <a href="/games/potting-bench/">Potting Bench</a>
      <a href="/about/">About</a>
      <a href="/support/">Help</a>
      <a href="/press/">Press</a>
      <a href="/privacy/">Privacy</a>
    </nav>
    <p>© ${year} Dot Awkward · <a href="mailto:hello@dotawkward.com">hello@dotawkward.com</a></p>
  </footer>
</div>
</body>
</html>
`;
}

const dir = join(here, "src/pages");
for (const file of readdirSync(dir).filter(f => f.endsWith(".html"))) {
  const text = readFileSync(join(dir, file), "utf8");
  const m = text.match(/^<!--(\{[\s\S]*?\})-->\s*/);
  if (!m) throw new Error(`${file}: missing the JSON comment at the top`);
  const meta = JSON.parse(m[1]);
  const out = join(here, meta.out);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, page(meta, text.slice(m[0].length)));
  console.log("wrote", meta.out);
}

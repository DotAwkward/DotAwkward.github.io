# Dot Awkward studio site

The site at https://dotawkward.com/. Studio-wide notes are in `../CLAUDE.md`. This repo is public and everything in it is served, so keep private notes out of it.

- Pages are written in `src/pages/*.html`, each starting with a JSON comment (`out`, `title`, `description`, `nav`, optional `accent` and `image`). `node build.mjs` wraps them in the shared header and footer and writes the real pages (`index.html`, `games/`, `about/`, `support/`, `press/`, `privacy/`, `404.html`). Commit both.
- All styles are in `site.css`. Light and dark themes come from `prefers-color-scheme`.
- Use root-relative links (`/about/`). `SITE` in `build.mjs` is the public address for share previews and canonical links.
- `CNAME` holds the custom domain. Don't delete it.
- `img/` has web-sized screenshots; `press/files/` has full-size downloads for the press kit. `kit/` is the shared brand kit the games copy from.
- Preview locally with any static server rooted at this folder. Game links (`/small-plates/`, `/plant-app-site/`) only work on the live site.

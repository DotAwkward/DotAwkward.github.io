# Dot Awkward

Small games for odd moments. The studio site at https://dotawkward.com/

- [Small Plates](https://dotawkward.com/games/small-plates/), a word game for one or two
- [Potting Bench](https://dotawkward.com/games/potting-bench/), a game about keeping real houseplants alive

This repo is the studio site only. Each game lives in its own repo and is served under its own path (`/small-plates/`, `/plant-app-site/`).

## Editing the site

Pages live in `src/pages/`, with the shared header and footer in `build.mjs` and all styles in `site.css`. After editing, run:

```bash
node build.mjs
```

and commit the generated pages (`index.html`, `games/`, `about/`, `support/`, `press/`, `privacy/`, `404.html`). `SITE` at the top of `build.mjs` is the public address used in share previews.

Screenshots in `img/` and downloads in `press/files/` come from each game's store captures.

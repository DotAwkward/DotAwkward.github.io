# Dot Awkward kit

Shared pieces every Dot Awkward game uses, so they all look like they come from the same studio. Copy these into a game rather than linking to them, so each game keeps working offline.

| File | What it is |
|---|---|
| `logo.svg` | The wordmark: lowercase "dot awkward" with the o as a coral dot. Letters use `currentColor`. |
| `logo-dark-ink.svg`, `logo-light-ink.svg` | The same wordmark with fixed ink, for light and dark backgrounds. |
| `mark.svg` | The small mark: "d" plus its dot. |
| `studio-icon.svg` | The studio's own app icon, following the icon recipe. |
| `sting.html` | The studio sting. Paste at the start of the page body. Under a second, once per session, tap to skip, never inside embedded previews. |
| `signoff.html` | "a dot awkward game", linking to the studio page. Use on the welcome screen and About page. |

## Brand basics

- Studio color: Coral `#FF5D3A`. Only for the mark, the corner dot on icons, the sign-off and studio links.
- House font: Figtree, for menus, buttons, rules and settings in every game. Each game picks its own title font.
- Icon recipe: rounded square in one deep color per game, a lighter spotlight circle, one flat object with a soft shadow, and the coral dot in the bottom-right corner.
- Promise: small games for odd moments. Plays offline. No ads, no accounts. Progress stays on your phone.

## Regenerating the logo

`source/make-logo.js` draws the SVGs from `source/bricolage-800.ttf` (Bricolage Grotesque, SIL Open Font License):

```bash
npm install opentype.js@1.3.4
node source/make-logo.js .
```

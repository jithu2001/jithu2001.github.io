# jithu2001.github.io

Personal portfolio for **Jithu J George**: software engineer working across backend, forward-deployed engineering, applied AI and product.

Live: https://jithu2001.github.io

## Stack

| | |
|---|---|
| Framework | React 19 + TypeScript, built with Vite |
| Styling | Tailwind CSS v4 (design tokens in `src/index.css`) |
| Motion | [Motion](https://motion.dev) (`motion/react`) |
| 3D | CSS perspective (no WebGL): the wanted poster tilts toward the cursor, with layers at different depths |
| Type | Anton, Archivo, Abril Fatface, IBM Plex Mono, Dela Gothic One + Noto Sans JP (Japanese fonts are subset to only the glyphs used) |

## Design

A fan-made, **original** design inspired by pirate-adventure manga (One Piece): a wanted poster, a sea chart, a ship's log and manga panels, printed in ink on newsprint with one red and one sea blue. It uses no official logos, characters or artwork from the series.

- **Your photo:** add `public/portrait.jpg` (roughly square, with the face centred) and it replaces the ink drawing on the wanted poster automatically, with a sepia print filter applied.
- **Japanese text:** if you add or change any Japanese text, re-subset the fonts. Every Japanese character in `src/` must be included in the two `&text=` font URLs in `index.html`.

There are no environment variables and no backend. The GitHub activity strip calls the public GitHub API from the browser, caches the result in `sessionStorage`, and falls back to a built-in snapshot if the API is unavailable or rate-limited.

## Run locally

Requires Node 20+ (CI uses Node 22).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build on http://localhost:4173
```

## Deploy

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push to `main`.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Editing content

All copy lives in **`src/data/content.ts`**: profile links, stats, capabilities, process steps, experience, projects, skills and the product case study. Components only render that file, so most updates never touch a component.

Everything in it is sourced from the resumes and public GitHub READMEs. Keep it that way, with no numbers or claims that can't be traced back.

Other files you may want to update:

- `public/resume/`: the downloadable resumes (`Jithu-J-George-Resume.pdf`, plus `-FDE.pdf`)
- `index.html`: title, meta description, Open Graph tags, JSON-LD
- `public/og-image.png`: social share image (1200×630)
- `public/sitemap.xml`: bump `lastmod` after big changes

## Structure

```
src/
  data/content.ts        all site content
  components/
    ui.tsx               Reveal, Chapter header, Brush marker, Jolly Roger
    Hero.tsx             headline, CTAs, wanted poster (3D tilt), caption boxes
    Nav.tsx              masthead nav, active-section underline, mobile menu
    Process.tsx          interactive sea chart: the product loop as 7 islands
    About, Capabilities, Experience, Projects (+ case-file dialog),
    GitHubActivity, Skills, ProductThinking, Contact
  hooks/
    useActiveSection.ts  IntersectionObserver for the nav
```

## Performance & accessibility notes

- **No WebGL.** All depth comes from CSS 3D transforms. Initial JS is about 138 KB gzipped (React + Motion).
- **Reduced motion:** with `prefers-reduced-motion`, poster sway and tilt, marquee and reveal motion are turned off, and the content stays complete.
- **Keyboard:** skip link, visible focus, an arrow-key tablist for the sea-chart islands, and a native `<dialog>` for project case files (Esc closes it and focus returns to the trigger).
- **Decorative Japanese text** is supplementary only. Every section title and label is also in English.

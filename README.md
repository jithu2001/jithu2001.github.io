# jithu2001.github.io

Personal portfolio for **Jithu J George**: software engineer working across backend, forward-deployed engineering, applied AI and product.

Live: https://jithu2001.github.io

## Stack

| | |
|---|---|
| Framework | React 19 + TypeScript, built with Vite |
| Styling | Tailwind CSS v4 (design tokens in `src/index.css`) |
| Motion | [Motion](https://motion.dev) (`motion/react`) |
| 3D | three.js via React Three Fiber, lazy-loaded |

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
    Hero.tsx             headline, CTAs, proof strip, 3D stage + DOM labels
    HeroScene.tsx        the R3F scene (lazy chunk)
    Nav.tsx              sticky nav, active-section pill, mobile menu
    About, Capabilities, Process, Experience, Projects,
    GitHubActivity, Skills, ProductThinking, Contact
  hooks/
    useDeviceTier.ts     decides full / lite / no 3D per device
    useActiveSection.ts  IntersectionObserver for the nav
```

## Performance & accessibility notes

- **3D is optional.** The scene loads in its own chunk once the browser is idle. Devices without WebGL, or with Data Saver on, get a static SVG instead. Phones, touch devices and low-memory or low-core machines get a lighter scene (fewer particles, lower DPR, no antialiasing). The canvas stops rendering while the hero is off-screen.
- **Initial JS** is about 138 KB gzipped. three.js (about 243 KB gzipped) loads only with the hero scene.
- **Reduced motion:** with `prefers-reduced-motion`, the scene renders a single static frame, Motion skips transform animations, and CSS animations are turned off.
- **Keyboard:** skip link, visible focus rings, arrow-key tablists (process stages and skills), a native `<dialog>` for project case studies (Esc closes it and focus returns to the trigger), and 3D stage labels that are real buttons.

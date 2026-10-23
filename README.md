# Abdullah — Full-Stack Developer Portfolio

A premium, interactive 3D developer portfolio built with React + Vite.

## Stack

- React 19 + Vite 8 (TypeScript, React Compiler)
- Tailwind CSS 4
- Three.js + React Three Fiber + drei (Earth hero scene; NASA public-domain textures in `public/textures/`)
- GSAP + ScrollTrigger (intro sequence, scroll-scrubbed effects)
- Framer Motion (reveals, page transitions, mobile menu)
- Lenis (smooth scrolling, synced to GSAP's ticker)
- React Router (case-study pages at `/work/:slug`)
- Lucide React (icons)

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run preview  # serve the production build
npm run lint     # eslint (includes React Compiler rules)
```

## Deploying to GitHub Pages

The `Deploy to GitHub Pages` workflow builds and deploys the site on every push to
`master` (or when run manually). In the repository settings, set **Pages → Build
and deployment → Source** to **GitHub Actions**. The site is configured for the
repository URL `https://abdullahdevai.github.io/portfolio/`.

## Editing content

All copy and content lives in `src/data/` — components never hardcode it.

| File                     | Contains                                                       |
| ------------------------ | -------------------------------------------------------------- |
| `src/data/site.ts`       | Name, email, location, availability, nav links, social links   |
| `src/data/projects.ts`   | Projects + full case-study content (`/work/:slug`)             |
| `src/data/skills.ts`     | Tech stack pills, descriptions, icons and desktop positions    |
| `src/data/experience.ts` | Timeline items                                                 |
| `src/data/services.ts`   | Services rows                                                  |
| `src/data/process.ts`    | "How I work" steps                                             |
| `src/data/about.ts`      | About statement, paragraphs, rotating technologies, facts      |

Project images are real screenshots in `public/images/`, captured from the live sites.
Case studies show them in `ImageSlider` (arrows, dots, drag, arrow keys); each `gallery`
entry is `{ src, caption? }`, so adding a screenshot is just another entry.
Each project has `project-N.webp` / `.jpg` (1600×1000) plus a `-800.webp` variant and an
`-alt` second frame. The `image` and `gallery` fields hold the **base path without an
extension** (e.g. `/images/project-1`); `ProjectImage` picks the right format and size. Set `og:url` in `index.html` to the deployed site URL once it's live.
The Upwork link in `src/data/site.ts` is still a placeholder.

## Structure

```
src/
  animations/   shared Framer Motion variants + GSAP helpers
  components/   sections, UI primitives (ui/), 3D scene parts (three/)
  context/      app state, Lenis smooth-scroll provider
  data/         all content
  hooks/        useMediaQuery, useMousePosition, useInViewport, section navigation
  lib/          gsap registration, motion/media queries, WebGL detection
  pages/        Home, ProjectPage
  styles/       globals.css (Tailwind theme tokens + utilities)
```

## Behaviour notes

- **Reduced motion**: Lenis, the custom cursor, the intro timeline, floating/auto-rotation
  and scroll-scrubbed effects are disabled; content renders immediately.
- **Touch devices**: custom cursor, magnetic and tilt effects are off; the 3D scene uses
  the low-quality preset (fewer particles, lower geometry detail, capped DPR).
- **No WebGL**: `HeroFallback` renders a CSS globe from the same day texture; the canvas is also wrapped in an
  error boundary so a renderer failure never breaks the page.
- The hero canvas pauses its frame loop when scrolled out of view.

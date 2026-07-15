# JCC Portfolio

Personal portfolio site for **PepeCC**, full-stack web developer. Built with [Astro 5](https://astro.build) as a fully static site — no UI framework, no client-side JavaScript beyond a small theme script and Astro's view transitions.

🌐 **Live site:** [https://jcc-dev.onrender.com/](https://jcc-dev.onrender.com/) (deployed on Render)

> All user-facing content is in Spanish.

## Tech Stack

- **[Astro 5](https://astro.build)** — static output, `.astro` components only
- **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)** — automatic sitemap generation
- **TypeScript** — strict config, type-checked with `astro check`
- **Plain CSS** — scoped component styles plus global CSS custom properties for theming

## Project Structure

```text
/
├── public/               # favicon, robots.txt, Open Graph image
├── src/
│   ├── components/
│   │   ├── TopBar.astro      # header with navigation
│   │   ├── BottomBar.astro   # footer
│   │   └── ThemeToggle.astro # light/dark mode switch
│   ├── layouts/
│   │   └── Layout.astro      # shared layout: SEO, theming, global styles
│   └── pages/
│       ├── index.astro       # "Sobre mi" (about)
│       ├── my-work.astro     # work experience
│       ├── my-projects.astro # projects showcase
│       └── 404.astro         # not found page
├── astro.config.mjs
└── package.json
```

## Key Features

### Shared layout as the hub

Every page wraps its content in `src/layouts/Layout.astro`, which owns:

- **SEO** — meta description, canonical URLs, Open Graph tags, and a JSON-LD `Person` schema, all driven by props (`title`, `description`, `image`) and a `personalInfo` constant.
- **View transitions** — Astro's `<ClientRouter />` with a fade animation between pages. Per-page scripts re-attach on the `astro:page-load` / `astro:after-swap` events to survive client-side navigation.
- **Global styles** — theme colors defined as CSS custom properties (`--color-bg`, `--color-text`, …), with light values on `:root` and dark values on `html.dark`.

### Dark mode

Light/dark theming works by toggling a `dark` class on `<html>`:

- The preference is stored in `localStorage` (`app-theme`), falling back to the system's `prefers-color-scheme`.
- An inline script applies the class **before first paint** (no flash of the wrong theme) and re-applies it after every view transition.
- `ThemeToggle.astro` switches themes via a delegated click listener.

### Other conventions

- Icons are inline SVG paths pasted directly into components — no icon library.
- Content is centered in a `.main-container` with a 750px max width.
- Responsive breakpoint at 500px for mobile font sizes and layout tweaks.
- Internal navigation links use trailing slashes (e.g. `/my-work/`).

## Getting Started

```sh
# Install dependencies
npm install

# Start the dev server at http://localhost:4321
npm run dev
```

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm run dev`     | Start the dev server at `localhost:4321`     |
| `npm run build`   | Build the production site to `./dist/`       |
| `npm run preview` | Preview the production build locally         |
| `npx astro check` | Type-check `.astro` files                    |

## Deployment

The site is deployed as a static build to [Render](https://render.com). The production URL is configured in two places:

- `astro.config.mjs` → `site` (used by the sitemap integration)
- `src/layouts/Layout.astro` → `siteUrl` (used for canonical and Open Graph URLs)

If the deployment URL ever changes, update both.

## Contact

- **GitHub:** [@Pepecc](https://github.com/Pepecc)
- **LinkedIn:** [Josep Company Cuesta](https://www.linkedin.com/in/josep-c-229b561b5/)
- **Email:** contacto@josepcompany.dev

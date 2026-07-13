# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site for PepeCC, built with Astro 5 (static output, no UI framework). All user-facing content is in Spanish. Deployed to Render at https://jcc-dev.onrender.com/ — that URL is hardcoded both in `astro.config.mjs` (`site`, used by the sitemap integration) and in `src/layouts/Layout.astro` (`siteUrl`, used for canonical/OG URLs).

## Commands

- `npm run dev` — dev server at http://localhost:4321 (host exposed)
- `npm run build` — production build to `./dist/`
- `npm run preview` — preview the built site
- `npx astro check` — type-check `.astro` files (strict tsconfig)

There is no test suite or linter configured.

## Architecture

Four pages in `src/pages/` (`index` = "Sobre mi", `my-work`, `my-projects`, `404`), each wrapping its content in the single shared layout `src/layouts/Layout.astro`. Internal nav links use trailing slashes (e.g. `/my-work/`).

`Layout.astro` is the hub — it owns:

- **SEO**: meta description, canonical URL, Open Graph tags, and a JSON-LD `Person` schema built from the `personalInfo` constant defined in its frontmatter. Pages pass `title`, `description`, and `image` props.
- **View transitions**: Astro's `<ClientRouter />` with `transition:animate="fade"` on `<main>`. Because of client-side routing, any per-page script must re-attach on `astro:page-load` / `astro:after-swap` events, not just on initial load.
- **Global styles**: all theme colors are CSS custom properties (`--color-bg`, `--color-text`, `--color-text-secondary`, etc.) defined in the `is:global` style block, with light values on `:root` and dark values on `html.dark`.

### Theming

Dark mode is a `dark` class on `<html>`:

- Preference is stored in `localStorage` under the key `app-theme`, falling back to `prefers-color-scheme`.
- An `is:inline` script in `Layout.astro` applies the class before paint and re-applies it on `astro:after-swap` (view transitions replace the document).
- `src/components/ThemeToggle.astro` toggles it via a delegated click listener on `document.body`, registered on `astro:page-load`.
- Component styles target dark mode with `:global(html.dark) .selector` since Astro styles are scoped.

### Conventions

- Icons are inline SVG `<path>` data pasted directly into components (no icon library).
- Every page centers content in a `.main-container` with `max-width: 750px`.
- Global responsive breakpoint is `max-width: 500px` (font sizes shrink in Layout's global styles; components add their own).

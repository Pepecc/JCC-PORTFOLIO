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

Static pages in `src/pages/` (`index` = "Sobre mi", `my-work`, `my-projects`, `404`, plus the blog pages below), each wrapping its content in the single shared layout `src/layouts/Layout.astro`. Internal nav links use trailing slashes (e.g. `/my-work/`).

`Layout.astro` is the hub — it owns:

- **SEO**: meta description, canonical URL, Open Graph tags, and a JSON-LD `Person` schema built from the `personalInfo` constant defined in its frontmatter. Pages pass `title`, `description`, and `image` props.
- **View transitions**: Astro's `<ClientRouter />` with `transition:animate="fade"` on `<main>`. Because of client-side routing, any per-page script must re-attach on `astro:page-load` / `astro:after-swap` events, not just on initial load.
- **Global styles**: all theme colors are CSS custom properties (`--color-bg`, `--color-text`, `--color-text-secondary`, etc.) defined in the `is:global` style block, with light values on `:root` and dark values on `html.dark`.

### Blog (content collections)

`src/content.config.ts` defines a single `blog` collection using the `glob` loader (`astro/loaders`) over `src/content/blog/*.md`. Schema: `title` (string), `description` (string), `pubDate` (coerced to `Date`), `tags` (string array, defaults to `[]`), `draft` (boolean, defaults to `false`). No `@astrojs/mdx` is installed, so entries must be `.md`.

An entry's `id` (used in its URL and in the `~/blog/{id}` breadcrumb) is derived by the loader from the filename — renaming a `.md` file changes its slug/URL.

- `src/pages/blog/index.astro` — lists non-draft entries sorted by `pubDate` descending; dates are formatted with `toLocaleDateString('es-ES', …)`.
- `src/pages/blog/[slug].astro` — `getStaticPaths()` iterates non-draft entries and renders each via `render()` from `astro:content`. Drafts are filtered out at `getStaticPaths`, so they get no route at all, not just hidden from the listing.
- Entry titles are wrapped in literal `[` `]` colored with an inline `style="color: var(--color-primary)"`, mirroring the `text()` suffix convention used for headings in `my-work.astro`/`my-projects.astro`. On the listing page the title sits inside an `<a>`, which `.main-container a` already colors primary, so the brackets add no extra contrast there; on the detail page's `h1` (not a link) they do.
- Nav entry added to `TopBar.astro`'s `navigationItems`: `{ number: '04', label: 'blog', href: '/blog/' }`.

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

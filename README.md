# Momchil Gavrilov: Portfolio

Personal portfolio for Momchil Gavrilov, human factors & UX researcher.
Built with Next.js (App Router), TypeScript, and Tailwind CSS. Fully static,
with no server dependencies, and designed for deployment on Vercel.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static production build
```

## Editing content

All copy lives in `src/content/`; no component changes are needed for edits:

- `site.ts`: hero, story, skills, contact
- `publications.ts`: the numbered publications list
- `case-studies.ts`: case study cards and full write-ups; set `status`
  to `"published"` (with `sections`) to give a study its own page at
  `/work/<slug>`, or `"coming-soon"` for a stub card. `hidden: true`
  keeps an entry out of the site entirely.

## Design

Warm editorial direction: cream background (`#faf6ef`), deep maroon
(`#6b1f2a`), muted gold (`#c9a227`), warm charcoal text (`#2b2622`).
Fraunces for display type, Source Sans 3 for body. Tokens are defined in
`src/app/globals.css` under `@theme`.

## Deploy

Import the repo in Vercel (no configuration needed). Every page is
statically generated at build time.

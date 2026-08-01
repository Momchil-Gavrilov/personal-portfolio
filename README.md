# Momchil Gavrilov: Portfolio

Personal portfolio for Momchil Gavrilov, human factors & UX researcher.
Built with Next.js (App Router), TypeScript, and Tailwind CSS. Every page is
statically prerendered; the one exception is `/api/vote`, which keeps the
colourway tally. Deployed on Vercel.

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

Paper and ink with one accent hue at three weights: paper (`#fcfaf6`), ink
(`#101820`), and a `primary` / `primary-deep` / `primary-soft` trio. Tokens
are defined in `src/app/globals.css` under `@theme`.

The accent is a visitor setting. Green (`#1a4a32`) is the default; navy and
maroon are the alternatives, listed in `src/components/themes.ts` and applied
as `data-theme` on `<html>` by an inline script that runs before first paint.
A theme's `swatch` there and its `--color-primary` in `globals.css` are the
same value written twice, and have to be changed together.

## Deploy

Import the repo in Vercel; the build needs no configuration. Three environment
variables matter, all optional and all only for the colourway widget in the
footer:

- `KV_REST_API_URL` / `KV_REST_API_TOKEN`: an Upstash Redis database, either
  through Vercel's KV integration (which sets these names for you) or a direct
  Upstash database (which sets `UPSTASH_REDIS_REST_URL` / `_TOKEN`; both pairs
  are read). Without them the votes and the feedback are held in memory per
  server instance and reset on deploy, which is fine in development and not a
  real record in production. `GET /api/vote` reports which mode it is in as
  `live`.
- `VOTE_SALT`: any random string. Votes are deduplicated, and feedback rate
  limited, by a salted hash of the caller's address, never the address itself;
  the salt only makes that digest harder to brute force.
- `FEEDBACK_KEY`: any random string, and the only way into the private page
  that shows what people wrote. It lives at `/feedback/<that string>`; every
  other value 404s, and with the variable unset the page 404s in production
  and opens for any key in development. The link is the credential, so it
  should not be pasted anywhere public, and rotating it means changing the
  variable.

## Feedback

The footer's "Leave feedback" link opens a textarea and posts to
`/api/feedback`, which is write-only: messages are capped at 1000 characters,
one a minute per address, and the list is trimmed to the newest 500. Reading
happens on `/feedback/<FEEDBACK_KEY>` only, which goes to the store directly
rather than through a second endpoint that would need guarding separately.

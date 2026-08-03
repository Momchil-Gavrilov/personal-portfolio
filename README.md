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

Import the repo in Vercel; the build needs no configuration. Four environment
variables matter, all optional, and all for the colourway widget in the footer
and the funnel counters:

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
- `PULSE_KEY`: the same idea for `/pulse/<that string>`, the private page that
  shows how far readers get. Same rules: unset means the page 404s in
  production and opens for any key in development.

## Analytics

Three things measure this site, and they answer different questions.

Vercel Web Analytics says how many people came and where from. Vercel Speed
Insights says whether the pages were fast. Both are enabled per project in the
Vercel dashboard and collect nothing until the project is deployed, which is
worth knowing before concluding they are broken.

Neither answers the question the site actually has, which is how far down the
page a reader gets before deciding it is not for them. Custom events are the
documented route to something like that and they are unavailable on Hobby,
capped at two properties on Pro, and counted rather than sequenced, so even
paid they cannot express a funnel. So `/api/pulse` counts it here, in the same
Upstash store the poll and the feedback box use.

One page view produces one request, sent with `navigator.sendBeacon` as the
reader leaves, because the section they stopped at is only knowable at the
end. What is stored is six Redis hashes of counters: how many views reached
each section, how many went no further from it, what was clicked and from
where, and buckets for scroll depth and time on screen. Nothing is stored per
person, there is no cookie or identifier, and `doNotTrack` and automated
browsers are both skipped. `/pulse/<PULSE_KEY>` reads the counters back as a
funnel, split by phone and desktop.

### Which links are counted

A link is counted by carrying a `data-pulse="<action>@<place>"` attribute, and
both halves are checked against lists in `src/lib/pulse.ts` before anything is
stored, so the browser cannot invent a field name. The attribute is inert: it
adds no role, no label and no tab stop, and every element carrying one is
already a native `<a>` or `<summary>`.

- `booking`, `resume`, `email`, `linkedin`, `github`, counted separately in the
  header, the hero and the contact section. The same offer in three places is
  three different questions, and the header's count against the contact
  section's is the closest thing here to a measure of whether the middle of the
  page changes anyone's mind.
- `casestudy`, from the products row and from the research row.
- `live`, the case study's own primary link, which the content decides the
  meaning of: the demo on Wellspring, the paper on the research studies, the
  prototype on CaseBase. Counted separately in the sticky bar, under the title
  and at the foot of the article, and also against the case study's slug, so
  "did anyone who opened Wellspring go and look at it" is one number.
- `paper` and `expand` on the publications list, the second being whether
  anyone opens the collapsed list at all, which no scroll measurement can
  answer.

### Adding a link

Put `data-pulse="<action>@<place>"` on it and add either half to `ACTIONS` or
`PLACES` in `src/lib/pulse.ts` if it is new. Nothing else needs changing: the
dashboard reads whatever is in the store. A click on a case study page is
additionally recorded against that page's slug, using the slug from the request
path rather than anything the browser sent.

### Failure and accessibility

Nothing in `src/components/Pulse.tsx` may break the page it measures. Every
callback the browser invokes is wrapped, and so is the effect around them, so
the worst available failure is that it silently stops counting. A portfolio
that renders is worth something and a scroll-depth counter is very little, so
that exchange is a bad one at any odds. It costs under 1KB gzipped, renders
nothing, and does its work after paint.

The dashboard is a real table with row and column headers, a caption, a
keyboard-reachable scrolling region, and bars hidden from assistive technology
because each one sits beside the same figure written out. Its muted text stops
at `ink/65`, which measures 6.9:1 against the paper. The site's quieter greys,
`ink/45` through `ink/55`, come to 2.9:1, 3.4:1 and 3.9:1, all under the 4.5:1
WCAG asks for text at these sizes.

## Feedback

The footer's "Leave feedback" link opens a textarea and posts to
`/api/feedback`, which is write-only: messages are capped at 1000 characters,
one a minute per address, and the list is trimmed to the newest 500. Reading
happens on `/feedback/<FEEDBACK_KEY>` only, which goes to the store directly
rather than through a second endpoint that would need guarding separately.

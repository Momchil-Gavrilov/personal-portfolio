import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { configured } from "@/lib/kv";
import {
  ACTIONS,
  DEPTH_BUCKETS,
  DWELL_BUCKETS,
  PLACES,
  STEPS,
  readTallies,
  type Tallies,
} from "@/lib/pulse";

/*
  The reading side of `/api/pulse`.

  Same gate as the feedback page and for the same reasons: `PULSE_KEY` is a
  random string set in Vercel, the page lives at `/pulse/<that string>`, and
  every other value goes through Next's own not-found path, which is
  indistinguishable from a route that was never built. The link is the
  credential, so pasting it anywhere public hands over the page.

  What is on it is six histograms and the ratios between them. There is
  nothing here about any individual, because nothing about any individual was
  ever stored.

  A note on the colours, since this page is about the site's own usability and
  would be a poor place to be careless. Muted text here bottoms out at
  `ink/65`, which is 5.5:1 against the paper. The site's quieter greys,
  `ink/45` through `ink/55`, come to between 2.9:1 and 3.9:1, under the 4.5:1
  that WCAG asks of text this size, and this page is set almost entirely in
  11px monospace where that shortfall is felt hardest.
*/
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pulse",
  robots: { index: false, follow: false },
};

const SECRET = process.env.PULSE_KEY;

/* Unset in production means closed, not open. Locally, with no variable set,
   any key opens it so the funnel can be checked against the in-memory store. */
function permitted(key: string) {
  if (SECRET) return key === SECRET;
  return process.env.NODE_ENV !== "production";
}

const LABELS: Record<string, string> = {
  top: "Header",
  research: "Research",
  publications: "Publications",
  work: "Products",
  story: "Story",
  contact: "Contact",
};

function pct(part: number, whole: number) {
  if (!whole) return 0;
  return (part / whole) * 100;
}

/* One decimal below ten percent, none above. A drop-off of 3.4% and one of
   3% are different findings; 47% and 47.2% are the same one. */
function show(value: number) {
  return value < 10 && value > 0 ? value.toFixed(1) : Math.round(value);
}

function sum(hash: Record<string, number>, suffix: string) {
  return (hash[`desktop:${suffix}`] ?? 0) + (hash[`mobile:${suffix}`] ?? 0);
}

/*
  A hairline bar rather than a chart library. The only comparison being made is
  one row against the row above it, which a length already makes.

  Hidden from assistive technology, because every bar on this page sits beside
  the same number written out. Announcing it would be reading the figure twice,
  and a decorative graphic that repeats its own label is the most common way a
  chart becomes worse to listen to than a plain list.
*/
function Bar({ value, tone = "primary" }: { value: number; tone?: string }) {
  return (
    <div
      aria-hidden="true"
      className="h-1 w-full overflow-hidden rounded-full bg-line"
    >
      <div
        className={`h-full rounded-full ${
          tone === "primary" ? "bg-primary" : "bg-ink/45"
        }`}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

/* A count with no data behind it. The bare hyphen it replaces was announced as
   "hyphen", which is not what it means. */
function NoData() {
  return (
    <>
      <span aria-hidden="true">-</span>
      <span className="sr-only">no data</span>
    </>
  );
}

function Panel({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-medium tracking-tight">{title}</h2>
      {note && <p className="mt-1 text-[0.8125rem] text-ink/65">{note}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

/*
  The funnel, which is the whole point of the exercise.

  Each row is a section of the home page. "Reached" is how many views got that
  far, "left here" is how many of them went no further, and the percentage
  beside it is the second divided by the first. By construction the reached
  count of any row is the previous row's reached minus its exits, so the table
  reconciles down the page and a row that loses a third of its readers is
  visible as a step rather than as a number needing comparison.

  Marked up as a real table, with the section name as each row's header, so
  that a screen reader announces "Research, left here, 6" rather than reading
  six unattached numbers. That is the entire reason to use a table here rather
  than the nested lists the rest of this page is built from.
*/
function Funnel({ tallies }: { tallies: Tallies }) {
  const arrivals = sum(tallies.reach, "top");
  if (!arrivals) return <p className="text-sm text-ink/65">Nothing yet.</p>;

  return (
    /*
      A horizontally scrolling box has to be reachable by keyboard, or the
      columns past the right edge belong to mouse users only. `tabIndex` makes
      it focusable and scrollable with the arrow keys, and a focusable region
      needs a name and a role to be worth landing on.
    */
    <div
      className="overflow-x-auto"
      tabIndex={0}
      role="region"
      aria-label="Funnel, scrollable"
    >
      <table className="w-full min-w-[34rem] border-collapse text-sm">
        <caption className="sr-only">
          Each row is a section of the home page, with how many views reached
          it, how many stopped there, and the same drop-off split by phone and
          desktop.
        </caption>
        <thead>
          <tr className="border-b border-line text-left font-mono text-[0.6875rem] uppercase tracking-wide text-ink/65">
            <th scope="col" className="py-2 pr-4 font-normal">
              Section
            </th>
            <th scope="col" className="py-2 pr-4 font-normal">
              Reached
            </th>
            <th scope="col" className="w-[30%] py-2 pr-4 font-normal">
              Of arrivals
            </th>
            <th scope="col" className="py-2 pr-4 font-normal">
              Left here
            </th>
            {/* The long form is for assistive technology only: the column is
                too narrow for it and the visible word is unambiguous once the
                row header has been announced. */}
            <th scope="col" className="py-2 pr-3 font-normal">
              Phone
              <span className="sr-only"> readers who left here</span>
            </th>
            <th scope="col" className="py-2 font-normal">
              Desktop
              <span className="sr-only"> readers who left here</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {STEPS.map((step) => {
            const reached = sum(tallies.reach, step);
            const left = sum(tallies.exit, step);
            const mobileReach = tallies.reach[`mobile:${step}`] ?? 0;
            const deskReach = tallies.reach[`desktop:${step}`] ?? 0;
            const mobileExit = tallies.exit[`mobile:${step}`] ?? 0;
            const deskExit = tallies.exit[`desktop:${step}`] ?? 0;

            return (
              <tr key={step} className="border-b border-line/60">
                <th scope="row" className="py-3 pr-4 text-left font-medium">
                  {LABELS[step]}
                </th>
                <td className="py-3 pr-4 font-mono text-[0.8125rem] tabular-nums">
                  {reached}
                </td>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <Bar value={pct(reached, arrivals)} />
                    <span className="w-10 shrink-0 text-right font-mono text-[0.6875rem] tabular-nums text-ink/65">
                      {show(pct(reached, arrivals))}%
                    </span>
                  </div>
                </td>
                {/* Separated by a mark, not by a margin. Whitespace alone put
                    a count and a percentage next to each other with nothing
                    between them, and "14" beside "50%" reads as 1450 for
                    exactly as long as it takes to notice it does not. The mark
                    is hidden from screen readers, which have the column header
                    to tell them what the two numbers are. */}
                <td className="py-3 pr-4 font-mono text-[0.8125rem] tabular-nums">
                  {left}
                  <span className="ml-1.5 text-[0.6875rem] text-ink/65">
                    <span aria-hidden="true">·</span>{" "}
                    {show(pct(left, reached))}%
                  </span>
                </td>
                <td className="py-3 pr-3 font-mono text-[0.6875rem] tabular-nums text-ink/65">
                  {mobileReach ? (
                    `${show(pct(mobileExit, mobileReach))}%`
                  ) : (
                    <NoData />
                  )}
                </td>
                <td className="py-3 font-mono text-[0.6875rem] tabular-nums text-ink/65">
                  {deskReach ? (
                    `${show(pct(deskExit, deskReach))}%`
                  ) : (
                    <NoData />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* Every action that has ever happened, grouped by what was clicked rather than
   by where, so the three booking links sit next to each other and the question
   the placement was asking answers itself. */
function Actions({ tallies }: { tallies: Tallies }) {
  const arrivals = sum(tallies.reach, "top");
  const rows = ACTIONS.map((action) => ({
    action,
    places: PLACES.map((place) => ({
      place,
      count: tallies.act[`${action}@${place}`] ?? 0,
    })).filter((p) => p.count > 0),
    total: PLACES.reduce(
      (n, place) => n + (tallies.act[`${action}@${place}`] ?? 0),
      0
    ),
  })).filter((row) => row.total > 0);

  if (rows.length === 0) {
    return <p className="text-sm text-ink/65">No clicks recorded yet.</p>;
  }

  return (
    <ul className="list-none space-y-3">
      {rows.map((row) => (
        <li
          key={row.action}
          className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-line/60 pb-3"
        >
          <span className="font-medium capitalize">
            {row.action === "casestudy" ? "Case study" : row.action}
          </span>
          <span className="font-mono text-[0.8125rem] tabular-nums">
            {row.total}
            <span className="sr-only"> clicks</span>
          </span>
          {arrivals > 0 && (
            <span className="font-mono text-[0.6875rem] text-ink/65">
              {show(pct(row.total, arrivals))}% of arrivals
            </span>
          )}
          <span className="ml-auto flex flex-wrap gap-x-3 font-mono text-[0.6875rem] text-ink/65">
            {row.places.map((p) => (
              <span key={p.place}>
                {p.place} {p.count}
              </span>
            ))}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Histogram({
  buckets,
  hash,
  unit,
}: {
  buckets: readonly string[];
  hash: Record<string, number>;
  unit: string;
}) {
  const total = buckets.reduce((n, b) => n + sum(hash, b), 0);
  if (!total) return <p className="text-sm text-ink/65">Nothing yet.</p>;

  return (
    <ul className="list-none space-y-2">
      {buckets.map((bucket) => {
        const count = sum(hash, bucket);
        return (
          <li key={bucket} className="flex items-center gap-3">
            <span className="w-16 shrink-0 font-mono text-[0.6875rem] text-ink/65">
              {bucket}
              <span className="sr-only"> {unit}:</span>
            </span>
            <Bar value={pct(count, total)} tone="quiet" />
            <span className="w-16 shrink-0 text-right font-mono text-[0.6875rem] tabular-nums text-ink/65">
              {count}
              <span className="sr-only"> views, </span>
              <span aria-hidden="true"> · </span>
              {show(pct(count, total))}%
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/* Opened against read. The pair is the only thing worth knowing about a case
   study page: a high open count with a low read count means the card sold
   something the page did not deliver. */
function Studies({ tallies }: { tallies: Tallies }) {
  const slugs = [
    ...new Set(
      Object.keys(tallies.study)
        .map((field) => field.split(":")[0])
        .filter(Boolean)
    ),
  ].sort();

  if (slugs.length === 0) {
    return <p className="text-sm text-ink/65">No case study views yet.</p>;
  }

  return (
    <ul className="list-none space-y-3">
      {slugs.map((slug) => {
        const opened = tallies.study[`${slug}:opened`] ?? 0;
        const read = tallies.study[`${slug}:read`] ?? 0;
        /* Everything else recorded against this slug is a link that was
           clicked on its page. Read off the store rather than listed here, so
           a new tagged link starts appearing without this page changing. */
        const clicks = ACTIONS.map((action) => ({
          action,
          count: tallies.study[`${slug}:${action}`] ?? 0,
        })).filter((c) => c.count > 0);

        return (
          <li key={slug} className="border-b border-line/60 pb-3">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-medium">{slug}</span>
              <span className="ml-auto font-mono text-[0.6875rem] text-ink/65">
                opened {opened}
                <span aria-hidden="true"> · </span>
                <span className="sr-only">, </span>
                read to the end {read}
                {opened > 0 && (
                  <>
                    <span aria-hidden="true"> · </span>
                    <span className="sr-only">, which is </span>
                    {show(pct(read, opened))}%
                  </>
                )}
              </span>
            </div>
            {clicks.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-x-4 font-mono text-[0.6875rem] text-primary-deep">
                {clicks.map((c) => (
                  <span key={c.action}>
                    {c.action === "live" ? "opened the link" : c.action}{" "}
                    {c.count}
                    {opened > 0 && (
                      <>
                        <span aria-hidden="true"> · </span>
                        <span className="sr-only">, which is </span>
                        {show(pct(c.count, opened))}%
                      </>
                    )}
                  </span>
                ))}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default async function PulsePage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  if (!permitted(key)) notFound();

  let tallies: Tallies | null;
  try {
    tallies = await readTallies();
  } catch {
    tallies = null;
  }

  if (!tallies) {
    return (
      <main className="mx-auto w-full max-w-3xl px-6 py-16">
        <p className="eyebrow text-ink/65">Private</p>
        <h1 className="mt-2 text-2xl font-medium tracking-tight">Pulse</h1>
        <p className="mt-6 text-sm text-ink/65">
          The store could not be read. Refreshing is worth a try.
        </p>
      </main>
    );
  }

  const arrivals = sum(tallies.reach, "top");
  const bounced = sum(tallies.exit, "top");
  const reachedContact = sum(tallies.reach, "contact");

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <p className="eyebrow text-ink/65">Private</p>
      <h1 className="mt-2 text-2xl font-medium tracking-tight">
        How far people get
      </h1>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink/70">
        One row per view, counted at the moment the reader leaves, which is the
        only moment their furthest point is known. Aggregate counters only:
        nothing here is stored per person.
      </p>

      {!configured && (
        <p className="mt-6 rounded-card border border-line p-4 text-sm text-ink/70">
          No database configured, so these are the in-memory counters: whatever
          this server process has seen since it started, and nothing after it
          restarts.
        </p>
      )}

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {[
          { label: "Views", value: `${arrivals}` },
          {
            label: "Left at the header",
            value: arrivals ? `${show(pct(bounced, arrivals))}%` : null,
          },
          {
            label: "Reached the ask",
            value: arrivals ? `${show(pct(reachedContact, arrivals))}%` : null,
          },
        ].map((stat) => (
          <div key={stat.label} className="rounded-card border border-line p-4">
            <p className="font-mono text-[0.6875rem] uppercase tracking-wide text-ink/65">
              {stat.label}
            </p>
            <p className="mt-1.5 text-2xl tabular-nums">
              {stat.value ?? <NoData />}
            </p>
          </div>
        ))}
      </div>

      <Panel
        title="The funnel"
        note="Reached is how many views got this far. Left here is how many of them went no further."
      >
        <Funnel tallies={tallies} />
      </Panel>

      <Panel
        title="What they clicked"
        note="The same link in three places is three rows."
      >
        <Actions tallies={tallies} />
      </Panel>

      <Panel
        title="How far down the page"
        note="Furthest scroll position reached, home page and case studies together."
      >
        <Histogram
          buckets={DEPTH_BUCKETS}
          hash={tallies.depth}
          unit="percent of the page"
        />
      </Panel>

      <Panel
        title="How long they stayed"
        note="Time the page was actually on screen, not time since it loaded."
      >
        <Histogram
          buckets={DWELL_BUCKETS}
          hash={tallies.dwell}
          unit="time on screen"
        />
      </Panel>

      <Panel title="Case studies">
        <Studies tallies={tallies} />
      </Panel>
    </main>
  );
}

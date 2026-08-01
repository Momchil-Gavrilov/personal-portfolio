import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { THEMES } from "@/components/themes";
import { readFeedback } from "@/lib/feedback";
import { configured, pipeline } from "@/lib/kv";

/*
  The private side of the footer widget: everything readers wrote, and what
  they voted, on one page nobody can find.

  The gate is the URL itself. `FEEDBACK_KEY` is a random string set in Vercel,
  the page lives at `/feedback/<that string>`, and every other value 404s
  through Next's own not-found path, which is indistinguishable from a route
  that does not exist. No password form, no session, no accounts table: the
  thing being protected is a list of comments about paint colours, and a
  guessable-in-2^128-tries link is the proportionate answer.

  Two consequences worth knowing. The link is the credential, so pasting it
  anywhere public hands over the page, and rotating it means changing the
  environment variable. Search engines are told to stay away below, but the
  real defence is that nothing links here from anywhere.
*/
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Feedback",
  robots: { index: false, follow: false },
};

const SECRET = process.env.FEEDBACK_KEY;

/* Unset in production means closed, not open: a missing environment variable
   must never be the thing that publishes the page. Locally, with no variable
   and no database, any key opens it so the box can be tested. */
function permitted(key: string) {
  if (SECRET) return key === SECRET;
  return process.env.NODE_ENV !== "production";
}

async function readTally() {
  if (!configured) return null;
  try {
    const rows = await pipeline(
      THEMES.map((t) => ["GET", `colourway:votes:${t.id}`])
    );
    return THEMES.map((t, i) => ({
      ...t,
      count: Math.max(0, Number(rows[i]?.result ?? 0) || 0),
    }));
  } catch {
    return null;
  }
}

/* The stored timestamp is UTC ISO. Printed in full rather than as "3 days
   ago", because the only reader of this page is trying to line comments up
   against when the post went out. */
function when(at: string) {
  if (!at) return "";
  const date = new Date(at);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  });
}

export default async function FeedbackPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  if (!permitted(key)) notFound();

  let entries;
  try {
    entries = await readFeedback();
  } catch {
    entries = null;
  }
  const tally = await readTally();

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-16">
      <p className="eyebrow text-ink/50">Private</p>
      <h1 className="mt-2 text-2xl font-medium tracking-tight">
        What people said
      </h1>

      {tally && (
        <ul className="mt-6 flex list-none flex-wrap items-center gap-1.5">
          {tally.map((t) => (
            <li
              key={t.id}
              className="flex items-center gap-1.5 rounded-btn px-2 py-1"
              style={{ backgroundColor: `${t.swatch}1f` }}
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: t.swatch }}
              />
              <span className="font-mono text-[0.6875rem] text-ink/70">
                {t.label} {t.count}
              </span>
            </li>
          ))}
        </ul>
      )}

      {!configured && (
        <p className="mt-6 text-sm text-ink/60">
          No database configured, so this is the in-memory store: whatever was
          sent to this server process since it started, and nothing after it
          restarts.
        </p>
      )}

      {entries === null && (
        <p className="mt-6 text-sm text-ink/60">
          The store could not be read. Refreshing is worth a try.
        </p>
      )}

      {entries?.length === 0 && (
        <p className="mt-6 text-sm text-ink/60">Nothing yet.</p>
      )}

      {entries && entries.length > 0 && (
        <ul className="mt-8 list-none space-y-4">
          {entries.map((entry, i) => (
            <li
              key={`${entry.at}-${i}`}
              className="rounded-card border border-line p-4"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.6875rem] text-ink/45">
                <span>{when(entry.at)}</span>
                {entry.theme && <span>{entry.theme}</span>}
              </div>
              {/* Reader-written text, printed as text. `whitespace-pre-wrap`
                  keeps their line breaks; React escapes the rest, which is
                  what makes a public write endpoint safe to read back. */}
              <p className="mt-2 whitespace-pre-wrap text-[0.9375rem] leading-relaxed">
                {entry.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

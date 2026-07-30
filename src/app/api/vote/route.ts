import { THEMES, type ThemeId, isThemeId } from "@/components/themes";

/*
  The colourway tally.

  GET returns the counts, POST records one. This is the only part of the site
  that is not statically prerendered, and it is one route: the pages that
  render the block still ship as static HTML and fetch the numbers from here
  after they load.

  Storage is Upstash over its REST API, spoken to with plain `fetch`. Vercel's
  KV integration is Upstash underneath and sets `KV_REST_API_URL` and
  `KV_REST_API_TOKEN`; a direct Upstash database sets `UPSTASH_REDIS_REST_*`.
  Either works and neither needs a client library, which keeps a three-integer
  feature from adding a dependency to the site.

  With no credentials configured it falls back to counting in memory so the
  block is fully working in development. That fallback is per server instance
  and resets on deploy: it is a development convenience, not a database, and
  the numbers are not real until the environment variables exist.
*/
export const dynamic = "force-dynamic";

const REST_URL =
  process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

const configured = Boolean(REST_URL && REST_TOKEN);

const key = (id: string) => `colourway:votes:${id}`;
const voterKey = (hash: string) => `colourway:voter:${hash}`;
/* Thirty days. Long enough that a vote is a vote rather than a session, short
   enough that the record does not outlive any interest in the question. */
const VOTER_TTL_SECONDS = 60 * 60 * 24 * 30;

type Tally = Record<string, number>;

/* Development-only store. Module scope, so it survives between requests to
   the same instance and nothing else. The map holds each voter's current
   choice, not just the fact that they voted, because a vote can be moved. */
const memory: Tally = Object.fromEntries(THEMES.map((t) => [t.id, 0]));
const memoryVoters = new Map<string, ThemeId>();

async function pipeline(commands: (string | number)[][]) {
  const res = await fetch(`${REST_URL}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Upstash responded ${res.status}`);
  return (await res.json()) as { result: unknown }[];
}

async function readTally(): Promise<Tally> {
  if (!configured) return { ...memory };
  const rows = await pipeline(THEMES.map((t) => ["GET", key(t.id)]));
  /* Clamped at zero. Moving a vote decrements the colour it came from, and a
     counter that started out of step with the voter records could otherwise
     print a negative percentage at the bottom of the page. */
  return Object.fromEntries(
    THEMES.map((t, i) => [t.id, Math.max(0, Number(rows[i]?.result ?? 0) || 0)])
  );
}

/*
  What identifies a returning voter, so their vote can be recognised and
  moved rather than counted twice.

  The address is hashed with a salt and never stored: what goes into the
  database is a 16-character digest that cannot be turned back into an IP,
  which is the least that can be kept while still being able to recognise a
  repeat. Without `VOTE_SALT` set the digest is still useless as an address,
  it is simply easier to brute force, and this is a colour poll.
*/
async function voterFingerprint(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const address = forwarded.split(",")[0]?.trim();
  if (!address) return null;
  const data = new TextEncoder().encode(
    `${process.env.VOTE_SALT ?? "colourway"}:${address}`
  );
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .slice(0, 8)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function GET() {
  try {
    return Response.json({ tally: await readTally(), live: configured });
  } catch {
    /* A dead database must not take the page down with it. The block hides
       its numbers when this happens and the switcher keeps working. */
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
}

export async function POST(request: Request) {
  let choice: unknown;
  try {
    ({ choice } = await request.json());
  } catch {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  if (!isThemeId(choice)) {
    return Response.json({ error: "unknown colourway" }, { status: 400 });
  }

  /*
    A vote can be moved, because the widget offers "Change my vote" rather
    than locking the reader out after one click. So this is not a claim check
    any more: it reads what this voter chose last, and if that was something
    else, the old colour gives the vote up as the new one takes it. The total
    only grows when someone new arrives, which is what makes the n mean what
    it says.

    With no address to fingerprint, every request counts as a new voter. On
    Vercel `x-forwarded-for` is always present, so that only happens in local
    development against the in-memory store.
  */
  try {
    const voter = await voterFingerprint(request);

    if (!configured) {
      const previous = voter ? memoryVoters.get(voter) : undefined;
      if (previous === choice) {
        return Response.json({ tally: { ...memory }, changed: false });
      }
      if (previous) memory[previous] = Math.max(0, memory[previous] - 1);
      if (voter) memoryVoters.set(voter, choice);
      memory[choice] += 1;
      return Response.json({ tally: { ...memory }, changed: true, live: false });
    }

    const previous = voter
      ? ((await pipeline([["GET", voterKey(voter)]]))[0]?.result as unknown)
      : null;

    if (previous === choice) {
      return Response.json({ tally: await readTally(), changed: false });
    }

    const commands: (string | number)[][] = [["INCR", key(choice)]];
    if (isThemeId(previous)) commands.push(["DECR", key(previous)]);
    if (voter) {
      commands.push([
        "SET",
        voterKey(voter),
        choice,
        "EX",
        VOTER_TTL_SECONDS,
      ]);
    }
    await pipeline(commands);

    return Response.json({ tally: await readTally(), changed: true, live: true });
  } catch {
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
}

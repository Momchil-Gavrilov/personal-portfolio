import { THEMES, type ThemeId, isThemeId } from "@/components/themes";
import { configured, fingerprint, pipeline } from "@/lib/kv";

/*
  The colourway tally.

  GET returns the counts, POST records one. The pages that render the block
  still ship as static HTML and fetch the numbers from here after they load.

  Storage, its two possible sets of credentials and the development fallback
  all live in `@/lib/kv`, shared with the feedback box.
*/
export const dynamic = "force-dynamic";

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
    const voter = await fingerprint(request);

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

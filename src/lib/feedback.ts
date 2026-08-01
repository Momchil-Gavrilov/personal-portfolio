import { configured, pipeline } from "@/lib/kv";
import { isThemeId, type ThemeId } from "@/components/themes";

/*
  The feedback box's store.

  Reading and writing live in one module rather than in the route that writes
  and the page that reads, because the development fallback has to be the same
  array on both sides: a comment left at the bottom of the page has to show up
  on the private page in the same `next dev` process, or the feature cannot be
  checked without a database.

  A Redis list, newest first. LPUSH then LTRIM, so the list is bounded by the
  write rather than by anything having to remember to prune it: this is a link
  on a LinkedIn post, and the failure mode worth designing for is not a
  thoughtful volume of replies.
*/
const LIST_KEY = "colourway:feedback";
const throttleKey = (hash: string) => `colourway:feedback:from:${hash}`;

export const MAX_MESSAGE = 1000;
const MAX_ENTRIES = 500;
/* One message a minute per address. Enough that someone can send a second
   thought straight after the first, little enough that a script is boring. */
const THROTTLE_SECONDS = 60;

export type Feedback = {
  message: string;
  /* Which colourway they were looking at when they wrote it, when the browser
     sent one. Half the point of the box is that it sits under the switcher,
     so knowing what was on screen is most of the context. */
  theme?: ThemeId;
  at: string;
};

/*
  The development store hangs off `globalThis` rather than off module scope,
  which looks like superstition and is not. A route handler and a page are
  compiled into separate bundles, so `import { memory }` in each gives each
  one its own array: a comment written at the bottom of the page went into
  one and the private page read the other, and the box looked broken without
  a database. `globalThis` is the one scope both bundles share, and it also
  survives the hot reload that would otherwise empty the list mid-test.
*/
const store = globalThis as typeof globalThis & {
  __colourwayFeedback?: {
    entries: Feedback[];
    throttle: Map<string, number>;
  };
};

const memory = (store.__colourwayFeedback ??= {
  entries: [] as Feedback[],
  throttle: new Map<string, number>(),
});

function parse(row: unknown): Feedback | null {
  if (typeof row !== "string") return null;
  try {
    const value = JSON.parse(row) as Partial<Feedback>;
    if (typeof value?.message !== "string" || !value.message) return null;
    return {
      message: value.message,
      theme: isThemeId(value.theme) ? value.theme : undefined,
      at: typeof value.at === "string" ? value.at : "",
    };
  } catch {
    /* Something that is not one of ours, or a truncated write. Skipping it
       beats letting one bad row empty the whole page. */
    return null;
  }
}

/* True when the message was accepted, false when this address is inside its
   cooling-off window. Throws only if the database itself is unreachable. */
export async function addFeedback(
  entry: Feedback,
  voter: string | null
): Promise<boolean> {
  if (!configured) {
    if (voter) {
      const until = memory.throttle.get(voter) ?? 0;
      if (Date.now() < until) return false;
      memory.throttle.set(voter, Date.now() + THROTTLE_SECONDS * 1000);
    }
    memory.entries.unshift(entry);
    memory.entries.length = Math.min(memory.entries.length, MAX_ENTRIES);
    return true;
  }

  if (voter) {
    /* SET NX is the whole rate limiter: the key exists for a minute after a
       message lands, and a write that cannot claim it is the second attempt
       inside that minute. */
    const claim = await pipeline([
      ["SET", throttleKey(voter), "1", "NX", "EX", THROTTLE_SECONDS],
    ]);
    if (claim[0]?.result === null) return false;
  }

  await pipeline([
    ["LPUSH", LIST_KEY, JSON.stringify(entry)],
    ["LTRIM", LIST_KEY, 0, MAX_ENTRIES - 1],
  ]);
  return true;
}

export async function readFeedback(): Promise<Feedback[]> {
  if (!configured) return [...memory.entries];
  const rows = await pipeline([["LRANGE", LIST_KEY, 0, MAX_ENTRIES - 1]]);
  const list = rows[0]?.result;
  if (!Array.isArray(list)) return [];
  return list.map(parse).filter((entry): entry is Feedback => entry !== null);
}

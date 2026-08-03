import { configured, pipeline } from "@/lib/kv";

/*
  Where readers stop.

  Vercel Web Analytics answers "how many people came and from where". It does
  not answer the only question this site actually has, which is "how far down
  did they get before they decided this was not for them, and what were they
  looking at when they gave up". Custom events are the documented way to
  approach that and they are unavailable on Hobby, capped at two properties on
  Pro, and counted rather than sequenced, so even on a paid plan the dashboard
  can say "forty people reached the story" without ever saying "and thirty of
  them left there". A funnel is the shape of the answer and Vercel does not
  draw one.

  So this counts it here, in the Upstash store the colour poll and the feedback
  box already use, in the same five Redis commands they use. What is stored is
  a tally, never a row per visitor: there is no session table, no path through
  the site per person, no identifier that outlives the request. Six hash keys,
  each one a histogram, and the interesting number is a ratio of two of them.

  The unit is one page view. The browser watches the page as it is read and
  sends a single summary when the reader leaves, which is why the exit counter
  can exist at all: the last thing on screen is only known at the end.
*/

/*
  The funnel, in the order the page is laid out, which is also the order the
  reader's questions are asked in. These are the real `id` attributes on the
  home page sections, so the browser side needs no separate mapping and a
  section that gets renamed breaks visibly rather than quietly recording
  nothing.

  `skills` is deliberately absent although it has an id. It appears twice on
  the page, once split above Research and once near the bottom, so "reached
  skills" would mean two different depths and average into nonsense.
*/
export const STEPS = [
  "top",
  "research",
  "publications",
  "work",
  "story",
  "contact",
] as const;

export type Step = (typeof STEPS)[number];

/* What a reader can do that counts as the page having worked. `casestudy` is
   in here rather than in `STEPS` because opening one is a decision, not a
   scroll position: it is the strongest signal short of the booking link. */
export const ACTIONS = [
  "booking",
  "resume",
  "email",
  "linkedin",
  "github",
  "casestudy",
  /* The case study's own primary link, whatever it happens to be. One field
     covers all of them because the content already decides what it is: on
     Wellspring it opens the live demo, on the agency study it opens the
     paper, on CaseBase the prototype. Splitting "demo" from "paper" here
     would be recording the content model twice and letting the two disagree,
     and the slug it is stored against says which kind it was. */
  "live",
  /* A paper opened from the publications list on the home page, which is a
     different act from opening one at the end of a case study: the reader
     went looking rather than being handed it. */
  "paper",
  /* The publications list starts collapsed, so whether anybody opens it at
     all is a real question and not one any scroll measurement can answer. */
  "expand",
] as const;

/*
  Where the click happened. The same booking link sits in three places and they
  are not the same offer: the one in the sticky header is available before any
  case has been made, the one in the hero is part of the introduction, and the
  one in the contact section is asked for after the reader has been through
  everything. Counting them together would hide the only thing worth knowing,
  which is whether the argument in between changes anyone's mind.
*/
export const PLACES = [
  "nav",
  "hero",
  "work",
  "research",
  "contact",
  "publications",
  /*
    A case study renders its primary link three times: in the sticky bar, under
    the title, and at the foot of the article. They are three different
    questions. The bar is for a reader who wanted the thing and is not reading
    the page; the one under the title is for a reader who has just been told
    what it is; the one at the foot is for a reader who went through the whole
    argument first. Which of the three gets used says what the case study page
    is actually for, and that is worth knowing before deciding whether the
    writing between them earns its space.
  */
  "studybar",
  "studytop",
  "studyfoot",
] as const;

export type Action = (typeof ACTIONS)[number];
export type Place = (typeof PLACES)[number];
export type Device = "mobile" | "desktop";

/* Coarse on purpose. The difference between 61% and 64% of the page is noise
   from a font loading; the difference between "the first screen" and "past
   halfway" is a finding. */
export const DEPTH_BUCKETS = ["0-25", "25-50", "50-75", "75-100"] as const;
export const DWELL_BUCKETS = ["0-10s", "10-30s", "30-60s", "1-3m", "3m+"] as const;

export type DepthBucket = (typeof DEPTH_BUCKETS)[number];
export type DwellBucket = (typeof DWELL_BUCKETS)[number];

export function depthBucket(percent: number): DepthBucket {
  if (percent < 25) return "0-25";
  if (percent < 50) return "25-50";
  if (percent < 75) return "50-75";
  return "75-100";
}

export function dwellBucket(seconds: number): DwellBucket {
  if (seconds < 10) return "0-10s";
  if (seconds < 30) return "10-30s";
  if (seconds < 60) return "30-60s";
  if (seconds < 180) return "1-3m";
  return "3m+";
}

/*
  The six keys. Every one is a Redis hash of field to count, which is what
  makes the whole thing five `HINCRBY` calls to write and six `HGETALL` calls
  to read, with no schema to migrate and nothing to prune.

  `reach` and `exit` are the pair that answers the question. A view that got as
  far as Story increments `reach` for top, research, publications, work and
  story, and increments `exit` for story alone. Divide the second by the first
  and that is the proportion of everyone who saw a section who then left at it,
  which is the drop-off rate per section that no dashboard here offers.

  Both are keyed by device as well as by step, because "the page loses people
  at the research section" and "the page loses phone readers at the research
  section" call for different fixes and the flat number cannot tell them apart.
*/
const REACH = "pulse:reach";
const EXIT = "pulse:exit";
const ACT = "pulse:act";
const DEPTH = "pulse:depth";
const DWELL = "pulse:dwell";
/* Case study pages, which have no funnel of their own worth naming. Two counts
   per slug: opened, and read to the bottom. */
const STUDY = "pulse:study";

/* Generous enough that a person opening several case studies in tabs is never
   touched, mean enough that a script pointed at the endpoint stops mattering
   after a minute. Counted per hashed address per hour. */
const WRITES_PER_HOUR = 60;
const writeKey = (hash: string) => `pulse:writes:${hash}`;

export type View = {
  path: string;
  /* Deepest funnel step reached, which for a reader who never scrolled is
     `top`. Absent on case study pages, which do not carry the sections. */
  deepest: Step | null;
  slug: string | null;
  depth: number;
  seconds: number;
  device: Device;
  actions: string[];
};

/*
  Same shape as the feedback store's development fallback and for the same
  reason: the writing route and the reading page are separate bundles, so a
  module-scoped object gives each of them their own copy and the dashboard
  reads an empty one. `globalThis` is the scope they share, and it survives the
  hot reload that would otherwise reset the numbers halfway through a test.
*/
const store = globalThis as typeof globalThis & {
  __pulse?: {
    hashes: Record<string, Record<string, number>>;
    writes: Map<string, number>;
  };
};

const memory = (store.__pulse ??= {
  hashes: {},
  writes: new Map<string, number>(),
});

function bump(key: string, field: string, by = 1) {
  const hash = (memory.hashes[key] ??= {});
  hash[field] = (hash[field] ?? 0) + by;
}

/*
  Turns one view into the list of counters it moves. Kept separate from both
  storage paths so the development fallback and the database increment exactly
  the same fields, rather than being two implementations of the same intent
  that drift the first time a bucket is added.
*/
function commandsFor(view: View): [string, string][] {
  const writes: [string, string][] = [];

  if (view.slug) {
    writes.push([STUDY, `${view.slug}:opened`]);
    /* "Read" is the bottom quarter of the page rather than the very bottom:
       a case study ends in a footer nobody needs to reach for the piece to
       have been read, and requiring 100% would count careful readers as
       bounces. */
    if (view.depth >= 75) writes.push([STUDY, `${view.slug}:read`]);
    /*
      Clicks made on a case study page are counted twice over, and on purpose.
      The `act` hash gets `live@studyfoot`, which answers "which of the three
      placements do readers use"; this gets `wellspring:live`, which answers
      "did anyone who opened Wellspring actually go and look at it". The same
      click, asked two different questions.

      The slug comes from the request path rather than from the browser, so no
      caller can invent a field name here, and `ACTIONS` holds nothing called
      `opened` or `read`, so nothing can collide with the two counts above.
    */
    for (const action of view.actions) {
      writes.push([STUDY, `${view.slug}:${action.split("@")[0]}`]);
    }
  } else if (view.deepest) {
    const reached = STEPS.slice(0, STEPS.indexOf(view.deepest) + 1);
    for (const step of reached) writes.push([REACH, `${view.device}:${step}`]);
    writes.push([EXIT, `${view.device}:${view.deepest}`]);
  }

  writes.push([DEPTH, `${view.device}:${depthBucket(view.depth)}`]);
  writes.push([DWELL, `${view.device}:${dwellBucket(view.seconds)}`]);
  for (const action of view.actions) writes.push([ACT, action]);

  return writes;
}

/*
  True when the view was counted, false when this address has already sent its
  hour's worth. Throws only if the database itself is unreachable, which the
  route turns into a 503 that the browser never sees: the beacon is fired as
  the page is being torn down and nothing is left to handle a reply.
*/
export async function record(
  view: View,
  visitor: string | null
): Promise<boolean> {
  const writes = commandsFor(view);

  if (!configured) {
    if (visitor) {
      const used = memory.writes.get(visitor) ?? 0;
      if (used >= WRITES_PER_HOUR) return false;
      memory.writes.set(visitor, used + 1);
    }
    for (const [key, field] of writes) bump(key, field);
    return true;
  }

  if (visitor) {
    /* INCR then EXPIRE rather than SET NX: the counter has to survive the
       first write of the hour and the expiry has to be set from that same
       write, or a key that is incremented forever never resets. Setting it
       again on every write inside the hour is a rolling window, which is
       fine here and one command shorter than checking first. */
    const key = writeKey(visitor);
    const used = await pipeline([
      ["INCR", key],
      ["EXPIRE", key, 3600],
    ]);
    if (Number(used[0]?.result ?? 0) > WRITES_PER_HOUR) return false;
  }

  await pipeline(writes.map(([key, field]) => ["HINCRBY", key, field, 1]));
  return true;
}

export type Tallies = {
  reach: Record<string, number>;
  exit: Record<string, number>;
  act: Record<string, number>;
  depth: Record<string, number>;
  dwell: Record<string, number>;
  study: Record<string, number>;
};

/* Upstash returns a hash over REST as the flat field, value, field, value
   array that Redis puts on the wire, not as an object. */
function toObject(result: unknown): Record<string, number> {
  if (!Array.isArray(result)) return {};
  const out: Record<string, number> = {};
  for (let i = 0; i < result.length - 1; i += 2) {
    const field = result[i];
    if (typeof field !== "string") continue;
    out[field] = Number(result[i + 1]) || 0;
  }
  return out;
}

export async function readTallies(): Promise<Tallies> {
  const keys = [REACH, EXIT, ACT, DEPTH, DWELL, STUDY];

  if (!configured) {
    const [reach, exit, act, depth, dwell, study] = keys.map((k) => ({
      ...(memory.hashes[k] ?? {}),
    }));
    return { reach, exit, act, depth, dwell, study };
  }

  const rows = await pipeline(keys.map((k) => ["HGETALL", k]));
  const [reach, exit, act, depth, dwell, study] = keys.map((_, i) =>
    toObject(rows[i]?.result)
  );
  return { reach, exit, act, depth, dwell, study };
}

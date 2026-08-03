import { fingerprint } from "@/lib/kv";
import {
  ACTIONS,
  PLACES,
  STEPS,
  record,
  type Device,
  type Step,
  type View,
} from "@/lib/pulse";

/*
  Write only, like the feedback route and for the same reason: the way to read
  the numbers is the private page at `/pulse/<key>`, which reads the store
  directly rather than through a second endpoint that would then need guarding
  of its own.

  Everything arriving here came from a browser and none of it is trusted. The
  step, the device, the actions and the slug are all checked against lists this
  file owns, and anything unrecognised is dropped rather than stored, which is
  what keeps a public counter endpoint from becoming a way to write arbitrary
  field names into someone else's Redis.
*/
export const dynamic = "force-dynamic";

/* Long enough for the deepest case study, short enough that a tab left open
   over a weekend does not land in the "3m+" bucket and pull the median with
   it. A reader still on the page after an hour is not reading it. */
const MAX_SECONDS = 3600;
/* A slug is a path segment from this site's own content. Anything with a
   different shape is not one of ours. */
const SLUG = /^[a-z0-9-]{1,64}$/;

function asStep(value: unknown): Step | null {
  return STEPS.includes(value as Step) ? (value as Step) : null;
}

function asDevice(value: unknown): Device {
  return value === "mobile" ? "mobile" : "desktop";
}

/* `booking@nav`, and only the pairs both halves of which are known. The split
   is done here rather than trusting the browser to send two fields, because
   the stored field name is the thing being protected. */
function asActions(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  for (const entry of value.slice(0, 12)) {
    if (typeof entry !== "string") continue;
    const [action, place] = entry.split("@");
    if (!ACTIONS.includes(action as never)) continue;
    if (!PLACES.includes(place as never)) continue;
    seen.add(`${action}@${place}`);
  }
  return [...seen];
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  const path = typeof body.path === "string" ? body.path : "/";
  /* Which page this was decides which counters move, and the browser does not
     get to say: the path is parsed here into either a case study slug or the
     home funnel, and a path that is neither is ignored entirely rather than
     being counted as a home page view. */
  const study = path.startsWith("/work/") ? path.slice("/work/".length) : null;
  const slug = study && SLUG.test(study) ? study : null;
  if (!slug && path !== "/") {
    return Response.json({ ok: true, counted: false });
  }

  const view: View = {
    path,
    slug,
    deepest: slug ? null : (asStep(body.deepest) ?? "top"),
    /* Clamped rather than rejected. A browser that reports 103% after an
       elastic overscroll is not lying about anything that matters. */
    depth: Math.min(100, Math.max(0, Math.round(Number(body.depth) || 0))),
    seconds: Math.min(
      MAX_SECONDS,
      Math.max(0, Math.round(Number(body.seconds) || 0))
    ),
    device: asDevice(body.device),
    actions: asActions(body.actions),
  };

  try {
    const counted = await record(view, await fingerprint(request));
    return Response.json({ ok: true, counted });
  } catch {
    /* Nothing is waiting for this. The page that sent it is already being
       unloaded, so the status code exists for the log and for curl. */
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
}

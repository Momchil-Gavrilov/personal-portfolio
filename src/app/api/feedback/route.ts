import { fingerprint } from "@/lib/kv";
import { addFeedback, MAX_MESSAGE } from "@/lib/feedback";
import { isThemeId } from "@/components/themes";

/*
  Write only, and deliberately so.

  There is no GET here. The way to read what people wrote is the private page
  at `/feedback/<key>`, which reads the list directly rather than through an
  endpoint that would have to be guarded separately: one door instead of two.
*/
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { message?: unknown; theme?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  const message =
    typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return Response.json({ error: "empty" }, { status: 400 });
  }

  try {
    const accepted = await addFeedback(
      {
        message: message.slice(0, MAX_MESSAGE),
        theme: isThemeId(body.theme) ? body.theme : undefined,
        at: new Date().toISOString(),
      },
      await fingerprint(request)
    );

    if (!accepted) {
      return Response.json({ error: "too many" }, { status: 429 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
}

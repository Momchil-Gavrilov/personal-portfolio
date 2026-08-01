/*
  Upstash over its REST API, spoken to with plain `fetch`.

  This was inside the vote route until the feedback box needed the same three
  things, and a second copy of the credential lookup is how the two drift
  apart. Vercel's KV integration is Upstash underneath and sets
  `KV_REST_API_URL` / `KV_REST_API_TOKEN`; a direct Upstash database sets
  `UPSTASH_REDIS_REST_*`. Either works and neither needs a client library,
  which keeps a poll and a comment box from adding a dependency to the site.

  With no credentials configured, each caller falls back to counting or
  collecting in memory so both features are fully working in development.
  Those fallbacks are per server instance and reset on deploy: a development
  convenience, not a database.
*/
const REST_URL =
  process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

export const configured = Boolean(REST_URL && REST_TOKEN);

export async function pipeline(commands: (string | number)[][]) {
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

/*
  What identifies a returning reader, so a vote can be recognised and moved
  rather than counted twice, and so one person cannot paste the same comment
  four hundred times.

  The address is hashed with a salt and never stored: what goes into the
  database is a 16-character digest that cannot be turned back into an IP,
  which is the least that can be kept while still recognising a repeat.
  Without `VOTE_SALT` set the digest is still useless as an address, it is
  simply easier to brute force, and this is a colour poll.
*/
export async function fingerprint(request: Request) {
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

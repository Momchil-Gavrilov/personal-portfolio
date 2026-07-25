import { publications } from "@/content/publications";

/*
  Collapsed to a single line by default. The papers matter to a reader who
  wants them and are noise to everyone else, so they cost one row of height
  until someone asks. Native <details> keeps it keyboard accessible with
  no JavaScript.

  No top border: the study list above already ends in one, and a second
  rule made the papers read as a separate section rather than part of the
  research they came out of.
*/
export default function Publications() {
  return (
    <details id="publications" className="group">
      <summary className="flex cursor-pointer list-none items-center gap-3 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon [&::-webkit-details-marker]:hidden">
        <span className="smallcaps text-ink-soft transition-colors group-hover:text-maroon">
          {publications.length} publications
        </span>
        <span
          aria-hidden="true"
          className="text-gold-deep transition-transform duration-300 group-open:rotate-90"
        >
          &rsaquo;
        </span>
      </summary>

      <ol className="list-none border-t border-line pb-6">
        {publications.map((pub) => (
          <li
            key={pub.title}
            className="grid gap-x-8 gap-y-1 border-t border-line py-4 md:grid-cols-[4rem_1fr]"
          >
            <span className="font-display text-[0.9rem] tabular-nums text-gold-deep">
              {pub.year}
            </span>
            <div className="max-w-measure">
              <p className="text-[0.95rem] leading-snug">
                {pub.url ? (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-quiet text-ink"
                  >
                    {pub.title}
                  </a>
                ) : (
                  <span className="text-ink">{pub.title}</span>
                )}
              </p>
              <p className="mt-1 text-[0.85rem] italic text-ink-soft">
                {pub.venue}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </details>
  );
}

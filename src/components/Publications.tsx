import { publications } from "@/content/publications";

/*
  Collapsed to a single line by default. The papers matter enormously to the
  reader who wants them and are a screen of scrolling to everyone else, so
  they cost one row of height until someone asks. Native <details> keeps it
  keyboard accessible with no JavaScript.

  The summary counts peer-reviewed entries separately from the total, because
  the list below labels each venue honestly and the two numbers have to agree
  with each other on sight.
*/
export default function Publications() {
  const reviewed = publications.filter((p) => p.peerReviewed).length;

  return (
    <section id="publications" className="wrap py-10 md:py-12">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center gap-3 border-y border-line py-5 [&::-webkit-details-marker]:hidden">
          <span className="eyebrow text-ink/45">
            Publications
          </span>
          <span className="text-[1.0625rem]">
            {reviewed} peer-reviewed, {publications.length} total
          </span>
          <span
            aria-hidden="true"
            className="ml-auto text-crimson transition-transform duration-300 group-open:rotate-90"
          >
            &rsaquo;
          </span>
        </summary>

        <ol className="list-none">
          {publications.map((pub) => (
            <li
              key={pub.title}
              className="grid grid-cols-[2.75rem_1fr] gap-x-4 gap-y-1 border-b border-line py-3.5 md:grid-cols-[4.375rem_1fr_17.5rem] md:gap-x-6 md:py-[1.125rem]"
            >
              <span className="font-mono text-xs tabular-nums text-ink/45">
                {pub.year}
              </span>
              <span className="text-[0.9375rem] leading-snug md:text-[1.0625rem]">
                {pub.url ? (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-quiet"
                  >
                    {pub.title}
                  </a>
                ) : (
                  pub.title
                )}
              </span>
              <span className="col-start-2 text-[0.8125rem] text-ink/55 md:col-start-3 md:row-start-1">
                {pub.venue}
              </span>
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}

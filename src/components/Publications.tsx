import { publications } from "@/content/publications";

/*
  The papers were the densest block on the page: five full academic titles
  run together. This gives each one a year anchor, room to breathe, and
  surfaces first authorship, which the citation data already knew and the
  page was throwing away.
*/
function isFirstAuthor(authors: string) {
  return authors.startsWith("Gavrilov");
}

export default function Publications() {
  return (
    <div id="publications" className="mt-14">
      <h3 className="smallcaps border-b border-line pb-3 text-ink-soft">
        Publications
      </h3>
      <ol className="list-none">
        {publications.map((pub) => {
          const first = isFirstAuthor(pub.authors);
          const title = pub.url ? (
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
          );

          return (
            <li
              key={pub.title}
              className="grid gap-x-8 gap-y-1 border-b border-line py-5 md:grid-cols-[4.5rem_1fr]"
            >
              <span className="font-display text-[0.95rem] tabular-nums text-gold-deep">
                {pub.year}
              </span>
              <div className="max-w-measure">
                <p className="leading-snug">{title}</p>
                <p className="mt-1.5 text-[0.9rem] text-ink-soft">
                  <em>{pub.venue}</em>
                  {first && (
                    <>
                      {"  ·  "}
                      <span className="font-semibold not-italic text-maroon">
                        First author
                      </span>
                    </>
                  )}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

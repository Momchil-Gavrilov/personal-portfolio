import Reveal from "@/components/Reveal";
import { publications } from "@/content/publications";

/*
  Open, not collapsed.

  In earlier versions this hid behind a disclosure to save height. For the
  reader this site is aimed at, the paper list is not overhead: five
  peer-reviewed entries with venues and years is the rarest thing on the page
  and the one a research manager checks first. Set as a plain three-column
  table, it costs about one screen and reads like a CV section, which is
  exactly what it is.
*/
export default function Publications() {
  return (
    <section id="publications" className="wrap py-16 md:py-20">
      <Reveal>
        <h2 className="display text-2xl md:text-4xl">
          {publications.length} publications
        </h2>
      </Reveal>
      <Reveal>
        <ol className="mt-8 list-none">
          {publications.map((pub, i) => (
            <li
              key={pub.title}
              className={`grid grid-cols-[2.75rem_1fr] gap-x-4 gap-y-1 border-t border-line py-3.5 md:grid-cols-[4.375rem_1fr_17.5rem] md:gap-x-6 md:py-[1.125rem] ${
                i === publications.length - 1 ? "border-b" : ""
              }`}
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
      </Reveal>
    </section>
  );
}

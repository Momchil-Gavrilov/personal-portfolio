import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { publications } from "@/content/publications";

export default function Publications() {
  return (
    <section id="publications" className="border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <Reveal>
          <SectionTitle title="Publications" />
        </Reveal>
        <Reveal>
          <ol className="max-w-[75ch] space-y-8">
            {publications.map((pub, i) => (
              <li
                key={pub.title}
                className="grid gap-x-6 gap-y-1 md:grid-cols-[2.5rem_1fr]"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-lg text-gold-deep"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-xl leading-normal text-ink">
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
                  </p>
                  <p className="mt-1 text-[0.95rem] text-ink-soft">
                    {pub.authors}
                  </p>
                  <p className="mt-1 text-[0.95rem] text-ink-soft">
                    <em>{pub.venue}</em>
                    <span aria-hidden="true" className="mx-2 text-gold">
                      ·
                    </span>
                    {pub.year}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { researchStudies } from "@/content/case-studies";
import { publications } from "@/content/publications";

export default function Research() {
  return (
    <section id="research" className="border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <Reveal>
          <SectionTitle title="Things I've studied" />
        </Reveal>
        <ol className="list-none">
          {researchStudies.map((cs, i) => {
            const number = String(i + 1).padStart(2, "0");
            const live = cs.status === "published";
            const body = (
              <div className="grid gap-x-8 gap-y-2 py-8 md:grid-cols-[3.5rem_1fr]">
                <span
                  aria-hidden="true"
                  className="font-display text-lg text-gold-deep"
                >
                  {number}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-medium text-ink transition-colors group-hover:text-maroon">
                    {cs.title}
                  </h3>
                  <p className="mt-2 max-w-measure text-ink-soft">
                    {cs.oneLiner}
                  </p>
                  <p className="smallcaps mt-3 text-ink-soft/80">
                    {cs.meta.join("  ·  ")}
                  </p>
                  {live ? (
                    <p className="mt-4 text-[0.95rem] font-semibold text-maroon">
                      Read the case study <span aria-hidden="true">→</span>
                    </p>
                  ) : (
                    <p className="smallcaps mt-4 text-gold-deep">Coming soon</p>
                  )}
                </div>
              </div>
            );
            return (
              <li key={cs.slug} className="border-b border-line first:border-t">
                {live ? (
                  <Link
                    href={`/work/${cs.slug}`}
                    className="group block focus-visible:outline-2 focus-visible:outline-maroon"
                  >
                    {body}
                  </Link>
                ) : (
                  body
                )}
              </li>
            );
          })}
        </ol>

        {/* Publications live here as a quiet coda to the research, not a
            section of their own, so they never compete for attention. */}
        <Reveal>
          <div
            id="publications"
            className="mt-8 md:grid md:grid-cols-[3.5rem_1fr] md:gap-x-8"
          >
            <h3 className="smallcaps mb-3 text-ink-soft md:mb-0">Papers</h3>
            <ol className="max-w-measure space-y-2 text-[0.9rem] leading-snug">
              {publications.map((pub) => (
                <li key={pub.title} className="text-ink-soft">
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
                  <span>
                    {" "}
                    <em>{pub.venue}</em>, {pub.year}.
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

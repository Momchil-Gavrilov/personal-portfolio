import Image from "next/image";
import Link from "next/link";
import Publications from "@/components/Publications";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { researchStudies } from "@/content/case-studies";

export default function Research() {
  return (
    <section id="research" className="border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <Reveal>
          <SectionTitle title="Human factors research" />
        </Reveal>
        <ol className="list-none">
          {researchStudies.map((cs, i) => {
            const number = String(i + 1).padStart(2, "0");
            const live = cs.status === "published";
            const body = (
              <div className="grid gap-x-8 gap-y-4 py-8 md:grid-cols-[3.5rem_1fr_11rem]">
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
                  {/* Metadata as chips rather than one long run of small caps:
                      all-caps is slow to read, and a scanning reader needs the
                      method and the sample size to separate at a glance. */}
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {cs.meta.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-cream-deep/60 px-3 py-1 text-[0.78rem] leading-snug text-ink-soft"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  {live ? (
                    <p className="mt-4 text-[0.95rem] font-semibold text-maroon">
                      Read the case study <span aria-hidden="true">→</span>
                    </p>
                  ) : (
                    <p className="smallcaps mt-4 text-gold-deep">Coming soon</p>
                  )}
                </div>
                {cs.thumb && (
                  <div className="order-first overflow-hidden rounded-lg border border-line md:order-none md:self-start">
                    <Image
                      src={cs.thumb.src}
                      alt={cs.thumb.alt}
                      width={352}
                      height={264}
                      sizes="(min-width: 768px) 11rem, 100vw"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                )}
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

        {/* Publications live here as a coda to the research, not a section of
            their own, so they never compete with the case studies above. */}
        <Reveal>
          <Publications />
        </Reveal>
      </div>
    </section>
  );
}

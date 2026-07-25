import Image from "next/image";
import Link from "next/link";
import Publications from "@/components/Publications";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { researchStudies } from "@/content/case-studies";

export default function Research() {
  return (
    <section id="research" className="border-t border-line py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <Reveal>
          <SectionTitle title="Human Factors Research" />
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
                  {/* Method and sample metadata lives on the case study page.
                      On the home page the one-liner already carries the scale. */}
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

        {/* Publications are part of this section, not a coda: they came out
            of the studies listed above, so they hang off the same list. */}
        <Publications />
      </div>
    </section>
  );
}

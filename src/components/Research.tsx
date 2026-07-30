import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { researchStudies } from "@/content/case-studies";

/*
  Three compact cards, not three full-width rows.

  The alternating rows gave every study a screen of its own, which read as
  authority but cost three scrolls before the products ever appeared. The
  reader this page is for needs the snapshot first: three real studies, the
  scale of each, the one insight it bought, and a door in. Every claim the
  rows made survives at one line each, and the whole section now fits in
  roughly a screen. Depth did not disappear; it moved to the case studies,
  which is where a reader who wants it goes anyway.
*/
export default function Research() {
  return (
    <section id="research" className="bg-paper-deep py-12 md:py-14">
      <div className="wrap">
        <Reveal>
          <SectionTitle title="Human Factors Research" />
        </Reveal>

        <ul className="mt-8 grid list-none gap-x-10 gap-y-10 md:grid-cols-3">
          {researchStudies.map((cs) => (
            <li key={cs.slug} className="flex">
              <Reveal className="flex w-full">
                <Link
                  href={`/work/${cs.slug}`}
                  className="group flex w-full flex-col"
                >
                  {cs.figure && (
                    <div className="h-52 w-full overflow-hidden rounded-card border border-line bg-white md:h-56">
                      <Image
                        src={cs.figure.src}
                        alt={cs.figure.alt}
                        width={cs.figure.width ?? 1200}
                        height={cs.figure.height ?? 800}
                        sizes="(min-width: 768px) 24rem, 100vw"
                        className={`h-full w-full ${
                          cs.figure.fit === "contain"
                            ? "object-contain p-2"
                            : "object-cover"
                        }`}
                      />
                    </div>
                  )}
                  {/* No sample-size eyebrow. It was credible and it was also
                      the third thing a reader had to get past before the
                      insight; the n and the design are both in the spec rows
                      one click away, where someone who wants them looks. */}
                  <div className="mt-4 flex flex-1 flex-col gap-2 border-t border-line pt-3.5">
                    {/* Two lines of room whether the title needs them or not.
                        Two of these titles wrap and one does not, and without
                        the floor the short one started its insight a line
                        above the others, which read as three cards rather
                        than one row. */}
                    <h3 className="display text-[1.25rem] md:min-h-[2lh]">
                      {cs.title}
                    </h3>
                    {cs.finding && (
                      <p className="text-[0.9375rem] leading-relaxed text-ink/75">
                        {cs.finding}
                      </p>
                    )}
                    {/* The caveat is not here. It is the strongest trust
                        signal in the content and it still gets volunteered
                        before anyone asks, but a card is three lines long and
                        the caveat was competing with the insight for the same
                        glance. It now opens the case study's closing section,
                        where a reader who has decided to look is the one
                        reading it. */}
                    <span className="btn-quiet mt-auto w-fit">
                      Read the case study <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

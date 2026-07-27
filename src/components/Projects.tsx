import Link from "next/link";
import DeviceFrame from "@/components/DeviceFrame";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { productStudies, type CaseStudy } from "@/content/case-studies";

/*
  The same row treatment as the research section, for the same reason.

  Cropped thumbnails in a grid asked the reader to squint at four products at
  once. As full-width alternating rows each one gets half the page, the device
  is legible, and the outcome is stated under a label rather than buried in a
  caption. It costs height, and it buys a products section that carries the
  same evidentiary weight as the research above it. For a medical device
  employer that matters: translating requirements into a shipped interface is
  half of what the job is.
*/

/* Drawn from the study's own "Status" spec row, so a card can never overstate
   what has actually shipped. */
function statusOf(cs: CaseStudy): string | undefined {
  return cs.spec?.find((row) => row.k === "Status")?.v;
}

export default function Projects() {
  return (
    <section id="work" className="border-t border-line py-16 md:py-20">
      <div className="wrap">
        <Reveal>
          <SectionTitle title="Products and Engineering Work" />
        </Reveal>

        <ol className="mt-12 flex list-none flex-col gap-14 md:gap-16">
          {productStudies.map((cs, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={cs.slug}>
                <Reveal>
                  <Link
                    href={`/work/${cs.slug}`}
                    className="group grid items-center gap-8 md:grid-cols-2 md:gap-12"
                  >
                    {cs.shot && (
                      <div className={flip ? "md:order-1" : "md:order-2"}>
                        <DeviceFrame
                          image={cs.shot}
                          sizes="(min-width: 768px) 34rem, 100vw"
                          className="h-52 w-full md:h-[21rem]"
                        />
                      </div>
                    )}

                    <div
                      className={`flex flex-col gap-[1.125rem] ${
                        flip ? "md:order-2" : "md:order-1"
                      }`}
                    >
                      {statusOf(cs) && (
                        <p className="eyebrow text-crimson">
                          {String(i + 1).padStart(2, "0")} &mdash;{" "}
                          {statusOf(cs)}
                        </p>
                      )}

                      <h3 className="display text-[1.625rem] md:text-[2.125rem]">
                        {cs.title}
                      </h3>

                      {/* The oneLiner is gone from here. The title and a
                          legible screenshot already say what the thing is,
                          and the outcome says the only part that matters. */}

                      {/* The same navy rule the research findings carry. A
                          shipped result and a measured result are both
                          results, and the page should say so. */}
                      {cs.outcome && (
                        <div className="border-l-2 border-navy pl-5">
                          <p className="eyebrow text-ink/45">Outcome</p>
                          <p className="mt-2 max-w-[46ch] text-[1.0625rem] leading-relaxed">
                            {cs.outcome}
                          </p>
                        </div>
                      )}

                      <span className="text-sm text-crimson group-hover:underline">
                        Open case study <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

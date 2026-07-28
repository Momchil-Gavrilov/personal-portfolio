import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { researchStudies } from "@/content/case-studies";

/*
  Full-width alternating rows, on the page's one tinted band.

  This is the section that decides whether a medical device reader keeps
  going, so it gets the width: a photograph of the actual session at half the
  page, the scale of the study in the eyebrow, and the finding with its
  statistic called out under a label so it cannot be missed by someone
  scanning. A reader who never opens a case study still leaves knowing what
  was measured and what came out of it.

  The figure alternates sides so three stacked rows do not read as a template.
*/
export default function Research() {
  return (
    <section id="research" className="bg-paper-deep py-16 md:py-20">
      <div className="wrap">
        <Reveal>
          <SectionTitle title="Human Factors Research" />
        </Reveal>

        <ol className="mt-12 flex list-none flex-col gap-14 md:gap-16">
          {researchStudies.map((cs, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={cs.slug}>
                <Reveal>
                  <Link
                    href={`/work/${cs.slug}`}
                    className="group grid items-center gap-8 md:grid-cols-2 md:gap-12"
                  >
                    {cs.figure && (
                      <div
                        className={`overflow-hidden rounded-card border border-line bg-white ${
                          flip ? "md:order-1" : "md:order-2"
                        }`}
                      >
                        <Image
                          src={cs.figure.src}
                          alt={cs.figure.alt}
                          width={cs.figure.width ?? 1200}
                          height={cs.figure.height ?? 800}
                          sizes="(min-width: 768px) 34rem, 100vw"
                          className={`aspect-4/3 w-full ${
                            cs.figure.fit === "contain"
                              ? "object-contain p-2"
                              : "object-cover"
                          }`}
                        />
                      </div>
                    )}

                    <div
                      className={`flex flex-col gap-[1.125rem] ${
                        flip ? "md:order-2" : "md:order-1"
                      }`}
                    >
                      <p className="eyebrow text-crimson">
                        {String(i + 1).padStart(2, "0")}
                        {cs.eyebrow ? ` — ${cs.eyebrow}` : ""}
                      </p>

                      <h3 className="display text-[1.625rem] md:text-[2.125rem]">
                        {cs.title}
                      </h3>

                      {/* The hook, not the oneLiner. The oneLiner is written
                          to open a case study and runs three lines here. */}
                      <p className="max-w-[42ch] text-[1.0625rem] leading-relaxed text-ink/75 md:text-[1.1875rem]">
                        {cs.hook ?? cs.oneLiner}
                      </p>

                      {/*
                        Finding and limitation as a two-row table rather than
                        two left-ruled callouts. Stacked bracket shapes with
                        mono labels inside them read as clutter at this size;
                        a hairline and a label in the margin is the same
                        information with nothing drawn around it, and it
                        matches how the rest of the site separates things.

                        The label sits in its own column on wide screens so
                        the two bodies of text share one left edge with the
                        heading above them.
                      */}
                      <dl className="mt-1 border-t border-line">
                        {cs.finding && (
                          <div className="grid gap-1 border-b border-line py-4 lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-5">
                            <dt className="eyebrow pt-1 text-ink/40">Finding</dt>
                            <dd className="max-w-[46ch] text-[1.0625rem] leading-relaxed">
                              {cs.finding}
                            </dd>
                          </div>
                        )}
                        {cs.limitation && (
                          <div className="grid gap-1 border-b border-line py-4 lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-5">
                            <dt className="eyebrow pt-1 text-ink/40">Limits</dt>
                            <dd className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink/60">
                              {cs.limitation}
                            </dd>
                          </div>
                        )}
                      </dl>

                      <span className="text-sm text-crimson group-hover:underline">
                        Read the case study <span aria-hidden="true">→</span>
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

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
                      {/* No index and no crimson. The number counted nothing a
                          reader needed, and colour on a line this small read
                          as decoration competing with the title under it. */}
                      {cs.eyebrow && (
                        <p className="eyebrow text-ink/45">{cs.eyebrow}</p>
                      )}

                      <h3 className="display text-[1.5rem] md:text-[1.75rem]">
                        {cs.title}
                      </h3>

                      {/* The hook, not the oneLiner. The oneLiner is written
                          to open a case study and runs three lines here. */}
                      <p className="max-w-[44ch] text-[1.0625rem] leading-relaxed text-ink/75">
                        {cs.hook ?? cs.oneLiner}
                      </p>

                      {/*
                        One left edge, one rule, two type sizes.

                        Earlier versions put the labels in a margin column,
                        which gave the block a second left edge and made the
                        text start in two places. The mess was structural, not
                        verbal. Now the rule marks where the setup ends and the
                        result begins, the finding is the largest thing in the
                        column after the title, and the limit trails it in
                        smaller grey with the label run into the sentence
                        rather than floating above it.
                      */}
                      {cs.finding && (
                        <div className="border-t border-line pt-5">
                          <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed">
                            {cs.finding}
                          </p>
                          {cs.limitation && (
                            <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink/55">
                              <span className="eyebrow text-ink/40">
                                Limits&nbsp;&mdash;{" "}
                              </span>
                              {cs.limitation}
                            </p>
                          )}
                        </div>
                      )}

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

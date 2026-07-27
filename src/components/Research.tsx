import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { researchStudies } from "@/content/case-studies";
import { site } from "@/content/site";

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

                      <p className="max-w-[44ch] text-[1.0625rem] leading-relaxed text-ink/75 md:text-[1.1875rem]">
                        {cs.oneLiner}
                      </p>

                      {/* Labelled, because a reader scanning for evidence
                          should not have to work out which sentence is the
                          result. The navy rule is the same one used on the
                          stat figures above: it marks a measured thing. */}
                      {cs.finding && (
                        <div className="border-l-2 border-navy pl-5">
                          <p className="eyebrow text-ink/45">Finding</p>
                          <p className="mt-2 max-w-[46ch] text-[1.0625rem] leading-relaxed">
                            {cs.finding}
                          </p>
                        </div>
                      )}

                      {/*
                        The limitation, in his words, volunteered rather than
                        waited for. It gets a lighter rule than the finding so
                        the hierarchy stays honest: this qualifies the result,
                        it does not compete with it. Almost no portfolio does
                        this, and it is the first thing an interviewer probes.
                      */}
                      {cs.limitation && (
                        <div className="border-l-2 border-line-strong pl-5">
                          <p className="eyebrow text-ink/45">
                            What it does not show
                          </p>
                          <p className="mt-2 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink/65">
                            {cs.limitation}
                          </p>
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

        {/*
          The only CTA between the hero and the footer, and it is here because
          this is where conviction peaks: a research reader has just seen three
          studies with their results. Previously they had to scroll past
          publications, four products and a personal essay before they could
          act on that. Phrased as an offer to talk through method rather than
          as a pitch, because method is what they would actually ask about.
        */}
        <Reveal>
          <p className="mt-14 border-t border-line pt-8 text-[1.0625rem] text-ink/70 md:mt-16">
            Happy to walk through how any of these ran, including the parts
            that did not work.{" "}
            <a
              href={site.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-crimson hover:underline"
            >
              Book a call <span aria-hidden="true">→</span>
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

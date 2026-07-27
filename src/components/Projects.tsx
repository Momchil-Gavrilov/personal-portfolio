import Image from "next/image";
import Link from "next/link";
import DeviceFrame from "@/components/DeviceFrame";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { productStudies, type CaseStudy } from "@/content/case-studies";

/*
  One lead story and three briefs, the way a page of a magazine is set.

  The app-icon tiles are gone. An icon says what a thing is called; a
  screenshot says what it is, and for a reader deciding whether this person
  ships, that is the whole question. The one product real people depend on
  daily gets the lead slot and twice the width.
*/

/* Drawn from the study's own "Status" spec row, so a card can never overstate
   what has actually shipped. */
function statusOf(cs: CaseStudy): string | undefined {
  return cs.spec?.find((row) => row.k === "Status")?.v;
}

export default function Projects() {
  const [lead, ...rest] = productStudies;

  return (
    <section id="work" className="wrap pb-18 md:pb-24">
      <Reveal>
        <SectionTitle title="Products and Engineering Work" />
      </Reveal>

      {lead && (
        <Reveal>
          <Link
            href={`/work/${lead.slug}`}
            className="group mt-8 grid items-center gap-8 rounded-card border border-line bg-paper-deep p-6 md:grid-cols-[1fr_25rem] md:gap-12 md:p-8"
          >
            <div className="flex flex-col gap-3.5">
              {statusOf(lead) && (
                <p className="eyebrow text-crimson">
                  <span aria-hidden="true">●</span> {statusOf(lead)}
                </p>
              )}
              <h3 className="display text-2xl md:text-[1.8125rem]">
                {lead.title}
              </h3>
              <p className="max-w-[58ch] text-[1.0625rem] leading-relaxed text-ink/72">
                {lead.oneLiner}
              </p>
              <span className="text-sm text-crimson group-hover:underline">
                Open case study <span aria-hidden="true">→</span>
              </span>
            </div>
            {lead.shot && (
              <DeviceFrame
                image={lead.shot}
                sizes="(min-width: 768px) 12rem, 9rem"
                className="h-72 w-full md:h-[23rem]"
              />
            )}
          </Link>
        </Reveal>
      )}

      <Reveal>
        {/* Phones get horizontal rows, not stacked cards. Three full-width
            cards with 200px images cost most of a screen each; as rows with a
            thumbnail they cost a third of that and lose no information. */}
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((cs) => (
            <li key={cs.slug}>
              <Link
                href={`/work/${cs.slug}`}
                /* items-start is for the phone row layout only. Left to apply
                   at sm it stops the device frames stretching to the column,
                   and each one collapses to its own content width. */
                className="group grid h-full grid-cols-[6rem_1fr] items-start gap-4 sm:flex sm:flex-col sm:items-stretch sm:gap-3.5"
              >
                {cs.shot && (
                  <>
                    {/* Phones get a plain square crop. In the 96px thumbnail
                        of the row layout a device bezel renders the screen
                        itself about 20px wide, which shows nothing at all. */}
                    <Image
                      src={cs.shot.src}
                      alt={cs.shot.alt}
                      width={cs.shot.width ?? 800}
                      height={cs.shot.height ?? 600}
                      sizes="6rem"
                      className="h-24 w-full rounded-card border border-line bg-white object-cover object-top sm:hidden"
                    />
                    <div className="hidden sm:block sm:h-[15.5rem]">
                      <DeviceFrame
                        image={cs.shot}
                        sizes="22rem"
                        className="h-full w-full"
                      />
                    </div>
                  </>
                )}
                <div className="flex h-full flex-col gap-2 sm:contents">
                  {statusOf(cs) && (
                    <p className="eyebrow text-ink/45">{statusOf(cs)}</p>
                  )}
                  <h3 className="display text-xl md:text-2xl">{cs.title}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-ink/68">
                    {cs.outcome ?? cs.oneLiner}
                  </p>
                  <span className="mt-auto pt-1 text-sm text-crimson group-hover:underline">
                    Open case study <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

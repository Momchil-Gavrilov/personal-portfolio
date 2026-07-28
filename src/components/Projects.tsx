import Link from "next/link";
import DeviceBundle from "@/components/DeviceBundle";
import DeviceFrame from "@/components/DeviceFrame";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { productStudies, type CaseStudy } from "@/content/case-studies";

/*
  One showcase and three below it.

  Four equal cards gave the product real people depend on daily the same
  weight as a prototype, and four full rows cost most of two screens. The lead
  gets a row and a three-device shot; the rest get a wide three-up where the
  image is the tallest thing in the card, because these are visual pieces of
  work and the graphics are the reason to look.
*/

/* Drawn from the study's own "Status" spec row, so a card can never overstate
   what has actually shipped. */
function statusOf(cs: CaseStudy): string | undefined {
  return cs.spec?.find((row) => row.k === "Status")?.v;
}

export default function Projects() {
  const [lead, ...rest] = productStudies;

  return (
    <section id="work" className="border-t border-line py-16 md:py-20">
      <div className="wrap">
        <Reveal>
          <SectionTitle title="Products and Engineering Work" />
        </Reveal>

        {lead && (
          <Reveal>
            <Link
              href={`/work/${lead.slug}`}
              className="group mt-10 grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-14"
            >
              <div className="flex flex-col gap-4">
                {statusOf(lead) && (
                  <p className="eyebrow text-crimson">{statusOf(lead)}</p>
                )}
                <h3 className="display text-[1.75rem] md:text-[2.25rem]">
                  {lead.title}
                </h3>
                <p className="max-w-[44ch] text-[1.0625rem] leading-relaxed text-ink/75">
                  {lead.oneLiner}
                </p>
                <p className="max-w-[44ch] border-t border-line pt-4 text-[1.0625rem] leading-relaxed">
                  {lead.outcome}
                </p>
                <span className="text-sm text-crimson group-hover:underline">
                  Open case study <span aria-hidden="true">→</span>
                </span>
              </div>

              {lead.bundle && lead.shot && (
                <DeviceBundle
                  laptop={lead.bundle.laptop}
                  tablet={lead.bundle.tablet}
                  phone={lead.shot}
                  className="aspect-8/5 w-full"
                />
              )}
            </Link>
          </Reveal>
        )}

        {/* The image leads and it is the tallest thing in the card. These are
            visual pieces of work; a reader recognises them by looking. */}
        <ul className="mt-16 grid list-none gap-x-10 gap-y-12 sm:grid-cols-3 md:mt-20">
          {rest.map((cs) => (
            <li key={cs.slug} className="flex">
              <Reveal className="flex w-full">
                <Link
                  href={`/work/${cs.slug}`}
                  className="group flex w-full flex-col"
                >
                  {cs.shot && (
                    <DeviceFrame
                      image={cs.shot}
                      sizes="(min-width: 640px) 21rem, 100vw"
                      className="h-56 w-full md:h-[15.5rem]"
                    />
                  )}
                  <div className="mt-6 flex flex-1 flex-col gap-2 border-t border-line pt-4">
                    {statusOf(cs) && (
                      <p className="eyebrow text-crimson">{statusOf(cs)}</p>
                    )}
                    <h3 className="display text-[1.25rem]">{cs.title}</h3>
                    <p className="text-[0.9375rem] leading-relaxed text-ink/70">
                      {cs.outcome ?? cs.oneLiner}
                    </p>
                    <span className="mt-auto pt-2 text-sm text-crimson group-hover:underline">
                      Open case study <span aria-hidden="true">→</span>
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

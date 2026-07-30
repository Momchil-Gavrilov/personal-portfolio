import Image from "next/image";
import Link from "next/link";
import DeviceFrame from "@/components/DeviceFrame";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { productStudies, type CaseStudy } from "@/content/case-studies";

/*
  One showcase and three below it.

  Four equal cards gave the product real people depend on daily the same
  weight as a prototype, and four full rows cost most of two screens. The lead
  gets a row and a photograph of the place; the rest get a wide three-up where
  the image is the tallest thing in the card, because these are visual pieces
  of work and the graphics are the reason to look.

  The whole section is sized to land inside one laptop screen. Every height
  here is set against that budget: the showcase photograph is capped at the
  height the text beside it already needs, and the three-up images give up a
  couple of rem rather than the section giving up a scroll.
*/

/* Drawn from the study's own "Status" spec row, so a card can never overstate
   what has actually shipped. */
function statusOf(cs: CaseStudy): string | undefined {
  return cs.spec?.find((row) => row.k === "Status")?.v;
}

export default function Projects() {
  const [lead, ...rest] = productStudies;

  return (
    <section id="work" className="pt-4 pb-10">
      <div className="wrap">
        <Reveal>
          <SectionTitle title="Products and Engineering Work" />
        </Reveal>

        {lead && (
          <Reveal>
            {/* The showcase takes the tint so the one product real people
                depend on daily is visibly a different order of thing from the
                three below it, which stay on paper. */}
            <Link
              href={`/work/${lead.slug}`}
              className="group mt-6 grid items-center gap-5 rounded-card bg-paper-deep p-5 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8 md:p-6"
            >
              {/* No status eyebrow and no oneLiner: the photograph says who
                  it is for, and the outcome line is the hook. Detail lives
                  one click away. */}
              <div className="flex flex-col gap-3.5">
                <h3 className="display text-[1.5rem] md:text-[1.75rem]">
                  {lead.title}
                </h3>
                <p className="max-w-[44ch] text-[1.0625rem] leading-relaxed">
                  {lead.outcome}
                </p>
                <span className="btn-quiet w-fit group-hover:bg-crimson group-hover:text-paper">
                  Open case study <span aria-hidden="true">→</span>
                </span>
              </div>

              {/* The photograph of the place, not a render of the screens.
                  The device cluster showed what the app looks like, which the
                  case study shows anyway; this shows the center it was built
                  for and the people it was built with, which nothing else on
                  the page does. */}
              {lead.photo && (
                <div className="w-full max-w-[12rem] overflow-hidden rounded-card border border-line bg-white md:justify-self-end">
                  <Image
                    src={lead.photo.src}
                    alt={lead.photo.alt}
                    width={lead.photo.width ?? 1080}
                    height={lead.photo.height ?? 1080}
                    sizes="(min-width: 768px) 12rem, 100vw"
                    className="block h-full w-full object-cover"
                  />
                </div>
              )}
            </Link>
          </Reveal>
        )}

        {/* The image leads and it is the tallest thing in the card. These are
            visual pieces of work; a reader recognises them by looking. */}
        <ul className="mt-7 grid list-none gap-x-10 gap-y-10 sm:grid-cols-3">
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
                      className="h-32 w-full md:h-36"
                    />
                  )}
                  <div className="mt-5 flex flex-1 flex-col gap-2 border-t border-line pt-4">
                    {statusOf(cs) && (
                      <p className="eyebrow text-ink/45">{statusOf(cs)}</p>
                    )}
                    <h3 className="display text-[1.25rem]">{cs.title}</h3>
                    <p className="text-[0.9375rem] leading-relaxed text-ink/70">
                      {cs.outcome ?? cs.oneLiner}
                    </p>
                    <span className="btn-quiet mt-auto w-fit group-hover:bg-crimson group-hover:text-paper">
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

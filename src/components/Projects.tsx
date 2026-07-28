import Link from "next/link";
import DeviceFrame from "@/components/DeviceFrame";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { productStudies, type CaseStudy } from "@/content/case-studies";

/*
  Four cards on a two by two grid: device above, name below.

  As full-width alternating rows this section was as tall as the research
  above it, which put the products at the same weight as the studies and cost
  most of two screens. As cards it costs half that, and a product is a thing
  you recognise by looking at it rather than by reading about it, so the
  device does the work and the words underneath stay to a line.
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

        <ul className="mt-10 grid list-none gap-x-12 gap-y-12 sm:grid-cols-2">
          {productStudies.map((cs) => (
            <li key={cs.slug} className="flex">
              {/* h-full through the reveal wrapper too, or the cards in a row
                  size independently and their titles stop lining up. */}
              <Reveal className="flex w-full">
                <Link
                  href={`/work/${cs.slug}`}
                  className="group flex w-full flex-col"
                >
                  {cs.shot && (
                    <DeviceFrame
                      image={cs.shot}
                      sizes="(min-width: 640px) 32rem, 100vw"
                      className="h-56 w-full md:h-[17rem]"
                    />
                  )}

                  <div className="mt-6 flex flex-col gap-2.5 border-t border-line pt-5">
                    {statusOf(cs) && (
                      <p className="eyebrow text-crimson">{statusOf(cs)}</p>
                    )}
                    <h3 className="display text-[1.375rem] md:text-[1.625rem]">
                      {cs.title}
                    </h3>
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

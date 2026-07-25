import Image from "next/image";
import Link from "next/link";
import Publications from "@/components/Publications";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { researchStudies } from "@/content/case-studies";

/*
  Evidence cards, not list rows.

  This is the section that decides whether a medical device reader keeps going,
  so it gets the weight: the real figure at a size you can actually read, the
  specification a reviewer scans for, and the finding with its statistic left
  visible. Everything here is already in the case study; the point is that a
  reader who never opens one still leaves knowing what was measured and what
  came out of it.

  The figure alternates sides so three stacked cards do not read as a template.
*/
export default function Research() {
  return (
    <section id="research" className="border-t border-line py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <Reveal>
          <SectionTitle title="Human Factors Research" />
        </Reveal>

        <ol className="flex list-none flex-col gap-12 md:gap-16">
          {researchStudies.map((cs, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={cs.slug}>
                <Reveal>
                  <article className="grid items-center gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-10">
                    {cs.figure && (
                      <figure
                        className={
                          flip ? "md:order-2 md:col-start-2" : undefined
                        }
                      >
                        <div className="overflow-hidden rounded-xl border border-line bg-cream-deep">
                          <Image
                            src={cs.figure.src}
                            alt={cs.figure.alt}
                            width={cs.figure.width ?? 1200}
                            height={cs.figure.height ?? 800}
                            sizes="(min-width: 768px) 30rem, 100vw"
                            className="h-auto w-full"
                          />
                        </div>
                      </figure>
                    )}

                    <div className={flip ? "md:order-1 md:row-start-1" : undefined}>
                      <h3 className="font-display text-2xl font-medium leading-snug text-ink md:text-[1.75rem]">
                        {cs.title}
                      </h3>

                      {cs.spec && (
                        <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 border-y border-line py-4">
                          {cs.spec.map((row) => (
                            <div key={row.k}>
                              <dt className="smallcaps text-[0.65rem] text-ink-soft">
                                {row.k}
                              </dt>
                              <dd className="mt-0.5 text-[0.9rem] font-semibold leading-snug text-ink">
                                {row.v}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      )}

                      {cs.finding && (
                        <p className="mt-5 font-display text-lg leading-snug text-ink">
                          {cs.finding}
                        </p>
                      )}

                      <p className="mt-5 text-[0.95rem] font-semibold text-maroon">
                        <Link
                          href={`/work/${cs.slug}`}
                          className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon hover:underline"
                        >
                          Read the case study <span aria-hidden="true">→</span>
                        </Link>
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>

        {/* Publications are part of this section, not a coda: they came out
            of the studies listed above, so they hang off the same list. */}
        <div className="mt-10 border-t border-line md:mt-12">
          <Publications />
        </div>
      </div>
    </section>
  );
}

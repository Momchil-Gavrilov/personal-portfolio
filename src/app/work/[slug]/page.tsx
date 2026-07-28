import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import TrialWalkthrough from "@/components/TrialWalkthrough";
import { caseStudies } from "@/content/case-studies";
import { site } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies
    .filter((cs) => cs.status === "published" && cs.sections)
    .map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: `${cs.title} · ${site.name}`,
    description: cs.oneLiner,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs || cs.status !== "published" || !cs.sections) notFound();

  return (
    <>
      {/*
        The live link rides in the sticky bar, so it is reachable from any
        scroll position rather than only from the sections that happen to
        mention it. Back sits on the right with it: a reader looking for a way
        out of a page looks where the controls are, and every control on this
        bar is now on the same side.
      */}
      <header className="sticky top-0 z-10 border-b border-line bg-paper/95 backdrop-blur-sm">
        <nav
          aria-label="Main"
          className="wrap flex items-center justify-between gap-6 py-3"
        >
          <Link
            href="/"
            className="text-xl font-semibold tracking-[-0.02em] text-ink"
          >
            {site.name}
          </Link>
          <div className="flex items-center gap-5">
            <Link href="/#work" className="text-sm text-ink/60 hover:text-ink">
              All case studies <span aria-hidden="true">→</span>
            </Link>
            {cs.liveUrl && (
              <a
                href={cs.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary px-[1.125rem] py-2.5"
              >
                {cs.liveLabel ?? "View live"}
              </a>
            )}
          </div>
        </nav>
      </header>
      <main className="wrap py-14 md:py-20">
        <article>
          <header className="max-w-measure">
            <p className="eyebrow text-crimson">Case study</p>
            <h1 className="display mt-4 max-w-[24ch] text-4xl md:text-[3.25rem]">
              {cs.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink/75">
              {cs.oneLiner}
            </p>
          </header>

          {/*
            The decision that shaped the work, placed at the top of the case
            study rather than on the home page. It is judgment evidence, and
            judgment only matters to a reader who already believes the person
            can do the job. By the time someone has opened a case study, they
            do, and this is the first thing worth telling them.
          */}
          {cs.lesson && (
            <div className="mt-10 max-w-measure border-l-2 border-navy bg-paper-deep/60 p-6">
              <p className="eyebrow text-ink/45">Lesson learned</p>
              <p className="mt-3 text-[1.0625rem] leading-relaxed">
                {cs.lesson}
              </p>
            </div>
          )}

          {/*
            The specification runs as a strip directly under the title, not as
            a pinned card off to the right. In the rail it arrived level with
            the third paragraph, in the margin, boxed and tinted, which is
            where a reader has learned to expect an advertisement. Here it is
            the first thing after the summary, it reads as a fact panel, and
            the narrative gets the full measure back.
          */}
          {cs.spec && (
            <dl className="mt-10 grid gap-x-10 gap-y-5 border-y border-line py-5 sm:grid-cols-2 lg:grid-cols-4">
              {cs.spec.map((row) => (
                <div key={row.k}>
                  <dt className="eyebrow text-ink/40">{row.k}</dt>
                  <dd className="mt-1.5 text-[0.9375rem] leading-snug">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-14 space-y-14">
            {cs.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="display text-2xl">{section.heading}</h2>
                <div className="mt-4 max-w-measure space-y-5 leading-[1.75] text-ink/80">
                  {section.paragraphs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                {section.image && (
                  <figure
                    className={
                      section.image.shape === "phone"
                        ? "mt-8 max-w-[16rem]"
                        : section.image.shape === "portrait"
                          ? "mt-8 max-w-sm"
                          : "mt-8 max-w-3xl"
                    }
                  >
                    <div className="overflow-hidden rounded-card border border-line bg-white">
                      <Image
                        src={section.image.src}
                        alt={section.image.alt}
                        width={
                          section.image.width ??
                          (section.image.shape === "phone" ? 331 : 1200)
                        }
                        height={
                          section.image.height ??
                          (section.image.shape === "phone" ? 709 : 800)
                        }
                        className="h-auto w-full"
                        sizes={
                          section.image.shape === "phone"
                            ? "16rem"
                            : "(min-width: 768px) 42rem, 100vw"
                        }
                      />
                    </div>
                    {section.image.caption && (
                      <figcaption className="mt-3 text-[0.9rem] text-ink/55">
                        {section.image.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
                {section.component === "trial-walkthrough" && (
                  <TrialWalkthrough />
                )}
              </section>
            ))}
          </div>

          <footer className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-8">
            {cs.liveUrl && (
              <a
                href={cs.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {cs.liveLabel ?? "View live"}
                <span aria-hidden="true">→</span>
              </a>
            )}
            <Link href="/#work" className="text-sm text-crimson hover:underline">
              <span aria-hidden="true">←</span> Back to all case studies
            </Link>
          </footer>
        </article>
      </main>
    </>
  );
}

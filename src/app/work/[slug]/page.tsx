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
      <header className="sticky top-0 z-10 border-b border-line bg-cream/90 backdrop-blur-sm">
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-5xl items-baseline justify-between px-6 py-4 md:px-8"
        >
          <Link
            href="/"
            className="font-display text-lg font-semibold text-maroon"
          >
            {site.name}
          </Link>
          <Link href="/#work" className="smallcaps text-ink-soft hover:text-maroon">
            <span aria-hidden="true">←</span> All case studies
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-14 md:px-8 md:py-20">
        <article>
          <header className="max-w-measure">
            <p className="smallcaps text-ink-soft">Case study</p>
            <h1 className="mt-4 max-w-[24ch] font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">
              {cs.title}
            </h1>
            <span className="rule-gold mt-6" aria-hidden="true" />
            <p className="mt-6 text-lg leading-snug text-ink-soft">
              {cs.oneLiner}
            </p>
          </header>

          {/*
            Two columns: the narrative keeps the measure it has always had, and
            the specification moves into the ~40% of page width that used to be
            empty cream. Pinned, so a reader who is nine paragraphs deep can
            still see the method and the sample without scrolling back up.
          */}
          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12">
            <div className="order-2 space-y-12 lg:order-1">
              {cs.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-2xl font-medium text-maroon">
                    {section.heading}
                  </h2>
                  <div className="mt-4 max-w-measure space-y-5">
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
                            : "mt-8"
                      }
                    >
                      <div className="overflow-hidden rounded-2xl border border-line bg-cream-deep shadow-[0_4px_24px_rgba(43,38,34,0.10)]">
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
                        <figcaption className="mt-3 text-[0.9rem] text-ink-soft">
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

            <aside className="order-1 lg:order-2">
              <div className="rounded-xl border border-line bg-cream-deep/50 p-5 lg:sticky lg:top-24">
                <h2 className="smallcaps text-ink-soft">At a glance</h2>
                {cs.spec && (
                  <dl className="mt-4 space-y-3.5">
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
                {cs.liveUrl && (
                  <a
                    href={cs.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-maroon px-4 py-2 text-[0.85rem] text-cream transition-colors hover:bg-maroon-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon"
                  >
                    {cs.liveLabel ?? "View live"}
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </aside>
          </div>

          <footer className="mt-16 border-t border-line pt-8">
            <Link href="/#work" className="link-quiet text-[0.95rem]">
              <span aria-hidden="true">←</span> Back to all case studies
            </Link>
          </footer>
        </article>
      </main>
    </>
  );
}

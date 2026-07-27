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
      <header className="sticky top-0 z-10 border-b border-line bg-paper/95 backdrop-blur-sm">
        <nav
          aria-label="Main"
          className="wrap flex items-center justify-between gap-8 py-4"
        >
          <Link
            href="/"
            className="text-xl font-semibold tracking-[-0.02em] text-ink"
          >
            {site.name}
          </Link>
          <Link href="/#work" className="text-sm text-ink/60 hover:text-ink">
            <span aria-hidden="true">←</span> All case studies
          </Link>
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
            Two columns: the narrative keeps the measure it has always had, and
            the specification moves into the ~40% of page width that used to be
            empty paper. Pinned, so a reader who is nine paragraphs deep can
            still see the method and the sample without scrolling back up.
          */}
          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12">
            <div className="order-2 space-y-12 lg:order-1">
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
                            : "mt-8"
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

            <aside className="order-1 lg:order-2">
              <div className="rounded-card border-t-2 border-navy bg-paper-deep p-5 lg:sticky lg:top-24">
                <h2 className="eyebrow text-ink/45">At a glance</h2>
                {cs.spec && (
                  <dl className="mt-4 space-y-3.5">
                    {cs.spec.map((row) => (
                      <div key={row.k}>
                        <dt className="eyebrow text-[0.625rem] text-ink/45">
                          {row.k}
                        </dt>
                        <dd className="mt-1 text-[0.9rem] font-medium leading-snug">
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
                    className="btn btn-primary mt-5 px-4 py-2.5 text-[0.85rem]"
                  >
                    {cs.liveLabel ?? "View live"}
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </aside>
          </div>

          <footer className="mt-16 border-t border-line pt-8">
            <Link href="/#work" className="text-sm text-crimson hover:underline">
              <span aria-hidden="true">←</span> Back to all case studies
            </Link>
          </footer>
        </article>
      </main>
    </>
  );
}

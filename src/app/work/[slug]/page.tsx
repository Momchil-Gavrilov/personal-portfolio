import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    title: `${cs.title} — ${site.name}`,
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
      <main className="mx-auto max-w-5xl px-6 py-16 md:px-8 md:py-24">
        <article>
          <header>
            <p className="smallcaps text-ink-soft">Case study</p>
            <h1 className="mt-4 max-w-[24ch] font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">
              {cs.title}
            </h1>
            <span className="rule-gold mt-6" aria-hidden="true" />
            <ul className="mt-6 space-y-1">
              {cs.meta.map((line) => (
                <li key={line} className="smallcaps text-ink-soft">
                  {line}
                </li>
              ))}
            </ul>
          </header>
          <div className="mt-14 space-y-12">
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
              </section>
            ))}
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

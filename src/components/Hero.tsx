import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { heroArtifact, site } from "@/content/site";

/*
  The portrait renders only when a headshot file exists in /public.
  Drop in headshot.jpg (or .png/.webp) and rebuild; no code changes needed.
*/
function findHeadshot(): string | null {
  for (const file of ["headshot.jpg", "headshot.jpeg", "headshot.png", "headshot.webp"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", file))) return `/${file}`;
  }
  return null;
}

export default function Hero() {
  const headshot = findHeadshot();

  return (
    <section id="top" aria-label="Introduction" className="pt-10 pb-14 md:pt-14 md:pb-16">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        {/* Text first in the DOM so a phone opens on the name, not the face. */}
        <div className="grid gap-10 md:grid-cols-[1fr_minmax(0,22rem)] md:items-center md:gap-12">
          <div>
            {/* The portrait rides alongside the name at byline scale. It says
                who is speaking; the artifact beside it says what they do. */}
            <div className="flex items-center gap-4">
              {headshot && (
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-gold">
                  <Image
                    src={headshot}
                    alt={`Portrait of ${site.name}`}
                    fill
                    sizes="3.5rem"
                    className="object-cover object-center"
                    priority
                  />
                </div>
              )}
              <div className="min-w-0">
                <p className="smallcaps text-ink-soft">{site.role}</p>
                <h1 className="mt-1 font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
                  {site.name}
                </h1>
              </div>
            </div>

            <p className="mt-7 max-w-[20ch] font-display text-4xl font-light leading-[1.12] text-ink md:max-w-[16ch] md:text-[3.25rem]">
              {site.tagline.lead}{" "}
              <em className="text-maroon">{site.tagline.accent}</em>.
            </p>

            <p className="mt-6 smallcaps text-ink-soft">{site.degree}</p>

            {/* The primary CTA sits here as well as in Contact: most visitors
                never scroll to the bottom of the page. */}
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={site.booking.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-maroon px-6 py-3 text-cream transition-colors hover:bg-maroon-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon"
              >
                {site.booking.label}
                <span aria-hidden="true">→</span>
              </a>
              <a
                className="link-quiet"
                href={site.resume.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.resume.label}
              </a>
            </div>

            <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-2 text-[0.95rem]">
              <li>
                <a className="link-quiet" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  className="link-quiet"
                  href={site.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className="link-quiet"
                  href={site.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* One real study, above the fold, linking into the deepest case
              study on the site. Evidence beats decoration in this slot. */}
          <Link
            href={heroArtifact.href}
            className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon"
          >
            <figure>
              <div className="overflow-hidden rounded-2xl border border-line shadow-[0_6px_28px_rgba(43,38,34,0.14)]">
                <Image
                  src={heroArtifact.src}
                  alt={heroArtifact.alt}
                  width={heroArtifact.width}
                  height={heroArtifact.height}
                  sizes="(min-width: 768px) 22rem, 100vw"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                  priority
                />
              </div>
              <figcaption className="mt-3">
                <ul className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  {heroArtifact.spec.map((item, i) => (
                    <li key={item} className="smallcaps text-[0.7rem] text-ink-soft">
                      {i > 0 && <span aria-hidden="true" className="mr-2">·</span>}
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-[0.9rem] leading-snug text-ink-soft transition-colors group-hover:text-maroon">
                  {heroArtifact.caption}
                </p>
              </figcaption>
            </figure>
          </Link>
        </div>
      </div>
    </section>
  );
}

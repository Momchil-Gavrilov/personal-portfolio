import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { site } from "@/content/site";

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
    <section id="top" aria-label="Introduction" className="pt-20 pb-24 md:pt-28 md:pb-32">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <div className="flex flex-col-reverse gap-12 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="smallcaps text-ink-soft">{site.role}</p>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-tight text-ink md:text-7xl">
              {site.name}
            </h1>
            <p className="mt-8 max-w-[26ch] font-display text-2xl font-light leading-snug text-ink md:text-[2rem]">
              I make technology that feels{" "}
              <em className="text-maroon">human</em>.
            </p>
            <p className="mt-5 max-w-[34ch] text-ink-soft">{site.domains}</p>
            <p className="mt-6 smallcaps text-ink-soft">
              M.S. Biomedical Engineering, UC Davis
            </p>
            {/* The primary CTA sits here as well as in Contact: most visitors
                never scroll to the bottom of the page. */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
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
            <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-2 text-[0.95rem]">
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
                  {site.linkedin.label}
                </a>
              </li>
              <li>
                <a
                  className="link-quiet"
                  href={site.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {site.github.label}
                </a>
              </li>
            </ul>
          </div>
          {headshot && (
            <div className="relative shrink-0 self-start md:self-center">
              <div className="relative h-80 w-64 overflow-hidden rounded-[50%] border border-line shadow-[0_4px_24px_rgba(43,38,34,0.14)] md:h-96 md:w-72">
                <Image
                  src={headshot}
                  alt={`Portrait of ${site.name}`}
                  fill
                  sizes="(min-width: 768px) 18rem, 16rem"
                  className="object-cover object-center"
                  priority
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 translate-x-2.5 translate-y-2.5 rounded-[50%] border border-gold"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

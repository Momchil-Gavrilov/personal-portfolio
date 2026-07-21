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
              I study how people and technology relate, and I build technology{" "}
              <em className="text-maroon">worth relating to</em>.
            </p>
            <p className="mt-10 max-w-measure text-ink-soft">
              {site.credentials.map((credential, i) => (
                <span key={credential}>
                  {i > 0 && (
                    <span aria-hidden="true" className="mx-2 text-gold">
                      ·
                    </span>
                  )}
                  {credential}
                </span>
              ))}
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-2 text-[0.95rem]">
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
              <div className="relative h-64 w-52 overflow-hidden rounded-[50%] md:h-80 md:w-64">
                <Image
                  src={headshot}
                  alt={`Portrait of ${site.name}`}
                  fill
                  sizes="(min-width: 768px) 16rem, 13rem"
                  className="object-cover"
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

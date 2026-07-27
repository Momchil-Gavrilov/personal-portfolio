import Image from "next/image";
import { portrait, site } from "@/content/site";

/*
  The thesis is the headline; the name is the byline.

  This is the structural argument of the 2c design and the one real departure
  from every earlier version. A hiring manager scanning a portfolio already
  knows they are looking at a person, so the first line of type spends itself
  on the only thing they do not know yet: what this person is for. The name,
  the degree and the face all follow, at the size a byline deserves.

  The portrait is a filing card rather than a hero image: bordered, squared,
  captioned on a navy plate. On a phone the text still comes first in the DOM,
  so the page opens on the sentence, not the face.
*/
export default function Hero() {
  return (
    <section id="top" aria-label="Introduction">
      <div className="wrap grid gap-10 pt-12 pb-12 md:grid-cols-[1fr_minmax(0,21.25rem)] md:items-start md:gap-16 md:pt-16 md:pb-14">
        <div className="flex flex-col gap-6 md:gap-[1.625rem]">
          <p className="eyebrow text-crimson">{site.role}</p>

          <h1 className="display-xl text-[2.75rem] sm:text-6xl lg:text-[5.25rem]">
            {site.tagline.lead}{" "}
            <em className="font-normal italic text-navy">
              {site.tagline.accent}
            </em>
            .
          </h1>

          <div className="flex flex-col gap-1.5">
            <p className="text-2xl font-semibold tracking-[-0.01em]">
              {site.name}
            </p>
            <p className="text-sm text-ink/60">{site.degree}</p>
          </div>

          {/* The primary CTA sits here as well as in Contact: most visitors
              never scroll to the bottom of the page. */}
          <div className="flex flex-wrap gap-3">
            <a
              href={site.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {site.booking.label}
              <span aria-hidden="true">→</span>
            </a>
            <a
              href={site.resume.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              {site.resume.label}
            </a>
          </div>

          <ul className="flex flex-wrap gap-x-[1.125rem] gap-y-2 text-[0.8125rem] text-ink/60">
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

        {/* Capped on phones: at full width a 4:5 portrait eats most of a
            screen, and it is a byline, not the argument. */}
        <figure className="max-w-[15rem] overflow-hidden rounded-card border border-line bg-white md:max-w-none">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            sizes="(min-width: 768px) 21.25rem, 15rem"
            className="block aspect-4/5 w-full object-cover"
            priority
          />
          <figcaption className="flex flex-col gap-[3px] bg-navy px-4 py-3.5 text-paper">
            <span className="text-[0.9375rem] font-semibold tracking-[-0.01em]">
              {site.name}
            </span>
            <span className="eyebrow text-[0.625rem] tracking-[0.1em] opacity-75">
              {site.role}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

import Image from "next/image";
import { portrait, site } from "@/content/site";

/*
  The thesis is the headline; the name is the byline.

  The headline came down from 84px to 48px when the sentence grew from five
  words to nine: a longer, more concrete claim carries its own weight and no
  longer needs display scale to land. Two lines instead of three also puts
  the name, the buttons and the portrait back inside one comfortable screen,
  which is the snapshot the whole page is being tuned toward.

  The column stretches to the portrait's height: headline at the top, the
  name centred in the space between, the buttons and links pinned level with
  the portrait's bottom edge.
*/
export default function Hero() {
  return (
    <section id="top" aria-label="Introduction">
      <div className="wrap grid gap-10 pt-10 pb-10 md:grid-cols-[1fr_minmax(0,18rem)] md:items-stretch md:gap-14 md:pt-12 md:pb-12">
        <div className="flex flex-col gap-8 md:gap-0">
          <h1 className="display max-w-[26ch] text-[1.875rem] sm:text-[2.375rem] lg:text-[3rem]">
            {site.tagline.lead}{" "}
            <em className="not-italic text-navy">{site.tagline.accent}</em>{" "}
            {site.tagline.tail}
          </h1>

          {/* Centred in the gap the two blocks leave, rather than sitting
              just under the headline with the rest floating above the photo. */}
          <div className="flex flex-col gap-1.5 md:my-auto md:py-6">
            <p className="text-2xl font-semibold tracking-[-0.01em]">
              {site.name}
            </p>
            <p className="text-sm text-ink/60">{site.degree}</p>
          </div>

          {/* Buttons and links are one block, pinned to the column's bottom,
              which the stretch makes the portrait's bottom edge. */}
          <div className="flex flex-col gap-5">
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
        </div>

        {/* Smaller than it was: it is a byline, not the argument, and every
            rem it gives up comes back as page the reader reaches sooner. */}
        <figure className="max-w-[10rem] overflow-hidden rounded-card border border-line bg-white sm:max-w-[12rem] md:max-w-none">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            sizes="(min-width: 768px) 18rem, (min-width: 640px) 12rem, 10rem"
            className="block aspect-4/5 w-full object-cover"
            priority
          />
          <figcaption className="flex flex-col gap-[3px] bg-navy px-4 py-3 text-paper">
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

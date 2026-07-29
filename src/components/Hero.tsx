import Image from "next/image";
import { portrait, site } from "@/content/site";

/*
  Two columns of near-equal height, which is what finally closes the gaps.

  A full-width headline with the byline row beneath it left 170px of dead
  space, because the portrait is always taller than a name and two buttons.
  Running the headline down the left column instead makes that column about
  as tall as the portrait, so justify-between can pin the headline to the top
  and the buttons to the bottom with nothing stranded in the middle.

  At 960px the portrait is no longer a screen's width from the buttons it
  belongs with, which was the other half of the problem.
*/
export default function Hero() {
  return (
    <section id="top" aria-label="Introduction">
      <div className="wrap grid gap-8 pt-10 pb-10 md:grid-cols-[1fr_minmax(0,14rem)] md:items-stretch md:gap-12 md:pt-12 md:pb-12">
        <div className="flex flex-col justify-between gap-8">
          <h1 className="display text-[2.125rem] sm:text-[2.625rem] lg:text-[3.125rem]">
            {site.tagline.lead}{" "}
            <em className="not-italic text-navy">{site.tagline.accent}</em>{" "}
            {site.tagline.tail}
          </h1>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <p className="text-xl font-semibold tracking-[-0.01em]">
                {site.name}
              </p>
              <p className="text-sm text-ink/60">{site.degree}</p>
            </div>

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

        <figure className="max-w-[9rem] self-end overflow-hidden rounded-card border border-line bg-white sm:max-w-[11rem] md:max-w-none">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            sizes="(min-width: 768px) 14rem, (min-width: 640px) 11rem, 9rem"
            className="block aspect-4/5 w-full object-cover"
            priority
          />
          <figcaption className="flex flex-col gap-[2px] bg-navy px-3.5 py-2.5 text-paper">
            <span className="text-[0.875rem] font-semibold tracking-[-0.01em]">
              {site.name}
            </span>
            <span className="eyebrow text-[0.5625rem] tracking-[0.1em] opacity-75">
              {site.role}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

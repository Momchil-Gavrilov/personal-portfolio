import Image from "next/image";
import { portrait, site } from "@/content/site";

/*
  Flex, not grid, and the text block capped to its own content width.

  A `1fr` first column stretched to fill whatever space the portrait did not
  take, and the headline and buttons inside it are nowhere near that wide, so
  the visible gap between the buttons and the portrait was that column's
  unused width, not the `gap` property. Flexbox with the text block capped at
  30rem means the portrait sits exactly one gap away from whatever the text
  actually measures, at any breakpoint.
*/
export default function Hero() {
  return (
    <section id="top" aria-label="Introduction">
      <div className="wrap flex flex-col gap-8 pt-10 pb-10 md:flex-row md:items-stretch md:gap-10 md:pt-12 md:pb-12">
        <div className="flex max-w-[30rem] flex-col justify-between gap-8">
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

        <figure className="w-[9rem] shrink-0 self-end overflow-hidden rounded-card border border-line bg-white sm:w-[11rem] md:w-56">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            sizes="(min-width: 768px) 14rem, (min-width: 640px) 11rem, 9rem"
            className="block aspect-4/5 w-full object-cover"
            priority
          />
          <figcaption className="flex flex-col gap-[2px] bg-navy px-3 py-2.5 text-paper">
            <span className="text-[0.875rem] font-semibold tracking-[-0.01em]">
              {site.name}
            </span>
            {/* Tighter tracking than the other eyebrows on the page: this one
                has to fit "Human factors & UX researcher" on one line inside
                a 224px card, and the wide letter-spacing that works for a
                short label was what pushed it to two. */}
            {/* The .eyebrow class hardcodes its own font-size and
                letter-spacing, which otherwise wins over a same-specificity
                utility; the ! prefix forces this instance smaller so the
                role fits one line inside a 224px card. */}
            <span className="eyebrow whitespace-nowrap opacity-75 !text-[0.5rem] !tracking-[0.02em]">
              {site.role}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

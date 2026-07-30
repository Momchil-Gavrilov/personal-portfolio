import Image from "next/image";
import { portrait, proofPoints, site } from "@/content/site";

/*
  Flex, not grid, and the text block capped to its own content width.

  A `1fr` first column stretched to fill whatever space the portrait did not
  take, and the headline and buttons inside it are nowhere near that wide, so
  the visible gap between the buttons and the portrait was that column's
  unused width, not the `gap` property. Flexbox with the text block capped at
  30rem means the portrait sits exactly one gap away from whatever the text
  actually measures, at any breakpoint.

  The four figures used to be their own band under the hero, four across. They
  now run down the strip to the right of the portrait, which was the only dead
  space in the header, and the band they occupied is gone: the same credibility
  answer arrives in the same glance and costs a screenful less height.
*/
export default function Hero() {
  return (
    <section id="top" aria-label="Introduction">
      <div className="wrap flex flex-col gap-8 pt-10 pb-10 md:gap-10 md:pt-12 md:pb-12 lg:flex-row lg:items-stretch">
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

        {/* The row goes horizontal and the portrait reaches its full size
            (18.5rem) at the same breakpoint, `lg`, where the 960px measure is
            actually available. Splitting those two — going horizontal at
            `md` while the portrait stayed small until `lg` — left a band
            where the fixed-width figure and figures list were already
            competing with the headline for a narrow row, squeezing it down
            to a couple of characters per line. Below `lg` the header simply
            stacks: headline block on top, portrait and figures in their own
            row underneath, both at natural width. At `lg`, the portrait is
            the tallest thing in the header, so it sets the header's height;
            the figures column stretches to match it exactly (see
            `self-stretch` below) rather than only approximating it. */}
        <div className="flex items-end gap-5 sm:gap-6 lg:ml-auto lg:self-stretch">
          <figure className="w-[9rem] shrink-0 overflow-hidden rounded-card border border-line bg-white sm:w-[11rem] lg:w-[18.5rem]">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              sizes="(min-width: 1024px) 18.5rem, (min-width: 640px) 11rem, 9rem"
              className="block aspect-4/5 w-full object-cover"
              priority
            />
            <figcaption className="flex flex-col gap-[3px] bg-navy px-3 py-2.5 text-paper">
              <span className="text-[0.875rem] font-semibold tracking-[-0.01em] sm:text-[1rem] lg:text-[1.125rem] whitespace-nowrap">
                {site.name}
              </span>
              {/* Tighter tracking than the other eyebrows on the page, so the
                  role fits one line inside the card. The .eyebrow class
                  hardcodes its own font-size and letter-spacing and would
                  otherwise win over a same-specificity utility, hence the !
                  prefixes.

                  It only holds one line once the card is wide enough for it,
                  which is only true once the card reaches its full 18.5rem
                  at `lg`; below that it wraps to two lines instead of
                  clipping at the card's edge. */}
              <span className="eyebrow opacity-75 !text-[0.5rem] !tracking-[0.02em] sm:!text-[0.5625rem] lg:!text-[0.6875rem] lg:!tracking-[0.05em] lg:whitespace-nowrap">
                {site.role}
              </span>
            </figcaption>
          </figure>

          {/* Hairlines, not navy bars. Four 2px navy rules stacked in one
              narrow column read as a chart with no data in it, and they were
              the heaviest thing in the header despite being the least
              important. The same hairline the rest of the page separates
              things with does the job, and the navy figures carry the
              colour.

              `self-stretch` makes this column exactly as tall as the
              portrait at every breakpoint, since the portrait is the taller
              of the two and so is what actually sets the row's height;
              `justify-between` then spreads the four figures across that
              full height instead of stacking at the bottom. */}
          <ul
            aria-label="Credentials at a glance"
            className="flex min-w-0 flex-1 flex-col justify-between gap-4 self-stretch lg:w-40 lg:flex-none"
          >
            {proofPoints.map((point) => (
              <li
                key={point.label}
                className="flex flex-col gap-0.5 border-t border-line pt-2.5"
              >
                <span className="text-[1.75rem] font-semibold leading-[1] tracking-[-0.02em] tabular-nums text-navy lg:text-[2rem]">
                  {point.figure}
                </span>
                <span className="text-[0.8125rem] leading-snug text-ink/65">
                  {point.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import type { CSSProperties } from "react";
import StatsRow, { PLATE_HEIGHT } from "@/components/StatsRow";
import { portrait, site } from "@/content/site";

/*
  Flex, not grid, and the headline capped to its own measure.

  A `1fr` first column stretched to fill whatever space the portrait did not
  take, and the headline and buttons inside it are nowhere near that wide, so
  the visible gap between the buttons and the portrait was that column's
  unused width, not the `gap` property.

  Where the four figures live, and why they moved twice. They began as a band
  of their own under the header. That band became a narrow column to the right
  of the portrait, which saved a screenful of height and then spent years
  looking wrong for a reason that took a while to name: the figures were not
  badly styled, they were badly housed. They sat in whatever width was left
  after the portrait took its 296px, they were spread down 437px by the
  photograph's height rather than by anything to do with them, and on a page
  built from bordered cards and solid fields they were the only element with
  no edge and no mass at all. A 10rem column of leftover space cannot be made
  to look composed; it can only be given a shape or vacated.

  They are now four pairings across the foot of this column, under the contact
  links, ending on the portrait's left edge. That costs the header two pixels,
  because the column was already capped at 30rem for the headline's measure
  and then ran on to the portrait with nothing in the run-on, and
  `justify-between` was already holding about 100px of slack between the
  headline and the identity block. The figures are paid for out of space the
  layout was wasting in two places at once.
*/
export default function Hero() {
  return (
    <section id="top" aria-label="Introduction">
      <div className="wrap flex flex-col gap-8 pt-10 pb-10 md:gap-10 md:pt-12 md:pb-12 lg:flex-row lg:items-stretch">
        {/* `flex-1`, not a fixed cap: the column has to run all the way to the
            portrait for the figures to end on its edge. The headline keeps its
            own 30rem cap, so the measure does not change with it. */}
        <div className="flex flex-col justify-between gap-8 lg:flex-1">
          <h1 className="display max-w-[30rem] text-[2.125rem] sm:text-[2.625rem] lg:text-[3.125rem]">
            {site.tagline.lead}{" "}
            <em className="not-italic text-primary">{site.tagline.accent}</em>{" "}
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
                data-pulse="booking@hero"
              >
                {site.booking.label}
                <span aria-hidden="true">→</span>
              </a>
              <a
                href={site.resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                data-pulse="resume@hero"
              >
                {site.resume.label}
              </a>
            </div>

            <ul className="flex flex-wrap gap-x-[1.125rem] gap-y-2 text-[0.8125rem] text-ink/60">
              <li>
                <a
                  className="link-quiet"
                  href={`mailto:${site.email}`}
                  data-pulse="email@hero"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  className="link-quiet"
                  href={site.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-pulse="linkedin@hero"
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
                  data-pulse="github@hero"
                >
                  GitHub
                </a>
              </li>
            </ul>

            {/* Wide screens only, and `StatsRow` handles that itself: below
                `lg` the header stacks and the same four render in their column
                form beside the portrait. The two never coexist, because
                `hidden` removes an element from the accessibility tree as well
                as from the page. */}
            <StatsRow layout="row" className="mt-1" />
          </div>
        </div>

        <div className="flex items-end gap-5 sm:gap-6 lg:ml-auto lg:self-stretch">
          {/* Figures to the left of the portrait, not the right: on a phone
              the eye comes down the left edge of the page off the contact
              links, and putting the photograph on the outside closes the
              header on the same edge the buttons above it end on. */}
          <StatsRow layout="column" className="lg:hidden" />

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
            {/*
              Pinned to the same height the stats row is pinned to, from
              `PLATE_HEIGHT`, because the row's top rule is meant to land on
              this plate's top edge and the only thing making that true is the
              two boxes being the same height. It measured 67px unpinned, so
              this moves nothing by more than a pixel.

              `lg` only. Below it the header stacks, the card is 9rem wide and
              the role wraps to two lines, so a fixed height would clip it, and
              the rule is not being aligned to anything down there anyway,
              since the figures are in their column form beside the portrait.
            */}
            <figcaption
              className="flex flex-col justify-center gap-[3px] bg-primary px-3 py-2.5 text-paper lg:h-[var(--plate)] lg:py-0"
              style={{ "--plate": PLATE_HEIGHT } as CSSProperties}
            >
              <span className="text-[0.875rem] font-semibold tracking-[-0.01em] sm:text-[1rem] lg:text-[1.125rem] whitespace-nowrap">
                {site.name}
              </span>
              {/* Tighter tracking than the other eyebrows on the page, so the
                  role fits one line inside the card. The .eyebrow class
                  hardcodes its own font-size and letter-spacing and would
                  otherwise win over a same-specificity utility, hence the !
                  prefixes. It only holds one line once the card reaches its
                  full 18.5rem at `lg`; below that it wraps to two rather than
                  clipping at the card's edge. */}
              <span className="eyebrow opacity-75 !text-[0.5rem] !tracking-[0.02em] sm:!text-[0.5625rem] lg:!text-[0.6875rem] lg:!tracking-[0.05em] lg:whitespace-nowrap">
                {site.role}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

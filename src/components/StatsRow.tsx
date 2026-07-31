import type { CSSProperties } from "react";
import { proofPoints } from "@/content/site";

/*
  The four figures, in the two arrangements the header needs.

  Same treatment in both: the figure first, in the primary at a size that
  earns its space, and its label beside or beneath it in the page's mono
  eyebrow. The label is deliberately much smaller than the figure, because the
  size gap between a number and the thing naming it is the only thing stopping
  the two from running together as one string.

  "row" is the wide-screen arrangement, at the foot of the header's left
  column under the contact links: four pairings across, ending on the
  portrait's left edge.

  "column" is the same set turned on its side for phones, where the header
  stacks and the figures sit to the left of the portrait.

  The row form owns its own breakpoint rather than taking a display utility
  from its caller. That coupling was a real bug once: the caller passed
  `lg:grid` to something built as a flex row, which turned the four pairings
  into a single-column grid, so each took a line of its own and the row came
  out four deep instead of one across.
*/

/*
  --- The plate line ------------------------------------------------

  4.25rem is the height of the portrait's identity plate, set on both this row
  and the `figcaption` in `Hero` from this one number so the two cannot drift
  apart. Change it in one place and change it in the other.

  Why that makes the rule land on the plate's top edge: the header's left
  column is stretched to the portrait's height and `justify-between` puts this
  row last, so its bottom edge already sits exactly on the portrait's bottom
  edge. The plate's top edge is its own height up from that same bottom edge.
  Give the row the plate's height and the alignment holds by construction, at
  any width where the two columns exist, with no offset to maintain.

  It measured 67px before being pinned, so nothing about the portrait moves by
  more than a pixel; the point of pinning is that the relationship is written
  down rather than observed.
*/
export const PLATE_HEIGHT = "4.25rem";

const LABEL =
  "eyebrow !text-[0.625rem] !leading-[1.4] !tracking-[0.07em] text-ink/55";

export default function StatsRow({
  layout,
  className = "",
}: {
  layout: "row" | "column";
  className?: string;
}) {
  if (layout === "column") {
    return (
      <ul
        aria-label="Credentials at a glance"
        /* `self-stretch` + `justify-between` make this exactly as tall as the
           portrait beside it and spread the four figures across that height,
           so the rule starts and ends on the photograph's two edges. The
           figure size and both gaps step down on the narrowest phones: at
           320px the four labels all wrap and the column would otherwise come
           out taller than the portrait, take over setting the row's height,
           and lift its own rule above the top of the photograph. */
        className={`flex min-w-0 flex-1 flex-col justify-between gap-2 self-stretch border-r border-line-strong pr-4 sm:gap-4 ${className}`}
      >
        {proofPoints.map((point) => (
          <li key={point.label} className="flex flex-col gap-1 sm:gap-1.5">
            <span className={`${LABEL} !leading-[1.5] !tracking-[0.1em]`}>
              {point.label}
            </span>
            <span className="text-[1.75rem] font-semibold leading-[0.9] tracking-[-0.035em] tabular-nums text-primary sm:text-[2.25rem]">
              {point.figure}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <dl
      aria-label="Credentials at a glance"
      /*
        `min-h` is the plate line. The `+1px` is the portrait card's bottom
        border: this row's bottom edge lands on the card's outer bottom, but
        the plate stops one border short of it, so matching the plate's height
        exactly left the rule a pixel below the plate's top edge.

        `content-center` is what happens to the room that opens up. The single
        flex line is centred in the box rather than pinned under the rule,
        which puts the figures at about the height the name sits at inside the
        plate opposite them; pinned to the top they sat high and left a visible
        hole along the bottom edge.

        Distribution is a flex row, not four equal grid columns. An equal
        quarter of this column is 138px and a figure eats 60 of it, which
        leaves "Research participants" less room than it needs at any size
        worth setting it at. As a flex row each pairing takes the width it
        actually needs, the labels are capped so they break to two lines rather
        than running long, and `justify-between` spends the remainder as equal
        gaps and lands the last pairing on the portrait's edge.
      */
      className={`hidden border-t border-line lg:flex lg:min-h-[calc(var(--plate)+1px)] lg:flex-wrap lg:content-center lg:justify-between lg:gap-x-6 lg:gap-y-4 ${className}`}
      style={{ "--plate": PLATE_HEIGHT } as CSSProperties}
    >
      {proofPoints.map((point) => (
        <div
          key={point.label}
          /* `items-center` hangs each label on the middle of its own figure.
             Every figure is one line of the same size, so they align on their
             own, and centring is then uniform whether a label came out one
             line or two.

             `order` rather than `flex-row-reverse`: the source order has to
             stay dt-then-dd for a definition list, and reversing a flex
             container also reverses where it packs from, which is what put
             the figures at four different heights the first time this was
             tried. */
          className="flex items-center gap-3"
        >
          <dt className={`order-2 max-w-[6rem] ${LABEL}`}>{point.label}</dt>
          <dd className="order-1 text-[2rem] font-semibold leading-[0.9] tracking-[-0.04em] tabular-nums text-primary lg:text-[2.5rem]">
            {point.figure}
          </dd>
        </div>
      ))}
    </dl>
  );
}

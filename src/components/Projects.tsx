import Link from "next/link";
import DeviceFrame from "@/components/DeviceFrame";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { productStudies } from "@/content/case-studies";

/*
  A showcase again, but paying for it in width rather than in height.

  This row has now been three things. It began as a tinted Wellspring banner
  with three small cards stacked under it, which said "this one is different"
  at the cost of a screenful and left the other products as the smallest
  images on the page. It became one row of three equal cards, which fixed the
  height but made the one product real people depend on daily look like one
  of three equivalent experiments, and every attempt to fix that with colour
  — grey tint, primary tint, a rule across the top — was decoration standing
  in for hierarchy.

  Half and half says it without any of that. Wellspring gets a 444px image
  where it used to get 300, the other two stack beside it at the same total
  height, and the section costs no more vertical space than the equal row
  did. Size is the honest form of emphasis here: the biggest thing on the
  page is the thing most worth looking at, and it needs no fill to explain
  itself.

  The two on the right go horizontal rather than shrinking to a third of the
  height. A 444px-wide card with a 160px thumbnail beside three lines of type
  reads at a glance; the same card scaled down to fit vertically would have
  given the reader a thumbnail too small to recognise the work by, which is
  the exact failure of the original banner layout.

  All three are boxed. On plain paper with nothing but a hairline over the
  type, three cards of two different shapes ran together into one field of
  images and text, and the reader had to work out where each one ended.
  A hairline box is the cheapest possible answer: it separates without
  weight, and it gives the lead somewhere to carry colour that is not a
  fill. Wellspring's box is drawn in the primary and the other two in the
  page's ordinary rule, which is the whole hierarchy in one property — same
  shape, same padding, different weight of line.

  The boxes align to the wrap, not the images. With a visible border, the
  border is the card's edge, and a reader lines it up with the section title
  above it; the 12px padding then insets the images, which is why the
  earlier tinted version's negative margin is not needed here.
*/
export default function Projects() {
  /* Display order for this section is already decided in `productStudies`,
     so the lead is simply the first. */
  const [lead, ...rest] = productStudies;
  /* A photograph of the place beats a render of the screens where there is
     one: a mock-up shows what was built, a photograph shows it was built for
     somewhere real, and only one of those is hard to fake. */
  const leadImage = lead.photo ?? lead.shot;

  return (
    <section id="work" className="pt-4 pb-10">
      <div className="wrap">
        <Reveal>
          <SectionTitle title="Products and Engineering Work" />
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-2 md:gap-6">
          <Reveal className="flex">
            <Link
              href={`/work/${lead.slug}`}
              className="group flex w-full flex-col rounded-card border border-primary/40 p-3"
            >
              {leadImage && (
                <DeviceFrame
                  image={leadImage}
                  sizes="(min-width: 768px) 28rem, 100vw"
                  className="h-60 w-full md:h-72"
                />
              )}
              {/* No status eyebrow. "Prototype" and "Interactive demo" were
                  doing the honesty work, but the outcome line says the same
                  thing in its own words, and the eyebrow made a reader read
                  the hedge before the work. The Status spec row still states
                  it on the case study itself. */}
              <div className="mt-4 flex flex-1 flex-col gap-2.5 border-t border-line pt-4">
                <h3 className="display text-[1.5rem]">{lead.title}</h3>
                <p className="leading-relaxed text-ink/70">
                  {lead.outcome ?? lead.oneLiner}
                </p>
                <span className="btn-quiet mt-auto w-fit">
                  Open case study <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          </Reveal>

          {/* `md:grid-rows-2` rather than two natural-height cards: as a grid
              item this list stretches to the lead's height, and splitting
              that height in two is what puts the bottom of the right column
              on the same line as the bottom of the left. Below `md` the rows
              go back to their own heights and the three cards simply stack. */}
          <ul className="grid list-none gap-5 md:grid-rows-2 md:gap-6">
            {rest.map((cs) => {
              const image = cs.photo ?? cs.shot;

              return (
                <li key={cs.slug} className="flex">
                  <Reveal className="flex w-full">
                    <Link
                      href={`/work/${cs.slug}`}
                      className="group flex w-full gap-4 rounded-card border border-line p-3 md:gap-5"
                    >
                      {/* A fixed box, not `self-stretch`. Stretching looks
                          like the tidier answer and is a trap: the phone
                          frame derives its own height from its width through
                          an aspect ratio, so a thumbnail free to grow made
                          the UC Davis phone 308px tall, which set the row,
                          which set the whole section's height off the
                          smallest piece of content in it.

                          192px is the height at which two of these cards
                          plus their gap come to what the lead card needs
                          for a 288px image and three lines of type, so
                          neither column has to stretch to meet the other
                          and the lead's button does not float away from its
                          text. */}
                      {image && (
                        <DeviceFrame
                          image={image}
                          sizes="10rem"
                          className="h-32 w-[7rem] shrink-0 md:h-48 md:w-[10rem]"
                        />
                      )}
                      {/* No rule over the type here, unlike the lead card.
                          The lead needs one because its image sits directly
                          above its title; here the box's own border is
                          already 12px away and a second line beside the
                          thumbnail read as a printing slip. */}
                      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                        <h3 className="display text-[1.125rem]">{cs.title}</h3>
                        <p className="text-[0.875rem] leading-relaxed text-ink/70">
                          {cs.outcome ?? cs.oneLiner}
                        </p>
                        <span className="btn-quiet mt-auto w-fit">
                          Open case study <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

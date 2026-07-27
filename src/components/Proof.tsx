import Reveal from "@/components/Reveal";
import { proofPoints } from "@/content/site";

/*
  The credibility answer, catchable in one glance and before any reading.
  It sits directly under the hero because a scanning reader decides whether
  this is a professional or a student portfolio within a few seconds.

  Each figure gets a navy rule over it rather than a box around it, so four
  numbers read as one instrument panel instead of four cards.

  Every figure here has to survive being opened and checked, because this is
  the block a sceptical reader tests first. The standards chips are NOT here:
  they are a statement about what he has yet to do, and that does not belong
  in the same glance as the evidence that he has done things.
*/
export default function Proof() {
  return (
    <section aria-label="Credentials at a glance" className="wrap pb-14">
      <Reveal>
        <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {proofPoints.map((point) => (
            <li
              key={point.label}
              className="flex flex-col gap-2 border-t-2 border-navy pt-4"
            >
              <span className="text-5xl font-semibold leading-[0.92] tracking-[-0.02em] tabular-nums text-navy lg:text-[4rem]">
                {point.figure}
              </span>
              <span className="text-sm leading-snug text-ink/65">
                {point.label}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

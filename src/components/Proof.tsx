import Reveal from "@/components/Reveal";
import { proofPoints, standards, standardsNote } from "@/content/site";

/*
  The credibility answer, catchable in one glance and before any reading.
  It sits directly under the hero because a scanning reader decides whether
  this is a professional or a student portfolio within a few seconds.

  Each figure gets a navy rule over it rather than a box around it, so four
  numbers read as one instrument panel instead of four cards.

  Every figure here has to survive being opened and checked, because this is
  the block a sceptical reader tests first.

  The standards chips follow, labelled and quiet. For a medical device reader
  the vocabulary itself is the signal: a candidate who names IEC 62366-1
  unprompted has read further than most new graduates, and the label keeps it
  honest about how far.
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

      <Reveal>
        <div className="mt-12 flex flex-wrap items-center gap-x-[1.125rem] gap-y-3">
          <h2 className="eyebrow text-ink/45">{standardsNote}</h2>
          <ul className="flex flex-wrap gap-2">
            {standards.map((standard) => (
              <li
                key={standard}
                className="rounded-card bg-chip px-[0.8125rem] py-[0.4375rem] text-[0.8125rem]"
              >
                {standard}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

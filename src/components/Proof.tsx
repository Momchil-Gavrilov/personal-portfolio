import Reveal from "@/components/Reveal";
import { experienceNote, proofPoints } from "@/content/site";

/*
  The credibility answer, catchable in one glance and before any reading.
  It sits directly under the hero because a scanning reader decides whether
  this is a professional or a student portfolio within a few seconds.

  Each figure gets a navy rule over it rather than a box around it, so four
  numbers read as one instrument panel instead of four cards.

  Every figure here has to survive being opened and checked, because this is
  the block a sceptical reader tests first.

  The standards chips moved into the skills band below, as their own labelled
  group. They still arrive near the top, and now they arrive after the things
  he can already do rather than before them.
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

      {/* The clinical years, which sat only on the resume. Four numbers say
          how much research; this says where else he has stood. */}
      <Reveal>
        <p className="mt-8 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink/60">
          {experienceNote}
        </p>
      </Reveal>
    </section>
  );
}

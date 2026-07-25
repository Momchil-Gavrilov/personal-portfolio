import Reveal from "@/components/Reveal";
import { proofPoints } from "@/content/site";

/*
  The credibility answer, catchable in one glance and before any reading.
  It sits directly under the hero because a scanning reader decides whether
  this is a professional or a student portfolio within a few seconds.

  The standards chips used to live here. They moved down beside Contact: they
  are honestly labelled as reading, and a caveat does not belong in the first
  screen a medical device reader sees.
*/
export default function Proof() {
  return (
    <section
      aria-label="Credentials at a glance"
      className="border-t border-line py-8 md:py-10"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <Reveal>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4">
            {proofPoints.map((point) => (
              <li key={point.label}>
                <p className="font-display text-3xl font-semibold leading-none text-maroon md:text-4xl">
                  {point.figure}
                </p>
                <p className="mt-2 text-[0.9rem] leading-snug text-ink-soft">
                  {point.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

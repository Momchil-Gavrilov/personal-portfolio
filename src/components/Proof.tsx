import Reveal from "@/components/Reveal";
import { proofPoints, standards } from "@/content/site";

/*
  The credibility answer, catchable in one glance and before any reading.
  It sits directly under the hero because a scanning reader decides whether
  this is a professional or a student portfolio within a few seconds.
*/
export default function Proof() {
  return (
    <section
      aria-label="Credentials at a glance"
      className="border-t border-line bg-cream-deep/40 py-10 md:py-12"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <Reveal>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
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

          <div className="mt-10 border-t border-line pt-6 md:flex md:items-baseline md:gap-6">
            <h2 className="smallcaps shrink-0 text-ink-soft">
              Standards I work to
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2 md:mt-0">
              {standards.map((standard) => (
                <li
                  key={standard}
                  className="rounded-full border border-line bg-cream px-3 py-1 text-[0.8rem] text-ink-soft"
                >
                  {standard}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Reveal from "@/components/Reveal";
import {
  experienceNote,
  skillGroups,
  skillsTitle,
  standards,
  standardsNote,
} from "@/content/site";

/*
  No boxes. Nothing here is a button, so nothing here is drawn like one.

  Pills gave twenty short phrases twenty outlines and turned a reference strip
  into visual noise. Set as plain text with a thin separator between terms,
  the same information reads faster and the band stops competing with the
  research below it.

  The two practice groups collapse, because nobody needs to read twelve terms
  on the way to the evidence. The standards do not: they are the fastest
  signal to a medical device reader that this candidate is oriented to their
  world, and behind a click most scanners would never reach them.
*/
export default function Skills() {
  return (
    <section id="skills" className="bg-navy py-10 text-paper md:py-11">
      <div className="wrap">
        <h2 className="sr-only">{skillsTitle}</h2>

        {/* The years, opening the band. Four numbers above said how much
            research; this says where else he has stood. */}
        <Reveal>
          <p className="text-[0.9375rem] text-paper/70">{experienceNote}</p>
        </Reveal>

        <Reveal>
          <div className="mt-7 grid gap-x-12 sm:grid-cols-2">
            {skillGroups.map((g) => (
              <details key={g.group} className="group border-t border-paper/20">
                <summary className="flex cursor-pointer list-none items-center gap-3 py-3.5 [&::-webkit-details-marker]:hidden">
                  <span className="eyebrow text-paper/75 transition-colors group-hover:text-paper">
                    {g.group}
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-auto text-paper/50 transition-transform duration-300 group-open:rotate-90"
                  >
                    &rsaquo;
                  </span>
                </summary>
                <p className="pb-4 text-[0.9375rem] leading-relaxed text-paper/85">
                  {g.items.join(" · ")}
                </p>
              </details>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-7 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-paper/20 pt-4">
            <h3 className="eyebrow shrink-0 text-paper/50">{standardsNote}</h3>
            <p className="text-[0.9375rem] leading-relaxed text-paper/80">
              {standards.join(" · ")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

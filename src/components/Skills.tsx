import Reveal from "@/components/Reveal";
import {
  skillGroups,
  skillsTitle,
  standards,
  standardsNote,
} from "@/content/site";

/*
  Two disclosures and one open row.

  The band has one job: a hiring manager should recognise their own vocabulary
  in it before they decide whether the page is worth their time. The two
  practice groups collapse, because nobody needs to read twelve terms on the
  way to the research. The standards do not, because they are the fastest
  signal to a medical device reader that this candidate is oriented to their
  world, and behind a click most scanners would never reach them.

  Native <details>, so it works without JavaScript and stays keyboard
  accessible. Same mechanism the publications list uses.
*/
export default function Skills() {
  return (
    <section id="skills" className="bg-navy py-10 text-paper md:py-11">
      <div className="wrap">
        {/* The band needs a heading for structure, not for the eye: the two
            disclosure labels already say what it is. */}
        <h2 className="sr-only">{skillsTitle}</h2>
        <Reveal>
          <div className="grid gap-x-10 sm:grid-cols-2">
            {skillGroups.map((g) => (
              <details key={g.group} className="group border-b border-paper/20">
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
                <ul className="flex flex-wrap gap-x-5 gap-y-1.5 pb-4">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="text-[0.9375rem] leading-snug text-paper/85"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
            <h3 className="eyebrow text-paper/50">{standardsNote}</h3>
            <ul className="flex flex-wrap gap-2">
              {standards.map((standard) => (
                <li
                  key={standard}
                  className="rounded-btn border border-paper/30 px-3 py-1.5 text-[0.8125rem] leading-none text-paper/80"
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

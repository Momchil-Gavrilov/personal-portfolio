import Reveal from "@/components/Reveal";
import {
  skillGroups,
  skillsTitle,
  standards,
  standardsNote,
} from "@/content/site";

/*
  Two things side by side: what he can already do, and what he is reading
  toward. Putting them in the same band is the honest arrangement and the
  persuasive one. A reader sees the gap named without being asked to guess at
  it, and the terms on the left get more credit for the admission on the right.

  No boxes and no separators. Nothing here is a button, and dots between
  twenty short phrases are twenty pieces of punctuation doing work that white
  space does better. Terms are spaced far enough apart to read as a list
  rather than as a sentence.

  The two practice groups collapse; the standards never do. They are the
  fastest signal to a medical device reader that this candidate is oriented to
  their world, and behind a click most scanners would never reach them.
*/
export default function Skills() {
  return (
    <section id="skills" className="bg-navy py-12 text-paper md:py-14">
      <div className="wrap">
        <h2 className="sr-only">{skillsTitle}</h2>

        <div className="grid gap-x-14 gap-y-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Reveal>
            <div>
              <h3 className="eyebrow text-paper/45">Can do</h3>
              <div className="mt-4">
                {skillGroups.map((g) => (
                  <details
                    key={g.group}
                    className="group border-t border-paper/20"
                  >
                    <summary className="flex cursor-pointer list-none items-center gap-3 py-3 [&::-webkit-details-marker]:hidden">
                      <span className="text-[1.0625rem] transition-colors group-hover:text-paper/70">
                        {g.group}
                      </span>
                      <span
                        aria-hidden="true"
                        className="ml-auto text-paper/40 transition-transform duration-300 group-open:rotate-90"
                      >
                        &rsaquo;
                      </span>
                    </summary>
                    <ul className="flex flex-wrap gap-x-7 gap-y-2 pb-4">
                      {g.items.map((item) => (
                        <li
                          key={item}
                          className="text-[0.9375rem] text-paper/70"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <h3 className="eyebrow text-paper/45">{standardsNote}</h3>
              <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3 border-t border-paper/20 pt-4">
                {standards.map((standard) => (
                  <li key={standard} className="text-[1.0625rem] text-paper/80">
                    {standard}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

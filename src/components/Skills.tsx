import Reveal from "@/components/Reveal";
import {
  skillGroups,
  skillsTitle,
  standards,
  standardsNote,
} from "@/content/site";

/*
  Everything visible, nothing behind a click.

  The disclosures saved height and cost the one thing this band exists for:
  a recruiter matching the page against a requisition in a few seconds.
  Three labelled groups now read in one pass, comma-run like a resume's
  skills block, because that is the document this band stands in for.

  "Learning" stays "Learning" rather than "knowledge of". Knowledge of a
  standard is a claim an interviewer can test; learning toward one is a
  direction they can trust. At entry level the honest label is also the
  rarer one, and rare is what gets remembered.
*/
export default function Skills() {
  return (
    <section id="skills" className="bg-navy py-10 text-paper md:py-12">
      <div className="wrap">
        <h2 className="sr-only">{skillsTitle}</h2>

        <Reveal>
          <div className="grid gap-x-10 gap-y-7 md:grid-cols-3">
            {skillGroups.map((g) => (
              <div key={g.group}>
                <h3 className="eyebrow text-paper/50">{g.group}</h3>
                {/* Spacing does the separating, so there is no punctuation to
                    read and no box to draw. Set quiet on purpose: this band is
                    a reference strip, and it should not compete with the
                    evidence underneath it. */}
                <ul className="mt-3 flex flex-col gap-2 border-t border-paper/20 pt-3.5">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="text-[0.8125rem] leading-snug text-paper/65"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-7 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-paper/20 pt-4">
            <h3 className="eyebrow shrink-0 text-paper/50">{standardsNote}</h3>
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {standards.map((standard) => (
                <li key={standard} className="text-[0.8125rem] text-paper/65">
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

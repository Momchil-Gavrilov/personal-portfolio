import Reveal from "@/components/Reveal";
import { practice, practiceDeck, practiceTitle } from "@/content/site";

/*
  The most important block on the page for the reader it is aimed at.

  An employer hiring at entry level is deciding whether a new graduate is
  usable on a live project, and findings do not answer that. This does: the
  activities a human factors requisition actually lists, each with the thing
  he did and the study he did it on.

  It takes the navy field, because it is the strongest claim the site makes
  and everything around it stays on paper. Not numbered: these are six
  capabilities, not six steps in sequence, and numbering would imply an order
  that the work does not have.
*/
export default function Practice() {
  return (
    <section id="practice" className="bg-navy py-14 text-paper md:py-16">
      <div className="wrap">
        <Reveal>
          <h2 className="display text-[1.75rem] md:text-[2.25rem]">
            {practiceTitle}
          </h2>
          <p className="mt-3 max-w-[46ch] text-paper/65">{practiceDeck}</p>
        </Reveal>
        <Reveal>
          {/* gap-px over a tinted ground draws exact hairlines at any column
              count, which border utilities cannot do on a wrapping grid. */}
          <ul className="mt-9 grid grid-cols-1 gap-px bg-paper/20 sm:grid-cols-2 lg:grid-cols-3">
            {practice.map((item) => (
              <li
                key={item.stage}
                className="flex flex-col gap-2.5 bg-navy p-5"
              >
                <h3 className="eyebrow text-paper/55">{item.stage}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-paper/90">
                  {item.detail}
                </p>
                <p className="mt-auto pt-2 font-mono text-[0.6875rem] text-paper/45">
                  {item.source}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

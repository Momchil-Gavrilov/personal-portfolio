import Reveal from "@/components/Reveal";
import {
  practiceDeck,
  practiceTitle,
  skillGroups,
  standards,
  standardsNote,
} from "@/content/site";

/*
  Scannable in about five seconds, which is what this slot is for.

  This replaced a six-card grid of full sentences. The sentences proved the
  skills rather than claiming them, which was the stronger argument, but they
  cost most of a screen before a reader reached any evidence, and a recruiter
  scanning for terms was made to read prose to find them. The compromise is
  the deck line: three numbers directly under the heading, so the list is
  anchored to something countable before the terms start.

  The standards ride along as a fourth group. Keeping them here rather than
  up beside the credentials means six proven capabilities land before six
  unproven ones, and it saves a section.
*/
export default function Skills() {
  const groups = [
    ...skillGroups,
    { group: standardsNote, items: standards, pending: true },
  ];

  return (
    <section id="skills" className="bg-navy py-12 text-paper md:py-14">
      <div className="wrap">
        <Reveal>
          <h2 className="display text-[1.75rem] md:text-[2rem]">
            {practiceTitle}
          </h2>
          <p className="mt-2 text-paper/60">{practiceDeck}</p>
        </Reveal>
        <Reveal>
          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-7 lg:grid-cols-4">
            {groups.map((g) => (
              <div key={g.group}>
                <h3 className="eyebrow border-b border-paper/25 pb-2 text-paper/55">
                  {g.group}
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className={`text-[0.9375rem] leading-snug ${
                        "pending" in g ? "text-paper/55" : "text-paper/90"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

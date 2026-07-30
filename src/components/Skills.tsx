import Reveal from "@/components/Reveal";
import {
  skillGroups,
  skillsTitle,
  standards,
  standardsNote,
} from "@/content/site";

/*
  Four labelled rows, each on one line, no rules between them.

  A line between every row turned four short facts into a fenced list. Space
  alone separates them just as clearly and costs nothing to look at. Terms
  are trimmed so each group actually fits one line at this measure rather
  than wrapping to two, which is what was costing the height.
*/
export default function Skills() {
  const rows = [...skillGroups, { group: standardsNote, items: standards }];

  return (
    <section id="skills" className="bg-navy py-7 text-paper md:py-8">
      <div className="wrap">
        <h2 className="sr-only">{skillsTitle}</h2>

        <Reveal>
          <dl className="flex flex-col gap-2.5">
            {rows.map((row) => (
              <div
                key={row.group}
                className="grid gap-x-8 gap-y-1 md:grid-cols-[8.5rem_minmax(0,1fr)] md:items-baseline"
              >
                <dt className="eyebrow text-paper/45">{row.group}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-x-5 gap-y-1">
                    {row.items.map((item) => (
                      /* One weight for every term, the lighter one the
                         standards row already used. At 70% the skills sat
                         close enough to the labels to make the band feel
                         like a wall of type; at 55% the navy reads as a
                         quiet strip and the eye picks out the group names
                         first, which is the order this band is meant to be
                         read in. */
                      <li
                        key={item}
                        className="whitespace-nowrap text-[0.8125rem] leading-relaxed text-paper/55"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

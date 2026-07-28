import Reveal from "@/components/Reveal";
import { practiceTitle, skillGroups } from "@/content/site";

/*
  Four labelled rows of tags, not four columns of stacked lines.

  As columns this band read as four short paragraphs from any distance, which
  is the opposite of what it is for: a recruiter should be able to find a term
  here without reading a word of it. Tags in a flowing row scan at a glance,
  the left-hand label tells them which row to look in, and the whole band is
  about half the height it was.

  Regulatory knowledge is dimmed rather than hidden. It is real vocabulary he
  has read toward and not experience he has, and the lighter treatment says
  which of the four rows is the aspiration without a caveat sentence.
*/
export default function Skills() {
  return (
    <section id="skills" className="bg-navy py-12 text-paper md:py-14">
      <div className="wrap">
        <Reveal>
          <h2 className="display text-[1.75rem] md:text-[2rem]">
            {practiceTitle}
          </h2>
        </Reveal>
        <Reveal>
          <dl className="mt-8 space-y-px">
            {skillGroups.map((g) => {
              const muted = g.group === "Regulatory knowledge";
              return (
                <div
                  key={g.group}
                  className="grid gap-x-8 gap-y-3 border-t border-paper/20 py-4 md:grid-cols-[13rem_minmax(0,1fr)] md:items-baseline"
                >
                  <dt className="eyebrow text-paper/55">{g.group}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-2">
                      {g.items.map((item) => (
                        <li
                          key={item}
                          className={`rounded-btn px-3 py-1.5 text-[0.875rem] leading-none ${
                            muted
                              ? "border border-paper/25 text-paper/65"
                              : "bg-paper/10 text-paper"
                          }`}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              );
            })}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

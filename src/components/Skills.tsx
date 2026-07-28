import Reveal from "@/components/Reveal";
import { skillGroups, skillsTitle } from "@/content/site";

/*
  Three columns, each a disclosure, all closed by default.

  This band exists for recognition rather than reading. A hiring manager needs
  to see terms out of their own requisition inside a couple of seconds and
  conclude the page is worth their time; they do not need to read twenty of
  them on the way to the research. Closed, the whole band is a heading and
  three labels. Open, it is the detail, for the reader who wants to check.

  Native <details> so it works without JavaScript and stays keyboard
  accessible, the same mechanism the publications list uses.
*/
export default function Skills() {
  return (
    <section id="skills" className="bg-navy py-11 text-paper md:py-12">
      <div className="wrap">
        <Reveal>
          <h2 className="display text-[1.5rem] md:text-[1.75rem]">
            {skillsTitle}
          </h2>
        </Reveal>
        <Reveal>
          <div className="mt-6 grid gap-x-10 gap-y-px sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((g) => (
              <details key={g.group} className="group border-t border-paper/20">
                <summary className="flex cursor-pointer list-none items-center gap-3 py-3.5 [&::-webkit-details-marker]:hidden">
                  <span className="eyebrow text-paper/70 transition-colors group-hover:text-paper">
                    {g.group}
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-auto text-paper/50 transition-transform duration-300 group-open:rotate-90"
                  >
                    &rsaquo;
                  </span>
                </summary>
                <ul className="pb-4 space-y-1.5">
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
      </div>
    </section>
  );
}

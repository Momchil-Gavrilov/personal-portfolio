import Reveal from "@/components/Reveal";
import { practice, practiceDeck, practiceTitle } from "@/content/site";

/*
  The most important block on the page for the reader it is aimed at.

  A human factors consultancy hiring at entry level is deciding whether a new
  graduate is billable, and findings do not answer that. This does: protocol,
  apparatus, sessions, analysis, in the order a study actually happens, with
  the specific thing he did at each stage.

  It takes the navy field, because it is now the strongest claim the site
  makes and everything around it stays on paper. The stages are numbered
  because they are genuinely sequential; a study runs in this order or it
  does not run.
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
          <ol className="mt-9 grid grid-cols-1 gap-px bg-paper/20 sm:grid-cols-2 lg:grid-cols-4">
            {practice.map((item, i) => (
              <li key={item.stage} className="flex flex-col gap-3 bg-navy p-5">
                <span className="eyebrow text-paper/50">
                  {String(i + 1).padStart(2, "0")} &nbsp;{item.stage}
                </span>
                <p className="text-[0.9375rem] leading-relaxed text-paper/90">
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

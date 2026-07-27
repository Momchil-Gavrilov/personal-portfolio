import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { decisions, decisionsDeck, decisionsTitle } from "@/content/site";

/*
  The judgment section.

  Everything above this proves he can do the work. This is the only place that
  shows how he decides, which is the difference between a candidate who can
  follow a protocol and one worth investing in. It sits after the evidence
  because a reader does not care how someone thinks until they believe the
  person can do the job.

  Set as rows rather than cards: each one is a short argument and wants to be
  read as a sentence, not scanned as a tile.
*/
export default function Decisions() {
  return (
    <section id="decisions" className="wrap py-14 md:py-18">
      <Reveal>
        <SectionTitle title={decisionsTitle} />
        <p className="mt-3 max-w-[46ch] text-ink/65">{decisionsDeck}</p>
      </Reveal>

      <ol className="mt-10 list-none border-t border-line">
        {decisions.map((d) => (
          <li key={d.slug} className="border-b border-line">
            <Reveal>
              <div className="grid gap-3 py-7 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-12">
                <p className="text-[1.0625rem] font-medium leading-snug text-navy">
                  {d.label}
                </p>
                <div>
                  <p className="max-w-[62ch] leading-relaxed text-ink/75">
                    {d.text}
                  </p>
                  <Link
                    href={`/work/${d.slug}`}
                    className="mt-3 inline-block text-sm text-crimson hover:underline"
                  >
                    {d.study} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { throughline, throughlineTitle } from "@/content/site";

/*
  The through-line, drawn instead of argued.

  Written out as a sentence this reads soft, which is why it has never been on
  the page. As four scales, each with the study that measured it, it is
  concrete, it costs about forty words, and it is the thing that makes the
  researcher, the builder and the roboticist read as one person.

  It is the only navy field on the site. The page spends its boldness once,
  and it spends it here, because this is the single claim everything below is
  evidence for. Everything around it stays on paper so the band reads as an
  interruption rather than as decoration.
*/
export default function Throughline() {
  return (
    <section id="throughline" className="bg-navy py-14 text-paper md:py-16">
      <div className="wrap">
        <Reveal>
          <h2 className="display text-[1.75rem] md:text-[2.25rem]">
            {throughlineTitle}
          </h2>
        </Reveal>
        <Reveal>
          {/* gap-px over a tinted ground draws exact hairlines at any column
              count, which border utilities cannot do on a wrapping grid. */}
          <ol className="mt-8 grid grid-cols-2 gap-px bg-paper/20 lg:grid-cols-4">
            {throughline.map((item) => (
              <li key={item.scale} className="bg-navy">
                <Link
                  href={`/work/${item.slug}`}
                  className="group flex h-full flex-col gap-3 p-5 transition-colors hover:bg-navy-deep"
                >
                  <span className="eyebrow text-paper/55">{item.scale}</span>
                  <span className="text-lg font-medium leading-snug tracking-[-0.01em]">
                    {item.question}
                  </span>
                  <span className="mt-auto pt-2 text-[0.8125rem] leading-snug text-paper/60 transition-colors group-hover:text-paper">
                    {item.study} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { throughline, throughlineTitle } from "@/content/site";

/*
  The through-line, drawn instead of argued.

  Written out as a sentence this reads soft, which is why it has never been on
  the page. As four scales, each with the study that measured it, it is
  concrete, it costs about forty words, and it is the thing that makes the
  researcher, the builder and the roboticist read as one person. It sits
  between Proof and Research because it introduces both sections below it.
*/
export default function Throughline() {
  return (
    <section
      id="throughline"
      className="border-t border-line bg-cream-deep/40 py-10 md:py-14"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <Reveal>
          <SectionTitle title={throughlineTitle} />
        </Reveal>
        <Reveal>
          {/* Two up even on the narrowest phones: four stacked cards cost
              750px of scroll for forty words. */}
          <ol className="grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
            {throughline.map((item) => (
              <li key={item.scale} className="bg-cream">
                <Link
                  href={`/work/${item.slug}`}
                  className="group flex h-full flex-col gap-3 p-5 transition-colors hover:bg-cream-deep/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon"
                >
                  <span className="smallcaps text-maroon">{item.scale}</span>
                  <span className="font-display text-lg font-medium leading-snug text-ink">
                    {item.question}
                  </span>
                  <span className="mt-auto text-[0.85rem] leading-snug text-ink-soft transition-colors group-hover:text-maroon">
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

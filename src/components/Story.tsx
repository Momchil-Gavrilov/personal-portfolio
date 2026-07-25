import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { story, storyTitle } from "@/content/site";

/* Serifed I and J need a tighter gap so the opening word does not read as two. */
function dropCapClass(paragraph: string): string {
  return /^[IJ]/.test(paragraph) ? "drop-cap drop-cap-narrow" : "drop-cap";
}

export default function Story() {
  return (
    <section id="story" className="border-t border-line py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <Reveal>
          <SectionTitle title={storyTitle} />
        </Reveal>
        <Reveal>
          <div className="max-w-measure space-y-6">
            {story.map((paragraph, i) => (
              <p key={i} className={i === 0 ? dropCapClass(paragraph) : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { story, storyTitle } from "@/content/site";

/* Serifed I and J need a tighter gap so the opening word does not read as two. */
function dropCapClass(paragraph: string): string {
  return /^[IJ]/.test(paragraph) ? "drop-cap drop-cap-narrow" : "drop-cap";
}

/*
  The words are finished; the container was not. Five paragraphs in one column
  cost a full screen on desktop and 1,300px on a phone, arriving exactly where
  a reader is deciding whether to stop. Two columns halve the perceived length
  without cutting a sentence. Phones stay single column, where two would be
  unreadable.
*/
export default function Story() {
  return (
    <section id="story" className="border-t border-line py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <Reveal>
          <SectionTitle title={storyTitle} />
        </Reveal>
        <Reveal>
          <div className="max-w-measure md:max-w-none md:columns-2 md:gap-12">
            {story.map((paragraph, i) => (
              <p
                key={i}
                className={`mb-5 break-inside-avoid last:mb-0 ${
                  i === 0 ? dropCapClass(paragraph) : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

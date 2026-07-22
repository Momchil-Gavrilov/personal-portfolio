import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { story, storyTitle } from "@/content/site";

export default function Story() {
  return (
    <section id="story" className="border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <Reveal>
          <SectionTitle title={storyTitle} />
        </Reveal>
        <Reveal>
          <div className="max-w-measure space-y-6">
            {story.map((paragraph, i) => (
              <p key={i} className={i === 0 ? "drop-cap" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

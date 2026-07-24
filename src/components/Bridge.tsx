import Reveal from "@/components/Reveal";
import { bridge } from "@/content/site";

/*
  A single-sentence thesis between the hero and the work. It frames the
  research and the built work as one method, so the apps read as the same
  discipline applied in other domains rather than a change of subject.
*/
export default function Bridge() {
  return (
    <section aria-label="Approach" className="border-t border-line py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <Reveal>
          <p className="max-w-[46ch] font-display text-2xl font-light leading-snug text-ink md:text-[1.75rem]">
            {bridge}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

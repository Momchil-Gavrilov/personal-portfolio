import Reveal from "@/components/Reveal";
import { capabilities } from "@/content/site";

/*
  Compact methods & standards strip. Kept small so it informs without
  competing with the work, and it surfaces the usability-engineering and
  regulatory vocabulary recruiters scan for.
*/
export default function Methods() {
  return (
    <section
      id="methods"
      aria-label="Methods and standards"
      className="border-t border-line py-16 md:py-20"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <Reveal>
          <div className="mb-6 flex items-center gap-4">
            <h2 className="smallcaps text-ink-soft">Methods &amp; standards</h2>
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
          </div>
        </Reveal>
        <Reveal>
          <dl className="grid max-w-measure gap-5 md:max-w-none md:grid-cols-3 md:gap-8">
            {capabilities.map((cap) => (
              <div key={cap.label}>
                <dt className="smallcaps text-maroon">{cap.label}</dt>
                <dd className="mt-1 text-[0.95rem] text-ink-soft">{cap.text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

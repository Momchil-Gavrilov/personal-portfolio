import Reveal from "@/components/Reveal";
import { publications } from "@/content/publications";

/*
  Kept deliberately low-key: a compact reference list, not a headline
  section. Recruiters who want the proof can find it; it does not
  compete with the story and case studies for attention.
*/
export default function Publications() {
  return (
    <section
      id="publications"
      aria-label="Publications"
      className="pb-16 pt-4 md:pb-20"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <Reveal>
          <div className="mb-6 flex items-baseline gap-4">
            <h2 className="smallcaps text-ink-soft">Publications</h2>
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
          </div>
        </Reveal>
        <Reveal>
          <ol className="max-w-[80ch] space-y-4 text-[0.95rem]">
            {publications.map((pub) => (
              <li
                key={pub.title}
                className="grid gap-x-4 md:grid-cols-[1.5rem_1fr]"
              >
                <span
                  aria-hidden="true"
                  className="hidden font-display text-ink-soft/70 md:block"
                >
                  {"·"}
                </span>
                <p className="text-ink-soft">
                  {pub.url ? (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-quiet text-ink"
                    >
                      {pub.title}
                    </a>
                  ) : (
                    <span className="text-ink">{pub.title}</span>
                  )}
                  <span className="text-ink-soft">
                    {" "}
                    <em>{pub.venue}</em>, {pub.year}.
                  </span>
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

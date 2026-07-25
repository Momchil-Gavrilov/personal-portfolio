import Reveal from "@/components/Reveal";
import { contact, site, standards, standardsNote } from "@/content/site";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <Reveal>
          {/* The availability IS the heading. Previously the heading, a status
              line and the button all said a version of the same thing. */}
          <h2 className="max-w-[24ch] font-display text-3xl font-medium leading-snug text-ink md:text-4xl">
            Open to <em className="text-maroon">opportunities</em>.
          </h2>

          <div className="mt-8">
            <a
              href={site.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-maroon px-7 py-3.5 text-cream transition-colors hover:bg-maroon-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon"
            >
              {site.booking.label}
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-2 text-[0.95rem]">
            <li>
              <a className="link-quiet" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              <a
                className="link-quiet"
                href={site.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className="link-quiet"
                href={site.github.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>

          {/* Honest, and now positioned honestly. He has started reading these,
              he has not worked under them, and the label says exactly that.
              It belongs here rather than in the first screen: a caveat is fine
              to volunteer, just not as the second thing a medical device
              reader learns about you. */}
          <div className="mt-12 border-t border-line pt-6 md:flex md:items-baseline md:gap-6">
            <h3 className="smallcaps shrink-0 text-ink-soft">{standardsNote}</h3>
            <ul className="mt-3 flex flex-wrap gap-2 md:mt-0">
              {standards.map((standard) => (
                <li
                  key={standard}
                  className="rounded-full border border-line bg-cream-deep/60 px-3 py-1 text-[0.8rem] text-ink-soft"
                >
                  {standard}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
      <footer className="mt-12 border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-wrap items-baseline justify-between gap-2 px-6 py-6 md:px-8">
          <p className="text-sm text-ink-soft">{contact.footnote}</p>
          <p className="text-sm text-ink-soft">© 2026 {site.name}</p>
        </div>
      </footer>
    </section>
  );
}

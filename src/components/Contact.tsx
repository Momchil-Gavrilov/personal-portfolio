import Reveal from "@/components/Reveal";
import { site } from "@/content/site";

/*
  The whole site exists to produce one action, and this is where it is asked
  for. "Open to opportunities" described a state; it did not ask for anything,
  and it put the reader's next move on the reader. "Let's talk" is the action.

  Nothing under the heading. The line that used to sit there explained what a
  call was for, which is a thing the button already says and the reader already
  knows; explaining it argued the reader into something they had reached this
  section having already decided. Heading, then the two buttons.

  The site footer used to close this section. It moved to its own component
  outside `<main>`, which is where a site-wide footer belongs: a `<footer>`
  nested in a `<section>` is scoped to that section as far as assistive
  technology is concerned, so the copyright was announced as part of the
  contact block. Moving it also left somewhere for the colourway block to sit
  between the CTA and the copyright rather than below it.
*/
export default function Contact() {
  return (
    <section id="contact">
      <div className="wrap flex flex-col gap-6 pt-12 pb-10 md:pt-14">
        <Reveal>
          <h2 className="display text-[2rem] sm:text-[2.5rem] lg:text-[3rem]">
            I&rsquo;d love to learn about <em className="not-italic text-primary">you</em>
          </h2>
        </Reveal>

        <Reveal>
          <div className="flex flex-col gap-6 text-sm">
            <div className="flex flex-wrap gap-3">
              <a
                href={site.booking.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary px-[1.625rem]"
                /* The one the whole page is built to produce. Its count
                   against the header's is the closest thing this site has to
                   a measure of whether the middle of it works. */
                data-pulse="booking@contact"
              >
                {site.booking.label}
                <span aria-hidden="true">→</span>
              </a>
              <a
                href={site.resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost px-[1.625rem]"
                data-pulse="resume@contact"
              >
                {site.resume.label} (PDF)
              </a>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a
                className="link-quiet text-ink/70"
                href={`mailto:${site.email}`}
                data-pulse="email@contact"
              >
                {site.email}
              </a>
              <a
                className="link-quiet text-ink/70"
                href={site.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                data-pulse="linkedin@contact"
              >
                LinkedIn
              </a>
              <a
                className="link-quiet text-ink/70"
                href={site.github.url}
                target="_blank"
                rel="noopener noreferrer"
                data-pulse="github@contact"
              >
                GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

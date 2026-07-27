import Reveal from "@/components/Reveal";
import { contact, site } from "@/content/site";

/*
  The whole site exists to produce one action, and this is where it is asked
  for. "Open to opportunities" described a state; it did not ask for anything,
  and it put the reader's next move on the reader. "Let's talk" is the action,
  and the line under it lowers the cost of taking it by naming what a call is
  actually for: finding out whether he is useful to them, which is their
  question rather than his.
*/
export default function Contact() {
  return (
    <section id="contact">
      <div className="wrap flex flex-col gap-7 pt-20 pb-14 md:pt-[5.5rem]">
        <Reveal>
          <h2 className="display-xl text-[2.5rem] sm:text-5xl lg:text-[4.1875rem]">
            Let&rsquo;s <em className="font-normal italic text-navy">talk</em>
          </h2>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-ink/70">
            A short call is usually enough to work out whether I would be
            useful to you.
          </p>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap items-center gap-5 text-sm">
            <a
              href={site.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary px-[1.625rem]"
            >
              {site.booking.label}
              <span aria-hidden="true">→</span>
            </a>
            <a
              href={site.resume.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost px-[1.625rem]"
            >
              {site.resume.label} (PDF)
            </a>
            <a className="link-quiet text-ink/70" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <a
              className="link-quiet text-ink/70"
              href={site.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="link-quiet text-ink/70"
              href={site.github.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </Reveal>
      </div>

      <footer className="wrap">
        <div className="flex flex-wrap justify-between gap-5 border-t border-line py-6">
          <p className="eyebrow text-ink/50">{contact.footnote}</p>
          <p className="eyebrow text-ink/50">© 2026 {site.name}</p>
        </div>
      </footer>
    </section>
  );
}

import Reveal from "@/components/Reveal";
import { contact, site, standards, standardsNote } from "@/content/site";

/*
  The availability IS the heading, at close to hero scale. Everything else on
  this screen is a way to act on it.

  The standards row sits down here on purpose. Volunteering what you are still
  learning is a trust signal, but only after the evidence has landed. Up beside
  the credentials it invites the reader to weigh six things he has not done
  against four things he has, in the same glance, before he has earned any
  credit. Here it reads as a candidate who knows exactly what the gap is.
*/
export default function Contact() {
  return (
    <section id="contact">
      <div className="wrap flex flex-col gap-7 pt-20 pb-14 md:pt-[5.5rem]">
        <Reveal>
          <h2 className="display-xl text-[2.5rem] sm:text-5xl lg:text-[4.1875rem]">
            Open to{" "}
            <em className="font-normal italic text-navy">opportunities</em>.
          </h2>
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

        <Reveal>
          <div className="mt-6 border-t border-line pt-7 md:flex md:items-baseline md:gap-5">
            <h3 className="eyebrow shrink-0 text-ink/45">{standardsNote}</h3>
            <ul className="mt-3 flex flex-wrap gap-2 md:mt-0">
              {standards.map((standard) => (
                <li
                  key={standard}
                  className="rounded-card bg-chip px-[0.8125rem] py-[0.4375rem] text-[0.8125rem]"
                >
                  {standard}
                </li>
              ))}
            </ul>
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

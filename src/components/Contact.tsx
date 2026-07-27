import Reveal from "@/components/Reveal";
import { contact, site } from "@/content/site";

/*
  The availability IS the heading, at close to hero scale. Everything else on
  this screen is a way to act on it. The standards row that used to sit down
  here moved up beside the credentials, where it reads as a candidate skilling
  up rather than as a footnote.
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

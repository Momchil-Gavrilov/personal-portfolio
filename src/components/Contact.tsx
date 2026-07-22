import Reveal from "@/components/Reveal";
import { contact, site } from "@/content/site";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <Reveal>
          <h2 className="max-w-[30ch] font-display text-3xl font-medium leading-snug text-ink md:text-4xl">
            If you&rsquo;re building technology for people,{" "}
            <em className="text-maroon">I&rsquo;d love to talk.</em>
          </h2>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={site.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-maroon px-6 py-3 text-cream transition-colors hover:bg-maroon-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon"
            >
              {site.booking.label}
              <span aria-hidden="true">→</span>
            </a>
            <a className="link-quiet text-[0.95rem]" href={`mailto:${site.email}`}>
              or email me
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-2 text-[0.95rem]">
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
        </Reveal>
      </div>
      <footer className="mt-20 border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-wrap items-baseline justify-between gap-2 px-6 py-6 md:px-8">
          <p className="text-sm text-ink-soft">{contact.footnote}</p>
          <p className="text-sm text-ink-soft">© 2026 {site.name}</p>
        </div>
      </footer>
    </section>
  );
}

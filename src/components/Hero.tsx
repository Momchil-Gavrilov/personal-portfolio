import { site } from "@/content/site";

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="pt-20 pb-24 md:pt-32 md:pb-32">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <p className="smallcaps text-ink-soft">
          {site.role}
        </p>
        <h1 className="mt-6 font-display text-5xl font-semibold leading-tight text-ink md:text-7xl">
          {site.name}
        </h1>
        <p className="mt-8 max-w-[26ch] font-display text-2xl font-light leading-snug text-ink md:text-[2rem]">
          I study how people and technology relate, and I build technology{" "}
          <em className="text-maroon">worth relating to</em>.
        </p>
        <p className="mt-10 max-w-measure text-ink-soft">
          {site.credentials.map((credential, i) => (
            <span key={credential}>
              {i > 0 && (
                <span aria-hidden="true" className="mx-2 text-gold">
                  ·
                </span>
              )}
              {credential}
            </span>
          ))}
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-2 text-[0.95rem]">
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
              {site.linkedin.label}
            </a>
          </li>
          <li>
            <a
              className="link-quiet"
              href={site.github.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.github.label}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

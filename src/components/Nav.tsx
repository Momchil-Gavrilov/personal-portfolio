"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

const links = [
  { href: "#research", id: "research", label: "Research" },
  { href: "#work", id: "work", label: "Work" },
  { href: "#story", id: "story", label: "Story" },
];

/*
  Sticky, minimal top bar. Highlights the section currently in view.

  The design draws this as a static header; it stays sticky here because the
  booking CTA lives in it, and most visitors never reach the bottom of the
  page where the other one is.
*/
export default function Nav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0 || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      /* A slim horizontal band near the top of the viewport decides
         which section is "current" */
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
      <nav
        aria-label="Main"
        className="wrap flex items-center justify-between gap-8 py-4"
      >
        <a
          href="#top"
          className="text-base font-semibold tracking-[-0.02em] text-ink sm:text-xl"
        >
          {site.name}
        </a>
        <ul className="flex items-center gap-3 text-[0.8125rem] sm:gap-5 sm:text-sm md:gap-[1.625rem]">
          {/* Section links yield to the CTA on the narrowest phones: at 320px
              the full row overflows and scrolls the page sideways. */}
          {links.map((link) => (
            <li key={link.id} className="hidden sm:block">
              <a
                href={link.href}
                aria-current={active === link.id ? "true" : undefined}
                className={
                  active === link.id
                    ? "text-ink underline decoration-primary-soft decoration-2 underline-offset-[0.6rem]"
                    : "text-ink/60 transition-colors hover:text-ink"
                }
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="hidden sm:block">
            <a
              className="text-ink/60 transition-colors hover:text-ink"
              href={site.resume.url}
              target="_blank"
              rel="noopener noreferrer"
              data-pulse="resume@nav"
            >
              {site.resume.label}
            </a>
          </li>
          <li>
            <a
              href={site.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              /* The same offer sits in the hero and again in the contact
                 section. Tagging the three separately is what makes it
                 answerable whether anyone books from the header before the
                 page has argued for anything. */
              data-pulse="booking@nav"
              /* .btn hardcodes its own padding and font-size, which beats a
                 same-specificity utility at any breakpoint since .btn is
                 declared after the utilities layer; ! forces every value
                 here, mobile and sm:, to actually apply. */
              className="btn btn-primary !px-3 !py-2 !text-[0.8125rem] sm:!px-[1.125rem] sm:!py-2.5 sm:!text-sm"
            >
              {site.booking.label}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

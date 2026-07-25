"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

const links = [
  { href: "#research", id: "research", label: "Research" },
  { href: "#work", id: "work", label: "Work" },
  { href: "#story", id: "story", label: "Story" },
];

/*
  Sticky, minimal top nav. Highlights the section currently in view.
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
    <header className="sticky top-0 z-10 border-b border-line bg-cream/90 backdrop-blur-sm">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-5xl items-baseline justify-between px-6 py-4 md:px-8"
      >
        <a
          href="#top"
          className="font-display text-lg font-semibold text-maroon"
        >
          Momchil Gavrilov
        </a>
        <ul className="flex items-baseline gap-4 md:gap-7">
          {/* Section links yield to the CTA on the narrowest phones: at 320px
              the full row overflows and scrolls the page sideways. */}
          {links.map((link) => (
            <li key={link.id} className="hidden sm:block">
              <a
                href={link.href}
                aria-current={active === link.id ? "true" : undefined}
                className={`smallcaps transition-colors hover:text-maroon ${
                  active === link.id
                    ? "text-maroon border-b border-gold pb-0.5"
                    : "text-ink-soft"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="hidden sm:block">
            <a
              className="smallcaps text-ink-soft transition-colors hover:text-maroon"
              href={site.resume.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.resume.label}
            </a>
          </li>
          {/* The CTA is pinned in the nav so it is reachable from any scroll
              position, not only from the bottom of the page. */}
          <li>
            <a
              href={site.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="smallcaps rounded-full bg-maroon px-3.5 py-1.5 text-cream transition-colors hover:bg-maroon-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon"
            >
              {site.booking.label}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

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
          className="text-xl font-semibold tracking-[-0.02em] text-ink"
        >
          {site.name}
        </a>
        <ul className="flex items-center gap-5 text-sm md:gap-[1.625rem]">
          {/* Section links yield to the CTA on the narrowest phones: at 320px
              the full row overflows and scrolls the page sideways. */}
          {links.map((link) => (
            <li key={link.id} className="hidden sm:block">
              <a
                href={link.href}
                aria-current={active === link.id ? "true" : undefined}
                className={
                  active === link.id
                    ? "text-ink underline decoration-crimson decoration-2 underline-offset-[0.6rem]"
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
            >
              {site.resume.label}
            </a>
          </li>
          <li>
            <a
              href={site.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary px-[1.125rem] py-2.5"
            >
              {site.booking.label}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

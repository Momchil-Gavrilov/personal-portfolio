"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#story", id: "story", label: "Story" },
  { href: "#work", id: "work", label: "Work" },
  { href: "#research", id: "research", label: "Research" },
  { href: "#contact", id: "contact", label: "Contact" },
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
        <ul className="flex gap-5 md:gap-8">
          {links.map((link) => (
            <li key={link.id}>
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
        </ul>
      </nav>
    </header>
  );
}

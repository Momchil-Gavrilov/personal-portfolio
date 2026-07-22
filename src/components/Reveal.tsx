"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
  Gentle fade/rise on scroll. The CSS in globals.css disables the
  effect entirely under prefers-reduced-motion.
*/
export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      node.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      /* Bottom margin at 0 so anything already in view on load (e.g. the
         last section on a tall screen) reveals immediately instead of
         staying stuck hidden. */
      { rootMargin: "0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

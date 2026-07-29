"use client";

import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import { story, storyTitle } from "@/content/site";

/*
  Single column, title above the text, same measure v2 used.

  Splitting the lead paragraph into its own column against the rest read as
  two unrelated blocks side by side. One column in reading order, the serif
  lead a size above the body rather than a size and a half, is the calmer
  version and the one that actually reads as a single passage.
*/
const LEAD = 0;
const FOLDED = [1, 2];
const ALWAYS = [3, 4];

export default function Story() {
  const [open, setOpen] = useState(false);

  return (
    <section id="story" className="bg-paper-deep py-12 md:py-14">
      <div className="wrap max-w-measure">
        <SectionTitle title={storyTitle} />
        <div className="mt-6 flex flex-col gap-4">
          <p className="font-serif text-[1.1875rem] leading-[1.55] text-ink/90">
            {story[LEAD]}
          </p>
          {open &&
            FOLDED.map((i) => (
              <p key={i} className="text-[0.9375rem] leading-[1.7] text-ink/70">
                {story[i]}
              </p>
            ))}
          {ALWAYS.map((i) => (
            <p key={i} className="text-[0.9375rem] leading-[1.7] text-ink/70">
              {story[i]}
            </p>
          ))}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="self-start text-sm text-crimson hover:underline"
          >
            {open ? "Show less" : "Read the full story"}{" "}
            <span aria-hidden="true">{open ? "↑" : "→"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

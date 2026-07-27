"use client";

import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import { story, storyTitle } from "@/content/site";

/*
  The words are finished; the container was not.

  The opening paragraph is set in the page's only serif, at pull-quote size,
  because it is the one moment the site stops making a case and just talks.
  The two paragraphs that follow it are the ones a hurried reader can skip
  without losing the thread, so they start collapsed. Nothing is rewritten
  and nothing is cut; the full text is one click away and reads in its
  original order when it opens.
*/
const LEAD = 0;
const FOLDED = [1, 2];
const ALWAYS = [3, 4];

export default function Story() {
  const [open, setOpen] = useState(false);

  return (
    /* The tinted band separates the story from the call to action that
       follows it, which is the one moment on the page that must not be
       mistaken for part of anything else. */
    <section id="story" className="bg-paper-deep py-16 md:py-[4.5rem]">
      <div className="wrap grid gap-10 md:grid-cols-2 md:gap-14">
        <div className="flex flex-col gap-5">
          <SectionTitle title={storyTitle} />
          <p className="font-serif text-[1.375rem] leading-[1.45] text-ink/90 md:text-[1.625rem]">
            {story[LEAD]}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {open &&
            FOLDED.map((i) => (
              <p key={i} className="leading-[1.75] text-ink/75">
                {story[i]}
              </p>
            ))}
          {ALWAYS.map((i) => (
            <p key={i} className="leading-[1.75] text-ink/75">
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

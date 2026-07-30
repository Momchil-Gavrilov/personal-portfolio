"use client";

import { useState } from "react";
import Image from "next/image";

/*
  One trial of the agency study, paced out.

  This is not a new illustration: it is panel E of the paper's own Figure 1,
  with everything except the current stage dimmed. A reader walks the judgment
  the participants actually made before they read what came out of it, which is
  the difference between being told a study was rigorous and feeling why.

  Percentages are measured from the source image (the white separators between
  frames), so the highlight lands on frame boundaries at any width.
*/
const STEPS = [
  {
    from: 0.5,
    to: 16.6,
    label: "You move",
    text: "A target appears and you reach it yourself. This is the movement you intended.",
  },
  {
    from: 16.6,
    to: 31.9,
    label: "Interval one",
    text: "A delay you cannot predict, then a tone. The gap between your movement and that tone is the first interval.",
  },
  {
    from: 31.9,
    to: 54.3,
    label: "You relax",
    text: "The arm is moved back for you. The same motion happens, but this time you did not initiate it.",
  },
  {
    from: 54.3,
    to: 76.8,
    label: "Interval two",
    text: "Another delay, another tone. Same kind of causal event as before, so the only thing that has changed is whether you intended the movement.",
  },
  {
    from: 76.8,
    to: 99.5,
    label: "The judgment",
    text: "Which delay was shorter? Repeating that one judgment is what pins down the smallest gap a person can still detect.",
  },
];

export default function TrialWalkthrough() {
  const [i, setI] = useState(0);
  const step = STEPS[i];

  return (
    <figure className="mt-8">
      <div className="rounded-card border border-line bg-paper-deep p-4">
        <div className="relative overflow-hidden rounded-card">
          <Image
            src="/agency/trial.png"
            alt="The trial filmstrip from the paper's Figure 1: an intended movement, a delay and a tone, then the same movement made passively with its own delay and tone, and finally the question asking which delay was shorter."
            width={1413}
            height={351}
            sizes="(min-width: 768px) 42rem, 100vw"
            className="h-auto w-full"
          />
          {/* Two masks rather than five: whatever is not the current stage is
              covered, so the highlight is always exactly one segment wide. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 bg-paper-deep/80 transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${step.from}%` }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 bg-paper-deep/80 transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${100 - step.to}%` }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 ring-2 ring-inset ring-primary transition-all duration-300 motion-reduce:transition-none"
            style={{ left: `${step.from}%`, width: `${step.to - step.from}%` }}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="eyebrow text-ink/45">
            Step {i + 1} of {STEPS.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setI((n) => Math.max(0, n - 1))}
              disabled={i === 0}
              className="rounded-btn border border-line-strong px-4 py-1.5 text-[0.85rem] transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line-strong"
            >
              <span aria-hidden="true">←</span> Back
            </button>
            <button
              type="button"
              onClick={() => setI((n) => Math.min(STEPS.length - 1, n + 1))}
              disabled={i === STEPS.length - 1}
              className="rounded-btn bg-primary px-4 py-1.5 text-[0.85rem] text-paper transition-colors hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary"
            >
              Next <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* Fixed height so stepping through does not shuffle the page. */}
        <div
          aria-live="polite"
          className="mt-4 border-t border-line pt-4 md:min-h-[5.5rem]"
        >
          <p className="eyebrow text-primary-soft">{step.label}</p>
          <p className="mt-2 max-w-measure text-[0.95rem] leading-snug text-ink/70">
            {step.text}
          </p>
        </div>
      </div>

      <figcaption className="mt-3 text-[0.9rem] text-ink/55">
        One trial, from the paper&rsquo;s Figure 1. Participants judged an
        intended movement against a passive one, and only the intention differed.
      </figcaption>
    </figure>
  );
}

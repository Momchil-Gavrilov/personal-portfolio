"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import {
  DEFAULT_THEME,
  THEMES,
  THEME_KEY,
  VOTE_KEY,
  type ThemeId,
  isThemeId,
} from "@/components/themes";
import { colourway } from "@/content/site";

/*
  One row in the footer, and no prose at all.

  It started as a bordered section with a heading, two paragraphs and a bar
  chart, and every revision since has been the same correction: it is a toy,
  and a toy that explains itself looks like it needs explaining. The label
  names the offer, the swatches are self-evident, and the link changes from
  "Vote for this one" to "Change my vote" with the results appearing beside
  it. That is the whole feedback loop, in two words and three percentages.

  The results stay off screen until someone votes, which is not only for
  space: a visible count anchors the answer, so asking first and showing
  second is the version that finds out what people think rather than what the
  last few people thought.

  Nothing floats, at any breakpoint. The choice persists to `localStorage` and
  applies on <html>, so it is found once here and holds for the whole site,
  case studies included. That persistence is what lets a control this small
  live this far down the page.
*/

/*
  The chosen colour and the fact of having voted both live in `localStorage`,
  which makes them an external store, and reading them with `useState` plus an
  effect is the wrong shape twice: the server cannot know either value, so a
  lazy initialiser renders something the server's HTML disagrees with, and
  correcting it in an effect is a cascading render.

  `useSyncExternalStore` is the shape that fits. It renders the server
  snapshot during hydration, so the markup always matches, and swaps to the
  real value immediately after. The page's colour is already correct before
  any of this runs, because the inline script in the layout set it during
  parsing; what this synchronises is only which swatch reads as selected.

  `storage` events cover the same site open in another tab. The listener set
  covers this tab, since a tab does not receive its own `storage` events.
*/
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function emit() {
  for (const listener of listeners) listener();
}

/* Read off the attribute rather than storage: the inline script has already
   resolved it, so this is guaranteed to agree with what is on screen. */
function readTheme(): ThemeId {
  const attr = document.documentElement.getAttribute("data-theme");
  return isThemeId(attr) ? attr : DEFAULT_THEME;
}

function readVote(): ThemeId | null {
  try {
    const stored = window.localStorage.getItem(VOTE_KEY);
    return isThemeId(stored) ? stored : null;
  } catch {
    return null;
  }
}

export default function Colourway() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => DEFAULT_THEME);
  const voted = useSyncExternalStore(subscribe, readVote, () => null);
  const [tally, setTally] = useState<Record<string, number> | null>(null);
  const [pending, setPending] = useState(false);

  /*
    Someone who voted on an earlier visit comes back to "Change my vote" and
    should see what everyone else said without having to click it again. The
    page itself is static, so the numbers arrive here: only for readers who
    have already voted, which is the same rule as showing them at all.

    A failure leaves `tally` null and the row simply renders without results
    rather than with an error, because nothing here is worth an error.
  */
  useEffect(() => {
    if (!voted || tally) return;
    let live = true;
    fetch("/api/vote")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (live && data?.tally) setTally(data.tally);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [voted, tally]);

  const choose = useCallback((id: ThemeId) => {
    /* The attribute first, because it is what `readTheme` reads and what the
       page is actually painted from. */
    document.documentElement.setAttribute("data-theme", id);
    try {
      window.localStorage.setItem(THEME_KEY, id);
    } catch {
      /* Storage blocked. The colour still changes for this visit, which is
         the part the reader asked for; it just will not survive a reload. */
    }
    emit();
  }, []);

  const vote = useCallback(async () => {
    setPending(true);
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ choice: theme }),
      });
      const data = res.ok ? await res.json() : null;
      if (data?.tally) setTally(data.tally);
      try {
        window.localStorage.setItem(VOTE_KEY, theme);
      } catch {
        /* Storage blocked: the vote counted server-side, this browser just
           cannot remember that it voted. The address check behind the route
           is what stops that becoming a way to vote repeatedly. */
      }
      emit();
    } catch {
      /* Offline or the route is down. Say nothing and leave the button
         available; a colour poll is not worth an error message. */
    } finally {
      setPending(false);
    }
  }, [theme]);

  const total = tally
    ? Object.values(tally).reduce((sum, n) => sum + n, 0)
    : 0;

  const shares =
    tally && total > 0
      ? THEMES.map((t) => ({
          ...t,
          share: Math.round(((tally[t.id] ?? 0) / total) * 100),
        }))
      : null;

  return (
    <div className="border-t border-line pt-6">
      {/* A little more air between the row's parts than inside them: the
          swatches sit 6px apart, so at 12px the vote link read as a fourth
          swatch that had lost its border. 16px between groups and 6px within
          them is enough for the row to arrive as label, control, link rather
          than as five loose objects. */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="eyebrow text-ink/50">{colourway.label}</span>

        {/*
          A radiogroup, not three buttons. These are three states of one
          setting and only one can be true, which is what a radio group means
          to a screen reader; three buttons would announce as three unrelated
          actions and never say which one is current.
        */}
        <div
          role="radiogroup"
          aria-label={colourway.label}
          className="flex flex-wrap items-center gap-1.5"
        >
          {THEMES.map((t) => {
            const active = t.id === theme;
            return (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => choose(t.id)}
                className={`flex items-center gap-1.5 rounded-btn border px-2.5 py-1 text-[0.75rem] transition-colors ${
                  active
                    ? "border-primary bg-primary text-paper"
                    : "border-line-strong text-ink/70 hover:border-ink hover:text-ink"
                }`}
              >
                {/*
                  A literal hex, not a token: an unselected swatch has to show
                  its own colour while a different one is the active theme, so
                  these cannot be `bg-primary`. The selected one goes paper
                  instead, because its dot would otherwise be the same colour
                  as the button it sits on and disappear. It loses nothing:
                  the whole page is already that colour, which is a better
                  preview than a 10px circle.
                */}
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: active ? "var(--color-paper)" : t.swatch,
                  }}
                />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* One control, two labels. "Change my vote" is the honest one once
            a vote exists, and it keeps the row the same length whichever
            state it is in. */}
        <button
          type="button"
          onClick={vote}
          disabled={pending}
          className="text-[0.75rem] text-primary-soft underline decoration-1 underline-offset-[0.25em] transition-opacity hover:opacity-70 disabled:opacity-40"
        >
          {voted ? colourway.change : colourway.cta}
        </button>

        {/*
          Badges, not a sentence. Three numbers read faster as three objects
          than as prose, and washing each one in its own colour means the
          result is legible before a single word is: which badge is biggest
          is the answer.

          To the right on a laptop, wrapping under on a phone. `ml-auto`
          rather than `justify-between` on the row, so the label and the
          swatches stay together while this is not here yet.
        */}
        {shares && (
          <ul className="ml-auto flex list-none flex-wrap items-center gap-1.5">
            {shares.map((s) => (
              /*
                The tint is the swatch at 12% via an eight-digit hex, so a
                badge sits in its own colour without a token per theme, and
                the number itself stays ink so it is readable at any of the
                three hues.
              */
              <li
                key={s.id}
                className="flex items-center gap-1.5 rounded-btn px-2 py-1"
                style={{ backgroundColor: `${s.swatch}1f` }}
              >
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: s.swatch }}
                />
                {/* The label is the badge's meaning and it is carried by
                    colour alone on screen, so it is spelled out for anyone
                    not reading in colour rather than left to the swatch. */}
                <span className="sr-only">{s.label}</span>
                <span className="font-mono text-[0.6875rem] tabular-nums text-ink/70">
                  {s.share}%
                </span>
              </li>
            ))}
            <li className="flex items-center rounded-btn border border-line px-2 py-1">
              <span className="font-mono text-[0.6875rem] tabular-nums text-ink/45">
                n&nbsp;=&nbsp;{total}
              </span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

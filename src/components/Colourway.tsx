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
  it. That is the whole feedback loop, in two words and three numbers.

  The counts are counts and not percentages. A percentage of an unknown n is
  a number that cannot be argued with or reasoned about, and three of them
  invite the arithmetic back out of the reader; "Green 41" says both things
  at once and does not need an n badge to be trusted.

  Beside the vote link is the one that takes words instead of clicks. It
  opens a box in place rather than going anywhere, because the reader is at
  the bottom of the page with an opinion and the cost of leaving it should be
  one click and no navigation.

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
    The feedback box's four states, kept apart on purpose. `open` is the
    panel, `note` is whatever the last attempt has to say back, and keeping
    them separate is what lets a thank-you outlive the textarea it replaced.
  */
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [note, setNote] = useState<string | null>(null);

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

  /*
    Sending is not the same shape as voting. A vote that fails can be
    swallowed, because the reader gave one click and the page still changed
    colour; a paragraph that fails silently loses something the reader wrote,
    which is the one outcome this widget must not produce. So this one talks
    back: on the throttle, on a failure, and on success.
  */
  const send = useCallback(async () => {
    const text = message.trim();
    if (!text || sending) return;
    setSending(true);
    setNote(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, theme }),
      });
      if (res.ok) {
        setMessage("");
        setNote(colourway.feedbackThanks);
      } else {
        setNote(
          res.status === 429
            ? colourway.feedbackThrottled
            : colourway.feedbackError
        );
      }
    } catch {
      /* Offline, or the route is down. The text stays in the box, which is
         the part that matters: nothing they wrote is thrown away. */
      setNote(colourway.feedbackError);
    } finally {
      setSending(false);
    }
  }, [message, sending, theme]);

  const counts = tally
    ? THEMES.map((t) => ({ ...t, count: tally[t.id] ?? 0 }))
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
          The second link, and the reason the row now has a gap between its
          two links rather than one control: these are different asks, one
          costing a click and one costing a sentence, and running them
          together would make the cheap one look expensive.
        */}
        <button
          type="button"
          onClick={() => {
            /* Reopening after a thank-you should be a fresh box, not the
               thank-you again. */
            setOpen((was) => !was);
            setNote(null);
          }}
          aria-expanded={open}
          aria-controls="colourway-feedback"
          className="text-[0.75rem] text-ink/55 underline decoration-1 underline-offset-[0.25em] transition-colors hover:text-ink"
        >
          {colourway.feedback}
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
        {counts && (
          <ul className="ml-auto flex list-none flex-wrap items-center gap-1.5">
            {counts.map((s) => (
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
                  {s.count}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/*
        Under the row rather than inside it. A textarea is the widest thing
        in the footer and putting it in the flex row would break the line the
        rest of the widget is built on; below, the row stays a row and the
        box arrives as a consequence of the click that asked for it.
      */}
      {open && (
        <div id="colourway-feedback" className="mt-3 max-w-md">
          <label className="sr-only" htmlFor="colourway-feedback-text">
            {colourway.feedbackPlaceholder}
          </label>
          <textarea
            id="colourway-feedback-text"
            /* The panel only exists because someone clicked to type, so the
               cursor belongs in it without a second click. */
            autoFocus
            rows={3}
            maxLength={1000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={colourway.feedbackPlaceholder}
            /* `rounded-card`, not the pill the buttons use: at three rows a
               999px radius turns the corners into ovals and the box reads as
               an inflated button rather than as somewhere to write. */
            className="w-full resize-y rounded-card border border-line-strong bg-transparent px-3 py-2 text-[0.8125rem] leading-relaxed text-ink placeholder:text-ink/40 focus:border-primary focus:outline-none"
          />
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <button
              type="button"
              onClick={send}
              disabled={sending || !message.trim()}
              className="rounded-btn border border-primary bg-primary px-3 py-1 text-[0.75rem] text-paper transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {colourway.feedbackSend}
            </button>
            {/* Polite, not assertive: this is confirmation of something the
                reader just did, and it should not interrupt whatever their
                screen reader is in the middle of. */}
            <p aria-live="polite" className="text-[0.75rem] text-ink/55">
              {note}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

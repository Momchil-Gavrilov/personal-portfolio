"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { STEPS } from "@/lib/pulse";

/*
  The instrument. Renders nothing.

  It watches one page view and sends one summary at the end, rather than firing
  an event per milestone as it happens. That is the design decision the rest of
  this file follows from, and it buys three things.

  The exit is only knowable at the end. "Which section was the reader looking
  at when they gave up" cannot be sent from the section itself, because at the
  moment it scrolls into view nobody knows yet that it is the last one. A
  stream of milestone events makes the reader's furthest point a thing the
  reading side has to reconstruct; one summary makes it a field.

  It costs one request per view instead of eight, which on a site whose
  analytics allowance is counted in events is the difference between measuring
  this and rationing it.

  And it survives the unload. `sendBeacon` hands the request to the browser,
  which delivers it after the page is gone; a `fetch` fired from the same
  handler is cancelled with everything else on the page. That is also why this
  does not go through `@vercel/analytics`: `track()` queues onto a script that
  makes no such guarantee, so the one event that matters most is the one least
  likely to arrive.

  Nothing here identifies anybody. No cookie, no storage, no id generated per
  visitor. What leaves the browser is how far this view got, how long it
  lasted, whether it was a phone, and which links were clicked, and the server
  adds all four to counters. Two people who read identically are the same two
  increments as one person reading twice.
*/

/* A section counts as reached once it has climbed into the top 60% of the
   viewport, not the instant its first pixel appears at the bottom edge. The
   difference matters on a phone, where the foot of the screen shows the next
   heading for most of the time spent reading the section above it, and
   "reached" would otherwise mean "was briefly below what you were reading". */
const READING_BAND = "0px 0px -40% 0px";

/*
  Nothing in this file is allowed to break the page it is measuring.

  That is not a general nicety, it is a statement about the trade. A portfolio
  that renders is worth something and a scroll-depth counter is worth very
  little, so any exchange of the first for the second is a bad one at any odds.
  Every callback the browser invokes goes through here, and the whole setup is
  wrapped at the call site, so the worst failure available to this component is
  that it silently stops counting. There is no failure mode in which a visitor
  sees anything.

  The catch is deliberately empty. There is nowhere useful to report to: the
  console belongs to whoever is looking at the site, and an analytics error is
  not their problem.
*/
function safely<A extends unknown[]>(fn: (...args: A) => void) {
  return (...args: A) => {
    try {
      fn(...args);
    } catch {
      /* Measurement is never worth a broken page. */
    }
  };
}

const beacon = safely((url: string, body: string) => {
  /* A plain string, not a Blob tagged `application/json`. `Request.json()`
     parses the body regardless of the content type it arrives with, and a
     string beacon goes out as `text/plain`, which is the one content type no
     browser has ever had second thoughts about sending during unload. */
  if (navigator.sendBeacon?.(url, body)) return;
  /* Browsers without `sendBeacon`, and the case where it refuses because the
     queue is full. `keepalive` is the same promise made by a different
     mechanism, and if that fails too the view is simply not counted. */
  void fetch(url, { method: "POST", body, keepalive: true }).catch(() => {});
});

/*
  Sets up the measurement for one page view and returns the function that ends
  it. Lives outside the component so the effect below is small enough to see
  the guard around it in one glance.
*/
function watch(pathname: string): (() => void) | undefined {
  /*
    Two ways out of measuring at all.

    `doNotTrack` is honoured although these counters hold nothing that could
    identify the person setting it. Somebody who has gone looking for that
    switch has said what they want, and "my collection is anonymous enough that
    your preference does not apply to me" is the reasoning every tracker uses.
    The cost is a rounding error in the totals.

    `webdriver` is set by automation. Preview crawlers, uptime checks and
    screenshot jobs would otherwise all land in the same bucket as a reader who
    opened the page and left, which is precisely the number this is for.
  */
  if (navigator.webdriver) return;
  if (navigator.doNotTrack === "1") return;

  const isStudy = pathname.startsWith("/work/");
  if (pathname !== "/" && !isStudy) return;

  let deepest = 0;
  /* Index into `STEPS` of the last section that exists on this page, filled
     in once the sections have been looked up. `-1` until then, which reads
     as "no bottom rule yet" in the check that uses it. */
  let lastStep = -1;
  let depth = 0;
  let elapsed = 0;
  let since = document.visibilityState === "visible" ? Date.now() : 0;
  let sent = false;
  const actions = new Set<string>();

  /*
    The page's own height, cached rather than read per scroll event.

    Two reasons, and the second is the one that matters. Reading `scrollHeight`
    forces the browser to settle layout, which is the one thing worth avoiding
    in a scroll handler. And it must not be read at all once the view is over:
    a `Link` to a case study ends this view by tearing the effect down, but
    React has already put the next page in the document by then, so a
    measurement taken at that moment divides this page's scroll position by the
    next page's height. That is not a rounding error, it is a number about two
    different documents, and it is how a reader who reached the bottom came
    back as 78%.
  */
  let pageHeight = document.documentElement.scrollHeight;

  const measureDepth = () => {
    /* A page shorter than the window has been seen in full by definition,
       and dividing by its height would report a fraction of a screenful the
       reader never had the option of scrolling past. */
    const seen =
      pageHeight <= window.innerHeight
        ? 100
        : ((window.scrollY + window.innerHeight) / pageHeight) * 100;
    if (seen > depth) depth = Math.min(100, seen);

    /*
      The bottom of the page counts as having reached the last section, and
      this is not a nicety. The reading band above is a fraction of the
      viewport, and on a tall enough window the final section cannot climb
      into it before the page runs out of scroll: measured on a 1440x1300
      display, the contact block came up 47 pixels short of the band with
      the page already scrolled as far as it goes. Left to the observer
      alone, every reader on a large monitor would have been recorded as
      having stopped at the story, and "nobody reaches the ask on desktop"
      would have looked like a finding about the page instead of a defect in
      the instrument. Anything still unreached once the page has bottomed
      out is not unreached, it is simply as reached as it can get.
    */
    if (depth >= 99 && lastStep > deepest) deepest = lastStep;
  };

  /* Straight through, not coalesced into an animation frame. With the page
     height cached this is two cheap reads and an arithmetic comparison, both
     of values the browser already has to hand and neither of which forces
     layout, so there is nothing left for a frame callback to save. Deferring
     it costs something real, though: the frame that would have recorded the
     last scroll before a reader leaves never runs, because the page is
     already going away. */
  const onScroll = safely(() => measureDepth());

  /* Late images, a web font landing and an orientation change all move the
     bottom of the page. Watching the document's own box catches every one
     of them, where a `resize` listener alone would catch only the last. */
  const sizeObserver =
    "ResizeObserver" in window
      ? new ResizeObserver(
          safely(() => {
            pageHeight = document.documentElement.scrollHeight;
            measureDepth();
          })
        )
      : null;

  const onClick = safely((event: Event) => {
    const target = event.target as Element | null;
    /* `closest` is missing on text nodes and on the document itself, both of
       which can be the target of a click. */
    const tagged = target?.closest?.("[data-pulse]");
    const value = tagged?.getAttribute("data-pulse");
    /* Capped so a stuck key or a mischievous console cannot grow the payload
       without bound. The server independently caps and validates it. */
    if (value && actions.size < 12) actions.add(value);
  });

  const send = safely(() => {
    if (sent) return;
    sent = true;
    if (since) elapsed += Date.now() - since;
    /* No final measurement here on purpose. See `pageHeight`: by the time
       this runs on a client-side navigation the document belongs to the
       next page, and everything worth reporting was already recorded while
       this one was still on screen. */
    beacon(
      "/api/pulse",
      JSON.stringify({
        path: pathname,
        deepest: isStudy ? null : STEPS[deepest],
        depth: Math.round(depth),
        seconds: Math.round(elapsed / 1000),
        device: window.matchMedia("(max-width: 767px)").matches
          ? "mobile"
          : "desktop",
        actions: [...actions],
      })
    );
  });

  /*
    The clock counts time the page was actually on screen, not time since it
    loaded. A tab opened in the background and read twenty minutes later has
    not held anyone's attention for twenty minutes, and letting it say so
    would put the site's most flattering dwell numbers in the hands of
    whoever opens the most tabs.
  */
  const onVisibility = safely(() => {
    if (document.visibilityState === "hidden") {
      if (since) {
        elapsed += Date.now() - since;
        since = 0;
      }
      /*
        Hidden is treated as the end of the view, which is not always true:
        the reader may come back and carry on, and this will not send a
        second, fuller summary when they finally leave for good.

        It is still the right call. On mobile there is frequently no later
        signal to wait for, because a backgrounded page is often discarded
        without `pagehide` ever running, and phone readers are the ones this
        is most trying to see. Undercounting the depth of a few interrupted
        sessions is a smaller error than losing whole classes of them.
      */
      send();
    } else {
      since = Date.now();
    }
  });

  /* Only the sections that exist on this page, in the order `STEPS` names.
     On a case study none of them do, the observer watches nothing, and the
     depth and dwell measurements above carry the whole view. */
  const observed = STEPS.map((step, index) => ({
    index,
    element: document.getElementById(step),
  })).filter(
    (entry): entry is { index: number; element: HTMLElement } =>
      entry.element !== null
  );

  /* Which step the bottom-of-page rule in `measureDepth` promotes to. Set
     before the first measurement, so a window tall enough to show the whole
     page without scrolling is credited with all of it. */
  lastStep = observed.length ? observed[observed.length - 1].index : -1;

  measureDepth();

  const observer =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          safely((entries: IntersectionObserverEntry[]) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              const match = observed.find((o) => o.element === entry.target);
              /* Furthest, not latest. Scrolling back up to re-read the
                 research section must not undo having reached the contact
                 block, or the exit counter would record where the reader
                 finished browsing rather than how far they got. */
              if (match && match.index > deepest) deepest = match.index;
            }
          }),
          { rootMargin: READING_BAND }
        )
      : null;

  if (observer) for (const { element } of observed) observer.observe(element);
  /* No observer means no way to tell one section from another, so the view
     is credited with the whole page rather than with none of it: an
     undercount here would be indistinguishable from a real bounce, and
     these are old browsers, not uninterested readers. */
  else deepest = Math.max(deepest, lastStep);

  sizeObserver?.observe(document.documentElement);
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("click", onClick, true);
  document.addEventListener("visibilitychange", onVisibility);
  /* `pagehide` rather than `unload`: it fires for tab closes and for
     navigations away, and unlike `unload` it does not disqualify the page
     from the browser's back/forward cache. */
  window.addEventListener("pagehide", send);

  /*
    Cleanup is the third way a view ends, and the one that catches moving
    between pages of this site. A `Link` to a case study never unloads the
    document, so neither `pagehide` nor `visibilitychange` runs; what happens
    instead is that this effect tears down and sets itself up again for the
    new path. Sending here is what makes "opened a case study" the end of the
    home page view rather than a gap in the record.
  */
  return () => {
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("click", onClick, true);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pagehide", send);
    observer?.disconnect();
    sizeObserver?.disconnect();
    send();
  };
}

export default function Pulse() {
  const pathname = usePathname();

  useEffect(() => {
    /* Both halves guarded, because they fail at different times: setup runs
       during React's effect phase, where a throw would surface to the nearest
       error boundary, and teardown runs mid-navigation, where a throw would
       leave the listeners from the previous page attached to the next one. */
    let stop: (() => void) | undefined;
    try {
      stop = watch(pathname);
    } catch {
      return;
    }
    return () => {
      try {
        stop?.();
      } catch {
        /* Nothing left to clean up that matters. */
      }
    };
  }, [pathname]);

  return null;
}

import Colourway from "@/components/Colourway";
import { contact, site } from "@/content/site";

/*
  Lifted out of the contact section so it is the page's footer rather than
  that section's: a `<footer>` nested in a `<section>` is scoped to that
  section as far as assistive technology is concerned, so the copyright was
  being announced as part of the contact block.

  The colourway widget lives here rather than in a section of its own. It is
  site furniture, the same class of thing as a language picker, and putting
  it in the footer is what keeps it optional: a reader who wants it finds it
  where settings live, and everyone else reaches the end of the page without
  being asked anything.

  The bottom padding is generous on purpose: it is the only thing keeping the
  last line of the page off the bottom edge of a phone, where iOS puts its own
  browser chrome.
*/
export default function Footer({ colourway = false }: { colourway?: boolean }) {
  return (
    <footer className="wrap">
      <div className="flex flex-col gap-6 pb-20 md:pb-24">
        {colourway && <Colourway />}
        <div
          className={`flex flex-wrap justify-between gap-5 ${
            /* The widget already draws a rule above itself; a second one
               here would box the two into a panel, which is the section this
               was deliberately stopped being. */
            colourway ? "" : "border-t border-line pt-6"
          }`}
        >
          <p className="eyebrow text-ink/50">{contact.footnote}</p>
          <p className="eyebrow text-ink/50">© 2026 {site.name}</p>
        </div>
      </div>
    </footer>
  );
}

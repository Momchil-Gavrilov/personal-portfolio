import Reveal from "@/components/Reveal";
import {
  skillGroups,
  skillsTitle,
  standards,
  standardsNote,
} from "@/content/site";

/*
  The standards lead, and every group is one line.

  Four rows of identical small type on primary read as a wall no matter how the
  space between them is tuned, because nothing in it was a different shape
  from anything else. Two changes fix that without adding height. The
  standards come first and come as bordered chips, so the fastest signal to a
  medical device reader is the first thing in the band and the one thing in it
  with an outline. The three skill groups follow as single lines with a thin
  middot between terms, which turns each group from a wrapped cloud into
  something the eye reads across once and leaves.

  A hairline under the standards row is the only rule here. It separates the
  aspirational row from the demonstrated ones, which is the one distinction in
  this band that has to survive a skim.
*/

/*
  `show` splits the band in two without duplicating it, which is how the page
  renders it: "standards" under the hero and "skills" at the foot. The two
  halves answer different questions and so belong in different places; see the
  comment in `src/app/page.tsx` for why.

  "both" is what the band was before the split. It is kept because the two
  halves are written to stand alone or together and the combined form is one
  line of code away, not because anything renders it today.
*/
type SkillsProps = {
  show?: "both" | "standards" | "skills";
  /* When the band is split, only one half may carry id="skills". Nothing
     links to it today (the nav observes #research, #work and #story), but two
     elements sharing an id is invalid regardless of who is looking. */
  anchor?: boolean;
};

/*
  Hanging labels.

  Every row in this band used to be a two-column grid: an 8.5rem label column,
  then the content. That put the chips and the term lists 10.5rem in from the
  page's left edge, so the one band on the page whose whole job is to be
  scanned started further right than every headline, paragraph and card above
  and below it, and the eye had to find a second left edge for it.

  The labels now hang in the margin outside the 64rem shell and the content
  starts on the page's own left edge, flush with everything else. Nothing
  moves except the label, which stops being a column and becomes an
  annotation.

  `right-full` puts the label immediately left of the content box and `mr-8`
  clears it; at the `xl` breakpoint the shell is 1024px inside a viewport of
  at least 1280, so there are 128px of outer margin plus the shell's own 32px
  of padding to hang into, and the longest label here is about 90px set. Below
  `xl` there is no margin to hang into, so the label goes back in flow and
  stacks directly above its content, which keeps the content on the same left
  edge at every width. That is the part that actually matters; the hang is the
  part that looks good on a wide screen.

  `top` is a hair above the content's first line rather than zero: the eyebrow
  is 11px on a 1.4 line and the content it labels is 12 to 13px on a taller
  one, so matching the boxes leaves the label sitting visibly low.
*/
const ROW = "relative flex flex-col gap-2 xl:block";
const LABEL =
  "eyebrow text-paper/45 xl:absolute xl:top-[0.3rem] xl:right-full xl:mr-8 xl:whitespace-nowrap";

/* One group's terms as a single line. Separated by a middot rather than by
   space alone: the separator is quieter than the terms it divides, so the row
   reads as one line of vocabulary instead of five loose labels that happen to
   sit near each other. */
function Terms({ items }: { items: readonly string[] }) {
  return (
    <>
      {items.map((item, i) => (
        <span key={item}>
          <span className="whitespace-nowrap">{item}</span>
          {i < items.length - 1 && (
            <span aria-hidden="true" className="text-paper/25">
              {" · "}
            </span>
          )}
        </span>
      ))}
    </>
  );
}

export default function Skills({ show = "both", anchor = true }: SkillsProps) {
  const withStandards = show === "both" || show === "standards";
  const withGroups = show === "both" || show === "skills";

  /* Standing alone at the foot of the page the band has to say what it is;
     under the hero it does not, because it sits directly beneath the name and
     the figures and reads as part of the same introduction.

     The label goes in the label column, in exactly the position and the exact
     treatment "Learning" has in the standards band. A rule and a display
     heading above the band would have announced a new section, which is more
     than a strip of vocabulary is; this costs no height at all and the two
     bands stay recognisably the same object seen twice. The group names move
     inline to lead their own rows, which is where they read anyway. */
  const labelled = show === "skills";

  return (
    <section
      id={anchor ? "skills" : undefined}
      className="bg-primary py-7 text-paper md:py-8"
    >
      <div className="wrap">
        <h2 className="sr-only">{skillsTitle}</h2>

        <Reveal>
          <dl className="flex flex-col">
            {withStandards && (
              <div
                className={`${ROW} ${
                  withGroups ? "border-b border-paper/12 pb-4" : ""
                }`}
              >
                {/* The label stays "Learning", not "Standards". Leading with
                    it is a stronger signal; overstating it would be a worse
                    one. */}
                <dt className={LABEL}>{standardsNote}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-x-2 gap-y-2">
                    {standards.map((item) => (
                      <li
                        key={item}
                        className="whitespace-nowrap rounded-full border border-paper/20 px-2.5 py-1 text-[0.75rem] leading-none text-paper/70"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}

            {withGroups && labelled && (
              <div className={ROW}>
                <dt className={LABEL}>{skillsTitle}</dt>
                <dd className="flex flex-col gap-2 text-[0.8125rem] leading-relaxed text-paper/55">
                  {skillGroups.map((row) => (
                    <p key={row.group}>
                      {/* Brighter than its terms, so the eye can still pick
                          the three groups out of the block at a glance. */}
                      <span className="whitespace-nowrap text-paper/80">
                        {row.group}
                      </span>
                      <span aria-hidden="true" className="text-paper/25">
                        {" · "}
                      </span>
                      <Terms items={row.items} />
                    </p>
                  ))}
                </dd>
              </div>
            )}

            {withGroups && !labelled && (
              <div
                className={`flex flex-col gap-2.5 ${
                  withStandards ? "pt-4" : ""
                }`}
              >
                {skillGroups.map((row) => (
                  <div key={row.group} className={ROW}>
                    <dt className={LABEL}>{row.group}</dt>
                    <dd className="text-[0.8125rem] leading-relaxed text-paper/55">
                      <Terms items={row.items} />
                    </dd>
                  </div>
                ))}
              </div>
            )}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

import SectionTitle from "@/components/SectionTitle";
import { story, storyTitle } from "@/content/site";

/*
  Two columns, the whole passage open, no toggle.

  Folding the middle of it behind "Read the full story" meant the two
  paragraphs that carry the reason were the two nobody read. Set in two
  columns the full passage costs about the height the folded version did, so
  the choice between length and completeness stopped being a choice.

  Split by hand rather than with CSS columns: the columns are read left one
  then right one, not as one stream flowing round a bend, and the break lands
  where the story turns from the LED to the people.

  One face at one size throughout. The serif lead was a pull quote in
  everything but name, and it made the opening paragraph look like a summary
  of the four that followed rather than the first of five. This is one voice
  telling one story, so it is set as one.
*/
const LEFT = [0, 1];
const RIGHT = [2, 3];

export default function Story() {
  return (
    /* The title sits lower in the band than the other sections put theirs.
       Four short paragraphs in two columns is a shallow block, and hung from
       the top of a tinted band it left the whole section bottom-heavy. */
    <section id="story" className="bg-paper-deep pt-16 pb-12 md:pt-20 md:pb-14">
      <div className="wrap">
        <SectionTitle title={storyTitle} />

        {/* Columns deliberately unequal, 0.86 against 1. The left carries the
            two shorter paragraphs, so at equal widths it runs shy of the
            right one; narrowing it until the two wrap to the same number of
            lines is what makes both bottom lines land on the same baseline,
            not just the two column boxes come out the same height. */}
        <div className="mt-7 grid gap-x-12 gap-y-4 md:grid-cols-[minmax(0,0.86fr)_minmax(0,1fr)]">
          {[LEFT, RIGHT].map((column, ci) => (
            <div key={ci} className="flex flex-col gap-4">
              {column.map((i) => (
                <p key={i} className="text-[0.9375rem] leading-[1.7] text-ink/70">
                  {story[i]}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

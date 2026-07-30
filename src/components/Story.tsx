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

/*
  The opening sentence, lifted out of the first paragraph and set in the soft
  weight at the heavier weight. The split happens here rather than in the content
  file because `story` is his passage verbatim and should stay one continuous
  piece of writing; where the emphasis falls is a presentation decision.

  It splits on the first sentence, not on the first rendered line. A rendered
  line is however many words happen to fit the window, so colouring one would
  put the break in a different place on every screen and cut mid-clause on
  most of them. The sentence is the unit that means something.
*/
function splitLead(paragraph: string): [string, string] {
  const end = paragraph.indexOf(". ");
  if (end === -1) return [paragraph, ""];
  return [paragraph.slice(0, end + 1), paragraph.slice(end + 2)];
}

export default function Story() {
  const [lead, restOfFirst] = splitLead(story[0]);

  return (
    /* The title used to sit on its own row above both columns, which left the
       entire width beside it — a short two-line heading next to a 480px-wide
       gap — empty for the height of the title. Folding the title into the
       left column and letting the right column start at the same top edge
       puts the right column's first paragraph beside the title instead of
       below it, closing that gap and taking a full row's height out of the
       section. */
    <section id="story" className="bg-paper-deep pt-16 pb-12 md:pt-20 md:pb-14">
      <div className="wrap">
        <div className="grid gap-x-12 gap-y-4 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)]">
          {/* Bottom-aligned too, so the guarantee is unconditional. Whichever
              column happens to be the taller one at a given width sets the
              row, and both columns' last lines land on the row's bottom edge
              either way. Without this, the four widths where the right column
              wraps to one more line than the left left the bottoms 2px apart:
              small, but the whole point of this pass is that a careful reader
              sees exactly that kind of thing. */}
          <div className="flex flex-col gap-4 md:justify-end">
            <SectionTitle title={storyTitle} />
            {LEFT.map((i) => (
              <p
                key={i}
                className="text-[0.9375rem] leading-[1.7] text-ink/70"
              >
                {/* The lead sentence stays inside its own paragraph rather
                    than becoming a pull quote above it. It is the first
                    sentence of the story, not a summary of it, and lifting it
                    out would make it the second thing that introduces the
                    section after the heading already did. Colour and weight
                    are enough to make it the entry point. */}
                {i === 0 ? (
                  <>
                    <strong className="font-semibold text-primary-soft">
                      {lead}
                    </strong>{" "}
                    {restOfFirst}
                  </>
                ) : (
                  story[i]
                )}
              </p>
            ))}
          </div>

          {/* Bottom-aligned, not padded down by a hand-tuned offset. The
              offset that used to sit here (1.6rem) put the two columns' last
              lines on the same baseline at exactly one window width, because
              a fixed padding cannot know how many lines each column wrapped
              to. Every other width left the bottoms a line or two apart,
              which is the kind of thing a careful reader sees without being
              able to say what they are seeing.

              `justify-end` makes the alignment a consequence of the layout
              instead of a number: the left column, which carries the title,
              sets the row's height, and this column's last line lands on the
              left column's last baseline at any width and after any edit to
              the copy. It still starts beside the title rather than below it,
              which is what the offset was for. */}
          <div className="flex flex-col gap-4 md:justify-end">
            {RIGHT.map((i) => (
              <p
                key={i}
                className="text-[0.9375rem] leading-[1.7] text-ink/70"
              >
                {story[i]}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

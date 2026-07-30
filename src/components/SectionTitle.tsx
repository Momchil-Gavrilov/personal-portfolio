/*
  Section heading.

  Size alone was not separating these from the item titles under them: 44px
  against 34px is a 1.3 ratio, close enough that the eye read two headings of
  the same rank and the page lost its outline. The gap is now 44 against 28,
  and a short primary rule sits above the heading so a section announces itself
  as a different order of thing rather than just a larger one.
*/
export default function SectionTitle({ title }: { title: string }) {
  return (
    <div>
      <span
        aria-hidden="true"
        className="block h-[3px] w-10 bg-primary"
      />
      <h2 className="display mt-5 text-[1.625rem] md:text-[2.125rem]">{title}</h2>
    </div>
  );
}

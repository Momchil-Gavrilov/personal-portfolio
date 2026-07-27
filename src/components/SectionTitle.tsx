/*
  Section heading. In this system the heading carries itself: 44px, tight
  tracking, no rule and no ornament under it. The bands do the separating.
*/
export default function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="display text-[2rem] md:text-[2.75rem]">{title}</h2>
  );
}

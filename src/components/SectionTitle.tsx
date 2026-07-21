/*
  Section heading with the thin gold rule beneath — the site's
  quiet recurring motif.
*/
export default function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-10">
      <h2 className="font-display text-3xl font-medium text-maroon md:text-4xl">
        {title}
      </h2>
      <span className="rule-gold mt-4" aria-hidden="true" />
    </div>
  );
}

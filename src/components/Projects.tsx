import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { productStudies } from "@/content/case-studies";

/*
  Products render as a row of app-icon tiles. Published tiles link to
  their case study; coming-soon tiles are quietly disabled.
*/
/*
  Only "in-use" earns the pulsing dot. A demo or a prototype says what it is,
  because a badge that overstates is the fastest way to lose a careful reader.
*/
function Badge({ label, kind }: { label: string; kind: string }) {
  const inUse = kind === "in-use";
  return (
    <span className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-line bg-cream/95 px-2.5 py-1 shadow-sm">
      {inUse ? (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3f9b5b] opacity-75 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3f9b5b]" />
        </span>
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-ink-soft/45" />
      )}
      <span className="smallcaps text-[0.65rem] leading-none text-ink">
        {label}
      </span>
    </span>
  );
}

function Tile({
  monogram,
  icon,
  title,
  live,
  badge,
}: {
  monogram: string;
  icon?: string;
  title: string;
  live: boolean;
  badge?: { label: string; kind: string };
}) {
  return (
    <div className="relative">
      {badge && <Badge label={badge.label} kind={badge.kind} />}
      <div
        className={`flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border transition-all ${
          live
            ? "border-line bg-cream-deep group-hover:border-gold group-hover:-translate-y-1 group-hover:shadow-[0_10px_30px_rgba(43,38,34,0.12)]"
            : "border-dashed border-line bg-cream-deep/40"
        }`}
      >
        {icon ? (
          <Image
            src={icon}
            alt={`${title} app icon`}
            width={220}
            height={220}
            sizes="(min-width: 640px) 12rem, 40vw"
            className="h-3/5 w-3/5 rounded-[22%]"
          />
        ) : (
          <span
            className={`font-display text-4xl font-semibold md:text-5xl ${
              live ? "text-maroon" : "text-ink-soft/50"
            }`}
          >
            {monogram}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="border-t border-line py-14 md:py-20">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <Reveal>
          <SectionTitle title="Products and Engineering Work" />
        </Reveal>
        <Reveal>
          {/* Two up on phones. At one column the app icon renders as a 342px
              square, which made this section longer than the research on a
              phone: the most decorative thing on the page taking the most
              room on the smallest screen. */}
          <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-8 lg:grid-cols-4">
            {productStudies.map((cs) => {
              const live = cs.status === "published";
              const inner = (
                <>
                  <Tile
                    monogram={cs.monogram ?? cs.title[0]}
                    icon={cs.icon}
                    title={cs.title}
                    live={live}
                    badge={cs.badge}
                  />
                  <div className="mt-4">
                    <h3 className="font-display text-xl font-medium text-ink transition-colors group-hover:text-maroon">
                      {cs.title}
                    </h3>
                    {/* The outcome, not the description. The tile and the
                        title already say what the thing is. */}
                    <p className="mt-1 text-[0.95rem] leading-snug text-ink-soft">
                      {cs.outcome ?? cs.oneLiner}
                    </p>
                    {live ? (
                      <p className="mt-3 text-[0.9rem] font-semibold text-maroon">
                        Open case study <span aria-hidden="true">→</span>
                      </p>
                    ) : (
                      <p className="smallcaps mt-3 text-gold-deep">Coming soon</p>
                    )}
                  </div>
                </>
              );
              return (
                <li key={cs.slug}>
                  {live ? (
                    <Link
                      href={`/work/${cs.slug}`}
                      className="group block rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div className="group block">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

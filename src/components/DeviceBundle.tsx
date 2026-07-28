import Image from "next/image";
import type { CaseStudyImage } from "@/content/case-studies";

/*
  The showcase shot: laptop behind, tablet beside it, phone in front.

  One product on this site runs on every screen the centre owns, and a single
  phone screenshot said none of that. Three overlapping devices is the
  conventional way to show it and it is conventional because it reads
  instantly: this is a real thing, on real hardware, in more than one place.

  Composed in CSS from three real screenshots rather than baked into an image,
  so every screen stays sharp at any size and any one of them can be swapped
  without opening an editor. Percentages throughout, so the whole cluster
  scales with its container.
*/
export default function DeviceBundle({
  laptop,
  tablet,
  phone,
  className = "",
}: {
  laptop: CaseStudyImage;
  tablet: CaseStudyImage;
  phone: CaseStudyImage;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Laptop, back left. Sized off the container so the cluster is
          predictable at every breakpoint. */}
      <div className="absolute left-0 top-0 w-[78%]">
        <div className="rounded-t-[0.4rem] bg-ink p-[0.3rem] pb-0 shadow-[0_10px_30px_rgba(16,24,32,0.16)]">
          <div className="aspect-16/10 overflow-hidden rounded-t-[0.2rem] bg-white">
            <Image
              src={laptop.src}
              alt={laptop.alt}
              width={laptop.width ?? 960}
              height={laptop.height ?? 600}
              sizes="(min-width: 768px) 26rem, 60vw"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
        <div aria-hidden="true" className="h-[0.3rem] w-full bg-ink" />
        <div
          aria-hidden="true"
          className="mx-auto h-[0.35rem] w-[106%] -translate-x-[3%] rounded-b-[0.3rem] bg-ink/85"
        />
      </div>

      {/* Tablet, front left, overlapping the laptop's lower corner. Kept to
          the outer third so it clears the laptop's own centred content. */}
      <div className="absolute bottom-0 left-0 w-[27%]">
        <div className="rounded-[0.7rem] bg-ink p-[0.35rem] shadow-[0_12px_28px_rgba(16,24,32,0.24)]">
          <div className="aspect-3/4 overflow-hidden rounded-[0.45rem] bg-white">
            <Image
              src={tablet.src}
              alt={tablet.alt}
              width={tablet.width ?? 720}
              height={tablet.height ?? 960}
              sizes="(min-width: 768px) 10rem, 24vw"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* Phone, front right, carrying the screen that actually matters. */}
      <div className="absolute bottom-0 right-0 w-[21%]">
        <div className="relative rounded-[0.85rem] bg-ink p-[0.22rem] shadow-[0_14px_30px_rgba(16,24,32,0.28)]">
          <div className="relative aspect-[9/19] overflow-hidden rounded-[0.7rem] bg-white">
            <Image
              src={phone.src}
              alt={phone.alt}
              width={phone.width ?? 860}
              height={phone.height ?? 1864}
              sizes="(min-width: 768px) 7rem, 18vw"
              className="h-full w-full object-cover object-top"
            />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-[0.3rem] h-[0.14rem] w-[22%] -translate-x-1/2 rounded-full bg-ink/25"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import type { CaseStudyImage } from "@/content/case-studies";

/*
  The conventional four-device product shot.

  Monitor centred and behind at full height, then the other three overlapping
  its lower edge rather than standing beside it: laptop left, phone and tablet
  right. Standing apart they read as four separate pictures at four unrelated
  sizes; overlapping, they read as one object.

  Sizes are set against the monitor deliberately. A tablet is roughly half a
  monitor's height and a phone roughly a third, so those proportions hold
  here, which is what stops the cluster looking like clip art.

  Composed in CSS from real captures rather than baked into an image, so every
  screen stays sharp at any size and any one of them can be swapped without
  opening an editor. Stacking order runs back to front in the DOM.
*/

function Screen({
  image,
  sizes,
}: {
  image: CaseStudyImage;
  sizes: string;
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width ?? 960}
      height={image.height ?? 600}
      sizes={sizes}
      className="h-full w-full object-cover object-top"
    />
  );
}

export default function DeviceBundle({
  desktop,
  laptop,
  tablet,
  phone,
  className = "",
}: {
  desktop: CaseStudyImage;
  laptop: CaseStudyImage;
  tablet: CaseStudyImage;
  phone: CaseStudyImage;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Monitor, back and centre. Everything else is scaled against it. */}
      <div className="absolute left-[16%] top-0 w-[68%]">
        <div className="rounded-[0.5rem] bg-ink p-[0.4rem] shadow-[0_16px_38px_rgba(16,24,32,0.2)]">
          <div className="aspect-16/10 overflow-hidden rounded-[0.2rem] bg-white">
            <Screen image={desktop} sizes="(min-width: 768px) 24rem, 52vw" />
          </div>
        </div>
        <div
          aria-hidden="true"
          className="mx-auto w-[11%] bg-ink/80"
          style={{ height: "1.5rem" }}
        />
        <div
          aria-hidden="true"
          className="mx-auto h-[0.35rem] w-[30%] rounded-full bg-ink/80"
        />
      </div>

      {/* Laptop, overlapping the monitor's lower left. */}
      <div className="absolute bottom-0 left-0 w-[46%]">
        <div className="rounded-t-[0.35rem] bg-ink p-[0.25rem] pb-0 shadow-[0_12px_28px_rgba(16,24,32,0.22)]">
          <div className="aspect-16/10 overflow-hidden rounded-t-[0.15rem] bg-white">
            <Screen image={laptop} sizes="(min-width: 768px) 16rem, 36vw" />
          </div>
        </div>
        <div aria-hidden="true" className="h-[0.25rem] w-full bg-ink" />
        <div
          aria-hidden="true"
          className="h-[0.32rem] w-full rounded-b-[0.3rem] bg-ink/85"
        />
      </div>

      {/* Tablet, overlapping the monitor's lower right. */}
      <div className="absolute bottom-[3%] right-[2%] w-[21%]">
        <div className="rounded-[0.5rem] bg-ink p-[0.25rem] shadow-[0_12px_26px_rgba(16,24,32,0.26)]">
          <div className="aspect-3/4 overflow-hidden rounded-[0.3rem] bg-white">
            <Screen image={tablet} sizes="(min-width: 768px) 7rem, 18vw" />
          </div>
        </div>
      </div>

      {/* Phone, frontmost, tucked against the tablet. */}
      <div className="absolute bottom-0 right-[19%] w-[11.5%]">
        <div className="rounded-[0.5rem] bg-ink p-[0.15rem] shadow-[0_14px_26px_rgba(16,24,32,0.32)]">
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[0.4rem] bg-white">
            <Screen image={phone} sizes="(min-width: 768px) 4rem, 11vw" />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-[0.18rem] h-[0.09rem] w-[26%] -translate-x-1/2 rounded-full bg-ink/25"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

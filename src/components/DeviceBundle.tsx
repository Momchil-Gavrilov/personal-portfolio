import Image from "next/image";
import type { CaseStudyImage } from "@/content/case-studies";

/*
  The conventional four-device product shot, built around one shared floor.

  Every device's own base (the monitor's foot, the laptop's hinge bar) is
  anchored to the same bottom offset, so they visibly stand on one line
  rather than floating at four independent heights. Anchoring by `bottom`
  rather than `top` is what makes this possible: each device stacks its own
  parts (screen, neck, foot) in normal flow with an automatic height, and the
  browser still lines up every base against the shared line regardless of how
  tall any one device turns out to be.

  The laptop, tablet and phone overlap the monitor deeply rather than
  touching its edge, which is what makes four screenshots read as one
  cluster instead of four separate pictures scattered around a page.
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

/* The shared floor. Laptop and monitor stand exactly here; tablet and phone,
   being frontmost, are allowed to sit slightly lower, per direction. */
const FLOOR = "6%";
const FLOOR_TABLET = "3%";
const FLOOR_PHONE = "0%";

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
      {/* Monitor: back, centred, its foot on the floor line. */}
      <div
        className="absolute left-[15%] w-[70%]"
        style={{ bottom: FLOOR }}
      >
        <div className="rounded-[0.5rem] bg-ink p-[0.4rem] shadow-[0_16px_38px_rgba(16,24,32,0.2)]">
          <div className="aspect-16/10 overflow-hidden rounded-[0.2rem] bg-white">
            <Screen image={desktop} sizes="(min-width: 768px) 26rem, 56vw" />
          </div>
        </div>
        <div
          aria-hidden="true"
          className="mx-auto w-[11%] bg-ink/80"
          style={{ height: "1.4rem" }}
        />
        <div
          aria-hidden="true"
          className="mx-auto h-[0.35rem] w-[30%] rounded-full bg-ink/80"
        />
      </div>

      {/* Laptop: front left, its own base on the same floor line. Wide enough
          and far enough right that its screen occludes the monitor's lower
          left quarter rather than merely meeting its edge. */}
      <div className="absolute left-0 w-[38%]" style={{ bottom: FLOOR }}>
        <div className="rounded-t-[0.35rem] bg-ink p-[0.28rem] pb-0 shadow-[0_14px_30px_rgba(16,24,32,0.26)]">
          <div className="aspect-16/10 overflow-hidden rounded-t-[0.15rem] bg-white">
            <Screen image={laptop} sizes="(min-width: 768px) 14rem, 32vw" />
          </div>
        </div>
        <div aria-hidden="true" className="h-[0.28rem] w-full bg-ink" />
        <div
          aria-hidden="true"
          className="h-[0.34rem] w-full rounded-b-[0.3rem] bg-ink/85"
        />
      </div>

      {/* Tablet: front right, sitting a little lower than the floor line, as
          the frontmost objects are allowed to. Deep into the monitor's lower
          right rather than beside it. */}
      <div
        className="absolute right-[4%] w-[19%]"
        style={{ bottom: FLOOR_TABLET }}
      >
        <div className="rounded-[0.5rem] bg-ink p-[0.26rem] shadow-[0_14px_28px_rgba(16,24,32,0.3)]">
          <div className="aspect-3/4 overflow-hidden rounded-[0.3rem] bg-white">
            <Screen image={tablet} sizes="(min-width: 768px) 7rem, 17vw" />
          </div>
        </div>
      </div>

      {/* Phone: frontmost of all, tucked against the tablet's left edge. */}
      <div
        className="absolute right-[21%] w-[10.5%]"
        style={{ bottom: FLOOR_PHONE }}
      >
        <div className="rounded-[0.5rem] bg-ink p-[0.16rem] shadow-[0_16px_28px_rgba(16,24,32,0.36)]">
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[0.42rem] bg-white">
            <Screen image={phone} sizes="(min-width: 768px) 4rem, 10vw" />
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

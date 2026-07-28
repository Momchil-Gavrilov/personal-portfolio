import Image from "next/image";
import type { CaseStudyImage } from "@/content/case-studies";

/*
  The conventional four-device product shot: monitor centred and behind,
  laptop to its left, phone and tablet in front on the right.

  It is conventional because it reads instantly. One product on this site runs
  on whatever screen the centre has to hand, and a single phone screenshot
  said none of that.

  Composed in CSS from real captures rather than baked into an image, so every
  screen stays sharp at any size and any one of them can be swapped without
  opening an editor. Percentages throughout, so the cluster scales with its
  container. Stacking order runs back to front in the DOM.
*/

function Screen({
  image,
  sizes,
  className,
}: {
  image: CaseStudyImage;
  sizes: string;
  className: string;
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width ?? 960}
      height={image.height ?? 600}
      sizes={sizes}
      className={className}
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
      {/* Monitor: centred, back, and the largest thing in the cluster. */}
      <div className="absolute left-[20%] top-0 w-[60%]">
        <div className="rounded-[0.5rem] bg-ink p-[0.4rem] shadow-[0_14px_34px_rgba(16,24,32,0.18)]">
          <div className="aspect-16/10 overflow-hidden rounded-[0.2rem] bg-white">
            <Screen
              image={desktop}
              sizes="(min-width: 768px) 20rem, 45vw"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
        {/* Stand: neck, then foot. */}
        <div
          aria-hidden="true"
          className="mx-auto h-[9%] w-[12%] bg-ink/80"
          style={{ height: "1.6rem" }}
        />
        <div
          aria-hidden="true"
          className="mx-auto h-[0.35rem] w-[34%] rounded-full bg-ink/80"
        />
      </div>

      {/* Laptop: front left, its base overlapping the monitor's foot. */}
      <div className="absolute bottom-[4%] left-0 w-[43%]">
        <div className="rounded-t-[0.35rem] bg-ink p-[0.25rem] pb-0 shadow-[0_10px_26px_rgba(16,24,32,0.2)]">
          <div className="aspect-16/10 overflow-hidden rounded-t-[0.15rem] bg-white">
            <Screen
              image={laptop}
              sizes="(min-width: 768px) 14rem, 34vw"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
        <div aria-hidden="true" className="h-[0.25rem] w-full bg-ink" />
        <div
          aria-hidden="true"
          className="mx-auto h-[0.3rem] w-[112%] -translate-x-[5.4%] rounded-b-[0.25rem] bg-ink/85"
        />
      </div>

      {/* Tablet: front right. */}
      <div className="absolute bottom-0 right-[1%] w-[27%]">
        <div className="rounded-[0.55rem] bg-ink p-[0.28rem] shadow-[0_12px_26px_rgba(16,24,32,0.24)]">
          <div className="aspect-3/4 overflow-hidden rounded-[0.35rem] bg-white">
            <Screen
              image={tablet}
              sizes="(min-width: 768px) 9rem, 22vw"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* Phone: frontmost, carrying the screen that actually matters. */}
      <div className="absolute bottom-[1%] right-[26%] w-[16%]">
        <div className="rounded-[0.6rem] bg-ink p-[0.18rem] shadow-[0_14px_28px_rgba(16,24,32,0.3)]">
          <div className="relative aspect-[9/19] overflow-hidden rounded-[0.48rem] bg-white">
            <Screen
              image={phone}
              sizes="(min-width: 768px) 5rem, 14vw"
              className="h-full w-full object-cover object-top"
            />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-[0.22rem] h-[0.1rem] w-[24%] -translate-x-1/2 rounded-full bg-ink/25"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

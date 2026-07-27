import Image from "next/image";
import type { CaseStudyImage } from "@/content/case-studies";

/*
  Screenshots in the device they actually run on.

  A phone screenshot cropped into a landscape box reads as a fragment; the
  same screenshot inside a phone reads as a product. The frames are drawn in
  CSS rather than baked into the images, so they stay sharp at any size and
  cost no new assets.

  "bare" exists for photographs, which need no frame and look wrong in one.
*/
export default function DeviceFrame({
  image,
  className = "",
  sizes,
}: {
  image: CaseStudyImage;
  className?: string;
  sizes?: string;
}) {
  const frame = image.frame ?? "bare";

  const picture = (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width ?? 800}
      height={image.height ?? 600}
      sizes={sizes}
      className={
        frame === "bare"
          ? "h-full w-full object-cover object-center"
          : "block h-full w-full object-cover object-top"
      }
    />
  );

  if (frame === "bare") {
    return (
      <div
        className={`overflow-hidden rounded-card border border-line bg-white ${className}`}
      >
        {picture}
      </div>
    );
  }

  if (frame === "phone") {
    return (
      <div
        className={`flex items-center justify-center rounded-card bg-chip p-4 ${className}`}
      >
        {/* Aspect ratio comes from the screenshot itself, so the bezel always
            fits the content rather than cropping it to a guessed phone shape. */}
        <div
          className="relative h-full max-w-full rounded-[1.6rem] bg-ink p-[0.3rem] shadow-[0_8px_24px_rgba(16,24,32,0.22)]"
          style={{
            aspectRatio: `${image.width ?? 9} / ${image.height ?? 19}`,
          }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[1.35rem] bg-white">
            {picture}
            {/* The speaker slot. Small enough to read as a phone without
                pretending to be a specific manufacturer's handset. */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-[0.35rem] h-[0.2rem] w-[18%] -translate-x-1/2 rounded-full bg-ink/25"
            />
          </div>
        </div>
      </div>
    );
  }

  if (frame === "laptop") {
    return (
      <div
        className={`flex items-center justify-center rounded-card bg-chip p-4 ${className}`}
      >
        <div className="flex w-full max-w-full flex-col items-center">
          {/* Lid. The screen keeps a 16:10 window on the screenshot, which is
              what a laptop actually shows, rather than the full page height. */}
          <div className="w-full rounded-t-[0.5rem] bg-ink p-[0.35rem] pb-0">
            <div className="aspect-16/10 w-full overflow-hidden rounded-t-[0.25rem] bg-white">
              {picture}
            </div>
          </div>
          {/* Hinge, then the base lipping out past the lid on both sides. */}
          <div
            aria-hidden="true"
            className="h-[0.35rem] w-full bg-ink"
          />
          <div
            aria-hidden="true"
            className="h-[0.4rem] w-[108%] rounded-b-[0.35rem] bg-ink/85 shadow-[0_6px_14px_rgba(16,24,32,0.18)]"
          />
        </div>
      </div>
    );
  }

  /* browser: a plain chrome bar, for web apps shown without a machine */
  return (
    <div
      className={`overflow-hidden rounded-card border border-line bg-white ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-line bg-chip px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-ink/20" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-ink/20" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-ink/20" aria-hidden="true" />
      </div>
      <div className="h-[calc(100%-2.25rem)] overflow-hidden">{picture}</div>
    </div>
  );
}

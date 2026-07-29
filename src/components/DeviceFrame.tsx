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

  /*
    A laptop screen shows a whole page, so it letterboxes rather than crops.
    `object-cover` was silently cutting the right-hand edge off the CaseBase
    screenshot: the screen well works out to about 1.58:1 once the bezel
    padding is subtracted, the source is 16:10, and cover resolves that
    mismatch by trimming rather than by scaling. `contain` keeps the page
    whole and lets the tiny difference show as background instead.

    Phones still cover, because a phone screenshot is a scrolling view where
    trimming the bottom edge is exactly what a real device does.
  */
  const fit =
    frame === "laptop"
      ? "object-contain object-top"
      : frame === "bare"
        ? "object-cover object-center"
        : "object-cover object-top";

  const picture = (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width ?? 800}
      height={image.height ?? 600}
      sizes={sizes}
      className={`block h-full w-full ${fit}`}
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
      /* No mat behind the device. A tinted box around a bezel is two frames
         around one screenshot, and it shrank the thing the reader came to see. */
      <div className={`flex items-center justify-center ${className}`}>
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
    /*
      Rebuilt as one box with a fixed outer ratio and both parts positioned
      inside it as percentages of that box.

      Every earlier version stacked lid, hinge and base as flex siblings and
      let each one work out its own width, which meant the base's width
      depended on the lid's, and the lid's depended on a height that was
      itself a percentage. The resolution order was never guaranteed, so the
      base kept detaching from the screen. Nothing here depends on anything
      else: the wrapper's aspect ratio fixes the whole silhouette, the lid
      occupies the top 94% inset 6% from each side, the base takes the
      remaining strip at full width, and they meet by construction.

      1.7 is the outer ratio that leaves the screen itself at 16:10.
    */
    return (
      <div className={`flex items-center justify-center ${className}`}>
        {/* Width drives, not height. With h-full the box was clamped to the
            column's width as well, so the ratio could not hold and the screen
            cropped into the middle of the screenshot. */}
        <div className="relative w-full" style={{ aspectRatio: "1.7" }}>
          <div className="absolute inset-x-[6%] bottom-[6%] top-0 rounded-t-[0.4rem] bg-ink p-[0.3rem] pb-0 shadow-[0_10px_24px_rgba(16,24,32,0.18)]">
            <div className="h-full w-full overflow-hidden rounded-t-[0.2rem] bg-white">
              {picture}
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[6%] rounded-b-[0.35rem] bg-ink"
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

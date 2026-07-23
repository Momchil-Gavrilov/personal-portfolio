import sharp from "sharp";

/*
  Recolor a logo into the site palette: a maroon rounded-square icon with
  a cream mark. Luminance-based two-tone with a soft transition band.

  Args: <input> <output> <subjectDark: true|false>
  - subjectDark=true  -> dark pixels become cream (for a dark mark on light bg, e.g. dove)
  - subjectDark=false -> light pixels become cream (for a light subject on dark bg, e.g. cow)
*/
const [input, output, subjectDarkArg] = process.argv.slice(2);
const subjectDark = subjectDarkArg === "true";

const MAROON = [107, 31, 42];
const CREAM = [250, 246, 239];
const SIZE = 512;
const MID = 128;
const BAND = 42;

const { data, info } = await sharp(input)
  .resize(SIZE, SIZE, { fit: "cover" })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const out = Buffer.alloc(SIZE * SIZE * 4);
for (let i = 0; i < SIZE * SIZE; i++) {
  const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2], a = data[i * 4 + 3];
  let creamAmt;
  if (a < 128) {
    creamAmt = 0; // transparent source -> field (maroon)
  } else {
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    let t = (lum - (MID - BAND)) / (2 * BAND);
    t = Math.max(0, Math.min(1, t)); // 0 at dark, 1 at light
    creamAmt = subjectDark ? 1 - t : t;
  }
  out[i * 4] = Math.round(MAROON[0] + (CREAM[0] - MAROON[0]) * creamAmt);
  out[i * 4 + 1] = Math.round(MAROON[1] + (CREAM[1] - MAROON[1]) * creamAmt);
  out[i * 4 + 2] = Math.round(MAROON[2] + (CREAM[2] - MAROON[2]) * creamAmt);
  out[i * 4 + 3] = 255;
}

const mask = Buffer.from(
  `<svg width="${SIZE}" height="${SIZE}"><rect width="${SIZE}" height="${SIZE}" rx="112" fill="#fff"/></svg>`
);

await sharp(out, { raw: { width: SIZE, height: SIZE, channels: 4 } })
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toFile(output);

console.log("wrote", output);

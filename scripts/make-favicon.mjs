import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const src = "C:/Users/mcgga/Downloads/ChatGPT Image Jul 21, 2026, 03_04_34 PM.png";
const appDir = path.join(root, "src", "app");

async function circle(size, out) {
  const base = await sharp(src)
    .resize(size, size, { fit: "cover" })
    .png()
    .toBuffer();
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`
  );
  await sharp(base)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toFile(path.join(appDir, out));
  console.log("wrote", path.join("src/app", out));
}

await circle(256, "icon.png");
await circle(180, "apple-icon.png");

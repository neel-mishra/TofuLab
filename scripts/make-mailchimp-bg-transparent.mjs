import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const inputPath = join(root, 'public/images/mailchimp-logo.png');
const outputPath = join(root, 'public/images/mailchimp-logo.png');

const image = sharp(inputPath);
const { data, info } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
// Make white and yellow (high R, high G) background transparent; keep black monkey
const whiteThreshold = 235;
const yellowMinR = 180;
const yellowMinG = 180;
const yellowMaxB = 220;

for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const isWhite = r >= whiteThreshold && g >= whiteThreshold && b >= whiteThreshold;
  const isYellow = r >= yellowMinR && g >= yellowMinG && b <= yellowMaxB;
  if (isWhite || isYellow) {
    data[i + 3] = 0;
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(outputPath);

console.log('Updated mailchimp-logo.png: yellow/white background made transparent');

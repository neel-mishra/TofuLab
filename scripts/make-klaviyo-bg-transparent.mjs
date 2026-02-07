import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const inputPath = join(root, 'public/images/klaviyo-logo.png');
const outputPath = join(root, 'public/images/klaviyo-logo.png');

const image = sharp(inputPath);
const { data, info } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
// Make white and near-white pixels transparent; keep green and yellow-green logo
const whiteThreshold = 235;

for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r >= whiteThreshold && g >= whiteThreshold && b >= whiteThreshold) {
    data[i + 3] = 0;
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(outputPath);

console.log('Updated klaviyo-logo.png: white background made transparent');

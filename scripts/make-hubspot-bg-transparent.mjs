import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const inputPath = join(root, 'public/images/hubspot-logo.png');
const outputPath = join(root, 'public/images/hubspot-logo.png');

const image = sharp(inputPath);
const { data, info } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const threshold = 35; // black/near-black pixels become transparent

for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r <= threshold && g <= threshold && b <= threshold) {
    data[i + 3] = 0;
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(outputPath);

console.log('Updated hubspot-logo.png: black background made transparent');

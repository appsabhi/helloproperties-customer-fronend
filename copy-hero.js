import fs from 'fs';
import path from 'path';

const src = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\fb5412fe-8e5f-4bd2-9461-08b6d213a3ec\\luxury_villa_hero_1789380597778.jpg';
const destPublic = path.resolve('public', 'hero-villa.jpg');
const destAssetsDir = path.resolve('src', 'assets');
const destAssets = path.resolve('src', 'assets', 'hero-villa.jpg');

try {
  if (!fs.existsSync(destAssetsDir)) {
    fs.mkdirSync(destAssetsDir, { recursive: true });
  }
  fs.copyFileSync(src, destPublic);
  fs.copyFileSync(src, destAssets);
  console.log('Hero image successfully copied to public and src/assets!');
} catch (e) {
  console.error('Error copying file:', e);
}

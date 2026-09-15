import fs from 'fs';
import path from 'path';

const files = [
  {
    src: 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\fb5412fe-8e5f-4bd2-9461-08b6d213a3ec\\hero_kerala_villa_1789383397417.jpg',
    name: 'hero-kerala-villa.jpg'
  },
  {
    src: 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\fb5412fe-8e5f-4bd2-9461-08b6d213a3ec\\prop_land_kerala_1789383430008.jpg',
    name: 'prop-land-kerala.jpg'
  },
  {
    src: 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\fb5412fe-8e5f-4bd2-9461-08b6d213a3ec\\prop_cliff_villa_1789383455808.jpg',
    name: 'prop-cliff-villa.jpg'
  },
  {
    src: 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\fb5412fe-8e5f-4bd2-9461-08b6d213a3ec\\prop_courtyard_house_1789383478867.jpg',
    name: 'prop-courtyard-house.jpg'
  },
  {
    src: 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\fb5412fe-8e5f-4bd2-9461-08b6d213a3ec\\prop_water_pavilion_1789383511947.jpg',
    name: 'prop-water-pavilion.jpg'
  }
];

const targetDir = path.resolve('src', 'assets', 'editorial');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

files.forEach(({ src, name }) => {
  try {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(targetDir, name));
      console.log(`Copied ${name}`);
    }
  } catch (err) {
    console.error(`Failed copying ${name}:`, err);
  }
});

const fs = require('fs');
const path = 'e:/Fragmentree_/Website/Helloproperties/Customer-frontend/src/components/Hero.jsx';
let content = fs.readFileSync(path, 'utf-8');

content = content.replace('import heroOverlayImg from "../assets/png/hero-overlay.png";', 'import heroBgImg from "../assets/png/hero-bg-new.png";');

content = content.replace('<section className="mnzil-hero">', '<section className="mnzil-hero" style={{ backgroundImage: `url(${heroBgImg})`, backgroundSize: "contain", backgroundPosition: "center center", backgroundRepeat: "no-repeat" }}>');

const oldBg = `      {/* Burgundy Architectural Background */}
      <div className="mnzil-hero-bg">
        {/* Decorative 3D Artwork */}
        <div className="cityscape-decor-full" style={{ backgroundImage: \`url(${heroOverlayImg})\` }}></div>
      </div>`;

content = content.replace(oldBg, '');

fs.writeFileSync(path, content, 'utf-8');
console.log('done');

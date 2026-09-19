import React from "react";
import "./PropertyWorlds.css";

const CATEGORIES = [
  {
    id: "plot-land",
    title: "PLOT / LAND",
    subtitle: "Prime Parcels & Acreage",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
    sizeClass: "cat-card-large-hero",
  },
  {
    id: "house-villa",
    title: "HOUSE / VILLA",
    subtitle: "Luxury Private Residences",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    sizeClass: "cat-card-large",
  },
  {
    id: "apartment-flat",
    title: "APARTMENT / FLAT",
    subtitle: "Contemporary Urban Living",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
    sizeClass: "cat-card-small",
  },
  {
    id: "residential-plot",
    title: "RESIDENTIAL PLOT",
    subtitle: "Plotted Communities & Sites",
    img: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=85",
    sizeClass: "cat-card-small",
  },
  {
    id: "commercial-plot",
    title: "COMMERCIAL PLOT",
    subtitle: "High-Yield Business & Resort Land",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    sizeClass: "cat-card-small",
  },
  {
    id: "agricultural-land",
    title: "AGRICULTURAL LAND",
    subtitle: "Fertile Plantations & Farmland",
    img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=85",
    sizeClass: "cat-card-wide",
  },
  {
    id: "industrial-plot",
    title: "INDUSTRIAL PLOT",
    subtitle: "Logistics & Manufacturing Zones",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85",
    sizeClass: "cat-card-medium",
  },
];

const PropertyWorlds = () => {
  return (
    <section className="arch-category-section" id="categories">
      <div className="hp-container">
        {/* Header - View All Button Removed */}
        <div className="arch-category-header">
          <div>
            <span className="meta-label">TYPOLOGIES</span>
            <h2 className="arch-category-title">EXPLORE BY PROPERTY TYPE</h2>
          </div>
        </div>

        {/* Varied Size Bento Grid (Non-clickable Category Showcase) */}
        <div className="arch-category-grid">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className={`arch-category-card ${cat.sizeClass}`}
            >
              <div className="arch-cat-media">
                <img src={cat.img} alt={cat.title} className="arch-cat-img" loading="lazy" />
                <div className="arch-cat-overlay"></div>
              </div>

              <div className="arch-cat-content">
                <div>
                  <h3 className="arch-cat-title">{cat.title}</h3>
                  <div className="arch-cat-bottom">
                    <span className="arch-cat-sub">{cat.subtitle}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyWorlds;

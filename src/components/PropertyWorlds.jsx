import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./PropertyWorlds.css";

const CATEGORIES = [
  {
    id: "villas",
    title: "VILLAS",
    subtitle: "Luxury living in paradise",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=85",
    typeQuery: "Villas"
  },
  {
    id: "land",
    title: "LAND",
    subtitle: "Invest in tomorrow",
    img: "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&w=800&q=85",
    typeQuery: "Land"
  },
  {
    id: "destinations",
    title: "DESTINATIONS",
    subtitle: "Iconic locations",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=85",
    typeQuery: "Destinations"
  },
  {
    id: "properties",
    title: "PROPERTIES",
    subtitle: "Curated for you",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85",
    typeQuery: "All"
  }
];

const PropertyWorlds = () => {
  const navigate = useNavigate();

  return (
    <section className="arch-category-section">
      <div className="hp-container">
        {/* Header */}
        <div className="arch-category-header">
          <div>
            <span className="meta-label">TYPOLOGIES</span>
            <h2 className="arch-category-title">EXPLORE BY CATEGORY</h2>
          </div>
          <Link to="/properties" className="arch-view-all-link">
            <span>VIEW ALL</span>
            <span className="arr">→</span>
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="arch-category-grid">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="arch-category-card"
              onClick={() => navigate(cat.typeQuery === "Destinations" ? "/#destinations" : `/properties?type=${cat.typeQuery}`)}
            >
              <div className="arch-cat-media">
                <img src={cat.img} alt={cat.title} className="arch-cat-img" />
                <div className="arch-cat-overlay"></div>
              </div>

              <div className="arch-cat-content">
                <h3 className="arch-cat-title">{cat.title}</h3>
                <div className="arch-cat-bottom">
                  <span className="arch-cat-sub">{cat.subtitle}</span>
                  <span className="arch-cat-arrow">→</span>
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

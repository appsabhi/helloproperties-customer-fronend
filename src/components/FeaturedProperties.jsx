import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCustomerProperties } from "../context/CustomerPropertyContext";
import "./FeaturedProperties.css";

const DEMO_FALLBACK_CARDS = [
  {
    id: "wayanad-tropical-villa",
    type: "HOUSE/VILLA",
    title: "Modern Tropical Villa in Wayanad",
    location: "Vythiri, Wayanad",
    specs: "4 BHK  •  4,800 sq ft",
    price: "₹ 4.5 Cr",
    listingType: "For Sale",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "kochi-waterfront-apartment",
    type: "APARTMENT/FLAT",
    title: "Waterfront Luxury Apartment in Kochi",
    location: "Marine Drive, Kochi",
    specs: "3 BHK  •  2,400 sq ft",
    price: "₹ 2.2 Cr",
    listingType: "For Sale",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "munnar-tea-plantation",
    type: "AGRICULTURAL LAND",
    title: "Agricultural Farmland Estate in Munnar",
    location: "Devikulam, Munnar",
    specs: "12.5 Acres",
    price: "₹ 3.8 Cr",
    listingType: "For Sale",
    img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "calicut-gated-plot",
    type: "RESIDENTIAL PLOT",
    title: "Gated Community Residential Plot in Calicut",
    location: "Thondayad, Kozhikode",
    specs: "18 Cents",
    price: "₹ 95 Lakhs",
    listingType: "For Sale",
    img: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1000&q=85",
  },
];

function formatSpecs(p) {
  const parts = [];
  if (p.bedrooms) parts.push(`${p.bedrooms} BHK`);
  if (p.builtUpArea) {
    const areaStr = String(p.builtUpArea).toLowerCase().includes("sq")
      ? p.builtUpArea
      : `${p.builtUpArea} sq ft`;
    parts.push(areaStr);
  } else if (p.landArea) {
    parts.push(p.landArea);
  }
  if (parts.length === 0) {
    if (p.district || p.location) parts.push(p.district || p.location);
    else parts.push("Prime Site");
  }
  return parts.join("  •  ");
}

function formatLocation(p) {
  if (p.location && p.district) return `${p.location}, ${p.district}`;
  if (p.location) return p.location;
  if (p.district) return `${p.district}, Kerala`;
  return "Kerala, India";
}

const FeaturedProperties = () => {
  const navigate = useNavigate();
  const { properties, loading } = useCustomerProperties();

  let displayCards = [];

  if (properties && properties.length > 0) {
    // Prioritize featured properties from DB, then select top 4 curated properties
    const featured = properties.filter((p) => p.isFeatured);
    const nonFeatured = properties.filter((p) => !p.isFeatured);
    const combined = [...featured, ...nonFeatured].slice(0, 4);

    displayCards = combined.map((p) => ({
      id: p.id,
      type: (p.propertyType || p.category || "PROPERTY").toUpperCase(),
      title: p.title,
      location: formatLocation(p),
      specs: formatSpecs(p),
      price: p.priceFormatted || "Price on Request",
      listingType: p.listingType === "Rent" ? "For Rent" : "For Sale",
      img: p.imageUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
    }));
  } else {
    displayCards = DEMO_FALLBACK_CARDS.slice(0, 4);
  }

  return (
    <section className="arch-featured-section">
      <div className="hp-container">
        {/* Header */}
        <div className="arch-featured-header">
          <div>
            <span className="meta-label">CURATED SELECTION</span>
            <h2 className="arch-featured-title">FEATURED PROPERTIES</h2>
          </div>
          <Link to="/properties" className="arch-view-all-link">
            <span>VIEW ALL PROPERTIES</span>
            <span className="arr">→</span>
          </Link>
        </div>

        {/* 4-Card Architectural Grid */}
        <div className="arch-property-grid">
          {displayCards.map((prop) => (
            <article
              key={prop.id}
              className="arch-featured-card"
              onClick={() => navigate(`/properties?id=${prop.id}`)}
            >
              {/* Image Frame with Translucent Glass Floating Badges */}
              <div className="arch-card-media-wrap">
                <img src={prop.img} alt={prop.title} className="arch-card-media-img" loading="lazy" />
                <div className="arch-card-top-badges">
                  <span className="arch-pill-badge-type">{prop.type}</span>
                  <span className="arch-pill-badge-status">{prop.listingType}</span>
                </div>
              </div>

              {/* Structured White/Ivory Card Body */}
              <div className="arch-card-body-block">
                <div className="arch-card-location">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{prop.location}</span>
                </div>

                <h3 className="arch-card-item-title">{prop.title}</h3>
                
                <div className="arch-card-specs-row">
                  <span className="spec-item">{prop.specs}</span>
                </div>

                <div className="arch-card-bottom-bar">
                  <button className="arch-card-cta-btn" type="button" aria-label="Explore property">
                    <span>EXPLORE PROPERTY</span>
                    <span className="cta-arrow">→</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;


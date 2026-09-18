import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./FeaturedProperties.css";

const FEATURED_CARDS = [
  {
    id: "wayanad-tropical-villa",
    type: "LUXURY VILLA",
    title: "Modern Tropical Villa in Wayanad",
    specs: "4 BHK  •  4,800 sq ft",
    price: "₹ 4.5 Cr",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "munnar-plantation-land",
    type: "LAND",
    title: "Tea Plantation Land in Munnar",
    specs: "8.2 Acres",
    price: "₹ 1.8 Cr",
    img: "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "alleppey-heritage-home",
    type: "VILLA",
    title: "Heritage Home in Alleppey",
    specs: "3 BHK  •  3,200 sq ft",
    price: "₹ 2.9 Cr",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "varkala-sea-view-villa",
    type: "VILLA",
    title: "Sea View Villa in Varkala",
    specs: "4 BHK  •  4,200 sq ft",
    price: "₹ 5.2 Cr",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "kochi-contemporary-home",
    type: "VILLA",
    title: "Contemporary Home in Kochi",
    specs: "3 BHK  •  3,200 sq ft",
    price: "₹ 3.8 Cr",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "vagamon-hill-view-land",
    type: "LAND",
    title: "Hill View Land in Vagamon",
    specs: "2.5 Acres",
    price: "₹ 95 Lakhs",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85",
  },
];

const FeaturedProperties = () => {
  const navigate = useNavigate();

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

        {/* 3x2 Property Grid */}
        <div className="arch-property-grid">
          {FEATURED_CARDS.map((prop) => (
            <div
              key={prop.id}
              className="arch-property-card"
              onClick={() => navigate(`/properties?id=${prop.id}`)}
            >
              <div className="arch-card-media">
                <img src={prop.img} alt={prop.title} className="arch-card-img" />
                <div className="arch-card-overlay"></div>
              </div>

              <div className="arch-card-content">
                <span className="arch-card-type">{prop.type}</span>
                <h3 className="arch-card-title">{prop.title}</h3>
                
                <div className="arch-card-bottom">
                  <span className="arch-card-specs">{prop.specs}</span>
                  <span className="arch-card-price">{prop.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;

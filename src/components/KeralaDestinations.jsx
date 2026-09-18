import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./KeralaDestinations.css";

const DESTINATIONS = [
  {
    id: "wayanad",
    name: "WAYANAD",
    subtitle: "High Altitude Plantation Mist & Valleys",
    tagline: "Misty mountains. Plantation estates. Quiet retreats.",
    propertiesCount: "12 PROPERTIES",
    types: "Plantations • Mountain Homes • Eco Parcels",
    img: "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&w=1200&q=85",
    mapCoords: { top: "25%", left: "42%" }
  },
  {
    id: "kozhikode",
    name: "KOZHIKODE",
    subtitle: "Historic Spice Coast & Coastal Estates",
    tagline: "Golden beaches. Riverfront bungalows. Urban heritage.",
    propertiesCount: "9 PROPERTIES",
    types: "Beachfront Plots • River Sanctuaries • Townhouses",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    mapCoords: { top: "35%", left: "30%" }
  },
  {
    id: "kochi",
    name: "KOCHI",
    subtitle: "Cultural Port & Contemporary Luxury",
    tagline: "Colonial architecture. Harbor suites. Modern skyline.",
    propertiesCount: "18 PROPERTIES",
    types: "Waterfront Penthouse • Heritage Bungalows • Apartments",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=85",
    mapCoords: { top: "58%", left: "45%" }
  },
  {
    id: "munnar",
    name: "MUNNAR",
    subtitle: "Infinite Tea Slopes & Misty Peaks",
    tagline: "Crisp mountain air. Endless green slopes. Colonial stays.",
    propertiesCount: "14 PROPERTIES",
    types: "Tea Garden Stays • Hilltop Residences • Valley Land",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
    mapCoords: { top: "62%", left: "68%" }
  },
  {
    id: "alleppey",
    name: "ALLEPPEY",
    subtitle: "Serene Backwater & Lagoon Canals",
    tagline: "Palms over water. Private islands. Lotus bay retreats.",
    propertiesCount: "11 PROPERTIES",
    types: "Backwater Island Estates • Private Jetties • Farmland",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85",
    mapCoords: { top: "72%", left: "52%" }
  },
  {
    id: "thiruvananthapuram",
    name: "THIRUVANANTHAPURAM",
    subtitle: "Royal Capital & Cliffside Ocean Frontiers",
    tagline: "Cliffside ocean vistas. Royal heritage. Capital elegance.",
    propertiesCount: "8 PROPERTIES",
    types: "Ocean View Cliffs • Heritage Mansions • City Plots",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
    mapCoords: { top: "88%", left: "62%" }
  },
];

const KeralaDestinations = () => {
  const navigate = useNavigate();
  const [selectedDest, setSelectedDest] = useState(DESTINATIONS[0]);

  return (
    <section id="destinations" className="arch-dest-section">
      <div className="hp-container">
        {/* Section Header */}
        <div className="arch-dest-header">
          <div>
            <span className="meta-label">GEOGRAPHY & REGIONS</span>
            <h2 className="arch-dest-title">EXPLORE KERALA</h2>
          </div>
          <p className="arch-dest-subhead">Find the landscape that feels like home.</p>
        </div>

        {/* Interactive Destination Map & Detail Showcase */}
        <div className="arch-dest-grid">
          {/* Interactive Destination Selector & Map Frame */}
          <div className="arch-dest-map-container">
            <span className="arch-map-bg-text">KERALA</span>
            <div className="arch-map-pins-list">
              {DESTINATIONS.map((dest) => (
                <button
                  key={dest.id}
                  type="button"
                  className={`arch-dest-pill ${selectedDest.id === dest.id ? "active" : ""}`}
                  onClick={() => setSelectedDest(dest)}
                >
                  <span className="pill-dot"></span>
                  <span className="pill-name">{dest.name}</span>
                  <span className="pill-count">{dest.propertiesCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Location Detail Visual Card */}
          <div className="arch-dest-card">
            <div className="arch-dest-media">
              <img src={selectedDest.img} alt={selectedDest.name} className="arch-dest-img" />
              <div className="arch-dest-badge">{selectedDest.propertiesCount}</div>
            </div>

            <div className="arch-dest-info">
              <span className="meta-label">{selectedDest.subtitle}</span>
              <h3 className="arch-dest-card-title">{selectedDest.name}</h3>
              <p className="arch-dest-tagline">"{selectedDest.tagline}"</p>
              
              <div className="arch-dest-types">
                <span className="types-label">FEATURED TYPOLOGIES</span>
                <span className="types-value">{selectedDest.types}</span>
              </div>

              <button
                type="button"
                className="arch-btn-explore-dest"
                onClick={() => navigate(`/properties?location=${selectedDest.name}`)}
              >
                <span>EXPLORE {selectedDest.name}</span>
                <span className="arr">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeralaDestinations;

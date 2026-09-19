import React from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedDestination.css";

const DEST_BG = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2400&q=90"; // Wayanad misty plantation & mountains

const FeaturedDestination = () => {
  const navigate = useNavigate();

  return (
    <section className="arch-featdest-section">
      <div className="arch-featdest-bg">
        <img src={DEST_BG} alt="Wayanad Misty Plantation & Mountains" className="arch-featdest-img" />
        <div className="arch-featdest-overlay"></div>
      </div>

      <div className="arch-featdest-content">
        <div className="hp-container">
          <div className="arch-featdest-box">
            <span className="meta-label arch-featdest-meta">FEATURED REGION SPOTLIGHT</span>
            <h2 className="arch-featdest-title">
              WAYANAD<br />
              <span className="arch-featdest-sub">KERALA</span>
            </h2>

            <p className="arch-featdest-quote">
              "Where forests, plantations and mountains create a slower way of living."
            </p>

            <button
              type="button"
              className="arch-btn-featdest"
              onClick={() => navigate("/properties?location=Wayanad")}
            >
              <span>EXPLORE PROPERTIES</span>
              <span className="arr">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestination;

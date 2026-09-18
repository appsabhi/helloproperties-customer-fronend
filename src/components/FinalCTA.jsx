import React from "react";
import { useNavigate } from "react-router-dom";
import "./FinalCTA.css";

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="arch-finalcta-section">
      <div className="hp-container">
        <div className="arch-finalcta-box">
          <span className="arch-finalcta-label">YOUR KERALA STORY AWAITS</span>

          <h2 className="arch-finalcta-headline">FIND THE PERFECT PROPERTY</h2>

          <button
            type="button"
            className="arch-btn-explore-green-pill"
            onClick={() => navigate("/properties")}
          >
            <span>EXPLORE PROPERTIES</span>
            <span className="arr">→</span>
          </button>
        </div>
      </div>

      {/* Subtle Botanical Corner Line Art Graphic */}
      <div className="arch-botanical-art">
        <svg width="140" height="140" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M50 90 Q30 50 10 10 M50 90 Q70 50 90 10 M50 90 Q50 40 50 0 M35 60 Q20 40 10 35 M65 60 Q80 40 90 35" opacity="0.15" />
        </svg>
      </div>
    </section>
  );
};

export default FinalCTA;

import React from "react";
import "./WhyUs.css";

const SHOWCASE_IMAGE = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85";

const WhyUs = () => {
  return (
    <section id="about" className="arch-whyus-section">
      <div className="hp-container">
        <div className="arch-whyus-grid">
          {/* Left Split Content */}
          <div className="arch-whyus-content">
            <span className="arch-whyus-eyebrow">ABOUT HELLOPROPERTIES</span>

            <h2 className="arch-whyus-title">
              CURATING KERALA’S MOST EXCEPTIONAL LANDSCAPES & HOMES.
            </h2>

            <p className="arch-whyus-description">
              HelloProperties is dedicated to presenting prime Kerala land, tea plantations, coastal parcels, and architectural residences. We connect discerning buyers with 100% verified estates through complete legal transparency, boundary precision, and personalized advisory.
            </p>

            {/* Key Value Pillar Chips */}
            <div className="arch-pillars-row">
              <span className="pillar-chip">✓ 100% Title Verified</span>
              <span className="pillar-chip">✓ Boundary & Terrain Audited</span>
              <span className="pillar-chip">✓ Private Advisory</span>
            </div>

            {/* Statistics Row */}
            <div className="arch-whyus-stats">
              <div className="stat-block">
                <span className="stat-num">500+</span>
                <span className="stat-desc">VERIFIED ACRES LISTED</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-block">
                <span className="stat-num">98%</span>
                <span className="stat-desc">MATCH SATISFACTION</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-block">
                <span className="stat-num">100%</span>
                <span className="stat-desc">TITLE ASSURANCE</span>
              </div>
            </div>
          </div>

          {/* Right Image Showcase Frame */}
          <div className="arch-whyus-media">
            <div className="arch-whyus-img-frame">
              <img src={SHOWCASE_IMAGE} alt="HelloProperties Kerala Luxury Architecture" className="arch-whyus-img" loading="lazy" />
              <div className="arch-whyus-media-badge">
                <span className="badge-dot">•</span>
                <span>EXCLUSIVE KERALA ESTATES</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
